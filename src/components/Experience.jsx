import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "./styles";
import { web, mobile, creator } from "../assets";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// Real experience data based on GitHub portfolio
const experiences = [
  {
    title: "Full-Stack Developer & Data Scientist",
    company_name: "Independent Developer",
    icon: web,
    iconBg: "#383E56",
    date: "2024 - Present",
    points: [
      "Developed 15+ public repositories spanning healthcare, fintech, and AI/ML domains.",
      "Built production-ready applications like Medical Dashboard with 10K+ lines of code.",
      "Specialized in React 19.1.0, Python data science, and enterprise Java applications.",
      "Deployed scalable applications on Vercel with professional CI/CD practices.",
    ],
  },
  {
    title: "AI/ML Engineer",
    company_name: "Computer Vision Projects",
    icon: mobile,
    iconBg: "#E6DEDD",
    date: "2024 - Present",
    points: [
      "Developed Quality Control AI system for manufacturing defect detection.",
      "Implemented machine learning algorithms for movie recommendation systems.",
      "Created advanced analytics platforms for Olympic data and supply chain optimization.",
      "Applied computer vision techniques for real-time quality assessment.",
    ],
  },
  {
    title: "Healthcare Technology Developer",
    company_name: "Medical Applications",
    icon: creator,
    iconBg: "#383E56",
    date: "2025",
    points: [
      "Built comprehensive Medical Dashboard for dental center management.",
      "Implemented HIPAA-compliant patient management with role-based access control.",
      "Developed appointment scheduling system with calendar integration and file uploads.",
      "Created healthcare analytics dashboard with KPIs and mobile-responsive design.",
    ],
  },
  {
    title: "Financial Technology Developer",
    company_name: "Fintech Projects",
    icon: web,
    iconBg: "#E6DEDD",
    date: "2025",
    points: [
      "Developed Bond Analysis Dashboard for enterprise-grade financial analysis.",
      "Implemented risk assessment algorithms and financial modeling systems.",
      "Created professional trading interfaces with real-time market data processing.",
      "Applied statistical modeling for COVID-19 epidemiological data analysis.",
    ],
  },
];

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

const ExperienceWithSection = SectionWrapper(Experience, "work");
export default ExperienceWithSection;