class Logger {
  constructor() {
    this.isDevelopment = import.meta.env.DEV
    this.apiEndpoint = import.meta.env.VITE_ERROR_LOGGING_ENDPOINT
  }

  log(level, message, extra = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...extra
    }

    // Always log to console in development
    if (this.isDevelopment) {
      console[level](message, extra)
    }

    // Send to external service in production
    if (!this.isDevelopment && this.apiEndpoint) {
      this.sendToExternalService(logEntry)
    }

    // Store in localStorage for debugging
    this.storeLocally(logEntry)
  }

  error(message, error = {}) {
    this.log('error', message, {
      stack: error.stack,
      name: error.name,
      message: error.message,
      componentStack: error.componentStack
    })
  }

  warn(message, extra = {}) {
    this.log('warn', message, extra)
  }

  info(message, extra = {}) {
    this.log('info', message, extra)
  }

  debug(message, extra = {}) {
    if (this.isDevelopment) {
      this.log('debug', message, extra)
    }
  }

  performance(metric, value, extra = {}) {
    this.log('performance', `${metric}: ${value}`, extra)
  }

  async sendToExternalService(logEntry) {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logEntry)
      })
    } catch (error) {
      console.error('Failed to send log to external service:', error)
    }
  }

  storeLocally(logEntry) {
    try {
      const logs = JSON.parse(localStorage.getItem('app-logs') || '[]')
      logs.push(logEntry)
      
      // Keep only last 100 logs
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100)
      }
      
      localStorage.setItem('app-logs', JSON.stringify(logs))
    } catch (error) {
      console.error('Failed to store log locally:', error)
    }
  }

  getLogs() {
    try {
      return JSON.parse(localStorage.getItem('app-logs') || '[]')
    } catch (error) {
      console.error('Failed to retrieve logs:', error)
      return []
    }
  }

  clearLogs() {
    localStorage.removeItem('app-logs')
  }
}

export const logger = new Logger()
