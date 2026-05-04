import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatedText } from "../ui/AnimatedText";
import { OptimizedImg } from "../ui/OptimizedImg";
import { PlanetEclipse } from "../3d/PlanetEclipse";
import { HERO_PROFILE_OPTIMIZED_BASE } from "../../lib/optimizedPaths";
import { experienceSection, experiences } from "../../data/experience";
import { AboutExperienceHeroAccent } from "./AboutExperiencePreview";

gsap.registerPlugin(ScrollTrigger);

const PROFILE_FALLBACK = "/profile.jpeg";

function refreshHeroScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** Small L-shaped corner marker (reference-style footer columns) */
function ColumnCorner() {
  return (
    <span
      className="block w-3 h-3 mb-4 border-t border-l border-white/35"
      aria-hidden
    />
  );
}

/**
 * Hero — Desktop: reference-inspired portrait + mega type + footer grid (theme).
 * Mobile: unchanged glass card layout.
 */
export function Hero() {
  const sectionRef = useRef(null);
  const foregroundRef = useRef(null);
  const midgroundRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const fg = foregroundRef.current;
    const mid = midgroundRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollOutEls = section.querySelectorAll(".hero-scroll-out");
      const clipRevealEls = section.querySelectorAll(".hero-clip-reveal");

      if (fg) {
        gsap.to(fg, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (mid) {
        gsap.to(mid, {
          y: -56,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Exit fade only in the final segment: bottom of hero crosses viewport bottom → top.
      // Keeps full opacity while the user previews the full hero.
      if (scrollOutEls.length) {
        gsap.to(scrollOutEls, {
          y: -120,
          opacity: 0,
          scale: 0.92,
          stagger: 0.05,
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      if (clipRevealEls.length) {
        gsap.fromTo(
          clipRevealEls,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.inOut",
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const statEls = section.querySelectorAll(".hero-stat-number");
      statEls.forEach((el) => {
        const target = parseInt(el.getAttribute("data-value"), 10);
        if (isNaN(target)) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + "+";
          },
        });
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        ".hero-mobile-card",
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-inner"
      className="relative min-h-screen w-full overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 z-0 [&>div]:!opacity-100">
        <PlanetEclipse />
      </div>

      {/* Top bar — desktop + mobile share */}
      <div className="hero-nav hero-scroll-out absolute top-0 inset-x-0 z-50 flex h-24 items-center justify-between px-6 md:px-16">
        <div className="flex items-center gap-4">
          <div className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
            Umer <span className="text-[#00BBFF]">ツ</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">
              Available
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs uppercase tracking-widest text-white/70 sm:block">
            Menu
          </span>
          <button
            type="button"
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] text-white shadow-[0_0_24px_rgba(0,187,255,0.12)] backdrop-blur-md transition-all duration-300 hover:border-[#00BBFF]/50 hover:bg-[#00BBFF]/15 hover:text-[#00BBFF]"
            data-cursor="Menu"
            aria-label="Open menu"
          >
            <span className="h-[2px] w-5 rounded-full bg-current" />
            <span className="h-[2px] w-5 rounded-full bg-current" />
          </button>
        </div>
      </div>

      {/* ─── Desktop (lg+): reference layout — portrait, mega type, footer grid ─── */}
      <div className="relative z-10 mx-auto hidden min-h-[100dvh] w-full max-w-[1600px] flex-col px-6 pb-10 pt-24 lg:flex md:px-16">
        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center pb-40 pt-6">
          {/* Desktop: about / experience + icons — lateral negative space (behind portrait overlap) */}
          <div className="hero-scroll-out pointer-events-auto absolute left-4 top-[24%] z-[9] hidden w-[min(280px,22vw)] lg:block xl:left-10 xl:top-[26%] xl:w-[min(300px,19vw)]">
            <AboutExperienceHeroAccent />
          </div>
          <div className="hero-scroll-out pointer-events-auto absolute right-6 top-[22%] z-[9] hidden w-[min(220px,16vw)] xl:block xl:right-10 xl:top-[24%]">
            <div className="rounded-2xl border border-white/10 bg-[#050508]/40 p-4 backdrop-blur-md">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
                {experienceSection.eyebrow}
              </p>
              <p className="font-mono text-[11px] leading-snug text-white/55 xl:text-xs">
                {experienceSection.subtitle}
              </p>
              {experiences[0]?.highlights[0] ? (
                <p className="mt-3 border-l border-[#00BBFF]/30 pl-3 font-mono text-[10px] leading-relaxed text-white/45">
                  {experiences[0].highlights[0]}
                </p>
              ) : null}
              <a
                href="#innovations"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#00BBFF] transition-colors hover:text-white"
              >
                View innovations
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div
            ref={midgroundRef}
            className="hero-scroll-out relative z-10 flex w-full max-w-[min(520px,42vw)] justify-center"
          >
            <div className="relative aspect-[3/4] w-full max-h-[min(68vh,720px)] min-h-[320px]">
              <OptimizedImg
                src={PROFILE_FALLBACK}
                optimizedBasePath={HERO_PROFILE_OPTIMIZED_BASE}
                alt="Muhammad Umer Khan"
                className="h-full w-full object-cover object-top grayscale-[15%] contrast-[1.08]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(max-width: 1280px) 42vw, 520px"
                width={1200}
                height={1600}
                onLoad={refreshHeroScrollTriggers}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent"
                aria-hidden
              />
            </div>
          </div>

          {/* Mega title — overlaps portrait + fade */}
          <div
            ref={foregroundRef}
            className="hero-scroll-out pointer-events-none absolute bottom-[6%] left-1/2 z-20 w-full max-w-6xl -translate-x-1/2 px-2 text-center"
          >
            <div className="hero-clip-reveal font-display font-black leading-[0.85] tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.85)]">
              <span className="block text-[clamp(2.75rem,11vw,9.5rem)]">UMER</span>
              <span className="block bg-gradient-to-r from-[#8A2BE2] via-[#00BBFF] to-[#00BBFF] bg-clip-text text-[clamp(2.5rem,10vw,8.5rem)] text-transparent">
                KHAN
                <sup className="ml-1 align-super text-[0.18em] font-bold text-white/90">®</sup>
              </span>
            </div>
            <p className="hero-clip-reveal mx-auto mt-5 hidden max-w-2xl font-mono text-sm leading-relaxed text-white/45 md:block">
              <AnimatedText
                text="AI engineering & full-stack development — trusted by brands worldwide."
                type="word"
                delay={0.15}
                stagger={0.02}
              />
            </p>
          </div>

          {/* Floating CTA */}
          <button
            type="button"
            className="hero-scroll-out pointer-events-auto absolute bottom-[22%] right-[6%] z-30 flex items-center gap-3 rounded-2xl border border-[#8A2BE2]/40 bg-gradient-to-br from-[#8A2BE2] to-[#6b24b8] px-6 py-4 font-mono text-xs uppercase tracking-widest text-white shadow-[0_20px_50px_rgba(138,43,226,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,187,255,0.25)] md:px-8 md:py-5"
            data-cursor="Book"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule a Call
          </button>
        </div>

        {/* Footer strip — 3 columns like reference */}
        <div className="hero-scroll-out mt-auto grid w-full grid-cols-1 gap-10 border-t border-white/10 pt-10 md:grid-cols-3 md:gap-8">
          <div>
            <ColumnCorner />
            <p className="font-display text-sm font-bold text-white md:text-base">© {new Date().getFullYear()}</p>
            <p className="mt-3 max-w-xs font-mono text-[11px] leading-relaxed text-white/55 md:text-xs">
              Designing intelligent products and full-stack systems that ship fast, scale cleanly, and feel premium.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="hero-stats">
                <div
                  className="hero-stat-number font-display text-2xl font-bold text-white drop-shadow md:text-3xl neon-text-cyan"
                  data-value="600"
                >
                  0+
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#00BBFF]">Projects</div>
              </div>
              <div className="hero-stats">
                <div
                  className="hero-stat-number font-display text-2xl font-bold text-white drop-shadow md:text-3xl neon-text-cyan"
                  data-value="50"
                >
                  0+
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#00BBFF]">Partners</div>
              </div>
              <div className="hero-stats">
                <div
                  className="hero-stat-number font-display text-2xl font-bold text-white drop-shadow md:text-3xl neon-text-cyan"
                  data-value="12"
                >
                  0+
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#00BBFF]">Years</div>
              </div>
            </div>
          </div>
          <div>
            <ColumnCorner />
            <p className="font-display text-sm font-bold text-white md:text-base">Engineering</p>
            <p className="mt-3 max-w-xs font-mono text-[11px] leading-relaxed text-white/55 md:text-xs">
              AI engineering, production web apps, and performance-first architecture — from prototype to launch.
            </p>
          </div>
          <div>
            <ColumnCorner />
            <p className="font-display text-sm font-bold text-white md:text-base">Experience</p>
            <p className="mt-3 max-w-xs font-mono text-[11px] leading-relaxed text-white/55 md:text-xs">
              Interfaces that stay crisp under motion, scroll, and 3D — cinematic UX without sacrificing usability.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Mobile (< lg): existing card layout ─── */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-5 pb-16 pt-28 lg:hidden">
        <div
          className="hero-mobile-card w-full max-w-[360px] overflow-hidden rounded-3xl flex flex-col"
          style={{
            background: "linear-gradient(145deg, rgba(10,10,20,0.9) 0%, rgba(18,10,35,0.85) 100%)",
            border: "1px solid rgba(0,187,255,0.25)",
            boxShadow:
              "0 0 0 1px rgba(138,43,226,0.15), 0 25px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,187,255,0.04)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent, #8A2BE2 30%, #00BBFF 70%, transparent)",
              borderRadius: "12px 12px 0 0",
            }}
          />

          <div
            className="relative isolate h-[300px] w-full overflow-hidden"
            style={{
              background: "linear-gradient(to bottom, rgba(138,43,226,0.12), rgba(0,0,0,0))",
            }}
          >
            <OptimizedImg
              src={PROFILE_FALLBACK}
              optimizedBasePath={HERO_PROFILE_OPTIMIZED_BASE}
              alt="Umer Khan"
              className="pointer-events-none absolute inset-0 z-0 block max-w-none object-[center_18%]"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              sizes="(max-width: 400px) 100vw, 360px"
              onLoad={refreshHeroScrollTriggers}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-t from-[rgba(10,10,20,0.95)] via-[rgba(10,10,20,0.45)] to-transparent"
              aria-hidden
            />
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-[#050505]/80 px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">Available</span>
            </div>
          </div>

          <div className="flex flex-col items-center px-6 pb-6 text-center">
            <h1
              className="mb-1 font-display text-3xl font-black tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #8A2BE2, #00BBFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              UMER KHAN
            </h1>
            <p className="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              AI Engineer &amp; Full Stack Dev
            </p>
            <p className="mb-6 font-mono text-xs leading-relaxed text-white/55">
              Trusted by 250+ clients &amp; 40 brands. Building intelligent, scalable web &amp; AI solutions.
            </p>

            <div className="mb-6 grid w-full grid-cols-3 overflow-hidden rounded-2xl border border-white/10">
              <div className="flex flex-col items-center px-2 py-4">
                <span className="font-display text-xl font-bold text-white">600+</span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#00BBFF]">Projects</span>
              </div>
              <div className="flex flex-col items-center border-x border-white/10 px-2 py-4">
                <span className="font-display text-xl font-bold text-white">50+</span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#00BBFF]">Partners</span>
              </div>
              <div className="flex flex-col items-center px-2 py-4">
                <span className="font-display text-xl font-bold text-white">12+</span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[#00BBFF]">Yrs Exp</span>
              </div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00BBFF] py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-[0_8px_24px_rgba(138,43,226,0.4)] transition-transform active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Call
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">Scroll to Explore</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent hero-scroll-hint" />
        </div>
      </div>

      {/* Vertical nav — wide screens */}
      <div className="hero-nav absolute right-12 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-16 2xl:flex">
        <a
          href="#projects"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-[#00BBFF]"
          style={{ writingMode: "vertical-rl" }}
        >
          Works
        </a>
        <a
          href="#innovations"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-[#00BBFF]"
          style={{ writingMode: "vertical-rl" }}
        >
          Innovations
        </a>
        <a
          href="#contact"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-[#00BBFF]"
          style={{ writingMode: "vertical-rl" }}
        >
          Contact
        </a>
      </div>
    </section>
  );
}
