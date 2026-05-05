import { motion } from "framer-motion";

export function LeftPanel({ eyebrow, name, role, intro }) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Eyebrow */}
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white/55 transition-colors duration-300">
        {eyebrow}
      </p>

      {/* Name & Role */}
      <div>
        <h2 className="font-display text-3xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
          {name}
        </h2>
        <p className="mt-2 text-sm font-medium text-white/70 transition-colors duration-300">
          {role}
        </p>
      </div>

      {/* Intro text */}
      <p className="max-w-xs text-sm leading-relaxed text-gray-700 dark:text-zinc-300 transition-colors duration-300">
        {intro}
      </p>

      {/* Accent line */}
      <div className="h-px w-12 bg-gradient-to-r from-white/40 to-transparent" />
    </motion.div>
  );
}
