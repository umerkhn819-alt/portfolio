import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { SKILL_CARDS, skillsSection } from "../../data/skills";
import { Container } from "../ui/Container";
import { DetailDashboard } from "../ui/DetailDashboard";

function SkillCard({ card, onClick }) {
  const ref = useRef(null);

  // Framer Motion 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize mouse position between -0.5 and 0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(card)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-[300px] md:w-[350px] shrink-0 h-[480px] rounded-2xl bg-[#080808] border border-white/5 p-8 flex flex-col cursor-grab active:cursor-grabbing group"
    >
      {/* Dynamic Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.05) 0%, transparent 60%)"
        }}
      />

      {/* Bottom glowing border line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#8A2BE2] to-[#F59E0B] opacity-80" />

      {/* Content wrapper with translateZ for parallax */}
      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col h-full pointer-events-none relative z-10">

        {/* Module Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[var(--accent-primary)] text-xs tracking-widest">{card.id}</span>
          <span className="font-mono text-white/30 text-xs tracking-widest">//</span>
          <span className="font-mono text-[var(--accent-secondary)] text-xs tracking-widest">{card.category}</span>
        </div>

        {/* Icon & Title */}
        <div className="mb-6 flex flex-col items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#00F0FF]/10 group-hover:border-[#00F0FF]/30 transition-all duration-300">
            {card.icon}
          </div>
          <h3 className="font-display text-3xl font-normal tracking-wide text-white group-hover:text-[var(--accent-primary)] transition-colors duration-300">
            {card.title}
          </h3>
        </div>

        {/* Description */}
        <p className="font-mono text-sm text-[var(--text-muted)] leading-relaxed mb-8 flex-1">
          {card.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {card.tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] bg-[var(--accent-primary)]/5 group-hover:border-[var(--accent-primary)]/50 transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeProject, setActiveProject] = useState(null);
  const carouselRef = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);

  // When activeProject changes, disable body scroll
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  useEffect(() => {
    if (carouselRef.current) {
      // Calculate how far we can drag to the left
      setDragWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }

    // Recalculate on window resize
    const handleResize = () => {
      if (carouselRef.current) {
        setDragWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="skills" className="relative py-32 bg-transparent overflow-hidden">
      <Container>
        <div className="mb-16">
          <h2 className="font-display text-sm text-[var(--text-muted)] tracking-[0.3em] uppercase mb-4">
            {skillsSection.eyebrow}
          </h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
            {skillsSection.title}
          </h3>
          <p className="font-mono text-[var(--text-muted)] text-sm md:text-base max-w-xl">
            {skillsSection.subtitle}
          </p>
        </div>
      </Container>

      {/* Horizontal Drag Track */}
      <motion.div
        ref={carouselRef}
        className="w-full pl-[5vw] md:pl-[10vw] pr-[5vw] overflow-hidden py-12 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -dragWidth }}
          className="flex gap-8 w-max"
          style={{ perspective: "1000px" }}
        >
          {SKILL_CARDS.map(card => (
            <SkillCard key={card.id} card={card} onClick={setActiveProject} />
          ))}
        </motion.div>
      </motion.div>

      {/* Detail Dashboard Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <DetailDashboard
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
