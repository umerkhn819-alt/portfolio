import { motion } from "framer-motion";
import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import { experienceSection, experiences } from "../../data/experience";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

export function Experience() {
  const zoneRef = useGsapContext((el) => {
    if (!el) return;
    bindStaggerReveal(
      el,
      "[data-reveal]",
      { autoAlpha: 0, y: 44 },
      { autoAlpha: 1, y: 0 },
      { start: "top 84%", stagger: 0.12 }
    );
  }, []);

  const experienceVariants = {
    hidden: { opacity: 0, x: -40, y: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <Section id="experience" className="bg-white dark:bg-surface-raised/30 relative overflow-hidden transition-colors duration-300" parallax>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/8 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/6 dark:bg-accent/6 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <div ref={zoneRef}>
          <SectionHeading
            eyebrow={experienceSection.eyebrow}
            title={experienceSection.title}
            subtitle={experienceSection.subtitle}
          />

          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                data-reveal
                custom={index}
                variants={experienceVariants}
                className="group relative rounded-2xl border border-gray-300 dark:border-border-subtle/50 bg-gradient-to-br from-gray-50 dark:from-surface-overlay/60 to-white dark:to-surface/40 p-6 sm:p-8 overflow-hidden transition-all duration-300"
                whileHover={{
                  y: -6,
                  boxShadow: "0 30px 60px rgba(99,102,241,0.2), inset 0 0 30px rgba(99,102,241,0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
                </div>

                {/* Timeline dot */}
                <div className="absolute -left-4 top-8 hidden sm:block">
                  <motion.div 
                    className="w-8 h-8 rounded-full border-2 border-accent bg-white dark:bg-surface relative"
                    whileHover={{ scale: 1.3, boxShadow: "0 0 20px rgba(99,102,241,0.6)" }}
                  >
                    <div className="absolute inset-2 rounded-full bg-accent/30" />
                  </motion.div>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <motion.div 
                    className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                    whileHover={{ x: 4 }}
                  >
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-indigo-600 dark:text-accent-glow font-medium transition-colors">{exp.company}</p>
                    </div>
                    <motion.span 
                      className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 font-semibold bg-gray-100 dark:bg-surface-raised/50 px-3 py-1 rounded-full group-hover:bg-accent/20 group-hover:text-accent transition-all whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                    >
                      {exp.duration}
                    </motion.span>
                  </motion.div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-gray-700 dark:text-zinc-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-zinc-200 transition-colors">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <motion.ul 
                    className="mt-4 space-y-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={`${exp.id}-${i}`}
                        custom={i}
                        variants={highlightVariants}
                        className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-zinc-400 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors"
                      >
                        <motion.span 
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent/60"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Bottom accent line */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent/50 via-accent to-accent/50"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ width: "100%", transformOrigin: "left" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
