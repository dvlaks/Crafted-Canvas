import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "./styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, description }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-[#1B1A55] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-[#9EC8B9] text-[20px] font-bold text-center'>
          {title}
        </h3>
        
        {description && (
          <p className='text-secondary text-[14px] text-center mt-2'>
            {description}
          </p>
        )}
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a passionate Software Engineer and AI/ML enthusiast currently pursuing B.Tech in Industrial and Production Engineering at NIT Jalandhar. With hands-on experience from internships at Bluestock Fintech and Afame Technologies, I've developed robust web applications, led engineering teams, and delivered high-performance solutions.
        <br /><br />
        My expertise spans full-stack development with Java Spring Boot, React.js, and modern databases like PostgreSQL and MongoDB. I've successfully increased code coverage to 95%, improved system stability by 30%, and enhanced user engagement by 35% through innovative ML-powered recommendation systems.
        <br /><br />
        I'm skilled in developing enterprise-grade applications with SOA architecture, REST APIs, and cloud deployment on AWS. My projects include a comprehensive Bond Analyzer for financial data analysis, an intelligent Movie Recommender System using machine learning, and real-time weather applications with seamless API integrations.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

    </>
  );
};

const AboutWithSection = SectionWrapper(About, "about");
export default AboutWithSection;