import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import { AnimatedText } from "../ui/AnimatedText";
import { TiltCard } from "../ui/TiltCard";
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
    gsap.registerPlugin(ScrollTrigger);
    
    bindStaggerReveal(
      el,
      "[data-reveal]",
      { autoAlpha: 0, y: 44 },
      { autoAlpha: 1, y: 0 },
      { start: "top 84%", stagger: 0.1 }
    );

    gsap.to(".about-scroll-out", {
      opacity: 0,
      scale: 0.5,
      y: 100,
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: "center top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(1); // Start with middle card active

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
    <Section id="about" className="bg-transparent relative overflow-hidden transition-colors duration-300" parallax>
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

          {/* 3D Coverflow Slider */}
          <div className="relative h-[400px] w-full flex items-center justify-center my-10 perspective-[1200px]">
            {aboutHighlights.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              
              return (
                <motion.article
                  key={item.title}
                  onClick={() => setActiveIndex(index)}
                  animate={{
                    x: offset * (window.innerWidth < 768 ? 110 : 280),
                    scale: isActive ? 1.05 : 0.85,
                    rotateY: offset * -25,
                    z: isActive ? 50 : 0,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="about-scroll-out absolute w-[260px] sm:w-[320px] h-[320px] rounded-2xl border border-gray-200 dark:border-border-subtle bg-gradient-to-br from-white dark:from-surface-overlay/80 to-gray-50 dark:to-surface/40 p-6 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden cursor-pointer will-change-transform"
                  style={{
                    zIndex: isActive ? 20 : 10 - Math.abs(offset),
                    transformStyle: "preserve-3d"
                  }}
                  whileHover={isActive ? { y: -10, boxShadow: "0 30px 60px rgba(0,187,255,0.3)" } : { opacity: 0.8 }}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#00BBFF]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>

                  {/* Icon badge */}
                  <div className="text-4xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity" style={{ transform: "translateZ(30px)" }}>
                    {iconMap[item.title] || "→"}
                  </div>

                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white relative z-10" style={{ transform: "translateZ(40px)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400 relative z-10" style={{ transform: "translateZ(20px)" }}>
                    {item.body}
                  </p>

                  {/* Bottom accent line */}
                  {isActive && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00BBFF]/50 via-[#00BBFF] to-[#00BBFF]/50"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformOrigin: "center", width: "100%" }}
                    />
                  )}
                </motion.article>
              );
            })}
          </div>

          <motion.div
            data-reveal
            className="mt-14 grid gap-8 rounded-2xl border border-gray-300 dark:border-border-subtle/50 bg-gradient-to-br from-gray-100 dark:from-surface-overlay/60 via-gray-50 dark:via-surface/40 to-white dark:to-surface/30 p-8 sm:grid-cols-[1.1fr_0.9fr] sm:p-10 relative overflow-hidden transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
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
              <motion.div 
                className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-zinc-300 transition-colors duration-300"
              >
                <AnimatedText text={aboutSpotlight.body} type="word" stagger={0.015} />
              </motion.div>
            </div>

            <motion.ul 
              className="space-y-3 text-sm text-gray-600 dark:text-zinc-400 relative z-10 transition-colors duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
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
