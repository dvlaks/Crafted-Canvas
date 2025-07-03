import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "./styles";

const TechBall = ({ technology, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={!isMobile ? { scale: 1.1, y: -5 } : {}}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsHovered(true)}
      onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 2000)}
    >
      <div className={`${isMobile ? 'w-20 h-20' : 'w-28 h-28'} relative`}>
        <BallCanvas icon={technology.icon} />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10"
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.3 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Technology name label */}
      <motion.div
        className={`absolute ${isMobile ? '-bottom-8' : '-bottom-10'} left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 10 
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-purple-500/40 shadow-lg">
          <p className={`text-white ${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{technology.name}</p>
          {technology.proficiency && (
            <div className="mt-1 flex items-center gap-1">
              <div className="flex-1 bg-gray-700 rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${technology.proficiency}%` }}
                />
              </div>
              <span className="text-xs text-gray-300">{technology.proficiency}%</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Tech = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [filter, setFilter] = useState("all");

  const categories = {
    all: "All Technologies",
    frontend: "Frontend",
    backend: "Backend", 
    tools: "Tools & Others"
  };

  const getCategory = (techName) => {
    // Use the category from constants if available, otherwise fallback to logic
    const tech = technologies.find(t => t.name === techName);
    if (tech && tech.category) {
      return tech.category;
    }
    
    // Fallback logic
    const frontendTechs = ["HTML 5", "CSS 3", "JavaScript", "React JS", "Redux Toolkit", "Tailwind CSS", "Three JS"];
    const backendTechs = ["Node JS", "MongoDB"];
    const toolsTechs = ["git", "figma"];
    
    if (frontendTechs.includes(techName)) return "frontend";
    if (backendTechs.includes(techName)) return "backend";
    if (toolsTechs.includes(techName)) return "tools";
    return "frontend";
  };

  const filteredTechnologies = technologies.filter(tech => 
    filter === "all" || getCategory(tech.name) === filter
  );

  return (
    <section className="relative" ref={ref}>
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`${styles.sectionSubText} text-center`}>
            Technologies I work with
          </p>
          <h2 className={`${styles.sectionHeadText} text-center`}>
            Technologies<span className="text-[#915EFF]">.</span>
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.entries(categories).map(([key, label]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                filter === key
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
              }`}
              onClick={() => setFilter(key)}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <motion.div 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6 sm:gap-10 pb-8 justify-items-center"
          layout
          transition={{ duration: 0.5 }}
        >
          {filteredTechnologies.map((technology, index) => (
            <TechBall 
              key={technology.name}
              technology={technology}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "tech");
