import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * CinematicCursor — custom cursor with outer ring + inner dot.
 * - Outer ring scales on hoverable elements
 * - Inner dot follows with spring physics
 * - mix-blend-mode: difference for contrast
 * - Disabled on touch devices
 */
export function CinematicCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const textRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const hasTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (hasTouch || window.innerWidth < 768) {
      setIsTouch(true);
      return;
    }

    const outer = outerRef.current;
    const inner = innerRef.current;
    const textEl = textRef.current;
    if (!outer || !inner) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Track mouse position
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Inner dot follows instantly
      gsap.to(inner, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Outer ring follows with spring delay
      gsap.to(outer, {
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    // Scale up on hoverable elements
    const onMouseEnter = (e) => {
      gsap.to(outer, {
        scale: 2.2,
        borderColor: "rgba(245,245,244,0.55)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(inner, {
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });

      // Show cursor text based on element type
      const el = e.target.closest("[data-cursor]");
      if (el && textEl) {
        textEl.textContent = el.getAttribute("data-cursor");
        gsap.to(textEl, { opacity: 1, duration: 0.2 });
      }
    };

    const onMouseLeave = () => {
      gsap.to(outer, {
        scale: 1,
        borderColor: "rgba(255,255,255,0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(inner, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      if (textEl) {
        gsap.to(textEl, { opacity: 0, duration: 0.15 });
      }
    };

    // Hide cursor when leaving window
    const onMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        gsap.to([outer, inner], { opacity: 0, duration: 0.2 });
      }
    };
    const onMouseOver = () => {
      gsap.to([outer, inner], { opacity: 1, duration: 0.2 });
    };

    // Register events
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseover", onMouseOver);

    // Delegate hover to all interactive elements
    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor], .nav-dot-wrapper, .slider-nav-btn';

    const addHoverListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    // Initial + observe DOM changes
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseover", onMouseOver);
      observer.disconnect();
      document.body.style.cursor = "";

      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [isTouch]);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <>
      {/* Outer ring */}
      <div ref={outerRef} className="cinematic-cursor-outer" />
      {/* Inner dot */}
      <div ref={innerRef} className="cinematic-cursor-inner">
        <span ref={textRef} className="cinematic-cursor-text" />
      </div>

      <style>{`
        .cinematic-cursor-outer {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          will-change: transform;
          transition: border-color 0.3s ease;
        }

        .cinematic-cursor-inner {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cinematic-cursor-text {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: white;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
        }

        /* Hide on mobile */
        @media (max-width: 767px) {
          .cinematic-cursor-outer,
          .cinematic-cursor-inner { display: none; }
        }

        /* Elements with data-cursor should not have default cursor */
        [data-cursor] { cursor: none; }
      `}</style>
    </>
  );
}
