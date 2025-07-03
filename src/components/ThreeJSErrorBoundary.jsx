import React from 'react';
import { motion } from 'framer-motion';

class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ThreeJS Error Boundary caught an error:', error, errorInfo);
    
    // Send error to monitoring service (in production)
    if (process.env.NODE_ENV === 'production') {
      // You can integrate with services like Sentry here
      this.logErrorToService(error, errorInfo);
    }
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  logErrorToService = (error, errorInfo) => {
    // Integration point for error monitoring services
    // Example: Sentry.captureException(error, { extra: errorInfo });
    
    // For now, just store in localStorage for analysis
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      const existingErrors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
      existingErrors.push(errorData);
      
      // Keep only last 10 errors
      if (existingErrors.length > 10) {
        existingErrors.splice(0, existingErrors.length - 10);
      }
      
      localStorage.setItem('portfolio_errors', JSON.stringify(existingErrors));
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI for 3D components
      return (
        <motion.div 
          className="flex flex-col items-center justify-center h-full min-h-[200px] p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🔧
          </motion.div>
          <h3 className="text-lg font-semibold text-white mb-2">
            3D Component Unavailable
          </h3>
          <p className="text-gray-300 text-sm text-center max-w-xs">
            {this.props.fallbackMessage || 
             "This 3D feature requires WebGL support. Please try updating your browser or enabling hardware acceleration."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </motion.button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-xs text-gray-400">
              <summary className="cursor-pointer">Error Details (Dev Mode)</summary>
              <pre className="mt-2 p-2 bg-black/50 rounded text-red-300 overflow-auto max-w-xs">
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ThreeJSErrorBoundary;
