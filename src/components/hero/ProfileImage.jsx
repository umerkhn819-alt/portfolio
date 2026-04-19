import { motion } from "framer-motion";

export function ProfileImage() {
  return (
    <motion.div
      className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:flex"
      initial={{ opacity: 0, scale: 0.8, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className="relative h-48 w-48 rounded-full border border-indigo-400/30 dark:border-accent/30 bg-gradient-to-br from-indigo-300/10 dark:from-accent/10 to-indigo-200/10 dark:to-accent-muted/10 shadow-2xl shadow-indigo-300/20 dark:shadow-accent/20 backdrop-blur-sm transition-colors duration-300"
        animate={{
          y: [0, -20, 0],
          rotateZ: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full border border-indigo-400/20 dark:border-accent/20 opacity-50" />

        {/* Inner profile placeholder SVG */}
        <svg
          className="h-full w-full text-indigo-600 dark:text-accent-glow"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle cx="100" cy="100" r="100" fill="currentColor" opacity="0.05" />

          {/* Head */}
          <circle cx="100" cy="70" r="25" fill="currentColor" opacity="0.3" />

          {/* Body/shoulders */}
          <ellipse cx="100" cy="130" rx="35" ry="40" fill="currentColor" opacity="0.2" />

          {/* Accent elements */}
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </svg>

        {/* Corner accent */}
        <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full border border-indigo-400/40 dark:border-accent/40 opacity-60" />
      </motion.div>
    </motion.div>
  );
}
