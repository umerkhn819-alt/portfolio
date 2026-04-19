import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../../data/navigation";
import { siteMeta } from "../../data/site";
import { scrollToSection } from "../../utils/scrollToId";
import { useTheme } from "../../hooks/useTheme.jsx";
import { Container } from "../ui/Container";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isMd = useMediaQuery("(min-width: 768px)");
  const { theme, toggleTheme } = useTheme();

  const onNavigate = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
      <Container className="flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate("hero")}
          className="font-display text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 hover:text-indigo-600 dark:hover:text-accent-glow"
        >
          {siteMeta.brandName}
        </button>

        <div className="flex items-center gap-3">
          {isMd ? (
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className="rounded-full px-3 py-1.5 text-sm text-gray-600 dark:text-zinc-400 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-surface-overlay hover:text-gray-900 dark:hover:text-white hover:shadow-lg hover:shadow-accent/20"
                  whileHover={{ y: -1, scale: 1.05, rotateZ: 0.8 }}
                  whileTap={{
                    scale: 0.92,
                    rotateZ: -0.5,
                    boxShadow: "0 0 15px rgba(99,102,241,0.4)",
                    transition: { duration: 0.15, ease: "easeIn" }
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          ) : null}

          {/* Theme toggle button */}
          <motion.button
            type="button"
            onClick={toggleTheme}
            className="relative rounded-lg p-2 text-gray-600 dark:text-zinc-400 transition-all duration-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-surface-overlay/60"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </motion.svg>
            ) : (
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </motion.svg>
            )}
          </motion.button>

          {!isMd && (
            <motion.button
              type="button"
              className="rounded-lg border border-gray-300 dark:border-border px-3 py-1.5 text-sm text-gray-900 dark:text-zinc-200 transition-colors duration-300"
              onClick={() => setOpen((v) => !v)}
              whileTap={{
                scale: 0.91,
                rotateZ: -1,
                boxShadow: "0 0 15px rgba(99,102,241,0.4)",
                transition: { duration: 0.15, ease: "easeIn" }
              }}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              Menu
            </motion.button>
          )}
        </div>
      </Container>

      <AnimatePresence>
        {!isMd && open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border-subtle bg-surface-raised/95 backdrop-blur-md"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-surface-overlay hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
