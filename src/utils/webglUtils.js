/**
 * WebGL Utilities for Performance Optimization
 * Provides functions to detect WebGL support and optimize 3D rendering
 */

// Check if WebGL is supported
export const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch (e) {
    return false;
  }
};

// Check if WebGL2 is supported
export const isWebGL2Supported = () => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    return !!context;
  } catch (e) {
    return false;
  }
};

// Get WebGL capabilities
export const getWebGLCapabilities = () => {
  if (!isWebGLSupported()) {
    return null;
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  return {
    version: gl.getParameter(gl.VERSION),
    vendor: gl.getParameter(gl.VENDOR),
    renderer: gl.getParameter(gl.RENDERER),
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxVertexAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
    maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
    maxCombinedTextureImageUnits: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
    extensions: gl.getSupportedExtensions()
  };
};

// Detect if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Detect if device has low performance
export const isLowPerformanceDevice = () => {
  const mobile = isMobile();
  const cores = navigator.hardwareConcurrency || 1;
  const memory = navigator.deviceMemory || 1;
  
  // Consider device low performance if:
  // - Mobile with limited cores/memory
  // - Desktop with very limited resources
  return mobile && (cores <= 2 || memory <= 2) || (!mobile && cores <= 2 && memory <= 2);
};

// Get recommended render settings based on device capabilities
export const getRecommendedRenderSettings = () => {
  const webglSupported = isWebGLSupported();
  const webgl2Supported = isWebGL2Supported();
  const lowPerformance = isLowPerformanceDevice();
  const mobile = isMobile();

  if (!webglSupported) {
    return {
      enableThreeJS: false,
      fallbackTo2D: true,
      reason: 'WebGL not supported'
    };
  }

  const settings = {
    enableThreeJS: true,
    fallbackTo2D: false,
    pixelRatio: Math.min(window.devicePixelRatio, lowPerformance ? 1 : 2),
    antialias: !lowPerformance,
    shadows: !lowPerformance && !mobile,
    maxLights: lowPerformance ? 2 : mobile ? 4 : 8,
    animationQuality: lowPerformance ? 'low' : mobile ? 'medium' : 'high',
    textureQuality: lowPerformance ? 'low' : mobile ? 'medium' : 'high',
    postProcessing: !lowPerformance && !mobile,
    frameRateTarget: lowPerformance ? 30 : 60
  };

  return settings;
};

// Performance monitoring utilities
export const createPerformanceMonitor = () => {
  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 0;
  let callbacks = [];

  const monitor = {
    start: () => {
      const update = () => {
        const now = performance.now();
        frameCount++;
        
        if (now - lastTime >= 1000) {
          fps = Math.round((frameCount * 1000) / (now - lastTime));
          frameCount = 0;
          lastTime = now;
          
          callbacks.forEach(callback => callback(fps));
        }
        
        requestAnimationFrame(update);
      };
      
      requestAnimationFrame(update);
    },
    
    onUpdate: (callback) => {
      callbacks.push(callback);
    },
    
    getFPS: () => fps
  };

  return monitor;
};

// Optimize Three.js renderer based on device capabilities
export const optimizeRenderer = (renderer) => {
  const settings = getRecommendedRenderSettings();
  
  if (!settings.enableThreeJS) {
    return null;
  }

  // Apply optimizations
  renderer.setPixelRatio(settings.pixelRatio);
  renderer.shadowMap.enabled = settings.shadows;
  renderer.antialias = settings.antialias;
  
  // Enable optimizations
  renderer.powerPreference = 'high-performance';
  renderer.precision = isLowPerformanceDevice() ? 'mediump' : 'highp';
  
  return renderer;
};

// Texture optimization utilities
export const optimizeTexture = (texture) => {
  const settings = getRecommendedRenderSettings();
  
  if (settings.textureQuality === 'low') {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  } else if (settings.textureQuality === 'medium') {
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }
  
  return texture;
};

// Memory management utilities
export const disposeObject = (obj) => {
  if (obj.geometry) {
    obj.geometry.dispose();
  }
  
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach(material => {
        if (material.map) material.map.dispose();
        if (material.normalMap) material.normalMap.dispose();
        if (material.roughnessMap) material.roughnessMap.dispose();
        if (material.metalnessMap) material.metalnessMap.dispose();
        material.dispose();
      });
    } else {
      if (obj.material.map) obj.material.map.dispose();
      if (obj.material.normalMap) obj.material.normalMap.dispose();
      if (obj.material.roughnessMap) obj.material.roughnessMap.dispose();
      if (obj.material.metalnessMap) obj.material.metalnessMap.dispose();
      obj.material.dispose();
    }
  }
  
  if (obj.texture) {
    obj.texture.dispose();
  }
};

// Batch geometry for better performance
export const batchGeometry = (geometries) => {
  const merged = new THREE.BufferGeometry();
  const positions = [];
  const normals = [];
  const uvs = [];
  
  geometries.forEach(geometry => {
    if (geometry.attributes.position) {
      positions.push(...geometry.attributes.position.array);
    }
    if (geometry.attributes.normal) {
      normals.push(...geometry.attributes.normal.array);
    }
    if (geometry.attributes.uv) {
      uvs.push(...geometry.attributes.uv.array);
    }
  });
  
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  merged.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  
  return merged;
};
