/** @typedef {{ id: string; title: string; description: string; tags: string[]; href: string; image: string; status: "completed" | "in-progress" | "coming-soon" }} Project */

export const projectsSection = {
  eyebrow: "Projects",
  title: "Projects",
  subtitle:
    "AI-powered applications, interactive systems, and full-stack solutions.",
};

/** @type {Project[]} */
export const projects = [
  {
    id: "atlas-dashboard",
    title: "Atlas Dashboard",
    description:
      "Real-time analytics workspace with role-based access and exportable reports.",
    tags: ["React", "Vite", "Tailwind"],
    href: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    status: "completed",
  },
  {
    id: "northwind-api",
    title: "Northwind API",
    description:
      "Modular REST layer with validation, observability hooks, and typed clients.",
    tags: ["Node", "OpenAPI", "Postgres"],
    href: "#",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    status: "completed",
  },
  {
    id: "lumen-design-system",
    title: "Lumen Design System",
    description:
      "Accessible component library with tokens, docs, and motion primitives.",
    tags: ["Storybook", "A11y", "Motion"],
    href: "#",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    status: "in-progress",
  },
  {
    id: "pulse-mobile",
    title: "Pulse Mobile",
    description:
      "Cross-platform companion app with offline-first sync and push workflows.",
    tags: ["React Native", "Redux", "CI"],
    href: "#",
    image: "https://images.unsplash.com/photo-1512941691920-25bea6b8cd41?w=600&h=400&fit=crop",
    status: "coming-soon",
  },
];
