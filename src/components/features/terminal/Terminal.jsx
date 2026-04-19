import { useEffect } from "react";
import { useTerminalSession } from "./useTerminalSession.js";

export function Terminal() {
  const {
    lines,
    input,
    setInput,
    typing,
    runCommand,
    onKeyDown,
    scrollRef,
    inputRef,
    isBusy,
  } = useTerminalSession();

  useEffect(() => {
    if (!isBusy) {
      inputRef.current?.focus();
    }
  }, [isBusy, inputRef]);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-300 dark:border-border-subtle bg-white dark:bg-[#07080d] font-mono text-sm text-gray-700 dark:text-zinc-300 shadow-2xl shadow-gray-400/20 dark:shadow-black/40 ring-1 ring-gray-300/20 dark:ring-white/[0.04] transition-colors duration-300"
      aria-label="Interactive portfolio terminal"
    >
      <div className="flex items-center gap-2 border-b border-gray-300 dark:border-white/[0.06] bg-gray-100 dark:bg-[#0b0d14] px-4 py-2.5 transition-colors duration-300">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" aria-hidden />
        <span className="ml-2 text-[11px] font-medium uppercase tracking-widest text-gray-500 dark:text-zinc-500">
          zsh — portfolio
        </span>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[min(420px,55vh)] min-h-[280px] space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {lines.map((line) => (
          <TerminalBlock key={line.id} line={line} />
        ))}

        {typing ? (
          <div className="whitespace-pre-wrap text-gray-700 dark:text-zinc-300">
            <span className="text-emerald-600 dark:text-emerald-400/90">→ </span>
            {typing.full.slice(0, typing.pos)}
            <span className="inline-block w-2 animate-pulse text-emerald-600 dark:text-emerald-400">▍</span>
          </div>
        ) : null}
      </div>

      <form
        className="flex items-center gap-2 border-t border-gray-300 dark:border-white/[0.06] bg-gray-50 dark:bg-[#080910] px-3 py-3 transition-colors duration-300"
        onSubmit={(e) => {
          e.preventDefault();
          runCommand(input);
        }}
      >
        <span className="shrink-0 text-emerald-600 dark:text-emerald-400/90">guest</span>
        <span className="shrink-0 text-gray-400 dark:text-zinc-500">@</span>
        <span className="shrink-0 text-cyan-600 dark:text-cyan-400/80">portfolio</span>
        <span className="shrink-0 text-gray-400 dark:text-zinc-500">:</span>
        <span className="shrink-0 text-violet-600 dark:text-violet-300/90">~</span>
        <span className="shrink-0 pr-1 text-gray-400 dark:text-zinc-500">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-busy={isBusy}
          disabled={isBusy}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-[15px] leading-relaxed text-gray-900 dark:text-zinc-100 outline-none placeholder:text-gray-400 dark:placeholder:text-zinc-600 disabled:opacity-50"
          placeholder={isBusy ? "Running…" : "Type a command…"}
        />
      </form>
    </div>
  );
}

/** @param {{ line: { id: string; kind: "user" | "stdout"; text: string } }} props */
function TerminalBlock({ line }) {
  if (line.kind === "user") {
    return (
      <div className="whitespace-pre-wrap">
        <span className="text-emerald-600 dark:text-emerald-400/90">guest@portfolio</span>
        <span className="text-gray-400 dark:text-zinc-500">:~$ </span>
        <span className="text-gray-900 dark:text-zinc-100">{line.text}</span>
      </div>
    );
  }

  return (
    <pre className="whitespace-pre-wrap break-words text-[13px] leading-relaxed text-gray-600 dark:text-zinc-400">
      {line.text}
    </pre>
  );
}
