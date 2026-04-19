import { motion } from "framer-motion";
import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import { skills, skillsSection } from "../../data/skills";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillBar } from "../features/skills/SkillBar";

export function Skills() {
  const zoneRef = useGsapContext((el) => {
    if (!el) return;
    bindStaggerReveal(
      el,
      "[data-reveal]",
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0 },
      { start: "top 85%", stagger: 0.09 }
    );
  }, []);

  const skillVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Section id="skills" parallax className="relative overflow-hidden bg-white dark:bg-transparent transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-1/3 w-96 h-96 bg-orange-400/10 dark:bg-orange-500/8 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-indigo-500/5 dark:bg-accent/5 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <div ref={zoneRef}>
          <SectionHeading
            eyebrow={skillsSection.eyebrow}
            title={skillsSection.title}
            subtitle={skillsSection.subtitle}
          />

          <motion.div 
            className="grid gap-5 sm:gap-6 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.id} 
                data-reveal
                custom={index}
                variants={skillVariants}
              >
                <SkillBar name={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
