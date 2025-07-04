// Environment configuration
export const config = {
  // API endpoints
  emailJS: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },
  
  // Analytics
  analytics: {
    vercelAnalytics: import.meta.env.VITE_VERCEL_ANALYTICS_ID,
    googleAnalytics: import.meta.env.VITE_GA_MEASUREMENT_ID,
  },
  
  // Error monitoring
  errorLogging: {
    endpoint: import.meta.env.VITE_ERROR_LOGGING_ENDPOINT,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  },
  
  // Feature flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableErrorLogging: import.meta.env.VITE_ENABLE_ERROR_LOGGING === 'true',
    enablePerformanceMonitoring: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
    enableAccessibilityTools: import.meta.env.VITE_ENABLE_ACCESSIBILITY_TOOLS === 'true',
  },
  
  // Performance thresholds
  performance: {
    maxLoadTime: parseInt(import.meta.env.VITE_MAX_LOAD_TIME) || 3000,
    minFrameRate: parseInt(import.meta.env.VITE_MIN_FRAME_RATE) || 30,
    maxMemoryUsage: parseInt(import.meta.env.VITE_MAX_MEMORY_USAGE) || 100, // MB
  },
  
  // Development settings
  dev: {
    enableDebugMode: import.meta.env.DEV,
    showPerformanceStats: import.meta.env.VITE_SHOW_PERFORMANCE_STATS === 'true',
    enableTestMode: import.meta.env.VITE_TEST_MODE === 'true',
  },
  
  // Social links
  social: {
    github: 'https://github.com/dvlaks',
    linkedin: 'https://www.linkedin.com/in/aakash-verma-669062269',
    email: 'kumawataksh112@gmail.com',
    portfolio: 'https://crafted-canvas.vercel.app',
  },
  
  // App metadata
  app: {
    name: 'Aakash Verma Portfolio',
    version: '2.0.0',
    description: 'Full-Stack Developer & AI/ML Engineer Portfolio',
    url: 'https://crafted-canvas.vercel.app',
  }
}

// Validation function
export const validateConfig = () => {
  const errors = []
  
  if (config.features.enableAnalytics && !config.analytics.vercelAnalytics) {
    errors.push('Vercel Analytics ID is required when analytics is enabled')
  }
  
  if (!config.emailJS.serviceId || !config.emailJS.templateId || !config.emailJS.publicKey) {
    errors.push('EmailJS configuration is incomplete')
  }
  
  if (errors.length > 0) {
    console.warn('Configuration validation failed:', errors)
    return false
  }
  
  return true
}

export default config
