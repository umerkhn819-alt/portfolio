import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCinematic } from "./CinematicContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * CinematicScene — wraps a section in a pinned fullscreen scene.
 *
 * Props:
 * - id: string — section id (used for ScrollTrigger and nav)
 * - label: string — human-readable scene name (for nav dots)
 * - sceneIndex: number — order in the scene sequence
 * - children: React node
 * - pinDuration: string — how long the pin lasts (default "+=100%")
 * - transition: "zoom-in" | "slide-up" | "fade" — entry animation type
 * - horizontal: boolean — if true, skip pinning (Skills already handles its own)
 * - noPin: boolean — if true, skip pinning entirely (for sections that self-manage)
 */
export function CinematicScene({
  id,
  label = "",
  sceneIndex = 0,
  children,
  pinDuration = "+=100%",
  transition = "zoom-in",
  horizontal = false,
  noPin = false,
}) {
  const sceneRef = useRef(null);
  const contentRef = useRef(null);
  const { setCurrentScene, setScrollProgress, registerScene, isMobile } =
    useCinematic();

  // Register this scene's label in the context
  useEffect(() => {
    registerScene(sceneIndex, label || id);
  }, [sceneIndex, label, id, registerScene]);

  useLayoutEffect(() => {
    const el = sceneRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    // Clear any previous inline styles (like filter: blur) applied by GSAP
    // This fixes the issue where desktop styles get stuck when resizing to mobile.
    gsap.set(content, { clearProps: "all" });

    if (isMobile) {
      // On mobile, completely skip wrapper animations to guarantee visibility and native scroll performance.
      return;
    }

    if (horizontal || noPin) {
      // Desktop with noPin: ONLY fade-in. We CANNOT apply 'y' (transform) on desktop 
      // because transform on a parent breaks position:fixed used by child ScrollTriggers for pinning!
      const tween = gsap.fromTo(
        content,
        { opacity: 0 },
        {
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      return () => {
        tween.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === el)
          .forEach((t) => t.kill());
      };
    }

    // ── DESKTOP: Pinned scene with scroll-driven animation timeline ──

    // Entry animation based on transition type
    const tl = gsap.timeline();

    switch (transition) {
      case "zoom-in":
        gsap.set(content, {
          scale: 0.88,
          opacity: 0,
          filter: "blur(12px)",
          transformOrigin: "center center",
        });
        tl.to(content, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        });
        break;

      case "slide-up":
        gsap.set(content, {
          y: 120,
          opacity: 0,
          scale: 0.95,
        });
        tl.to(content, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        });
        break;

      case "fade":
        gsap.set(content, { opacity: 0 });
        tl.to(content, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
        break;

      default:
        gsap.set(content, { opacity: 1 });
        break;
    }

    // Pin the scene and scrub the timeline
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: pinDuration,
      pin: true,
      scrub: 0.8,
      animation: tl,
      pinSpacing: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
      onEnter: () => setCurrentScene(sceneIndex),
      onEnterBack: () => setCurrentScene(sceneIndex),
    });

    return () => {
      tl.kill();
      st.kill();
    };
  }, [
    isMobile,
    horizontal,
    noPin,
    transition,
    pinDuration,
    sceneIndex,
    setCurrentScene,
    setScrollProgress,
  ]);

  return (
    <section
      ref={sceneRef}
      id={id}
      className="cinematic-scene"
      data-scene-index={sceneIndex}
    >
      <div ref={contentRef} className="cinematic-scene__content">
        {children}
      </div>
    </section>
  );
}
