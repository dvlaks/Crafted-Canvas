import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs
} from "./assets";

export const navLinks = [
  {
    id: "about",
    title: "About"
  },
  {
    id: "work",
    title: "Experience"
  },
  {
    id: "tech",
    title: "Tech Stack"
  },
  {
    id: "resume",
    title: "Resume"
  },
  {
    id: "projects",
    title: "Projects"
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Developer",
    icon: web,
    description: "Building scalable web applications with modern frameworks"
  },
  {
    title: "Backend Engineer",
    icon: backend,
    description: "Designing robust APIs and microservices architecture"
  },
  {
    title: "AI/ML Engineer",
    icon: creator,
    description: "Developing intelligent systems and recommendation engines"
  },
  {
    title: "Data Analyst",
    icon: mobile,
    description: "Extracting insights from complex datasets"
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
    proficiency: 95,
    category: "frontend",
    description: "Semantic markup and accessibility"
  },
  {
    name: "CSS 3",
    icon: css,
    proficiency: 90,
    category: "frontend",
    description: "Modern CSS, animations, and responsive design"
  },
  {
    name: "JavaScript",
    icon: javascript,
    proficiency: 92,
    category: "frontend",
    description: "ES6+, async/await, and modern JS patterns"
  },
  {
    name: "TypeScript",
    icon: typescript,
    proficiency: 88,
    category: "frontend",
    description: "Type-safe JavaScript development"
  },
  {
    name: "React JS",
    icon: reactjs,
    proficiency: 94,
    category: "frontend",
    description: "Hooks, context, and component architecture"
  },
  {
    name: "Redux Toolkit",
    icon: redux,
    proficiency: 85,
    category: "frontend",
    description: "State management and Redux patterns"
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    proficiency: 88,
    category: "frontend",
    description: "Utility-first CSS framework"
  },
  {
    name: "Node JS",
    icon: nodejs,
    proficiency: 87,
    category: "backend",
    description: "Server-side JavaScript and APIs"
  },
  {
    name: "MongoDB",
    icon: mongodb,
    proficiency: 83,
    category: "backend",
    description: "NoSQL database and aggregation"
  },
  {
    name: "Docker",
    icon: docker,
    proficiency: 80,
    category: "tools",
    description: "Containerization and deployment"
  },
  {
    name: "Three JS",
    icon: threejs,
    proficiency: 78,
    category: "frontend",
    description: "3D graphics and WebGL"
  },
  {
    name: "git",
    icon: git,
    proficiency: 91,
    category: "tools",
    description: "Version control and collaboration"
  },
  {
    name: "figma",
    icon: figma,
    proficiency: 82,
    category: "tools",
    description: "UI/UX design and prototyping"
  },
];

// Work Experience Data
const experiences = [
  {
    title: "Software Development Intern",
    company_name: "Bluestock Fintech",
    icon: web, // You can add company logos later
    iconBg: "#383E56",
    date: "August 2024 - September 2024",
    points: [
      "Developed a robust IPO web application integrated with REST API, implementing automated tests that increased code coverage to 95%.",
      "Led a team of 5 engineers to optimize application performance, adapting to changing project requirements.",
      "Minimized downtime by 20%, enhancing system availability and boosting user retention by 15%.",
      "Ensured high reliability and performance through comprehensive testing and optimization strategies."
    ],
  },
  {
    title: "Web Development Intern",
    company_name: "Afame Technologies",
    icon: mobile,
    iconBg: "#E6DEDD",
    date: "May 2024 - July 2024",
    points: [
      "Collaborated with cross-functional teams to resolve 5+ critical bugs, increasing system stability by 30%.",
      "Conducted thorough code reviews and implemented best practices, improving code quality and maintainability by 20%.",
      "Reduced user-reported issues significantly through proactive debugging and testing.",
      "Worked remotely with distributed teams, demonstrating strong communication and collaboration skills."
    ],
  },
];

