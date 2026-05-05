import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  aboutHighlights,
  aboutSpotlight,
} from "../../data/about";
import { experiences } from "../../data/experience";
import { Container } from "../ui/Container";
import { AnimatedText } from "../ui/AnimatedText";

/* ─── Card data — 7 cards for a convincing deep curve ─────────────────── */

const CARDS = [
  {
    id: "skill-ai",
    type: "skill",
    icon: "⚡",
    label: "Core Capability",
    title: aboutHighlights[0].title,
    body: aboutHighlights[0].body,
    highlights: [],
    accent: "#D6D6D2",
    accentRgb: "214,214,210",
  },
  {
    id: "skill-fullstack",
    type: "skill",
    icon: "🔧",
    label: "Core Capability",
    title: aboutHighlights[1].title,
    body: aboutHighlights[1].body,
    highlights: [],
    accent: "#BDBDB8",
    accentRgb: "189,189,184",
  },
  {
    id: "skill-interactive",
    type: "skill",
    icon: "✨",
    label: "Core Capability",
    title: aboutHighlights[2].title,
    body: aboutHighlights[2].body,
    highlights: [],
    accent: "#A1A19C",
    accentRgb: "161,161,156",
  },
  {
    id: "focus",
    type: "focus",
    icon: "🎯",
    label: "Focus",
    title: "Focus & Outlook",
    body: aboutSpotlight.body,
    highlights: aboutSpotlight.bullets,
    accent: "#C4C4BF",
    accentRgb: "196,196,191",
  },
  {
    id: "exp-senior",
    type: "achievement",
    icon: "🚀",
    label: "Achievement",
    title: "Achievement: Leading Advanced AI/ML Scaling",
    body: experiences[0].description,
    highlights: experiences[0].highlights,
    meta: `${experiences[0].company} · ${experiences[0].duration}`,
    accent: "#8A8A86",
    accentRgb: "138,138,134",
  },
  {
    id: "exp-fullstack",
    type: "achievement",
    icon: "🏗️",
    label: "Achievement",
    title: "Achievement: Architecting Interactive & Scalable Web Solutions",
    body: experiences[1].description,
    highlights: experiences[1].highlights,
    meta: `${experiences[1].company} · ${experiences[1].duration}`,
    accent: "#9E9E99",
    accentRgb: "158,158,153",
  },
  {
    id: "exp-junior",
    type: "milestone",
    icon: "🌱",
    label: "Milestone",
    title: "Milestone: Foundation in Full-Stack & UI/UX Development",
    body: experiences[2].description,
    highlights: experiences[2].highlights,
    meta: `${experiences[2].company} · ${experiences[2].duration}`,
    accent: "#ADADA8",
    accentRgb: "173,173,168",
  },
];

const TOTAL = CARDS.length;

/* ─── 3D positional config per relative offset from active card ─────────── */
const POSITION_CONFIG = [
  { rotateY: -72, translateZ: -480, scale: 0.60, opacity: 0.75, blur: "blur(0px)", zOffset: -3 },
  { rotateY: -48, translateZ: -320, scale: 0.74, opacity: 0.85, blur: "blur(0px)", zOffset: -2 },
  { rotateY: -26, translateZ: -160, scale: 0.86, opacity: 0.95, blur: "blur(0px)", zOffset: -1 },
  { rotateY: 0, translateZ: 0, scale: 1.00, opacity: 1.00, blur: "blur(0px)", zOffset: 0 }, // active
  { rotateY: 26, translateZ: -160, scale: 0.86, opacity: 0.95, blur: "blur(0px)", zOffset: -1 },
  { rotateY: 48, translateZ: -320, scale: 0.74, opacity: 0.85, blur: "blur(0px)", zOffset: -2 },
  { rotateY: 72, translateZ: -480, scale: 0.60, opacity: 0.75, blur: "blur(0px)", zOffset: -3 },
];

function getConfig(offset) {
  const clamped = Math.max(-3, Math.min(3, offset));
  return POSITION_CONFIG[clamped + 3];
}

