import { aboutSection, aboutSpotlight } from "../data/about";
import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { socials } from "../data/socials";

function formatSkills() {
  return skills
    .sort((a, b) => b.level - a.level)
    .map((s) => `${s.name} (${s.level}%)`)
    .join(", ");
}

function formatProjects() {
  return projects
    .map((p) => `• ${p.title}: ${p.description}`)
    .join("\n");
}

function formatContact() {
  return socials.map((s) => `${s.label}: ${s.href}`).join("\n");
}

export function buildFallbackResponse(question) {
  const q = question.toLowerCase();

  if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
    return `Key skills include ${formatSkills()}.`;
  }

  if (q.includes("project") || q.includes("work") || q.includes("build")) {
    return `Here are highlighted projects:\n${formatProjects()}`;
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("reach")) {
    return `You can get in touch via:\n${formatContact()}`;
  }

  if (q.includes("about") || q.includes("who") || q.includes("background")) {
    return `${aboutSection.subtitle}\n\nCurrent focus: ${aboutSpotlight.body}`;
  }

  return [
    "I can help with portfolio questions.",
    "Try asking about skills, projects, experience, or contact details.",
  ].join(" ");
}
