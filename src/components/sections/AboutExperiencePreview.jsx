import { Cpu, Code2, Sparkles } from "lucide-react";
import {
  aboutSection,
  aboutHighlights,
  aboutSpotlight,
} from "../../data/about";
import { experienceSection, experiences } from "../../data/experience";

const highlightIcons = [Cpu, Code2, Sparkles];

/**
 * Compact about + experience + capability icons for desktop hero negative space.
 * (Standalone full-width section removed — content lives in the hero.)
 */
export function AboutExperienceHeroAccent() {
  const previewRoles = experiences.slice(0, 2);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0E0E0D]/55 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-5">
      <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.26em] text-white/70">
        {aboutSection.eyebrow}
      </p>
      <h3 className="font-display text-base font-semibold tracking-tight text-white md:text-lg">
        {aboutSection.title}
      </h3>
      <p className="mt-1 font-mono text-[11px] leading-snug text-white/45 md:text-xs">
        {aboutSection.subtitle}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {aboutHighlights.slice(0, 3).map((h, i) => {
          const Icon = highlightIcons[i] ?? Sparkles;
          return (
            <span
              key={h.title}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/65 md:px-2.5 md:text-[10px]"
            >
              <Icon className="h-3 w-3 shrink-0 text-white/80" aria-hidden />
              <span className="max-w-[7.5rem] truncate sm:max-w-none">{h.title}</span>
            </span>
          );
        })}
      </div>

      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
          Focus
        </p>
        <p className="line-clamp-4 font-mono text-[11px] leading-relaxed text-white/50 md:line-clamp-5 md:text-xs">
          {aboutSpotlight.body}
        </p>
      </div>

      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
          {experienceSection.eyebrow}
        </p>
        <ul className="space-y-3">
          {previewRoles.map((exp) => (
            <li
              key={exp.id}
              className="border-l border-white/12 pl-3 font-mono text-[10px] text-white/55 md:text-[11px]"
            >
              <span className="block text-white/85">{exp.position}</span>
              <span className="mt-0.5 block text-[9px] text-white/40 md:text-[10px]">
                {exp.company} · {exp.duration}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
