/** Section copy for the terminal block */
export const terminalSection = {
  eyebrow: "CLI",
  title: "Interactive shell",
  subtitle:
    "Arrow Up / Down for history · Enter to run · output streams character by character.",
};

/** Shown as the first system line when the terminal mounts */
export const terminalMotd = [
  "Portfolio shell v1.0 — zsh emulation (light)",
  "Type `help` for available commands.",
].join("\n");

/** After `clear` */
export const terminalClearMessage = "Screen cleared.";

/** @typedef {{ name: string; summary: string }} TerminalCommandMeta */

/** @type {TerminalCommandMeta[]} */
export const terminalCommandsMeta = [
  { name: "help", summary: "List commands and usage" },
  { name: "about", summary: "Show background and focus areas" },
  { name: "projects", summary: "List featured work" },
  { name: "contact", summary: "Show ways to reach out" },
  { name: "clear", summary: "Clear the terminal buffer" },
];
