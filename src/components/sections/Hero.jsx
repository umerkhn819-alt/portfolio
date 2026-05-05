import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatedText } from "../ui/AnimatedText";
import { OptimizedImg } from "../ui/OptimizedImg";
import { PlanetEclipse } from "../3d/PlanetEclipse";
import { HERO_PROFILE_OPTIMIZED_BASE } from "../../lib/optimizedPaths";
import { experienceSection, experiences } from "../../data/experience";
import { heroCopy } from "../../data/heroCopy";
import { AboutExperienceHeroAccent } from "./AboutExperiencePreview";
import { StatusHUD } from "../hero/StatusHUD";
import { SocialsRail } from "../hero/SocialsRail";
import { ScrollCue } from "../hero/ScrollCue";

gsap.registerPlugin(ScrollTrigger);

const PROFILE_FALLBACK = "/profile.jpeg";

function refreshHeroScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/**
 * Hero — Desktop: reference-inspired portrait + mega type (theme).
 * Mobile: glass card layout.
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
            {heroCopy.topBar.name}{" "}
            <span className="text-[#F5F5F4]">{heroCopy.topBar.nameAccent}</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">
              {heroCopy.topBar.availability}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs uppercase tracking-widest text-white/70 sm:block">
            {heroCopy.topBar.menuLabel}
          </span>
          <button
            type="button"
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] text-white shadow-[0_0_24px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/[0.12] hover:text-white"
            data-cursor="Menu"
            aria-label={heroCopy.topBar.menuAriaLabel}
          >
            <span className="h-[2px] w-5 rounded-full bg-current" />
            <span className="h-[2px] w-5 rounded-full bg-current" />
          </button>
        </div>
      </div>

      {/* ─── Desktop (lg+): reference layout — portrait, mega type ─── */}
      <div className="relative z-10 mx-auto hidden min-h-[100dvh] w-full max-w-[1600px] flex-col px-6 pb-10 pt-24 lg:flex md:px-16">
        <StatusHUD />
        <SocialsRail />
        <ScrollCue />
        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center pb-40 pt-6">
          {/* Desktop: about / experience + icons — lateral negative space (behind portrait overlap) */}
          <div className="hero-scroll-out pointer-events-auto absolute left-16 top-[24%] z-[9] hidden w-[min(280px,22vw)] lg:block xl:left-20 xl:top-[26%] xl:w-[min(300px,19vw)]">
            <AboutExperienceHeroAccent />
          </div>
          <div className="hero-scroll-out pointer-events-auto absolute right-6 top-[22%] z-[9] hidden w-[min(220px,16vw)] xl:block xl:right-10 xl:top-[24%]">
            <div className="rounded-2xl border border-white/10 bg-[#0E0E0D]/55 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
                {experienceSection.eyebrow}
              </p>
              <p className="font-mono text-[11px] leading-snug text-white/55 xl:text-xs">
                {experienceSection.subtitle}
              </p>
              {experiences[0]?.highlights[0] ? (
                <p className="mt-3 border-l border-white/15 pl-3 font-mono text-[10px] leading-relaxed text-white/45">
                  {experiences[0].highlights[0]}
                </p>
              ) : null}
              <a
                href="#innovations"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/70 transition-colors hover:text-white"
              >
                {heroCopy.rightCard.innovationsLinkLabel}
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
                alt={heroCopy.profileAltDesktop}
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
              <span className="block text-[clamp(2.75rem,11vw,9.5rem)]">{heroCopy.mega.line1}</span>
              <span className="block text-[clamp(2.5rem,10vw,8.5rem)] text-[#F5F5F4]">
                {heroCopy.mega.line2}
                <sup className="ml-1 align-super text-[0.18em] font-bold text-white/70">®</sup>
              </span>
            </div>
            <p className="hero-clip-reveal mx-auto mt-5 hidden max-w-2xl font-mono text-sm leading-relaxed text-white/45 md:block">
              <AnimatedText
                text={heroCopy.mega.subtitle}
                type="word"
                delay={0.15}
                stagger={0.02}
              />
            </p>
          </div>

          {/* Floating CTA */}
          <button
            type="button"
            className="hero-scroll-out pointer-events-auto absolute bottom-[22%] right-[6%] z-30 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/[0.05] px-6 py-4 font-mono text-xs uppercase tracking-widest text-[#F5F5F4] shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.12] md:px-8 md:py-5"
            data-cursor="Book"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {heroCopy.scheduleCta}
          </button>
        </div>
      </div>

      {/* ─── Mobile (< lg): existing card layout ─── */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-5 pb-16 pt-28 lg:hidden">
        <div
          className="hero-mobile-card w-full max-w-[360px] overflow-hidden rounded-3xl flex flex-col"
          style={{
            background: "linear-gradient(145deg, rgba(14,14,13,0.92) 0%, rgba(14,14,13,0.78) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 25px 60px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent, rgba(245,245,244,0.35) 50%, transparent)",
              borderRadius: "12px 12px 0 0",
            }}
          />

          <div
            className="relative isolate h-[300px] w-full overflow-hidden"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(0,0,0,0))",
            }}
          >
            <OptimizedImg
              src={PROFILE_FALLBACK}
              optimizedBasePath={HERO_PROFILE_OPTIMIZED_BASE}
              alt={heroCopy.profileAltMobile}
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
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">
                {heroCopy.topBar.availability}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center px-6 pb-6 text-center">
            <h1
              className="mb-1 font-display text-3xl font-black tracking-tighter"
              style={{
                color: "#F5F5F4",
              }}
            >
              {heroCopy.mobile.headline}
            </h1>
            <p className="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              {heroCopy.mobile.rolePill}
            </p>
            <p className="mb-6 font-mono text-xs leading-relaxed text-white/55">
              {heroCopy.mobile.body}
            </p>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/25 bg-white py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-[#0E0E0D] shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform hover:bg-[#F5F5F4] active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {heroCopy.scheduleCta}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">
            {heroCopy.mobile.scrollHint}
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent hero-scroll-hint" />
        </div>
      </div>

      {/* Vertical nav — wide screens */}
      <div className="hero-nav absolute right-12 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-16 2xl:flex">
        {heroCopy.verticalNav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white/90"
            style={{ writingMode: "vertical-rl" }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}
