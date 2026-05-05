import { motion } from "framer-motion";

export function RightPanel({ techStack, socials }) {
  return (
    <motion.div
      className="space-y-8 text-right"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Tech Stack */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-zinc-400 transition-colors duration-300">
          Tech Stack
        </p>
        <div className="space-y-2">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              className="flex items-center justify-end gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              <span className="text-sm font-medium text-gray-700 dark:text-zinc-300 transition-colors duration-300">
                {tech}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-24 ml-auto bg-gradient-to-l from-white/30 to-transparent" />

      {/* Social Links */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-zinc-400 transition-colors duration-300">
          Connect
        </p>
        <div className="space-y-2 flex flex-col items-end">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gray-700 dark:text-zinc-300 transition-colors hover:text-white"
              whileHover={{ x: 4 }}
            >
              {social.label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
