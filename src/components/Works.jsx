import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "./styles";
import { github, carrent, tripguide } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Real projects data from Aakash's GitHub portfolio
const projects = [
  {
    name: "Medical Dashboard",
    description:
      "Comprehensive dental center management system with role-based access control, patient management, appointment scheduling, and analytics dashboard. Built with modern React and deployed on Vercel.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "healthcare",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/dvlaks/Medical-Dashboard",
    live_demo_link: "https://medical-dashboard-rho.vercel.app",
  },
  {
    name: "Quality Control AI System",
    description:
      "AI-powered manufacturing quality control system using computer vision and machine learning for defect detection. Features real-time processing and statistical analysis.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "ai-ml",
        color: "green-text-gradient",
      },
      {
        name: "computer-vision",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/dvlaks/Quality-control-and-defect-detection-system",
    live_demo_link: null,
  },
  {
    name: "Olympysis - Olympic Analytics",
    description:
      "Interactive Streamlit web application for comprehensive Olympic data analysis with historical visualizations, country performance comparisons, and athlete demographics insights.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "streamlit",
        color: "green-text-gradient",
      },
      {
        name: "data-science",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/dvlaks/-Olympysis--an-interactive-Streamlit-web-application-for-Olympic-data-analysis",
    live_demo_link: null,
  },
  {
    name: "Bond Analysis Dashboard",
    description:
      "Enterprise-grade financial analysis tool for bond market data analysis, risk assessment algorithms, and financial modeling with professional trading interface.",
    tags: [
      {
        name: "java",
        color: "blue-text-gradient",
      },
      {
        name: "fintech",
        color: "green-text-gradient",
      },
      {
        name: "analytics",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/dvlaks/Bond-Analysis-Dashboard",
    live_demo_link: null,
  },
  {
    name: "COVID-19 Data Analysis",
    description:
      "Comprehensive pandemic data analysis using T-SQL for epidemiological trend analysis, geographic data visualization, and statistical modeling of health data.",
    tags: [
      {
        name: "sql",
        color: "blue-text-gradient",
      },
      {
        name: "data-analysis",
        color: "green-text-gradient",
      },
      {
        name: "healthcare",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/dvlaks/COVID-19-Data-Analysis",
    live_demo_link: null,
  },
  {
    name: "Movie Recommender System",
    description:
      "Content-based recommendation engine using collaborative filtering algorithms, user preference analysis, and machine learning for personalized movie recommendations.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "machine-learning",
        color: "green-text-gradient",
      },
      {
        name: "recommendation",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/dvlaks/Movie_recommender",
    live_demo_link: null,
  },
];

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>

        {live_demo_link && (
          <div className='mt-4'>
            <button
              onClick={() => window.open(live_demo_link, "_blank")}
              className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 mr-3'
            >
              Live Demo
            </button>
          </div>
        )}
        
        {!live_demo_link && (
          <div className='mt-4'>
            <button
              onClick={() => window.open(source_code_link, "_blank")}
              className='border-2 border-purple-500 text-purple-500 px-4 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300'
            >
              View Code
            </button>
          </div>
        )}
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
