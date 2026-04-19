import gsap from "gsap";

/**
 * Intro timeline: text reveal, scale, opacity (mount-only).
 * @param {{
 *   eyebrow: HTMLElement | null;
 *   headline: HTMLElement | null;
 *   subcopy: HTMLElement | null;
 *   cta: HTMLElement | null;
 *   scrollHint: HTMLElement | null;
 * }} els
 * @returns {gsap.core.Timeline | null}
 */
export function createHeroIntroTimeline(els) {
  const { eyebrow, headline, subcopy, cta, scrollHint } = els;

  const textTargets = [eyebrow, headline, subcopy, cta].filter(Boolean);
  if (!textTargets.length) return null;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set(textTargets, {
    autoAlpha: 0,
    y: 44,
    scale: 0.96,
    filter: "blur(8px)",
    transformOrigin: "50% 50%",
  });

  tl.to(textTargets, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 0.9,
    stagger: 0.12,
  });

  if (scrollHint) {
    gsap.set(scrollHint, { autoAlpha: 0, y: 18 });
    tl.to(scrollHint, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.4");
  }

  return tl;
}

/**
 * Parallax for hero background layers (scrub while hero scrolls).
 * @param {HTMLElement} layer
 * @param {HTMLElement} heroRoot
 * @param {{ strength?: number }} [opts]
 */
export function bindHeroParallaxLayer(layer, heroRoot, opts = {}) {
  if (!layer || !heroRoot) return null;
  const strength = opts.strength ?? 140;

  return gsap.fromTo(
    layer,
    { y: -strength * 0.15 },
    {
      y: strength * 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: heroRoot,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}
