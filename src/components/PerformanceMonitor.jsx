import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PerformanceMonitor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
    batteryLevel: null,
    connection: 'unknown'
  });
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationId = useRef(null);

  useEffect(() => {
    // Performance monitoring
    const updateMetrics = () => {
      const now = performance.now();
      frameCount.current++;
      
      if (now - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
        frameCount.current = 0;
        lastTime.current = now;
        
        setMetrics(prev => ({
          ...prev,
          fps: fps,
          memory: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 0,
          loadTime: Math.round(performance.timing ? performance.timing.loadEventEnd - performance.timing.navigationStart : 0)
        }));
      }
      
      animationId.current = requestAnimationFrame(updateMetrics);
    };

    // Battery API
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setMetrics(prev => ({
          ...prev,
          batteryLevel: Math.round(battery.level * 100)
        }));
        
        battery.addEventListener('levelchange', () => {
          setMetrics(prev => ({
            ...prev,
            batteryLevel: Math.round(battery.level * 100)
          }));
        });
      });
    }

    // Connection info
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setMetrics(prev => ({
        ...prev,
        connection: connection.effectiveType || 'unknown'
      }));
    }

    animationId.current = requestAnimationFrame(updateMetrics);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === '`') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const getPerformanceColor = (value, type) => {
    if (type === 'fps') {
      if (value >= 50) return 'text-green-400';
      if (value >= 30) return 'text-yellow-400';
      return 'text-red-400';
    }
    if (type === 'memory') {
      if (value <= 50) return 'text-green-400';
      if (value <= 100) return 'text-yellow-400';
      return 'text-red-400';
    }
    return 'text-blue-400';
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm text-white p-2 rounded-full border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Performance Monitor (Ctrl + `)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M7 12l3-3 3 3 5-5" />
        </svg>
      </motion.button>

      {/* Performance Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-4 z-50 bg-black/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 min-w-[200px] font-mono text-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Performance</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">FPS:</span>
                <span className={getPerformanceColor(metrics.fps, 'fps')}>
                  {metrics.fps}
                </span>
              </div>
              
              {metrics.memory > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Memory:</span>
                  <span className={getPerformanceColor(metrics.memory, 'memory')}>
                    {metrics.memory}MB
                  </span>
                </div>
              )}
              
              {metrics.loadTime > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Load:</span>
                  <span className="text-blue-400">
                    {metrics.loadTime}ms
                  </span>
                </div>
              )}
              
              {metrics.batteryLevel !== null && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Battery:</span>
                  <span className={
                    metrics.batteryLevel > 20 ? 'text-green-400' : 
                    metrics.batteryLevel > 10 ? 'text-yellow-400' : 'text-red-400'
                  }>
                    {metrics.batteryLevel}%
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Network:</span>
                <span className="text-blue-400 capitalize">
                  {metrics.connection}
                </span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-xs text-gray-400 text-center">
                Press Ctrl + ` to toggle
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PerformanceMonitor;
