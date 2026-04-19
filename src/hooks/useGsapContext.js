import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "../animations/gsapSetup";

/**
 * Runs GSAP code inside gsap.context for automatic cleanup (Strict Mode safe).
 * @param {(scopeEl: HTMLElement | null) => void} setup
 * @param {import("react").DependencyList} [deps]
 */
export function useGsapContext(setup, deps = []) {
  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const ctx = gsap.context(() => setup(scopeRef.current), scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
