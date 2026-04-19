import { useCallback, useEffect, useRef, useState } from "react";
import { resolveTerminalCommand } from "../../../lib/terminal/resolveCommand.js";
import {
  terminalMotd,
  terminalClearMessage,
} from "../../../data/terminal.js";

const TYPE_MS = 16;

function createLineId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `ln-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * @typedef {{ id: string; kind: "user" | "stdout"; text: string }} TerminalLine */

/**
 * @typedef {{ id: string; full: string; pos: number } | null} TypingState
 */

export function useTerminalSession() {
  /** @type {import("react").MutableRefObject<string[]>} */
  const commandHistoryRef = useRef([]);
  /** @type {import("react").MutableRefObject<number | null>} */
  const historyOffsetRef = useRef(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const [lines, setLines] = useState(
    /** @returns {TerminalLine[]} */ () => [
      { id: createLineId(), kind: "stdout", text: terminalMotd },
    ]
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(/** @type {TypingState} */ (null));

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, typing, scrollToBottom]);

  useEffect(() => {
    if (!typing) return;
    if (typing.pos >= typing.full.length) {
      setLines((prev) => [
        ...prev,
        { id: typing.id, kind: "stdout", text: typing.full },
      ]);
      setTyping(null);
      return;
    }
    const t = window.setTimeout(() => {
      setTyping((cur) => (cur ? { ...cur, pos: cur.pos + 1 } : cur));
    }, TYPE_MS);
    return () => window.clearTimeout(t);
  }, [typing]);

  const runCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      if (!trimmed || typing) return;

      historyOffsetRef.current = null;
      commandHistoryRef.current.push(trimmed);

      setLines((prev) => [
        ...prev,
        { id: createLineId(), kind: "user", text: trimmed },
      ]);
      setInput("");

      const result = resolveTerminalCommand(trimmed);

      if (result.kind === "noop") {
        return;
      }

      if (result.kind === "clear") {
        setLines([
          {
            id: createLineId(),
            kind: "stdout",
            text: `${terminalClearMessage}\n\n${terminalMotd}`,
          },
        ]);
        return;
      }

      const full = result.lines.join("\n");
      setTyping({
        id: createLineId(),
        full,
        pos: 0,
      });
    },
    [typing]
  );

  const onChangeInput = useCallback((value) => {
    historyOffsetRef.current = null;
    setInput(value);
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      const history = commandHistoryRef.current;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!history.length || typing) return;
        const next =
          Math.min((historyOffsetRef.current ?? -1) + 1, history.length - 1);
        historyOffsetRef.current = next;
        const idx = history.length - 1 - next;
        setInput(history[idx] ?? "");
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyOffsetRef.current == null || typing) return;
        const next = historyOffsetRef.current - 1;
        if (next < 0) {
          historyOffsetRef.current = null;
          setInput("");
          return;
        }
        historyOffsetRef.current = next;
        const idx = history.length - 1 - next;
        setInput(history[idx] ?? "");
      }
    },
    [typing]
  );

  return {
    lines,
    input,
    setInput: onChangeInput,
    typing,
    runCommand,
    onKeyDown,
    scrollRef,
    inputRef,
    isBusy: Boolean(typing),
  };
}
