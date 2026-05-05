import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../../data/navigation";
import { siteMeta } from "../../data/site";
import { scrollToSection } from "../../utils/scrollToId";
import { Container } from "../ui/Container";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isMd = useMediaQuery("(min-width: 768px)");

  const onNavigate = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#030303]/80 backdrop-blur-md transition-colors duration-300">
      <Container className="flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate("hero")}
          className="font-display text-lg font-semibold tracking-tight text-[#F5F5F4] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-colors duration-300 hover:text-white hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]"
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
                  className="rounded-full px-4 py-1.5 text-sm font-medium tracking-wide text-white/50 transition-all duration-300 hover:bg-white/5 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  whileHover={{ y: -1, scale: 1.05, rotateZ: 0.8 }}
                  whileTap={{
                    scale: 0.92,
                    rotateZ: -0.5,
                    boxShadow: "0 0 18px rgba(255,255,255,0.25)",
                    transition: { duration: 0.15, ease: "easeIn" }
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          ) : null}

          {!isMd && (
            <motion.button
              type="button"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/5 transition-colors duration-300"
              onClick={() => setOpen((v) => !v)}
              whileTap={{
                scale: 0.91,
                rotateZ: -1,
                boxShadow: "0 0 18px rgba(255,255,255,0.25)",
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
            className="overflow-hidden border-b border-white/5 bg-[#030303]/95 backdrop-blur-md"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium tracking-wide text-white/60 hover:bg-white/5 hover:text-white transition-colors duration-300"
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
