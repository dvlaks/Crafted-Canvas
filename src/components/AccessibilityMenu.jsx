import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccessibilityMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 100,
    contrast: 'normal',
    reducedMotion: false,
    focusVisible: false,
    screenReader: false
  });

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Check for system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setSettings(prev => ({ ...prev, contrast: 'high' }));
    }
  }, []);

  useEffect(() => {
    // Apply settings
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${settings.fontSize}%`;
    
    // Contrast
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    // Focus visible
    if (settings.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }
    
    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      contrast: 'normal',
      reducedMotion: false,
      focusVisible: false,
      screenReader: false
    });
  };

  const skipToContent = () => {
    const main = document.querySelector('main') || document.querySelector('[role="main"]');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
        onClick={skipToContent}
      >
        Skip to main content
      </a>

      {/* Accessibility toggle button */}
      <button
        className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm text-white p-2 rounded-full border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Open accessibility menu"
        aria-expanded={isVisible}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6" />
          <path d="M21 12h-6m-6 0H3" />
        </svg>
      </button>

      {/* Accessibility menu */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed top-0 left-0 z-40 w-80 h-full bg-black/95 backdrop-blur-sm border-r border-purple-500/30 p-6 overflow-y-auto"
            role="dialog"
            aria-label="Accessibility Settings"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-bold">Accessibility</h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                aria-label="Close accessibility menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Font Size */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Font Size: {settings.fontSize}%
                </label>
                <input
                  type="range"
                  min="80"
                  max="150"
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  aria-label="Adjust font size"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>80%</span>
                  <span>150%</span>
                </div>
              </div>

              {/* Contrast */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Contrast
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contrast"
                      value="normal"
                      checked={settings.contrast === 'normal'}
                      onChange={(e) => updateSetting('contrast', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-white">Normal</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contrast"
                      value="high"
                      checked={settings.contrast === 'high'}
                      onChange={(e) => updateSetting('contrast', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-white">High Contrast</span>
                  </label>
                </div>
              </div>

              {/* Motion */}
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">Reduce Motion</span>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                    className="toggle-checkbox"
                  />
                </label>
                <p className="text-gray-400 text-xs mt-1">
                  Minimize animations and transitions
                </p>
              </div>

              {/* Focus Indicators */}
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">Enhanced Focus</span>
                  <input
                    type="checkbox"
                    checked={settings.focusVisible}
                    onChange={(e) => updateSetting('focusVisible', e.target.checked)}
                    className="toggle-checkbox"
                  />
                </label>
                <p className="text-gray-400 text-xs mt-1">
                  Show visible focus indicators
                </p>
              </div>

              {/* Screen Reader */}
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">Screen Reader Mode</span>
                  <input
                    type="checkbox"
                    checked={settings.screenReader}
                    onChange={(e) => updateSetting('screenReader', e.target.checked)}
                    className="toggle-checkbox"
                  />
                </label>
                <p className="text-gray-400 text-xs mt-1">
                  Optimize for screen readers
                </p>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSettings}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Reset to Default
              </button>

              {/* Keyboard shortcuts */}
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-white text-sm font-medium mb-2">Keyboard Shortcuts</h3>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>Alt + A: Toggle accessibility menu</div>
                  <div>Alt + S: Skip to content</div>
                  <div>Alt + H: Go to home</div>
                  <div>Tab: Navigate forward</div>
                  <div>Shift + Tab: Navigate backward</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsVisible(false)}
        />
      )}
    </>
  );
};

export default AccessibilityMenu;
