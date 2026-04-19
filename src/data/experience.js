/** @typedef {{ id: string; company: string; position: string; duration: string; description: string; highlights: string[] }} Experience */

export const experienceSection = {
  eyebrow: "Experience",
  title: "Professional Journey",
  subtitle: "Building intelligent systems across AI, full-stack development, and interactive design.",
};

/** @type {Experience[]} */
export const experiences = [
  {
    id: "senior-ai-engineer",
    company: "Tech Innovations Lab",
    position: "Senior AI Engineer",
    duration: "2023 - Present",
    description: "Leading AI/ML projects and architecting scalable solutions for enterprise clients.",
    highlights: [
      "Designed and deployed machine learning models serving 1M+ daily users",
      "Built full-stack AI applications with React, Python, and TensorFlow",
      "Mentored junior engineers on AI best practices and system design",
      "Reduced inference latency by 60% through optimization strategies",
    ],
  },
  {
    id: "fullstack-developer",
    company: "Digital Solutions Inc.",
    position: "Full Stack Developer",
    duration: "2021 - 2023",
    description: "Developed end-to-end web applications with focus on AI integration and performance.",
    highlights: [
      "Built 15+ interactive web applications using React and Node.js",
      "Integrated machine learning pipelines with production systems",
      "Implemented real-time data visualization dashboards",
      "Achieved 98% API uptime with comprehensive monitoring",
    ],
  },
  {
    id: "junior-developer",
    company: "StartupHub",
    position: "Junior Developer",
    duration: "2020 - 2021",
    description: "Started career building responsive web applications and learning full-stack development.",
    highlights: [
      "Developed responsive web interfaces using React and Tailwind CSS",
      "Created RESTful APIs using Node.js and Express",
      "Collaborated with design team to implement UI/UX improvements",
      "Learned and applied best practices in code quality and testing",
    ],
  },
];
