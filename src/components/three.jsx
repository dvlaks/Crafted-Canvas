import React, { Suspense } from 'react'
import { ComputersCanvas } from "./canvas";
import ThreeJSErrorBoundary from './ThreeJSErrorBoundary';

const Three = () => {
  return (
    <section className={`relative w-full h-screen mx-auto cursor-move`}>
      <ThreeJSErrorBoundary>
        <Suspense fallback={
          <div className="flex items-center justify-center h-full bg-gradient-to-b from-primary to-black-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-purple-500 mx-auto mb-4"></div>
              <div className="text-white text-lg">Loading 3D Scene...</div>
              <div className="text-gray-400 text-sm mt-2">Please wait while we load the experience</div>
            </div>
          </div>
        }>
          <ComputersCanvas />
        </Suspense>
      </ThreeJSErrorBoundary>
    </section>
  );
}

export default Three
