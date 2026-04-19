import { motion } from "framer-motion";
import { socials } from "../../data/socials";
import { siteMeta } from "../../data/site";
import { Container } from "../ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-border-subtle bg-white dark:bg-surface-raised transition-colors duration-300 py-10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-gray-600 dark:text-zinc-500 transition-colors duration-300">
          © {year} {siteMeta.footerCreditSuffix}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
              whileHover={{ y: -2, scale: 1.15, rotateZ: 1.5, color: "rgba(99,102,241,1)" }}
              whileTap={{
                scale: 0.88,
                rotateZ: -2,
                boxShadow: "0 0 20px rgba(99,102,241,0.6)",
                transition: { duration: 0.15, ease: "easeIn" }
              }}
            >
              {s.label}
            </motion.a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
