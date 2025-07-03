import React, { Suspense } from 'react'
import { ComputersCanvas } from "./canvas";
import ThreeJSErrorBoundary from './ThreeJSErrorBoundary';

const Three = () => {
  return (
    <section className={`relative w-full h-screen mx-auto cursor-move`}>
      <ThreeJSErrorBoundary>
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg">Loading 3D Scene...</div>
          </div>
        }>
          <ComputersCanvas />
        </Suspense>
      </ThreeJSErrorBoundary>
    </section>
  );
}

export default Three
