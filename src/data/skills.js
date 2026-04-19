/** @typedef {{ id: string; name: string; level: number }} Skill */

export const skillsSection = {
  eyebrow: "Skills",
  title: "Tech Stack",
  subtitle:
    "Technologies I use to build intelligent, scalable applications.",
};

/** @type {Skill[]} */
export const skills = [
  { id: "python", name: "Python", level: 85 },
  { id: "ai-ml", name: "AI & Machine Learning", level: 82 },
  { id: "react", name: "React", level: 92 },
  { id: "nodejs", name: "Node.js", level: 88 },
  { id: "threejs", name: "Three.js & 3D", level: 86 },
  { id: "system-design", name: "System Design", level: 80 },
  { id: "api-integration", name: "API Integration", level: 90 },
  { id: "testing", name: "Testing & QA", level: 78 },
];
