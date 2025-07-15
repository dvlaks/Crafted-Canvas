// Utility function to detect WebP support and return appropriate texture URL
export const getOptimizedTextureUrl = (basePath) => {
  // Simple WebP support detection
  const supportsWebP = (() => {
    try {
      return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch (e) {
      return false;
    }
  })();

  return supportsWebP ? `${basePath}.webp` : `${basePath}.png`;
};

// Device capability detection for adaptive quality
export const getDeviceCapability = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) {
    return 'low';
  }

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  
  // Check for high-end GPUs
  if (renderer.includes('RTX') || renderer.includes('GTX') || renderer.includes('Radeon RX')) {
    return 'high';
  }
  
  // Check for mobile/integrated GPUs
  if (renderer.includes('Mali') || renderer.includes('Adreno') || renderer.includes('Intel')) {
    return 'low';
  }
  
  return 'medium';
};

// Performance monitoring utilities
export const performanceMonitor = {
  startTime: Date.now(),
  
  markMilestone: (name) => {
    if (performance.mark) {
      performance.mark(name);
      console.log(`Performance: ${name} at ${Date.now() - performanceMonitor.startTime}ms`);
    }
  },
  
  measureDuration: (startMark, endMark) => {
    if (performance.measure) {
      performance.measure(`${startMark}-to-${endMark}`, startMark, endMark);
      return performance.getEntriesByName(`${startMark}-to-${endMark}`)[0]?.duration || 0;
    }
    return 0;
  }
};