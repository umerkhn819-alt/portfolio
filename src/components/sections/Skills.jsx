import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SKILL_CARDS, skillsSection } from "../../data/skills";
import { Container } from "../ui/Container";
import { AnimatedText } from "../ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const N = SKILL_CARDS.length;
const VISIBLE_RANGE = 3; // how many cards to show on each side of focal

/**
 * Coverflow Arc 3D Carousel
 *
 * Cards are arranged in a shallow 3D arc in front of the viewer.
 * The focal card is centered & flat; side cards rotate toward the center
 * and are pushed back in Z. No cylinder wrap-around, no back-of-card issues.
 */
function getCardTransform(i, focal) {
  const d = i - focal;
  const absD = Math.abs(d);
  const clamped = Math.sign(d) * Math.min(absD, VISIBLE_RANGE + 0.5);

  const x = clamped * 220;
  const z = -Math.pow(Math.min(absD, VISIBLE_RANGE + 0.5), 1.3) * 130;
  const rotateY = -gsap.utils.clamp(-55, 55, d * 24);
  const scale = Math.max(0.62, 1 - absD * 0.1);
  const opacity = absD > VISIBLE_RANGE ? 0 : Math.max(0, 1 - absD * 0.22);
  const zIndex = 100 - Math.round(absD * 10);

  return { x, z, rotateY, scale, opacity, zIndex };
}

function applyCardTransform(el, t) {
  if (!el) return;
  el.style.transform = `translate3d(calc(-50% + ${t.x}px), -50%, ${t.z}px) rotateY(${t.rotateY}deg) scale(${t.scale})`;
  el.style.opacity = String(t.opacity);
  el.style.zIndex = String(t.zIndex);
  // Clicks are handled by the stage overlay, so cards themselves are transparent to hit-testing.
  el.style.pointerEvents = "none";
}

// Given click X relative to stage center, find the closest visible card.
function findCardAtX(clickX, focal) {
  let best = -1;
  let bestDist = Infinity;
  for (let i = 0; i < N; i++) {
    const t = getCardTransform(i, focal);
    if (t.opacity < 0.25) continue;
    const dx = Math.abs(clickX - t.x);
    if (dx < 150 && dx < bestDist) {
      bestDist = dx;
      best = i;
    }
  }
  return best;
}

