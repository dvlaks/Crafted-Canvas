// Error logging and monitoring utility
class ErrorLogger {
  constructor() {
    this.errors = [];
    this.maxErrors = 50;
    this.setupGlobalErrorHandlers();
  }

  setupGlobalErrorHandlers() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'unhandled_promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    });

    // WebGL context lost handler
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', (event) => {
        this.logError({
          type: 'webgl_context_lost',
          message: 'WebGL context was lost',
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        });
      });
    }
  }

  logError(errorData) {
    // Add unique ID
    errorData.id = Date.now() + Math.random().toString(36).substr(2, 9);
    
    // Add to internal array
    this.errors.unshift(errorData);
    
    // Keep only max errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error logged:', errorData);
    }

    // Store in localStorage
    this.saveToLocalStorage();

    // In production, you would send to error monitoring service
    if (import.meta.env.PROD) {
      this.sendToMonitoringService(errorData);
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('portfolio_error_logs', JSON.stringify(this.errors));
    } catch (e) {
      console.warn('Could not save errors to localStorage:', e);
    }
  }

  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('portfolio_error_logs');
      if (stored) {
        this.errors = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load errors from localStorage:', e);
    }
  }

  sendToMonitoringService(errorData) {
    // Integration point for services like Sentry, LogRocket, etc.
    // For now, just prepare the data structure
    const payload = {
      ...errorData,
      environment: import.meta.env.MODE,
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',
      tags: {
        component: 'portfolio',
        browser: this.getBrowserInfo(),
        device: this.getDeviceInfo()
      }
    };

    // You would send this to your monitoring service
    console.log('Would send to monitoring service:', payload);
  }

  getBrowserInfo() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  getDeviceInfo() {
    const ua = navigator.userAgent;
    if (/tablet|ipad/i.test(ua)) return 'tablet';
    if (/mobile|phone/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
    this.saveToLocalStorage();
  }

  getErrorStats() {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;

    return {
      total: this.errors.length,
      lastHour: this.errors.filter(err => (now - new Date(err.timestamp).getTime()) < oneHour).length,
      lastDay: this.errors.filter(err => (now - new Date(err.timestamp).getTime()) < oneDay).length,
      byType: this.errors.reduce((acc, err) => {
        acc[err.type] = (acc[err.type] || 0) + 1;
        return acc;
      }, {})
    };
  }
}

// Create global instance
const errorLogger = new ErrorLogger();
errorLogger.loadFromLocalStorage();

export default errorLogger;
