/**
 * @typedef {{ raw: string; command: string; args: string[] }} ParsedTerminalInput
 */

/**
 * @param {string} raw
 * @returns {ParsedTerminalInput}
 */
export function parseTerminalInput(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { raw: "", command: "", args: [] };
  }

  const parts = trimmed.split(/\s+/).filter(Boolean);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).map((a) => a.toLowerCase());

  return { raw: trimmed, command, args };
}