// Projects Data
const projects = [
  {
    name: "Bond Analyzer",
    description: "Enterprise-style full-stack web application for financial data analysis with dynamic dashboard capabilities.",
    tags: [
      { name: "Java", color: "blue-text-gradient" },
      { name: "Spring Boot", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
      { name: "AWS", color: "orange-text-gradient" },
    ],
    image: "", // Add project images
    source_code_link: "https://github.com/",
    live_demo_link: "",
    highlights: [
      "Implemented Spring Data JPA and Hibernate for CRUD operations",
      "Designed SOA architecture with Spring MVC controllers",
      "Integrated Spring Security for authentication and authorization",
      "Deployed on AWS with automated CI/CD pipeline"
    ]
  },
  {
    name: "Movie Recommender System",
    description: "Content-based recommendation system using machine learning algorithms to provide personalized movie suggestions.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Scikit-learn", color: "green-text-gradient" },
      { name: "Pandas", color: "pink-text-gradient" },
      { name: "NumPy", color: "orange-text-gradient" },
    ],
    image: "", // Add project images
    source_code_link: "https://github.com/",
    live_demo_link: "",
    highlights: [
      "Elevated user engagement by 35% through personalized recommendations",
      "Performed comprehensive data cleaning and feature engineering",
      "Reduced data inconsistencies by 40%",
      "Enhanced model precision through advanced preprocessing"
    ]
  },
  {
    name: "CloudyIQ Weather App",
    description: "Real-time weather application providing comprehensive weather information with intuitive user interface.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "EJS", color: "pink-text-gradient" },
      { name: "OpenWeather API", color: "orange-text-gradient" },
    ],
    image: "", // Add project images
    source_code_link: "https://github.com/",
    live_demo_link: "",
    highlights: [
      "Integrated OpenWeather Map API for real-time data",
      "Displays temperature, pressure, wind, and humidity",
      "Responsive design for optimal user experience",
      "Clean and intuitive user interface"
    ]
  },
];

// Professional Skills
const skills = {
  programming: ["Java", "Python", "JavaScript", "TypeScript", "C++", "SQL"],
  frameworks: ["Spring Boot", "React.js", "Node.js", "NestJS", "Express.js"],
  databases: ["PostgreSQL", "MongoDB", "MySQL", "Oracle", "Sybase"],
  tools: ["Git", "Docker", "AWS", "Figma", "Postman", "Jupyter"],
  concepts: ["OOP", "DBMS", "Data Structures", "Algorithms", "REST APIs", "SOA"],
  soft_skills: ["Team Leadership", "Project Management", "Technical Troubleshooting", "Communication"]
};

// Education Information
const education = {
  degree: "Bachelor of Technology",
  major: "Industrial and Production Engineering",
  institution: "Dr. B. R. Ambedkar National Institute of Technology (NIT)",
  location: "Jalandhar, India",
  duration: "December 2021 - July 2025",
  relevantCourses: ["Data Analysis", "Artificial Intelligence", "Data Structures", "Algorithms"],
  achievements: [
    "Specialized in Data Analysis and AI/ML applications",
    "Strong foundation in programming and software development",
    "Active participant in technical projects and competitions"
  ]
};

// Contact Information
const contact = {
  email: "kumawataksh112@gmail.com",
  phone: "+91-8875668848",
  linkedin: "https://www.linkedin.com/in/aakash-verma",
  github: "https://github.com/dvlaks", // Updated with your actual GitHub
  location: "Jalandhar, India"
};

// Additional portfolio information
const portfolioInfo = {
  github: "https://github.com/dvlaks",
  totalProjects: "15+",
  languages: "6+",
  domains: "8+",
  yearsActive: "2+",
  featuredProject: {
    name: "Bond Analyzer",
    url: "https://bond-analyzer-demo.vercel.app"
  },
  achievements: {
    bugResolution: "5+ critical bugs resolved",
    codeQuality: "20% improvement in maintainability",
    testCoverage: "95% code coverage achieved",
    userEngagement: "35% increase in user engagement",
    systemStability: "30% reduction in user-reported issues"
  },
  techStats: {
    totalTechnologies: technologies.length,
    frontendTechs: technologies.filter(tech => tech.category === 'frontend').length,
    backendTechs: technologies.filter(tech => tech.category === 'backend').length,
    toolsTechs: technologies.filter(tech => tech.category === 'tools').length,
    averageProficiency: Math.round(
      technologies.reduce((sum, tech) => sum + tech.proficiency, 0) / technologies.length
    )
  }
};

export { 
  services, 
  technologies, 
  experiences, 
  projects, 
  skills, 
  education, 
  contact, 
  portfolioInfo 
};