import gsap from "gsap";
import { registerGsapPlugins } from "./gsapSetup";

/**
 * Smooth scroll to an element by id (navbar offset for fixed header).
 * @param {string} id - without #
 * @param {{ offsetY?: number; duration?: number }} [opts]
 */
export function smoothScrollToId(id, opts = {}) {
  registerGsapPlugins();
  const el = document.getElementById(id);
  if (!el) return;

  const { offsetY = 72, duration = 1.05 } = opts;

  gsap.to(window, {
    duration,
    ease: "power3.inOut",
    scrollTo: { y: el, offsetY, autoKill: true },
  });
}
