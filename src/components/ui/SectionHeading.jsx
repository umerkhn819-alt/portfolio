import { TextReveal } from "./TextReveal";

export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-12 max-w-2xl">
      {eyebrow ? (
        <TextReveal
          text={eyebrow}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-accent-glow transition-colors duration-300"
          useWords={false}
          delay={0}
        />
      ) : null}
      <TextReveal
        text={title}
        className="font-display text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300"
        useWords={true}
        delay={0.1}
      />
      {subtitle ? (
        <TextReveal
          text={subtitle}
          className="mt-4 text-base leading-relaxed text-gray-600 dark:text-zinc-400 transition-colors duration-300"
          useWords={true}
          delay={0.2}
        />
      ) : null}
    </div>
  );
}
