import { motion } from "framer-motion";
import { styles } from "./styles";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`} style={{ zIndex: 2 }}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <motion.h1 
            className={`${styles.heroHeadText} text-white`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <span className='text-[#535C91]'>Aakash</span>
          </motion.h1>
          <motion.p 
            className={`${styles.heroSubText} mt-2 text-white-100 z-1`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Python & Full-Stack Developer & AI/ML Engineer <br className='sm:block hidden' /
          </motion.p>
          
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center"
              onClick={() => {
                const projectsElement = document.getElementById('projects');
                if (projectsElement) {
                  projectsElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // Fallback to works section
                  const worksElement = document.querySelector('[data-section="projects"]');
                  if (worksElement) {
                    worksElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-purple-500 text-purple-500 px-6 py-3 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all duration-300 text-center"
              onClick={() => {
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