// ─── Right-Side Detail Drawer ───
function SkillRightDrawer({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.aside
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
      className="fixed top-0 right-0 h-screen w-[min(440px,92vw)] z-[100] bg-[#07070C]/92 backdrop-blur-2xl border-l border-[#00BBFF]/20 flex flex-col overflow-y-auto overflow-x-hidden"
      style={{ boxShadow: "-20px 0 60px rgba(0,0,0,0.5), inset 1px 0 0 rgba(0,187,255,0.08)" }}
    >
      <div className="sticky top-0 z-10 flex justify-between items-center px-7 pt-7 pb-5 bg-gradient-to-b from-[#07070C] via-[#07070C]/95 to-transparent">
        <div className="font-mono text-[10px] text-white/40 tracking-[0.25em] uppercase">
          SYS.NODE // {project.id}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-white/70 hover:text-white hover:border-[#00BBFF]/60 hover:bg-[#00BBFF]/10 transition-all"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="px-7 pb-10 flex flex-col gap-8">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070C] via-transparent to-transparent" />
          <div className="absolute top-3 left-3 font-mono text-[10px] text-[#00BBFF] tracking-widest bg-black/50 backdrop-blur-sm border border-[#00BBFF]/30 px-2.5 py-1 rounded">
            {project.category}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BBFF]/15 to-[#8A2BE2]/10 border border-white/10 flex items-center justify-center text-2xl">
              {project.icon}
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00BBFF]/40 to-transparent" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white tracking-wide leading-tight">
            {project.title}
          </h2>
        </div>

        <div>
          <h3 className="font-mono text-[10px] text-[#00BBFF] tracking-[0.25em] uppercase mb-3">Overview</h3>
          <p className="font-mono text-sm text-white/75 leading-relaxed">{project.desc}</p>
        </div>

        <div>
          <h3 className="font-mono text-[10px] text-[#00BBFF] tracking-[0.25em] uppercase mb-3">Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[10px] text-[#00BBFF] tracking-[0.25em] uppercase mb-3">System Specs</h3>
          <ul className="space-y-2.5">
            {project.specs.map((spec, i) => (
              <li key={i} className="flex items-start gap-3 font-mono text-xs text-white/70 leading-relaxed">
                <span className="w-1 h-1 mt-2 bg-[#00BBFF] rounded-full shrink-0 shadow-[0_0_6px_#00BBFF]" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.aside>
  );
}

// ─── Corner Bracket (decorative) ───
function Bracket({ pos }) {
  const map = {
    tl: "top-3 left-3 border-t-[1.5px] border-l-[1.5px] rounded-tl-lg",
    tr: "top-3 right-3 border-t-[1.5px] border-r-[1.5px] rounded-tr-lg",
    bl: "bottom-3 left-3 border-b-[1.5px] border-l-[1.5px] rounded-bl-lg",
    br: "bottom-3 right-3 border-b-[1.5px] border-r-[1.5px] rounded-br-lg",
  };
  return <div className={`absolute w-6 h-6 border-[#00BBFF] ${map[pos]}`} />;
}

// ─── Single Card in 3D Arc (visual only — clicks handled at stage level) ───
function ArcCard({ card, index, isFocal, isHovered, cardRef }) {
  const glow = isFocal || isHovered;
  return (
    <div
      ref={cardRef}
      className="absolute top-1/2 left-1/2 w-[230px] h-[330px] md:w-[260px] md:h-[370px] rounded-[20px]"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
        pointerEvents: "none",
      }}
      data-index={index}
    >
      {/* Outer glow halo (focal OR hovered) */}
      <div
        className="absolute -inset-5 rounded-[32px] pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(55% 55% at 50% 55%, rgba(0,187,255,0.35), transparent 70%)",
          opacity: glow ? 1 : 0,
        }}
      />

      {/* Main card surface (visual only) */}
      <div
        className="relative w-full h-full rounded-[20px] overflow-hidden border transition-all duration-300"
        style={{
          borderColor: glow ? "rgba(0,187,255,0.65)" : "rgba(255,255,255,0.08)",
          boxShadow: glow
            ? "0 40px 100px rgba(0,0,0,0.7), 0 0 50px rgba(0,187,255,0.3), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Full-bleed image */}
        <img
          src={card.image}
          alt={card.title}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-transform duration-[900ms] ease-out"
          style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,7,12,0.2) 0%, rgba(7,7,12,0.35) 40%, rgba(7,7,12,0.85) 72%, rgba(7,7,12,0.96) 100%)",
          }}
        />

        {/* Corner brackets (focal or hovered) */}
        <div
          className="pointer-events-none transition-opacity duration-300"
          style={{ opacity: glow ? 1 : 0 }}
        >
          <Bracket pos="tl" />
          <Bracket pos="tr" />
          <Bracket pos="bl" />
          <Bracket pos="br" />
        </div>

        {/* Top chips */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
          <div
            className="font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-md border"
            style={{
              color: "#00BBFF",
              background: "rgba(0,187,255,0.08)",
              borderColor: "rgba(0,187,255,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            {card.category}
          </div>
          <div className="font-mono text-[10px] text-white/55 tracking-widest pt-1">
            #{card.id}
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute left-5 right-5 bottom-5 pointer-events-none">
          {/* Accent divider */}
          <div
            className="h-px mb-3 transition-all duration-300"
            style={{
              width: glow ? "56px" : "48px",
              background: glow
                ? "linear-gradient(90deg, #00BBFF, transparent)"
                : "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)",
              boxShadow: glow ? "0 0 10px rgba(0,187,255,0.6)" : "none",
            }}
          />
          <h3 className="font-display text-lg md:text-xl font-bold text-white tracking-wide leading-tight mb-1.5 line-clamp-1">
            {card.title}
          </h3>
          <p className="font-mono text-[10px] text-white/70 leading-relaxed line-clamp-2 mb-3">
            {card.desc}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {card.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[8px] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/15 text-white/75 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Active ping (focal only) */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500"
          style={{ opacity: isFocal ? 1 : 0 }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00BBFF] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00BBFF]" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Skills Section ───
export function Skills() {
  const [activeProject, setActiveProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [focalIndex, setFocalIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const focalValueRef = useRef(0);

  const applyAll = useCallback((focal) => {
    focalValueRef.current = focal;
    cardRefs.current.forEach((el, i) => {
      applyCardTransform(el, getCardTransform(i, focal));
    });
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: pinned scroll drives focal value
  useEffect(() => {
    const section = containerRef.current;
    if (!section || isMobile) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${N * 240}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const focal = self.progress * (N - 1);
          applyAll(focal);
          setFocalIndex(Math.round(focal));
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        applyAll(st.progress * (N - 1));
      });

      return () => {
        st.kill();
      };
    });

    return () => mm.revert();
  }, [isMobile, applyAll]);

  const setCardRef = (i) => (el) => {
    cardRefs.current[i] = el;
    if (el) applyCardTransform(el, getCardTransform(i, focalValueRef.current));
  };

  // Smooth manual navigation
  const navigate = (dir) => {
    const next = Math.max(0, Math.min(N - 1, Math.round(focalValueRef.current) + dir));
    setFocalIndex(next);
    gsap.to(focalValueRef, {
      current: next,
      duration: 0.55,
      ease: "power3.out",
      onUpdate: () => applyAll(focalValueRef.current),
    });
  };

  const jumpTo = (i) => {
    setFocalIndex(i);
    gsap.to(focalValueRef, {
      current: i,
      duration: 0.6,
      ease: "power3.out",
      onUpdate: () => applyAll(focalValueRef.current),
    });
  };

  // Click handler on the stage — manually finds which card was clicked.
  // Bypasses 3D hit-testing entirely so clicks ALWAYS work.
  const handleStageClick = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const hit = findCardAtX(relX, focalValueRef.current);
    if (hit >= 0) setActiveProject(SKILL_CARDS[hit]);
  };

  // Mouse move handler — updates cursor + hover state based on pointer position.
  const handleStageMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const hit = findCardAtX(relX, focalValueRef.current);
    stageRef.current.style.cursor = hit >= 0 ? "pointer" : "default";
    setHoveredIndex((prev) => (prev === hit ? prev : hit));
  };

  const handleStageLeave = () => {
    if (stageRef.current) stageRef.current.style.cursor = "default";
    setHoveredIndex(-1);
  };

  return (
    <>
      <section
        ref={containerRef}
        id="skills"
        className="relative bg-transparent overflow-hidden"
        style={!isMobile ? { height: "max(100vh, 820px)" } : undefined}
      >
        {!isMobile && (
          <>
            {/* Header */}
            <div className="absolute top-10 left-0 w-full z-30 pointer-events-none">
              <Container>
                <div className="text-center">
                  <h2 className="font-display text-[10px] md:text-xs text-[#00BBFF] tracking-[0.35em] uppercase mb-2">
                    <AnimatedText text={skillsSection.eyebrow} type="word" />
                  </h2>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 uppercase tracking-wide drop-shadow-[0_0_30px_rgba(0,187,255,0.25)]">
                    <AnimatedText text={skillsSection.title} type="letter" delay={0.2} stagger={0.05} />
                  </h3>
                  <p className="font-mono text-white/45 text-[11px] md:text-xs max-w-lg mx-auto">
                    <AnimatedText text={skillsSection.subtitle} type="word" delay={0.5} stagger={0.02} />
                  </p>
                </div>
              </Container>
            </div>

            {/* Ambient stars */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(1px 1px at 20% 30%, rgba(0,187,255,0.5) 50%, transparent 50%), radial-gradient(1px 1px at 75% 20%, rgba(138,43,226,0.4) 50%, transparent 50%), radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.3) 50%, transparent 50%), radial-gradient(1px 1px at 15% 80%, rgba(0,187,255,0.4) 50%, transparent 50%), radial-gradient(1px 1px at 85% 85%, rgba(255,255,255,0.4) 50%, transparent 50%)",
                backgroundSize: "100% 100%",
              }}
            />

            {/* Concentric ring backdrop — cinematic depth cue */}
            <div
              className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: "900px", height: "900px" }}
            >
              <div
                className="absolute inset-0 rounded-full border opacity-[0.07]"
                style={{ borderColor: "#00BBFF" }}
              />
              <div
                className="absolute inset-[18%] rounded-full border opacity-[0.1]"
                style={{ borderColor: "#00BBFF" }}
              />
              <div
                className="absolute inset-[34%] rounded-full border opacity-[0.14]"
                style={{ borderColor: "#00BBFF" }}
              />
              <div
                className="absolute inset-[50%] rounded-full border-[0.5px] opacity-[0.2]"
                style={{ borderColor: "#00BBFF" }}
              />
            </div>

            {/* Floor reflection glow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[750px] h-[220px] pointer-events-none"
              style={{
                top: "58%",
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(0,187,255,0.25) 0%, rgba(138,43,226,0.1) 40%, transparent 70%)",
                filter: "blur(48px)",
              }}
            />

            {/* 3D Arc Stage */}
            <div
              className="absolute inset-x-0 flex items-center justify-center"
              style={{ top: "140px", bottom: "220px" }}
            >
              <div
                ref={stageRef}
                onClick={handleStageClick}
                onMouseMove={handleStageMove}
                onMouseLeave={handleStageLeave}
                className="relative w-full h-full"
                style={{
                  perspective: "1600px",
                  perspectiveOrigin: "50% 50%",
                  transformStyle: "preserve-3d",
                }}
              >
                {SKILL_CARDS.map((card, idx) => (
                  <ArcCard
                    key={card.id}
                    card={card}
                    index={idx}
                    isFocal={idx === focalIndex}
                    isHovered={idx === hoveredIndex}
                    cardRef={setCardRef(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Left arrow */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={focalIndex === 0}
              className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:border-[#00BBFF]/60 hover:bg-[#00BBFF]/10 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={focalIndex === N - 1}
              className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:border-[#00BBFF]/60 hover:bg-[#00BBFF]/10 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Bottom HUD status bar */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
              <div className="flex items-center gap-4 px-5 py-2.5 rounded-full border border-white/10 bg-black/55 backdrop-blur-md">
                <span className="font-mono text-[10px] text-[#00BBFF] tracking-[0.25em] uppercase">
                  {SKILL_CARDS[focalIndex]?.category}
                </span>
                <span className="w-px h-3 bg-white/20" />
                <span className="font-display text-sm text-white font-bold tracking-wide">
                  {String(focalIndex + 1).padStart(2, "0")}
                  <span className="text-white/30"> / {String(N).padStart(2, "0")}</span>
                </span>
              </div>
              <div className="flex gap-1.5">
                {SKILL_CARDS.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => jumpTo(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === focalIndex ? "w-10 bg-[#00BBFF] shadow-[0_0_8px_rgba(0,187,255,0.6)]" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to card ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Mobile: simple snap scroll */}
        {isMobile && (
          <div className="w-full py-16 px-6">
            <h2 className="font-display text-xs text-[#00BBFF] tracking-[0.3em] uppercase mb-2 text-center">
              {skillsSection.eyebrow}
            </h2>
            <h3 className="font-display text-3xl font-bold text-white mb-2 uppercase tracking-wide text-center">
              {skillsSection.title}
            </h3>
            <p className="font-mono text-white/40 text-xs mb-8 text-center">← Swipe cards to explore →</p>
            <div
              className="flex gap-4 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              <div className="shrink-0 w-[15vw]" />
              {SKILL_CARDS.map((card) => (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveProject(card)}
                  className="snap-center shrink-0 w-[72vw] max-w-[300px] h-[420px] rounded-[20px] overflow-hidden border border-white/10 relative shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                >
                  <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7,7,12,0.2) 0%, rgba(7,7,12,0.35) 40%, rgba(7,7,12,0.85) 72%, rgba(7,7,12,0.96) 100%)",
                    }}
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-md border border-[#00BBFF]/30 bg-[#00BBFF]/10 text-[#00BBFF]">
                      {card.category}
                    </span>
                    <span className="font-mono text-[10px] text-white/55 tracking-widest pt-1">#{card.id}</span>
                  </div>
                  <div className="absolute left-5 right-5 bottom-5">
                    <div className="h-px w-12 mb-3 bg-gradient-to-r from-[#00BBFF] to-transparent" />
                    <h3 className="font-display text-xl font-bold text-white mb-1.5 leading-tight line-clamp-1">
                      {card.title}
                    </h3>
                    <p className="font-mono text-[11px] text-white/70 line-clamp-2 leading-relaxed mb-3">{card.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {card.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/15 text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="shrink-0 w-[15vw]" />
            </div>
          </div>
        )}
      </section>

      <AnimatePresence>
        {activeProject && <SkillRightDrawer project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>

      <style>{`
        #skills .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
