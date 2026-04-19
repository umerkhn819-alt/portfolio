import { parseTerminalInput } from "./parseInput.js";
import {
  buildHelpOutput,
  buildAboutOutput,
  buildProjectsOutput,
  buildContactOutput,
} from "./buildOutput.js";

/** @typedef {{ kind: "noop" }} NoopResult */
/** @typedef {{ kind: "clear" }} ClearResult */
/** @typedef {{ kind: "lines"; lines: string[] }} LinesResult */

/** @typedef {NoopResult | ClearResult | LinesResult} TerminalCommandResult */

/**
 * @param {string} raw
 * @returns {TerminalCommandResult}
 */
export function resolveTerminalCommand(raw) {
  const { command, raw: normalized } = parseTerminalInput(raw);

  if (!command) {
    return { kind: "noop" };
  }

  switch (command) {
    case "help":
      return { kind: "lines", lines: buildHelpOutput() };
    case "about":
      return { kind: "lines", lines: buildAboutOutput() };
    case "projects":
      return { kind: "lines", lines: buildProjectsOutput() };
    case "contact":
      return { kind: "lines", lines: buildContactOutput() };
    case "clear":
      return { kind: "clear" };
    default:
      return {
        kind: "lines",
        lines: [
          `zsh: command not found: ${normalized}`,
          "Type `help` for a list of commands.",
        ],
      };
  }
}
