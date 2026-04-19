import { motion } from "framer-motion";

export function SkillBar({ name, level }) {
  return (
    <motion.div 
      className="group relative rounded-xl border border-gray-200 dark:border-border-subtle/50 bg-gradient-to-br from-gray-100 dark:from-surface-overlay/60 to-gray-50 dark:to-surface-overlay/30 p-5 sm:p-6 transition-all duration-300 cursor-default overflow-hidden"
      whileHover={{ 
        scale: 1.04, 
        y: -4,
        boxShadow: "0 20px 40px rgba(99,102,241,0.2), inset 0 0 30px rgba(99,102,241,0.1)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 left-0 w-24 h-24 bg-accent/30 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <motion.div 
        className="mb-3 flex items-center justify-between gap-4 relative z-10"
        whileHover={{ x: 2 }}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-zinc-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{name}</span>
        <motion.span 
          className="text-xs tabular-nums text-gray-500 dark:text-zinc-500 font-semibold bg-gray-200 dark:bg-surface-raised/50 px-2 py-1 rounded-md group-hover:bg-indigo-200 dark:group-hover:bg-accent/20 group-hover:text-indigo-700 dark:group-hover:text-accent transition-all"
          whileHover={{ scale: 1.1 }}
        >
          {level}%
        </motion.span>
      </motion.div>
      
      <div className="h-2.5 overflow-hidden rounded-full bg-gray-300 dark:bg-surface-raised/40 relative z-10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-accent-muted shadow-lg shadow-accent/30"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>

      {/* Bottom accent line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ width: "100%", transformOrigin: "left" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
