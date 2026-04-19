import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;

/**
 * Register GSAP plugins once (safe to call multiple times).
 */
export function registerGsapPlugins() {
  if (registered) return gsap;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger };
