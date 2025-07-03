import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from './styles';
import { SectionWrapper } from '../hoc';
import { education, skills, contact } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const EducationCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className='bg-black-200 p-6 rounded-3xl border border-purple-500/20'
  >
    <div className='flex items-start justify-between'>
      <div>
        <h3 className='text-white text-[24px] font-bold'>{education.degree}</h3>
        <p className='text-secondary text-[16px] font-semibold'>{education.major}</p>
        <p className='text-purple-400 text-[14px] mt-2'>{education.institution}</p>
        <p className='text-gray-400 text-[12px]'>{education.location}</p>
      </div>
      <div className='text-right'>
        <p className='text-white text-[14px] font-medium'>{education.duration}</p>
      </div>
    </div>
    
    <div className='mt-4'>
      <h4 className='text-white text-[14px] font-semibold mb-2'>Relevant Coursework:</h4>
      <div className='flex flex-wrap gap-2'>
        {education.relevantCourses.map((course, index) => (
          <span
            key={index}
            className='bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-[12px]'
          >
            {course}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const SkillCategory = ({ title, skills, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3, delay: delay * 0.1 }}
    className='bg-black-200 p-4 rounded-2xl border border-purple-500/20'
  >
    <h4 className='text-white text-[16px] font-bold mb-3'>{title}</h4>
    <div className='flex flex-wrap gap-2'>
      {skills && skills.length > 0 ? skills.map((skill, index) => (
        <span
          key={index}
          className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white px-3 py-1 rounded-full text-[12px] border border-purple-500/30'
        >
          {skill}
        </span>
      )) : (
        <p className='text-gray-400 text-[14px]'>No skills data available</p>
      )}
    </div>
  </motion.div>
);

const ContactInfo = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className='bg-black-200 p-6 rounded-3xl border border-purple-500/20'
  >
    <h3 className='text-white text-[20px] font-bold mb-4'>Contact Information</h3>
    <div className='space-y-3'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center'>
          <span className='text-purple-400 text-[12px]'>📧</span>
        </div>
        <div>
          <p className='text-gray-400 text-[12px]'>Email</p>
          <p className='text-white text-[14px]'>{contact.email}</p>
        </div>
      </div>
      
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center'>
          <span className='text-purple-400 text-[12px]'>📱</span>
        </div>
        <div>
          <p className='text-gray-400 text-[12px]'>Phone</p>
          <p className='text-white text-[14px]'>{contact.phone}</p>
        </div>
      </div>
      
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center'>
          <span className='text-purple-400 text-[12px]'>📍</span>
        </div>
        <div>
          <p className='text-gray-400 text-[12px]'>Location</p>
          <p className='text-white text-[14px]'>{contact.location}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Resume = () => {
  const [activeTab, setActiveTab] = useState('education');

  const tabs = [
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '💻' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Debug check for skills data
  React.useEffect(() => {
    if (!skills) {
      console.warn('Skills data is not available');
    }
  }, []);

  return (
    <section className='relative w-full'>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Professional Background
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Resume<span className='text-[#915EFF]'>.</span>
        </h2>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='flex justify-center mt-8 mb-10'
      >
        <div className='flex gap-2 bg-black-200 p-2 rounded-full border border-purple-500/20'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className='mt-8' style={{ minHeight: '400px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className='space-y-6'
            >
              <EducationCard />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='bg-black-200 p-6 rounded-3xl border border-purple-500/20'
              >
                <h3 className='text-white text-[20px] font-bold mb-4'>Key Achievements</h3>
                <div className='space-y-3'>
                  {education.achievements.map((achievement, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <div className='w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0' />
                      <p className='text-secondary text-[14px] leading-relaxed'>{achievement}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
            >
              <SkillCategory title="Programming Languages" skills={skills.programming} delay={0} />
              <SkillCategory title="Frameworks & Libraries" skills={skills.frameworks} delay={1} />
              <SkillCategory title="Databases" skills={skills.databases} delay={2} />
              <SkillCategory title="Tools & Technologies" skills={skills.tools} delay={3} />
              <SkillCategory title="Core Concepts" skills={skills.concepts} delay={4} />
              <SkillCategory title="Soft Skills" skills={skills.soft_skills} delay={5} />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className='max-w-md mx-auto'
            >
              <ContactInfo />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Download Resume Button */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className='flex justify-center mt-10'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2'
          onClick={() => window.open('/resume.pdf', '_blank')}
        >
          <span>📄</span>
          Download Resume
        </motion.button>
      </motion.div>
    </section>
  );
};

const ResumeWithSection = SectionWrapper(Resume, 'resume');
export default ResumeWithSection;
