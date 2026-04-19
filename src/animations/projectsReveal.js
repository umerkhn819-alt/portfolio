import gsap from "gsap";

/**
 * Sequential card reveal on scroll (one-shot).
 * @param {HTMLElement} grid
 * @param {{ start?: string; stagger?: number }} [opts]
 */
export function bindProjectsSequentialReveal(grid, opts = {}) {
  if (!grid) return null;
  const cards = grid.querySelectorAll("[data-project-card]");
  if (!cards.length) return null;

  const { start = "top 78%", stagger = 0.14 } = opts;

  gsap.set(cards, {
    autoAlpha: 0,
    y: 56,
    rotateX: 6,
    transformPerspective: 900,
    transformOrigin: "50% 100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  });

  return gsap.to(cards, {
    autoAlpha: 1,
    y: 0,
    rotateX: 0,
    duration: 0.75,
    ease: "power3.out",
    stagger: { each: stagger, from: "start" },
    scrollTrigger: {
      trigger: grid,
      start,
      toggleActions: "play none none none",
    },
  });
}
