import { motion } from "framer-motion";
import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import {
  aboutSection,
  aboutHighlights,
  aboutSpotlight,
} from "../../data/about";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

const iconMap = {
  "AI Engineering": "⚡",
  "Full-Stack Development": "🔧",
  "Interactive Systems": "✨",
};

export function About() {
  const zoneRef = useGsapContext((el) => {
    if (!el) return;
    bindStaggerReveal(
      el,
      "[data-reveal]",
      { autoAlpha: 0, y: 44 },
      { autoAlpha: 1, y: 0 },
      { start: "top 84%", stagger: 0.1 }
    );
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Section id="about" className="bg-gray-50 dark:bg-surface-raised/40 relative overflow-hidden transition-colors duration-300" parallax>
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/10 dark:bg-accent/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/5 dark:bg-accent/5 rounded-full blur-3xl opacity-20" />
      </div>

      <Container className="relative z-10">
        <div ref={zoneRef}>
          <SectionHeading
            eyebrow={aboutSection.eyebrow}
            title={aboutSection.title}
            subtitle={aboutSection.subtitle}
          />

          <motion.div 
            className="grid gap-5 sm:gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {aboutHighlights.map((item, index) => (
              <motion.article
                key={item.title}
                data-reveal
                custom={index}
                variants={cardVariants}
                className="group relative rounded-2xl border border-gray-200 dark:border-border-subtle bg-gradient-to-br from-white dark:from-surface-overlay/80 to-gray-50 dark:to-surface/40 p-6 shadow-lg dark:shadow-xl shadow-gray-400/10 dark:shadow-black/20 backdrop-blur-sm transition-all duration-300 overflow-hidden"
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: "0 30px 60px rgba(99,102,241,0.3), inset 0 0 30px rgba(99,102,241,0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:animate-pulse" />
                </div>

                {/* Icon badge */}
                <motion.div 
                  className="text-4xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {iconMap[item.title] || "→"}
                </motion.div>

                <h3 className="font-display text-lg font-medium text-gray-900 dark:text-white relative z-10 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400 relative z-10 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors duration-300">
                  {item.body}
                </p>

                {/* Bottom accent line */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left", width: "100%" }}
                />
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            data-reveal
            className="mt-14 grid gap-8 rounded-2xl border border-gray-300 dark:border-border-subtle/50 bg-gradient-to-br from-gray-100 dark:from-surface-overlay/60 via-gray-50 dark:via-surface/40 to-white dark:to-surface/30 p-8 sm:grid-cols-[1.1fr_0.9fr] sm:p-10 relative overflow-hidden transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-accent/10 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="relative z-10">
              <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-accent-glow transition-colors duration-300">
                {aboutSpotlight.eyebrow}
              </p>
              <motion.p 
                className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-zinc-300 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {aboutSpotlight.body}
              </motion.p>
            </div>

            <motion.ul 
              className="space-y-3 text-sm text-gray-600 dark:text-zinc-400 relative z-10 transition-colors duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {aboutSpotlight.bullets.map((line, index) => (
                <motion.li 
                  key={`${index}-${line.slice(0, 24)}`} 
                  className="flex items-center gap-3 group/bullet hover:text-gray-800 dark:hover:text-zinc-200 transition-colors duration-300"
                  custom={index}
                  variants={bulletVariants}
                >
                  <motion.span 
                    className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent/60"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="relative">
                    {line}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      style={{ transformOrigin: "left", width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
