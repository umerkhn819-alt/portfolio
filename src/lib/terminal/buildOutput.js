import { aboutSection, aboutHighlights, aboutSpotlight } from "../../data/about";
import { projects, projectsSection } from "../../data/projects";
import { contactSection, contactForm } from "../../data/contact";
import { socials } from "../../data/socials";
import { terminalCommandsMeta } from "../../data/terminal";

const pad = (s, n) => s + " ".repeat(Math.max(0, n - s.length));

/**
 * @returns {string[]}
 */
export function buildHelpOutput() {
  const nameWidth =
    terminalCommandsMeta.reduce((m, c) => Math.max(m, c.name.length), 0) + 2;

  const header = [
    "COMMAND        SUMMARY",
    `${"-".repeat(nameWidth + 24)}`,
  ];

  const rows = terminalCommandsMeta.map((c) => {
    const left = pad(c.name, nameWidth);
    return `${left}${c.summary}`;
  });

  return [...header, ...rows, "", "Tip: commands are case-insensitive."];
}

/**
 * @returns {string[]}
 */
export function buildAboutOutput() {
  const lines = [
    aboutSection.title,
    "",
    aboutSection.subtitle,
    "",
    "Highlights:",
    ...aboutHighlights.map((h) => `  • ${h.title}: ${h.body}`),
    "",
    `${aboutSpotlight.eyebrow}: ${aboutSpotlight.body}`,
    "",
    "Focus:",
    ...aboutSpotlight.bullets.map((b) => `  - ${b}`),
  ];
  return lines;
}

/**
 * @returns {string[]}
 */
export function buildProjectsOutput() {
  const lines = [
    projectsSection.title,
    "",
    ...projects.flatMap((p, i) => {
      const n = `${i + 1}. ${p.title}`;
      const d = `   ${p.description}`;
      const t = `   tags: ${p.tags.join(", ")}`;
      return [n, d, t, ""];
    }),
    "Use the Projects section for live cards and links.",
  ];
  return lines;
}

/**
 * @returns {string[]}
 */
export function buildContactOutput() {
  const mail = socials.find((s) => s.href.startsWith("mailto:"));

  return [
    contactSection.title,
    "",
    contactSection.subtitle,
    "",
    "Channels:",
    ...socials.map((s) => `  ${pad(s.label + ":", 12)} ${s.href}`),
    "",
    mail ? `Preferred: ${mail.href}` : "",
    "",
    `Form: ${contactForm.submit.idleLabel} (web UI below).`,
  ].filter(Boolean);
}
