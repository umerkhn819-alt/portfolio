import gsap from "gsap";

const defaultsEase = "power3.out";

/**
 * Fade + slide section into view once.
 * @param {HTMLElement} el
 * @param {{ delay?: number; y?: number; start?: string; id?: string }} [opts]
 * @returns {gsap.core.Tween}
 */
export function bindSectionReveal(el, opts = {}) {
  if (!el) return null;
  const { delay = 0, y = 56, start = "top 88%", id } = opts;

  return gsap.fromTo(
    el,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: defaultsEase,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        id: id ?? el.id ?? undefined,
      },
    }
  );
}

/**
 * Stagger child elements when container enters view.
 * @param {HTMLElement} container
 * @param {string} childSelector
 * @param {gsap.TweenVars} fromVars
 * @param {gsap.TweenVars} toVars
 * @param {{ start?: string; stagger?: number; scrub?: boolean }} [opts]
 */
export function bindStaggerReveal(
  container,
  childSelector,
  fromVars,
  toVars,
  opts = {}
) {
  if (!container) return null;
  const targets = container.querySelectorAll(childSelector);
  if (!targets.length) return null;

  const { start = "top 82%", stagger = 0.1, scrub = false } = opts;

  return gsap.fromTo(
    targets,
    fromVars,
    {
      ...toVars,
      duration: toVars.duration ?? 0.65,
      ease: toVars.ease ?? defaultsEase,
      stagger: scrub ? false : { each: stagger, from: "start" },
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: scrub ? undefined : "play none none none",
        scrub: scrub || false,
      },
    }
  );
}

/**
 * Vertical parallax tied to scroll (scrub).
 * @param {HTMLElement} layer
 * @param {HTMLElement} boundsElement - usually section; used as ScrollTrigger scroller bounds
 * @param {{ y?: number; start?: string; end?: string }} [opts]
 */
export function bindParallaxY(layer, boundsElement, opts = {}) {
  if (!layer || !boundsElement) return null;
  const { y = 120, start = "top bottom", end = "bottom top" } = opts;

  return gsap.fromTo(
    layer,
    { y: -y * 0.35 },
    {
      y: y * 0.65,
      ease: "none",
      scrollTrigger: {
        trigger: boundsElement,
        start,
        end,
        scrub: true,
      },
    }
  );
}
