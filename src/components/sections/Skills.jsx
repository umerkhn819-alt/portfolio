import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SKILL_CARDS, skillsSection } from "../../data/skills";
import { Container } from "../ui/Container";
import { AnimatedText } from "../ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

// --- Skill Side Panel (Cyber Drawer) ---
function SkillSidePanel({ project, onClose }) {
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  if (!project) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm cursor-pointer"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-screen w-full max-w-[450px] z-[100] bg-[#050505]/95 backdrop-blur-2xl border-l border-[#00BBFF]/30 p-8 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden"
      >
        <div className="flex justify-between items-center mb-10">
          <div className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
            SYS.DETAILS // {project.id}
          </div>
          <button onClick={onClose} className="text-[var(--accent-primary)] font-display text-sm tracking-widest uppercase border border-[var(--accent-primary)]/30 px-3 py-1 rounded hover:bg-[var(--accent-primary)]/10 transition-colors">
            [X]
          </button>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(0,187,255,0.1)]">
            {project.icon}
          </div>
          <div>
            <div className="font-mono text-[#00BBFF] text-xs tracking-widest mb-1">{project.category}</div>
            <h2 className="font-display text-3xl font-bold text-white tracking-wide">{project.title}</h2>
          </div>
        </div>
        <div className="w-full h-48 rounded-2xl overflow-hidden mb-8 relative border border-white/10 group">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/50 tracking-widest">VISUAL_NODE // {project.visualType}</div>
        </div>
        <div className="mb-10">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2">Description</h3>
          <p className="font-mono text-sm text-white/80 leading-relaxed">{project.desc}</p>
        </div>
        <div className="mb-10">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2">Core Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="font-mono text-[10px] px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[#00BBFF]">{tag}</span>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2">System Specs</h3>
          <div className="space-y-3">
            {project.specs.map((spec, i) => (
              <div key={i} className="flex items-start gap-3 font-mono text-xs text-white/70">
                <span className="w-1.5 h-1.5 mt-1 bg-[#00BBFF] rounded-full animate-pulse shrink-0 shadow-[0_0_8px_rgba(0,187,255,0.8)]" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

// --- Main Skills Section (Horizontal Sticky Scroll) ---
export function Skills() {
  const [activeProject, setActiveProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Detect mobile on mount and resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const section = containerRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 100);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      return () => tween.kill();
    });

    return () => mm.revert();
  }, [isMobile]);


  return (
    <>
      {/* ── SINGLE SECTION wraps both layouts so containerRef is always mounted ── */}
      <section ref={containerRef} id="skills" className="relative bg-transparent overflow-hidden"
        style={!isMobile ? { height: "100vh" } : {}}
      >

        {/* ── DESKTOP: Horizontal sticky scroll ── */}
        {!isMobile && (
          <>
            {/* Header pinned to top */}
            <div className="absolute top-20 left-0 w-full z-20 pointer-events-none">
              <Container>
                <div className="mb-8 text-left">
                  <h2 className="font-display text-sm text-[#00BBFF] tracking-[0.3em] uppercase mb-4">
                    <AnimatedText text={skillsSection.eyebrow} type="word" />
                  </h2>
                  <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide drop-shadow-[0_0_20px_rgba(0,187,255,0.2)]">
                    <AnimatedText text={skillsSection.title} type="letter" delay={0.2} stagger={0.05} />
                  </h3>
                  <p className="font-mono text-white/50 text-sm md:text-base max-w-xl">
                    <AnimatedText text={skillsSection.subtitle} type="word" delay={0.5} stagger={0.02} />
                  </p>
                </div>
              </Container>
            </div>

            {/* Horizontal scrolling track */}
            <Container className="h-full flex items-center pt-24 overflow-hidden">
              <div ref={trackRef} className="flex gap-8 will-change-transform pr-[50vw]">
                {SKILL_CARDS.map((card, idx) => {
                  const yOffset = idx % 2 === 0 ? "mt-0" : "mt-24";
                  return (
                    <div
                      key={card.id}
                      onClick={() => setActiveProject(card)}
                      className={`relative w-[300px] h-[450px] md:w-[350px] md:h-[500px] shrink-0 rounded-[32px] overflow-hidden bg-black/60 backdrop-blur-2xl border border-white/10 cursor-pointer group flex flex-col hover:border-[#00BBFF] transition-colors duration-500 ${yOffset}`}
                    >
                      <div className="absolute inset-x-0 top-0 h-[60%] pointer-events-none">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                      </div>
                      <div className="relative z-10 flex-1 flex flex-col pt-[55%] p-6 pointer-events-none">
                        <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#00BBFF] transition-colors">{card.title}</h3>
                        <p className="font-mono text-xs text-white/70 line-clamp-3 mb-4 leading-relaxed">{card.desc}</p>
                        <div className="mt-auto flex flex-wrap gap-2">
                          {card.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-[#00BBFF]">{tag}</span>
                          ))}
                        </div>
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                          <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(255,255,255,0.3)]">+</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </>
        )}

        {/* ── MOBILE: Horizontal snap scroll ── */}
        {isMobile && (
          <div className="w-full py-20 px-5">
            <h2 className="font-display text-sm text-[#00BBFF] tracking-[0.3em] uppercase mb-2">{skillsSection.eyebrow}</h2>
            <h3 className="font-display text-3xl font-bold text-white mb-2 uppercase tracking-wide">{skillsSection.title}</h3>
            <p className="font-mono text-white/40 text-xs mb-6">← Swipe to explore →</p>

            {/* Horizontal snap-scroll row */}
            <div
              className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              <div className="shrink-0 w-1" />
              {SKILL_CARDS.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setActiveProject(card)}
                  className="snap-center shrink-0 w-[78vw] max-w-[300px] rounded-3xl overflow-hidden bg-black/60 backdrop-blur-2xl border border-white/10 cursor-pointer active:scale-[0.97] transition-transform flex flex-col"
                >
                  <div className="relative w-full overflow-hidden" style={{ height: 160 }}>
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-display text-base font-bold text-white mb-1 leading-tight">{card.title}</h3>
                    <p className="font-mono text-[11px] text-white/55 line-clamp-2 mb-3 leading-relaxed">{card.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {card.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-[#00BBFF]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="shrink-0 w-1" />
            </div>
          </div>
        )}
      </section>

      <AnimatePresence>
        {activeProject && <SkillSidePanel project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>

      <style>{`
        #skills .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}


