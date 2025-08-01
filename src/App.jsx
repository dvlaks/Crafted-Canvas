import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Hero, Navbar, Tech, Works, Resume, StarsCanvas, Three, MouseTrail, ThemeToggle, ScrollProgress, MobileLoadingScreen } from "./components";
import PerformanceMonitor from "./components/PerformanceMonitor";
import AccessibilityMenu from "./components/AccessibilityMenu";
import { motion } from "framer-motion";

// Error boundary for the entire app
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400">Please refresh the page</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary"
              aria-label="Refresh page"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate loading time (adjust based on your needs)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 2000 : 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <MobileLoadingScreen isVisible={isLoading} />
        <div className='relative z-0 bg-primary'>
          <AccessibilityMenu />
          <ScrollProgress />
          <MouseTrail />
          <ThemeToggle />
          <PerformanceMonitor />
          
          {/* Background stars for the entire app */}
          <div className='fixed inset-0 z-[-1]'>
            <Suspense fallback={<div className="fixed inset-0 bg-primary"></div>}>
              <StarsCanvas />
            </Suspense>
          </div>
          
          <main id="main-content" role="main">
            <motion.div 
              className='relative z-10'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Navbar />
              <div className="relative">
                <Suspense fallback={<div className="h-screen bg-primary flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
                  <Three />
                </Suspense>
                <Hero />
              </div>
            </motion.div>
            
            <About />
            <Experience />
            <Tech />
            <Resume />
            <Works />
            <Contact />
          </main>
        </div>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export default App;



