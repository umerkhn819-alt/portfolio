import { useGsapContext } from "../../hooks/useGsapContext";
import { bindSectionReveal, bindParallaxY } from "../../animations/scrollReveal";

export function Section({
  id,
  children,
  className = "",
  delay = 0,
  parallax = false,
}) {
  const sectionRef = useGsapContext(
    (el) => {
      if (!el) return;
      bindSectionReveal(el, { delay, id });
      const layer = el.querySelector("[data-section-parallax]");
      if (parallax && layer) {
        bindParallaxY(layer, el, { y: 100, start: "top bottom", end: "bottom top" });
      }
    },
    [delay, id, parallax]
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden py-16 sm:py-20 md:py-24 ${className}`}
    >
      {parallax ? (
        <div
          data-section-parallax
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.04),transparent)]"
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
