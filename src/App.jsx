import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Hero, Navbar, Tech, Works, Resume, StarsCanvas, Three, MouseTrail, ThemeToggle, ScrollProgress } from "./components";
import PerformanceMonitor from "./components/PerformanceMonitor";
import AccessibilityMenu from "./components/AccessibilityMenu";
import { Suspense } from "react";
import { motion } from "framer-motion";

const App = () => {
  return (
    <BrowserRouter>
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
            className='relative z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            <Suspense fallback={<div className="h-screen bg-primary"></div>}>
              <Three />
            </Suspense>
            <Hero />
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
  );
}

export default App;



