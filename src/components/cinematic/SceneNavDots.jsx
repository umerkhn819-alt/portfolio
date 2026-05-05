import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useCinematic } from "./CinematicContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * SceneNavDots — fixed right-side navigation dots (Keynote-style).
 * Shows one dot per scene; active dot pulses. Click scrolls to scene.
 * Hidden on mobile.
 */
export function SceneNavDots() {
  const { currentScene, sceneLabels, isMobile } = useCinematic();
  const containerRef = useRef(null);

  // Animate the active dot on scene change
  useEffect(() => {
    if (!containerRef.current) return;
    const dots = containerRef.current.querySelectorAll(".nav-dot");
    dots.forEach((dot, i) => {
      if (i === currentScene) {
        gsap.to(dot, {
          scale: 1.4,
          boxShadow: "0 0 12px rgba(255,255,255,0.35), 0 0 28px rgba(255,255,255,0.12)",
          backgroundColor: "#F5F5F4",
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(dot, {
          scale: 1,
          boxShadow: "none",
          backgroundColor: "rgba(255,255,255,0.2)",
          duration: 0.35,
          ease: "power2.out",
        });
      }
    });
  }, [currentScene]);

  const scrollToScene = (index) => {
    const target = document.querySelector(`[data-scene-index="${index}"]`);
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 0 },
        duration: 1.2,
        ease: "power3.inOut",
      });
    }
  };

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <nav
      ref={containerRef}
      className="scene-nav-dots"
      aria-label="Scene navigation"
    >
      {sceneLabels.map((label, i) => (
        <button
          key={i}
          className="nav-dot-wrapper group"
          onClick={() => scrollToScene(i)}
          aria-label={`Go to ${label}`}
          aria-current={i === currentScene ? "true" : undefined}
        >
          {/* Label tooltip */}
          <span className="nav-dot-label">{label}</span>
          {/* Dot */}
          <span className="nav-dot" />
          {/* Active ring */}
          {i === currentScene && <span className="nav-dot-ring" />}
        </button>
      ))}

      <style>{`
        .scene-nav-dots {
          position: fixed;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9000;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .nav-dot-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
        }

        .nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: background 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .nav-dot-ring {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid rgba(245,245,244,0.35);
          animation: navDotPulse 2s ease-in-out infinite;
          z-index: 1;
        }

        .nav-dot-label {
          position: absolute;
          right: 28px;
          white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          background: rgba(5,5,5,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 4px 10px;
          border-radius: 6px;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }

        .nav-dot-wrapper:hover .nav-dot-label {
          opacity: 1;
          transform: translateX(0);
        }

        .nav-dot-wrapper:hover .nav-dot {
          background: rgba(245,245,244,0.45) !important;
        }

        @keyframes navDotPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0; }
        }

        @media (max-width: 767px) {
          .scene-nav-dots { display: none; }
        }
      `}</style>
    </nav>
  );
}
