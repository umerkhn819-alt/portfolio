import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_DATA } from "../../data/projectsDetail";
import { AnimatedText } from "../ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

// --- Bottom Drawer Detail Panel ---
function ProjectBottomDrawer({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 w-full h-[45%] z-[100] bg-[#050505]/95 backdrop-blur-2xl border-t border-[#00BBFF]/30 p-8 md:p-12 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-8 overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--accent-primary)] font-display text-sm tracking-widest uppercase border border-[var(--accent-primary)]/30 px-3 py-1 rounded hover:bg-[var(--accent-primary)]/10 transition-colors z-10"
        >
          [X] CLOSE
        </button>

        <div className="w-full md:w-1/3 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8 shrink-0">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,187,255,0.1)] group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div>
              <div className="font-mono text-[#00BBFF] text-xs tracking-widest mb-2 uppercase">{project.tag}</div>
              <h2 className="font-display text-3xl font-bold text-white tracking-wide leading-tight">{project.title}</h2>
            </div>
          </div>

          <p className="font-mono text-sm text-white/80 leading-relaxed mt-4">
            {project.desc}
          </p>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center w-fit font-mono text-xs text-[#050505] bg-[var(--text-main)] px-6 py-3 hover:bg-[var(--accent-primary)] transition-colors uppercase tracking-widest"
            >
              &gt; VIEW_SOURCE
            </a>
          )}
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-center pl-0 md:pl-4">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase mb-6 border-b border-white/10 pb-2 w-fit">
            System Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-6">
            {project.specs.map((spec, i) => (
              <div key={i} className="flex items-start gap-3 font-mono text-sm text-white/90">
                <span className="w-2 h-2 mt-1 bg-[#00BBFF] rounded-full animate-pulse shrink-0 shadow-[0_0_8px_rgba(0,187,255,0.8)]" />
                <span className="leading-snug">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}


// --- Holographic Card Component (Desktop) ---
function HolographicCard({ project, onClick }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0 0 30px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(138, 43, 226, 0.2)",
      borderColor: "rgba(0, 240, 255, 0.5)",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      boxShadow: "none",
      borderColor: "rgba(255,255,255,0.05)",
      duration: 0.3
    });
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      ref={cardRef}
      className="relative w-[300px] h-[400px] md:w-[360px] md:h-[500px] shrink-0 rounded-3xl cursor-pointer overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center group"
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center p-4">
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00BBFF]/10 blur-[50px] rounded-full animate-pulse" />
          <img
            src={project.image}
            alt={project.title}
            className="w-[120%] h-[120%] object-contain relative z-10 animate-[float_4s_ease-in-out_infinite] group-hover:scale-110 transition-transform duration-500 mix-blend-screen opacity-90"
          />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-300 flex flex-col">
        <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#00BBFF] transition-colors">{project.title}</h3>
        <p className="font-mono text-[10px] md:text-xs text-[var(--text-muted)] line-clamp-1 border-t border-white/10 pt-2">{project.tag}</p>
        <div className="mt-4 font-mono text-[10px] text-[#00BBFF] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100 flex items-center gap-2">
          <span className="w-2 h-px bg-[#00BBFF]" /> VIEW DETAILS
        </div>
      </div>
    </motion.div>
  );
}


// --- Main Works Index Section ---
export function WorksIndex() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and on resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP 3D carousel — desktop only
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const radius = 600;
      gsap.set(track, { z: -radius });

      const tween = gsap.to(track, {
        rotationY: -360,
        z: -radius,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=800",
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
      {/* ══ SINGLE SECTION — contains both desktop and mobile content ══ */}
      <section ref={sectionRef} id="projects" className="relative bg-transparent">

        {/* ── DESKTOP LAYOUT (md+) ── */}
        {!isMobile && (
          <div className="h-screen w-full flex overflow-hidden pt-20">

            {/* Pinned Left Column */}
            <div className="w-[300px] shrink-0 h-full flex flex-col justify-center pl-10 md:pl-20 relative z-20 border-r border-white/5 bg-transparent">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#00BBFF] tracking-[0.2em] uppercase mb-12">
                <AnimatedText text="AI PROJECTS" type="word" />
              </h2>
              <div className="space-y-4 overflow-y-auto pr-4 pb-10" style={{ scrollbarWidth: 'none' }}>
                {PROJECT_DATA.map((p, i) => (
                  <div key={p.id} className="group cursor-pointer" onClick={() => setActiveProject(p)}>
                    <div className="flex items-center gap-4 text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
                      <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                      <h3 className="font-display text-sm md:text-base uppercase tracking-wide">{p.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-10 left-10 md:left-20 font-mono text-xs text-[var(--text-muted)] opacity-50">
                SCROLL // TO EXPLORE
              </div>
            </div>

            {/* 3D Carousel Track */}
            <div className="flex-1 h-full flex items-center justify-center relative overflow-hidden" style={{ perspective: "1500px" }}>
              <div
                ref={trackRef}
                className="relative w-[360px] h-[500px] will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {PROJECT_DATA.map((project, i) => {
                  const theta = 360 / PROJECT_DATA.length;
                  const radius = 600;
                  return (
                    <div
                      key={project.id}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`, backfaceVisibility: "hidden" }}
                    >
                      <HolographicCard project={project} onClick={setActiveProject} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── MOBILE LAYOUT (<md): Horizontal Snap Scroll ── */}
        {isMobile && (
          <div className="w-full py-20 px-5">
            <h2 className="font-display text-3xl font-bold text-[#00BBFF] tracking-[0.2em] uppercase mb-3">
              AI PROJECTS
            </h2>
            <p className="font-mono text-xs text-white/40 mb-6 tracking-widest uppercase">
              ← Swipe to explore →
            </p>

            {/* Horizontal snap-scroll row */}
            <div
              className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              {/* Leading spacer */}
              <div className="shrink-0 w-1" />
              {PROJECT_DATA.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="snap-center shrink-0 w-[78vw] max-w-[300px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl cursor-pointer active:scale-[0.97] transition-transform"
                >
                  {project.image && (
                    <div className="relative w-full overflow-hidden" style={{ height: 160 }}>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover mix-blend-screen opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-white uppercase tracking-wide mb-1">{project.title}</h3>
                    <p className="font-mono text-[11px] text-white/55 line-clamp-2 mb-3 leading-relaxed">{project.desc}</p>
                    {project.tag && (
                      <span className="font-mono text-[9px] px-2.5 py-1 rounded-full border border-white/10 text-[#00BBFF]">{project.tag}</span>
                    )}
                  </div>
                </div>
              ))}
              {/* Trailing spacer */}
              <div className="shrink-0 w-1" />
            </div>
          </div>
        )}
      </section>

      {/* Bottom Drawer Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectBottomDrawer
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        /* hide scrollbar in snap row */
        #projects .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
