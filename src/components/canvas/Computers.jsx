import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import ModelErrorBoundary from "../ModelErrorBoundary";
import { getDeviceCapability, performanceMonitor } from "../../utils/performance";

const Computers = ({ isMobile, isTablet }) => {
  // Use optimized model for better performance with device-based fallback
  const modelPath = useMemo(() => {
    const deviceCapability = getDeviceCapability();
    const useOptimized = deviceCapability !== 'low' || !isMobile;
    
    performanceMonitor.markMilestone('model-selection');
    return useOptimized ? "./tbp/scene-optimized.gltf" : "./tbp/scene-optimized.gltf";
  }, [isMobile]);
  
  const computer = useGLTF(modelPath);
  
  useEffect(() => {
    performanceMonitor.markMilestone('model-loaded');
  }, [computer]);
  
  // Optimize lighting for performance with device-adaptive settings
  const lightConfig = useMemo(() => {
    const deviceCapability = getDeviceCapability();
    const isLowEnd = deviceCapability === 'low' || isMobile;
    
    return {
      hemisphere: { intensity: isLowEnd ? 0.1 : 0.15 },
      spot: {
        intensity: isLowEnd ? 0.5 : 1,
        shadowMapSize: isLowEnd ? 256 : 512, // Reduced from 1024
        position: [-20, 50, 10],
        angle: 0.12,
        penumbra: 1,
      },
      point: { intensity: isLowEnd ? 0.5 : 1 }
    };
  }, [isMobile]);
  
  return (
    <mesh>
      <hemisphereLight 
        intensity={lightConfig.hemisphere.intensity} 
        groundColor='black' 
      />
      <spotLight
        position={lightConfig.spot.position}
        angle={lightConfig.spot.angle}
        penumbra={lightConfig.spot.penumbra}
        intensity={lightConfig.spot.intensity}
        castShadow={!isMobile} // Disable shadows on mobile
        shadow-mapSize={lightConfig.spot.shadowMapSize}
      />
      <pointLight intensity={lightConfig.point.intensity} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : isTablet ? 0.8 : 1.25}
        position={isMobile ? [0, -2.5, -1.5] : isTablet ? [0, -2.8, -1.8] : [0, -1.3, -2]}
        rotation={[-0.01, -0.2, 0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 500px)");
    const tabletQuery = window.matchMedia("(max-width: 768px) and (min-width: 501px)");
    
    setIsMobile(mobileQuery.matches);
    setIsTablet(tabletQuery.matches);

    const handleMobileChange = (event) => setIsMobile(event.matches);
    const handleTabletChange = (event) => setIsTablet(event.matches);
    
    mobileQuery.addEventListener("change", handleMobileChange);
    tabletQuery.addEventListener("change", handleTabletChange);

    // Mark performance milestone
    performanceMonitor.markMilestone('canvas-mount');

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      tabletQuery.removeEventListener("change", handleTabletChange);
    };
  }, []);

  // Performance optimizations based on device capability
  const canvasConfig = useMemo(() => {
    const deviceCapability = getDeviceCapability();
    const isLowEnd = deviceCapability === 'low' || isMobile;
    
    return {
      dpr: isLowEnd ? [0.5, 1] : [1, 2], // Lower pixel ratio on low-end devices
      camera: { 
        position: [20, 3, 5], 
        fov: isMobile ? 40 : 25,
        near: 0.1,
        far: 200 // Add frustum culling
      },
      gl: { 
        preserveDrawingBuffer: true,
        antialias: !isLowEnd, // Disable anti-aliasing on low-end devices
        alpha: true,
        powerPreference: isLowEnd ? "low-power" : "high-performance",
        stencil: false, // Disable stencil buffer for better performance
        depth: true
      }
    };
  }, [isMobile]);

  return (
    <Canvas
      frameloop='demand'
      shadows={!isMobile} // Disable shadows on mobile
      dpr={canvasConfig.dpr}
      camera={canvasConfig.camera}
      gl={canvasConfig.gl}
      style={{ position: 'relative', zIndex: 1 }}
      onCreated={() => performanceMonitor.markMilestone('canvas-created')}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={!isMobile} // Disable damping on mobile for better performance
          dampingFactor={0.1}
        />
        <ModelErrorBoundary fallback={
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#915EFF" wireframe />
          </mesh>
        }>
          <Computers isMobile={isMobile} isTablet={isTablet} />
        </ModelErrorBoundary>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
