import { motion } from "framer-motion";

export function SkillBar({ name, level }) {
  return (
    <motion.div 
      className="group relative rounded-xl border border-gray-200 dark:border-border-subtle/50 bg-gradient-to-br from-gray-100 dark:from-surface-overlay/60 to-gray-50 dark:to-surface-overlay/30 p-5 sm:p-6 transition-all duration-300 cursor-default overflow-hidden"
      whileHover={{ 
        scale: 1.04, 
        y: -4,
        boxShadow: "0 20px 40px rgba(0,0,0,0.45), inset 0 0 24px rgba(255,255,255,0.06)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -left-1/2 -top-1/2 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      </div>

      <motion.div 
        className="mb-3 flex items-center justify-between gap-4 relative z-10"
        whileHover={{ x: 2 }}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-zinc-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{name}</span>
        <motion.span 
          className="rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold tabular-nums text-gray-500 transition-all group-hover:bg-white/20 dark:bg-surface-raised/50 dark:text-zinc-500 dark:group-hover:bg-white/10 dark:group-hover:text-white"
          whileHover={{ scale: 1.1 }}
        >
          {level}%
        </motion.span>
      </motion.div>
      
      <div className="h-2.5 overflow-hidden rounded-full bg-gray-300 dark:bg-surface-raised/40 relative z-10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-white/70 via-white/50 to-white/30 shadow-lg shadow-black/30"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>

      {/* Bottom accent line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ width: "100%", transformOrigin: "left" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
