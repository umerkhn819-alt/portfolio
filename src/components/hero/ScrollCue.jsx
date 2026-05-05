import { heroCopy } from "../../data/heroCopy";

/**
 * Bottom-center scroll cue linking to innovations.
 */
export function ScrollCue() {
  return (
    <a
      href={heroCopy.scrollCue.href}
      className="hero-scroll-out pointer-events-auto absolute bottom-[10%] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/55">
        {heroCopy.scrollCue.label}
      </span>
      <span
        className="hero-scroll-hint h-10 w-px bg-gradient-to-b from-white/70 to-transparent"
        aria-hidden
      />
    </a>
  );
}
