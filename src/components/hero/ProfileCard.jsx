import { motion } from "framer-motion";

export function ProfileCard({ name, role }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="relative flex h-96 w-80 flex-col overflow-hidden rounded-3xl border border-gray-300/50 bg-white/50 p-6 shadow-2xl shadow-gray-400/20 backdrop-blur-xl transition-colors duration-300 dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/[0.08] dark:to-transparent" />

        <div className="relative flex flex-1 flex-col items-center justify-center">
          <div className="flex h-64 w-64 shrink-0 items-center justify-center rounded-full border-2 border-white/25 bg-gradient-to-br from-white/15 to-white/5 shadow-lg shadow-black/30 dark:border-white/20 dark:from-white/10 dark:to-white/[0.04]">
            <div className="h-60 w-60 rounded-full bg-gradient-to-br from-white/30 to-white/10 dark:from-white/20 dark:to-white/[0.06]" />
          </div>
        </div>

        <div className="relative mt-auto flex items-center justify-center gap-2 pb-2 pt-4">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white/90 dark:bg-[#F5F5F4]" />
          <span className="text-sm font-medium text-gray-700 transition-colors duration-300 dark:text-zinc-200">
            Available for work
          </span>
        </div>

        <div className="absolute right-0 top-0 h-16 w-16 -translate-y-1/2 translate-x-1/2">
          <div className="h-full w-full rounded-full border border-white/20 opacity-50 dark:border-white/25" />
        </div>
      </div>
    </motion.div>
  );
}
