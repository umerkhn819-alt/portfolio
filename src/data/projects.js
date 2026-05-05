import { PROJECT_DATA } from "./projectsDetail.js";

/** @typedef {{ id: string; title: string; description: string; tags: string[]; href: string; image: string; status: "completed" | "in-progress" | "coming-soon" }} Project */

export const projectsSection = {
  eyebrow: "Projects",
  title: "Projects",
  subtitle:
    "AI-powered applications, interactive systems, and full-stack solutions.",
};

/** Featured projects — single source: [projectsDetail.js](projectsDetail.js) (same list as the 3D carousel). */
/** @type {Project[]} */
export const projects = PROJECT_DATA.map((p) => ({
  id: String(p.id),
  title: p.title,
  description: p.desc,
  tags: p.tag.split("/").map((s) => s.trim()).filter(Boolean),
  href: p.github || "#",
  image: p.image,
  status: "completed",
}));
