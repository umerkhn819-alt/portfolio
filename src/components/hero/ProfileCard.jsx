import { motion } from "framer-motion";

export function ProfileCard({ name, role }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Glassmorphism card - larger size */}
      <div className="relative w-80 h-96 rounded-3xl border border-gray-300/50 dark:border-white/15 bg-white/50 dark:bg-white/8 p-6 backdrop-blur-xl shadow-2xl shadow-gray-400/20 dark:shadow-black/40 flex flex-col overflow-hidden group transition-colors duration-300">
        {/* Glow effect background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-200/20 dark:from-accent/15 via-transparent to-indigo-100/15 dark:to-accent-muted/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content - Flex layout */}
        <div className="relative flex-1 flex flex-col items-center justify-center">
          {/* Avatar - 70% of card area */}
          <div className="w-64 h-64 rounded-full border-2 border-indigo-400/40 dark:border-accent/40 bg-gradient-to-br from-indigo-300/25 dark:from-accent/25 to-indigo-200/15 dark:to-accent-muted/15 flex items-center justify-center shadow-lg shadow-indigo-300/20 dark:shadow-accent/20 flex-shrink-0">
            <div className="h-60 w-60 rounded-full bg-gradient-to-br from-indigo-400/60 dark:from-accent/60 to-indigo-300/40 dark:to-accent-muted/40" />
          </div>
        </div>

        {/* Status indicator - 20% at bottom */}
        <div className="relative mt-auto pt-4 pb-2 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-gray-700 dark:text-zinc-200 transition-colors duration-300">Available for work</span>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 h-16 w-16 -translate-y-1/2 translate-x-1/2">
          <div className="h-full w-full rounded-full border border-indigo-400/40 dark:border-accent/40 opacity-50" />
        </div>
      </div>
    </motion.div>
  );
}
