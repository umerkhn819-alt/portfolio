import { aboutSection, aboutSpotlight } from "../data/about";
import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { socials } from "../data/socials";

export function buildPortfolioContext() {
  const topSkills = [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 5)
    .map((s) => `${s.name} (${s.level}%)`)
    .join(", ");

  const projectLines = projects
    .map((p) => `- ${p.title}: ${p.description} [${p.tags.join(", ")}]`)
    .join("\n");

  const contactLines = socials.map((s) => `- ${s.label}: ${s.href}`).join("\n");

  return [
    "You are a concise portfolio assistant.",
    "Answer only about this developer and their work.",
    "",
    `About: ${aboutSection.title}`,
    `Summary: ${aboutSection.subtitle}`,
    `Current focus: ${aboutSpotlight.body}`,
    "",
    `Top skills: ${topSkills}`,
    "",
    "Projects:",
    projectLines,
    "",
    "Contact channels:",
    contactLines,
    "",
    "Tone: confident, helpful, concise.",
  ].join("\n");
}
