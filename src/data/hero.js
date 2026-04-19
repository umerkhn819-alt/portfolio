/**
 * Headline is split so the accent span can stay in JSX with the same classes.
 * @typedef {{ type: "text" | "accent"; value: string }} HeadlinePart
 */

export const heroContent = {
  eyebrow: "AI Engineer • Full Stack Developer ",
  name: "Muhammad Umer Khan",
  role: "Building systems where AI meets real-world applications.",
  intro: "I build AI-driven applications with modern web systems, combining machine learning with clean architecture and interactive user experiences.",
  /** @type {HeadlinePart[]} */
  headlineParts: [
    { type: "text", value: "AI & Software Engineer "},
    { type: "accent", value: "focused-on " },
    { type: "text", value: "  intelligent systems." },
  ],
  subcopy:
    "Software engineer focused on AI integration, full-stack development, and dynamic UI systems. I design applications that are functional, intelligent, and interactive.",
  techStack: ["React", "Python", "Node.js", "Three.js", "GSAP", "TensorFlow", "Pandas", "PyTorch", "FastAPI", "Scikit-learn", "SQL", "Docker"],
  primaryCta: {
    label: "Explore My Work",
    scrollToId: "projects",
  },
  secondaryCta: {
    label: "Let's Connect",
    href: "#contact",
  },
  scrollHint: {
    label: "Scroll",
    ariaLabel: "Scroll to about",
    scrollToId: "about",
  },
};
