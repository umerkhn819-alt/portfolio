import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_DATA } from "../../data/projectsDetail";
import { cardBackdropImageFilter } from "../../lib/cardBackdropStyle";
import { projectOptimizedStem480 } from "../../lib/optimizedPaths";
import { AnimatedText } from "../ui/AnimatedText";
import { OptimizedImg } from "../ui/OptimizedImg";

gsap.registerPlugin(ScrollTrigger);

// --- Side Detail Panel ---
function ProjectSidePanel({ project, onClose }) {
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
        className="fixed top-0 right-0 h-screen w-full max-w-[450px] z-[100] bg-[#050505]/95 backdrop-blur-2xl border-l border-white/12 p-8 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden"
      >
        <div className="flex justify-between items-center mb-10">
          <div className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
            PROJECT // {project.tag}
          </div>
          <button onClick={onClose} className="text-[var(--accent-primary)] font-display text-sm tracking-widest uppercase border border-[var(--accent-primary)]/30 px-3 py-1 rounded hover:bg-[var(--accent-primary)]/10 transition-colors">
            [X]
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.06)]">
            <OptimizedImg
              src={project.image}
              optimizedBasePath={projectOptimizedStem480(project.image) ?? undefined}
              alt=""
              className="h-full w-full object-cover"
              style={cardBackdropImageFilter}
              loading="eager"
              decoding="async"
              sizes="56px"
              width={480}
              height={480}
            />
            <div className="tex-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white tracking-wide leading-tight">{project.title}</h2>
          </div>
        </div>

        <div className="group relative mb-8 h-48 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10">
          <OptimizedImg
            src={project.image}
            optimizedBasePath={projectOptimizedStem480(project.image) ?? undefined}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={cardBackdropImageFilter}
            loading="eager"
            decoding="async"
            sizes="(max-width: 450px) 92vw, 400px"
            width={720}
            height={480}
          />
          <div className="tex-grid pointer-events-none absolute inset-0 z-[1]" aria-hidden />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
        </div>

        <div className="mb-10">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2">Description</h3>
          <p className="font-mono text-sm text-white/80 leading-relaxed">{project.desc}</p>
        </div>

        <div className="mb-10">
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2">System Specs</h3>
          <div className="space-y-3">
            {project.specs.map((spec, i) => (
              <div key={i} className="flex items-start gap-3 font-mono text-xs text-white/70">
                <span className="w-1.5 h-1.5 mt-1 bg-white rounded-full animate-pulse shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.25)]" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {project.github && (
          <div className="mt-auto pt-8 border-t border-white/10">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full font-mono text-xs text-[#050505] bg-white px-6 py-4 rounded hover:bg-white transition-colors uppercase tracking-widest font-bold"
            >
              &gt; VIEW_SOURCE
            </a>
          </div>
        )}
      </motion.div>
    </>
  );
}


// --- Project card (desktop carousel): full-bleed image, minimal chrome ---
function HolographicCard({ project, onClick }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0 20px 56px rgba(0, 0, 0, 0.55)",
      borderColor: "rgba(255, 255, 255, 0.22)",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      duration: 0.3,
    });
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      ref={cardRef}
      className="group relative flex h-[400px] w-[300px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:h-[500px] md:w-[360px]"
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <OptimizedImg
        src={project.image}
        optimizedBasePath={projectOptimizedStem480(project.image) ?? undefined}
        alt={project.title}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        style={cardBackdropImageFilter}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 75vw, 360px"
        width={720}
        height={960}
      />
      <div className="tex-grid pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/90 via-black/35 to-black/10"
        aria-hidden
      />

      <div className="relative z-10 mt-auto flex flex-col p-6">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 border-t border-white/10 pt-2 font-mono text-[10px] text-white/60 line-clamp-1 md:text-xs">
          {project.tag}
        </p>
        <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/70 opacity-60 transition-opacity duration-200 group-hover:opacity-100">
          <span className="h-px w-2 bg-white" aria-hidden />
          VIEW DETAILS
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

  // GSAP 3D carousel + cinematic entry — desktop only
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const radius = 600;
      gsap.set(track, { z: -radius });

      // ── Cinematic entry: left panel slides from left ──
      gsap.fromTo(
        ".works-left-panel",
        { x: -100, opacity: 0, clipPath: "inset(0 100% 0 0)" },
        {
          x: 0,
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Carousel zoom entry ──
      gsap.fromTo(
        ".works-carousel-area",
        { scale: 0.85, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── 3D carousel rotation scrub ──
      const tween = gsap.to(track, {
        rotationY: -360,
        z: -radius,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1500",
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
            <div className="works-left-panel w-[300px] shrink-0 h-full flex flex-col justify-center pl-10 md:pl-20 relative z-20 border-r border-white/5 bg-transparent">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white/70 tracking-[0.2em] uppercase mb-12">
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
            <div className="works-carousel-area flex-1 h-full flex items-center justify-center relative overflow-hidden" style={{ perspective: "1500px" }}>
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
            <h2 className="font-display text-3xl font-bold text-white/70 tracking-[0.2em] uppercase mb-3">
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
                  className="relative aspect-[3/4] w-[78vw] max-w-[300px] shrink-0 cursor-pointer snap-center overflow-hidden rounded-3xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform active:scale-[0.97]"
                >
                  {project.image && (
                    <OptimizedImg
                      src={project.image}
                      optimizedBasePath={projectOptimizedStem480(project.image) ?? undefined}
                      alt={project.title}
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
                      style={cardBackdropImageFilter}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 400px) 78vw, 300px"
                      width={720}
                      height={960}
                    />
                  )}
                  <div className="tex-grid pointer-events-none absolute inset-0 z-[1]" aria-hidden />
                  <div
                    className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/90 via-black/35 to-black/10"
                    aria-hidden
                  />
                  <div className="absolute bottom-0 inset-x-0 z-10 p-4">
                    <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-white/70 line-clamp-2">
                      {project.desc}
                    </p>
                    {project.tag && (
                      <span className="mt-3 inline-block rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] text-white/75">
                        {project.tag}
                      </span>
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

      {/* Side Panel Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectSidePanel
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        /* hide scrollbar in snap row */
        #projects .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
