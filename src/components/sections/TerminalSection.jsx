import { motion } from "framer-motion";
import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import { terminalSection } from "../../data/terminal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Terminal } from "../features/terminal/Terminal";

export function TerminalSection() {
  const zoneRef = useGsapContext((el) => {
    if (!el) return;
    bindStaggerReveal(
      el,
      "[data-reveal]",
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0 },
      { start: "top 86%", stagger: 0.1 }
    );
  }, []);

  return (
    <Section id="terminal" className="bg-gray-50 dark:bg-surface/80 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/8 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-indigo-500/5 dark:bg-accent/5 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <div ref={zoneRef}>
          <SectionHeading
            eyebrow={terminalSection.eyebrow}
            title={terminalSection.title}
            subtitle={terminalSection.subtitle}
          />
          <motion.div 
            data-reveal
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <Terminal />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
