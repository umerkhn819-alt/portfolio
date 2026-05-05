import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollProgressBar — thin gradient line at top of viewport.
 * Animates width from 0% → 100% based on total page scroll progress.
 */
export function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      gsap.set(bar, { scaleX: progress });
    };

    // Listen to scroll
    ScrollTrigger.addEventListener("refresh", updateProgress);
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      ScrollTrigger.removeEventListener("refresh", updateProgress);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress-track">
        <div ref={barRef} className="scroll-progress-bar" />
      </div>

      <style>{`
        .scroll-progress-track {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 9999;
          background: rgba(255,255,255,0.03);
          overflow: hidden;
        }

        .scroll-progress-bar {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #3A3A38, #D6D6D2, #F5F5F4);
          transform-origin: left center;
          transform: scaleX(0);
          will-change: transform;
          box-shadow: 0 0 10px rgba(255,255,255,0.15);
        }
      `}</style>
    </>
  );
}
