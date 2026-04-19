import { motion } from "framer-motion";
import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import { assistantSection } from "../../data/assistant";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { ChatAssistant } from "../features/chat/ChatAssistant";

export function AssistantSection() {
  const zoneRef = useGsapContext((el) => {
    if (!el) return;
    bindStaggerReveal(
      el,
      "[data-reveal]",
      { autoAlpha: 0, y: 36 },
      { autoAlpha: 1, y: 0 },
      { start: "top 86%", stagger: 0.08 }
    );
  }, []);

  return (
    <Section id="assistant" className="bg-white dark:bg-surface/70 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-500/6 dark:bg-accent/6 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <div ref={zoneRef}>
          <SectionHeading
            eyebrow={assistantSection.eyebrow}
            title={assistantSection.title}
            subtitle={assistantSection.subtitle}
          />
          <motion.div 
            data-reveal
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <ChatAssistant />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