/* ─── Individual Card ────────────────────────────────────────────────────── */
function SliderCard({ card, cardRef, isActive }) {
  return (
    <div
      ref={cardRef}
      className="slider-card"
      data-active={isActive}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "clamp(260px, 28vw, 380px)",
        height: "clamp(340px, 42vh, 500px)",
        marginLeft: "calc(clamp(260px, 28vw, 380px) / -2)",
        marginTop: "calc(clamp(340px, 42vh, 500px) / -2)",
        borderRadius: "20px",
        padding: "28px 26px",
        boxSizing: "border-box",
        cursor: "default",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
        // initial state — overridden immediately by GSAP
        background: "var(--card-bg)",
        border: `1px solid var(--card-border)`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflow: "hidden",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {/* Spotlight radial glow — only on active */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "20px",
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(${card.accentRgb}, 0.18), transparent 70%)`,
          pointerEvents: "none",
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
          borderRadius: "20px 20px 0 0",
          opacity: isActive ? 1 : 0.3,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Label badge */}
      <span
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          alignItems: "center",
          gap: "6px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: card.accent,
          background: `rgba(${card.accentRgb}, 0.14)`,
          padding: "4px 10px",
          borderRadius: "20px",
          border: `1px solid rgba(${card.accentRgb}, 0.28)`,
          position: "relative",
          zIndex: 2,
        }}
      >
        {card.icon} {card.label}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
          fontSize: "clamp(14px, 1.35vw, 18px)",
          fontWeight: 700,
          lineHeight: 1.3,
          color: "var(--text-primary)",
          margin: 0,
          position: "relative",
          zIndex: 2,
        }}
      >
        {card.title}
      </h3>

      {/* Meta (company / date) */}
      {card.meta && (
        <p
          style={{
            fontSize: "11px",
            color: card.accent,
            margin: 0,
            fontWeight: 600,
            letterSpacing: "0.04em",
            position: "relative",
            zIndex: 2,
          }}
        >
          {card.meta}
        </p>
      )}

      {/* Body */}
      <p
        style={{
          fontSize: "clamp(11px, 1.1vw, 13px)",
          lineHeight: 1.65,
          color: "var(--text-secondary)",
          margin: 0,
          position: "relative",
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        {card.body}
      </p>

      {/* Highlights / bullets */}
      {card.highlights.length > 0 && (
        <ul
          style={{
            margin: "4px 0 0",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            position: "relative",
            zIndex: 2,
            overflowY: "auto",
            flexGrow: 1,
          }}
        >
          {card.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "clamp(10px, 1vw, 12px)",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  marginTop: "5px",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: card.accent,
                  flexShrink: 0,
                }}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Active card border glow */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            border: `1.5px solid rgba(${card.accentRgb}, 0.55)`,
            boxShadow: `0 0 40px rgba(${card.accentRgb}, 0.28), inset 0 0 24px rgba(${card.accentRgb}, 0.05)`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

/* ─── Main Innovations Section ────────────────────────────────────────────── */
export function Innovations() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef([]);
  const sceneRef = useRef(null);
  const animating = useRef(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile || !sceneRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    
    // ── Camera zoom entry: scale up from 0.92 ──
    gsap.fromTo(".slider-scene-inner",
      { scale: 0.92, opacity: 0, filter: "blur(6px)" },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#innovations",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ── Heading clip-path reveal ──
    gsap.fromTo(
      ".inno-heading",
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: "#innovations",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ── Scale down + blur exit when scrolling past ──
    gsap.to(sceneRef.current, {
      scale: 0.5,
      opacity: 0,
      y: -100,
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: "#innovations",
        start: "center top",
        end: "bottom top",
        scrub: true,
      }
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [isMobile]);

  /* Apply 3D + opacity + blur + zIndex to all cards */
  const applyPositions = useCallback((newActive, animate = true) => {
    CARDS.forEach((card, i) => {
      const el = cardRefs.current[i];
      if (!el) return;

      const offset = i - newActive;
      const cfg = getConfig(offset);
      const isAct = offset === 0;

      const transformStr = `perspective(1200px) rotateY(${cfg.rotateY}deg) translateZ(${cfg.translateZ}px) scale(${cfg.scale})`;
      // Active card always highest: TOTAL+1; others decrease by absolute offset
      const zIndex = isAct ? TOTAL + 1 : Math.max(1, TOTAL - Math.abs(offset));

      const bg = isAct
        ? `var(--card-bg-active)`
        : `var(--card-bg)`;

      const boxShadow = isAct
        ? `var(--card-shadow-active), 0 0 0 1.5px rgba(${card.accentRgb}, 0.4)`
        : `var(--card-shadow)`;

      const props = {
        transform: transformStr,
        opacity: cfg.opacity,
        zIndex,
        background: bg,
        boxShadow,
        filter: cfg.blur,
        pointerEvents: isAct ? "auto" : "none",
        overwrite: "auto",
      };

      if (animate) {
        gsap.to(el, {
          ...props,
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: () => { animating.current = false; },
        });
      } else {
        gsap.set(el, props);
      }
    });
  }, []);

  // Initial layout (no animation)
  useEffect(() => {
    applyPositions(activeIndex, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useCallback(
    (dir) => {
      if (animating.current) return;
      animating.current = true;
      const next = (activeIndex + dir + TOTAL) % TOTAL;
      setActiveIndex(next);
      applyPositions(next, true);
    },
    [activeIndex, applyPositions]
  );

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return (
    <>
      {/* Scoped styles */}
      <style>{`
        #innovations {
          background: transparent;
          position: relative;
          overflow: hidden;
          padding: 80px 0 100px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          transition: background 0.4s ease;
        }

        .slider-scene {
          position: relative;
          width: 100%;
          height: clamp(400px, 55vh, 540px);
          perspective: 1400px;
          perspective-origin: 50% 50%;
          margin-top: 32px;
        }

        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 200;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          color: var(--text-primary);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 22px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          outline: none;
          box-shadow: var(--card-shadow);
        }
        .slider-nav-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.35);
          box-shadow: 0 0 20px rgba(255,255,255,0.08);
          transform: translateY(-50%) scale(1.1);
        }
        .slider-nav-btn:active {
          transform: translateY(-50%) scale(0.96);
        }
        .slider-nav-btn.prev { left: clamp(8px, 3vw, 48px); }
        .slider-nav-btn.next { right: clamp(8px, 3vw, 48px); }

        .dot-nav {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 36px;
        }
        .dot-nav button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
          outline: none;
          background: var(--card-border);
        }
        .dot-nav button.active-dot {
          width: 28px;
          border-radius: 4px;
        }

        .inno-eyebrow {
          color: #8A8A86;
        }
        .inno-heading {
          background: linear-gradient(135deg, #F5F5F4 0%, #D6D6D2 50%, #8A8A86 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .inno-subtitle {
          color: var(--text-secondary);
        }
        .inno-counter {
          color: var(--text-secondary);
          opacity: 0.6;
        }

        @media (max-width: 767px) {
          .slider-scene-desktop { display: none !important; }
          .slider-dot-nav { display: none !important; }
          .slider-counter { display: none !important; }
          #innovations { padding: 60px 0 40px; min-height: auto; }
        }
        @media (min-width: 768px) {
          .slider-mobile-cards { display: none !important; }
        }
      `}</style>

      <section id="innovations">

        <Container style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Heading — always shown */}
          <div style={{ marginBottom: "8px" }}>
            <p className="inno-eyebrow" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "12px" }}>
              Innovations &amp; Capabilities
            </p>
            <h2
              className="inno-heading"
              style={{
                fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
                fontSize: "clamp(24px, 4vw, 46px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Innovations, Milestones<br />
              &amp; Core Capabilities
            </h2>
            <div className="inno-subtitle" style={{ marginTop: "14px", fontSize: "clamp(13px, 1.4vw, 15px)", maxWidth: "540px", lineHeight: 1.65 }}>
              <AnimatedText text="Building intelligent systems where AI meets real-world applications — from core capabilities to landmark achievements." type="word" />
            </div>
          </div>

          {/* ── DESKTOP: 3D Coverflow slider ── */}
          {!isMobile && (
            <>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", opacity: 0.45, marginTop: "6px", letterSpacing: "0.06em" }}>
                ← → arrow keys or click arrows to navigate
              </p>

              <div className="slider-scene" ref={sceneRef} aria-label="3D card slider" role="region">
                <div className="slider-scene-inner" style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
                  {CARDS.map((card, i) => (
                    <SliderCard
                      key={card.id}
                      card={card}
                      cardRef={(el) => (cardRefs.current[i] = el)}
                      isActive={i === activeIndex}
                    />
                  ))}
                </div>
                <button className="slider-nav-btn prev" onClick={() => navigate(-1)} aria-label="Previous card">‹</button>
                <button className="slider-nav-btn next" onClick={() => navigate(1)} aria-label="Next card">›</button>
              </div>

              <nav className="dot-nav" aria-label="Card navigation">
                {CARDS.map((card, i) => (
                  <button
                    key={card.id}
                    className={i === activeIndex ? "active-dot" : ""}
                    style={{ background: i === activeIndex ? CARDS[activeIndex].accent : undefined }}
                    onClick={() => {
                      if (animating.current || i === activeIndex) return;
                      animating.current = true;
                      setActiveIndex(i);
                      applyPositions(i, true);
                    }}
                    aria-label={`Go to ${card.title}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                  />
                ))}
              </nav>

              <p className="inno-counter" style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", letterSpacing: "0.08em" }}>
                {activeIndex + 1} / {TOTAL} — {CARDS[activeIndex].label}
              </p>
            </>
          )}

          {/* ── MOBILE: Horizontal snap-scroll ── */}
          {isMobile && (
            <>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", opacity: 0.5, marginTop: "6px", letterSpacing: "0.06em" }}>
                ← Swipe to explore →
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  overflowX: "auto",
                  paddingBottom: 20,
                  paddingTop: 20,
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                }}
              >
                {/* Leading spacer */}
                <div style={{ flexShrink: 0, width: 4 }} />
                {CARDS.map((card) => (
                  <div
                    key={card.id}
                    style={{
                      flexShrink: 0,
                      width: "78vw",
                      maxWidth: 300,
                      scrollSnapAlign: "center",
                      borderRadius: 20,
                      padding: "24px 20px",
                      background: "var(--card-bg)",
                      border: `1px solid var(--card-border)`,
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top accent bar */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`, borderRadius: "20px 20px 0 0" }} />
                    {/* Label badge */}
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: card.accent, background: `rgba(${card.accentRgb}, 0.14)`, padding: "4px 10px", borderRadius: 20, border: `1px solid rgba(${card.accentRgb}, 0.28)` }}>
                      {card.icon} {card.label}
                    </span>
                    <h3 style={{ fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif", fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: "var(--text-primary)", margin: "10px 0 6px" }}>{card.title}</h3>
                    {card.meta && <p style={{ fontSize: 11, color: card.accent, margin: "0 0 6px", fontWeight: 600 }}>{card.meta}</p>}
                    <p style={{ fontSize: 12, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{card.body}</p>
                    {card.highlights.length > 0 && (
                      <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                        {card.highlights.slice(0, 3).map((h, idx) => (
                          <li key={idx} style={{ fontSize: 11, color: "var(--text-secondary)", paddingLeft: 14, position: "relative" }}>
                            <span style={{ position: "absolute", left: 0, color: card.accent }}>▸</span>{h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {/* Trailing spacer */}
                <div style={{ flexShrink: 0, width: 4 }} />
              </div>
            </>
          )}

        </Container>
      </section>
    </>
  );
}

