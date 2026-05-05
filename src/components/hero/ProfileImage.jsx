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
        className="relative h-48 w-48 rounded-full border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-2xl shadow-black/40 backdrop-blur-sm transition-colors duration-300 dark:border-white/15 dark:from-white/[0.06] dark:to-white/[0.02] dark:shadow-black/50"
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
        <div className="absolute inset-0 rounded-full border border-white/15 opacity-50 dark:border-white/10" />

        <svg
          className="h-full w-full text-white/55 dark:text-white/60"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill="currentColor" opacity="0.05" />
          <circle cx="100" cy="70" r="25" fill="currentColor" opacity="0.3" />
          <ellipse cx="100" cy="130" rx="35" ry="40" fill="currentColor" opacity="0.2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </svg>

        <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full border border-white/25 opacity-60 dark:border-white/20" />
      </motion.div>
    </motion.div>
  );
}
