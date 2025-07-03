import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import ModelErrorBoundary from "../ModelErrorBoundary";

const Earth = () => {
  const earth = useGLTF("./mangrove/scene.gltf");
  return (
    <primitive object={earth.scene} scale={.5} position-y={-1} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      style={{ position: 'relative', zIndex: 1 }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 20, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <ModelErrorBoundary fallback={
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#4caf50" wireframe />
          </mesh>
        }>
          <Earth />
        </ModelErrorBoundary>

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
