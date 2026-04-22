import { useEffect } from "react";
import { useGsapContext } from "../../hooks/useGsapContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatedText } from "../ui/AnimatedText";
import { PlanetEclipse } from "../3d/PlanetEclipse";

// --- Main Hero Section ---
export function Hero() {

  useGsapContext((root) => {
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    // Disappear/Appear Scroll Pattern for Hero elements
    gsap.to(".hero-scroll-out", {
      y: -150,
      opacity: 0,
      scale: 0.9,
      stagger: 0.05,
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Mobile card entrance animation
    gsap.fromTo(".hero-mobile-card",
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-transparent">

      {/* 3D Eclipse Planet Background */}
      <PlanetEclipse />

      {/* 1. Top Navigation Bar */}
      <div className="hero-nav absolute top-0 inset-x-0 h-24 flex items-center justify-between px-6 md:px-16 z-50">
        <div className="font-display text-white text-2xl font-bold tracking-tight">
          Umer <span className="text-[#00BBFF]">ツ</span>
        </div>

        <div className="hidden lg:flex items-center gap-3 bg-[#050505]/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2">
          <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="font-mono text-xs text-white/80 tracking-wider uppercase">Available for Freelance</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-white uppercase tracking-widest hidden sm:block">Menu</span>
          <button className="w-12 h-12 rounded-full bg-white text-black flex flex-col items-center justify-center gap-1.5 hover:bg-[#00BBFF] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <span className="w-5 h-[2px] bg-current rounded-full" />
            <span className="w-5 h-[2px] bg-current rounded-full" />
          </button>
        </div>
      </div>

      {/* 2. Main Content Grid — DESKTOP ONLY (lg+) */}
      <div className="relative z-10 w-full min-h-[100dvh] max-w-[1600px] mx-auto hidden lg:grid lg:grid-cols-12 px-6 md:px-16">

        {/* Left Column: Text & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full pb-20 lg:pb-0 z-20">

          {/* Avatar Stack */}
          <div className="hero-text-stagger hero-scroll-out flex items-center gap-5 mb-10">
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#050505] bg-gray-800 overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="client" className="w-full h-full object-cover" /></div>
              <div className="w-12 h-12 rounded-full border-2 border-[#050505] bg-gray-700 overflow-hidden"><img src="https://i.pravatar.cc/100?img=2" alt="client" className="w-full h-full object-cover" /></div>
              <div className="w-12 h-12 rounded-full border-2 border-[#050505] bg-gray-600 overflow-hidden"><img src="https://i.pravatar.cc/100?img=3" alt="client" className="w-full h-full object-cover" /></div>
            </div>
            <div className="font-mono text-sm text-white/70 leading-snug">
              <span className="text-white font-bold text-xl tracking-wide">120+</span> <br /> Total Satisfied Clients
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="hero-scroll-out font-display font-black text-5xl sm:text-6xl md:text-8xl leading-none text-white tracking-tighter mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <AnimatedText text="IT'S ME" delay={0} type="letter" />
          </h1>
          <h1 className="hero-text-stagger hero-scroll-out font-display font-black text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] via-[#00BBFF] to-[#00BBFF] mb-10 drop-shadow-[0_0_30px_rgba(0,187,255,0.3)]">
            UMER KHAN
          </h1>

          {/* Subcopy */}
          <p className="hero-scroll-out font-mono text-base md:text-lg text-white/70 max-w-xl mb-16 leading-relaxed">
            <AnimatedText text="I've earned the trust of over 250 clients and 40 brands, all of whom are very satisfied with my AI engineering and full-stack development services!" type="word" delay={0.1} stagger={0.02} />
          </p>

          {/* Bottom Stats Row */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 md:gap-16">
            <div className="hero-stats hero-scroll-out">
              <div className="text-4xl font-bold text-white font-display mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">600+</div>
              <div className="font-mono text-xs text-[#00BBFF] uppercase tracking-widest">Projects Done</div>
            </div>
            <div className="hero-stats hero-scroll-out">
              <div className="text-4xl font-bold text-white font-display mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">50+</div>
              <div className="font-mono text-xs text-[#00BBFF] uppercase tracking-widest">Brand Partners</div>
            </div>
            <div className="hero-stats">
              <div className="text-4xl font-bold text-white font-display mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">12+</div>
              <div className="font-mono text-xs text-[#00BBFF] uppercase tracking-widest">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Right Column: Portrait & Interactive Elements */}
        <div className="lg:col-span-5 relative h-full flex items-end justify-center pointer-events-none">

          {/* Portrait with Seamless Fade Mask */}
          <div className="hero-portrait hero-scroll-out absolute bottom-0 w-full max-w-[600px] h-[90vh]">
            <img
              src="/profile.jpeg"
              alt="Muhammad Umer Khan"
              className="w-full h-full object-cover object-top grayscale-[20%] contrast-125"
              style={{
                maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
              }}
            />
          </div>

          {/* Floating Schedule Button */}
          <button className="hero-floating-elements hero-scroll-out pointer-events-auto absolute bottom-40 right-[10%] z-40 bg-[#8A2BE2] hover:bg-[#9d4edd] text-white px-8 py-5 rounded-2xl font-mono text-sm tracking-widest uppercase flex items-center gap-4 shadow-[0_20px_40px_rgba(138,43,226,0.5)] transition-all hover:-translate-y-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule a Call
          </button>
        </div>
      </div>

      {/* 3. Mobile Layout — MOBILE ONLY (< lg) */}
      <div className="lg:hidden relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-5 pt-28 pb-16">

        {/* Glassmorphism Profile Card */}
        <div
          className="hero-mobile-card w-full max-w-[360px] rounded-3xl overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(145deg, rgba(10,10,20,0.9) 0%, rgba(18,10,35,0.85) 100%)",
            border: "1px solid rgba(0,187,255,0.25)",
            boxShadow: "0 0 0 1px rgba(138,43,226,0.15), 0 25px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,187,255,0.04)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Top glow bar */}
          <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #8A2BE2 30%, #00BBFF 70%, transparent)", borderRadius: "12px 12px 0 0" }} />

          {/* Image Container */}
          <div className="relative w-full overflow-hidden" style={{ height: 300, background: "linear-gradient(to bottom, rgba(138,43,226,0.12), rgba(0,0,0,0))" }}>
            <img
              src="/profile.jpeg"
              alt="Umer Khan"
              className="w-full h-full object-cover object-top"
              style={{
                maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
              }}
            />
            {/* Availability badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#050505]/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse shadow-[0_0_6px_#10b981]" />
              <span className="font-mono text-[10px] text-white/80 tracking-wider uppercase">Available</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="px-6 pb-6 flex flex-col items-center text-center">
            <h1 className="font-display font-black text-3xl tracking-tighter mb-1" style={{ background: "linear-gradient(135deg, #8A2BE2, #00BBFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              UMER KHAN
            </h1>
            <p className="font-mono text-[11px] text-white/60 uppercase tracking-[0.2em] mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              AI Engineer &amp; Full Stack Dev
            </p>
            <p className="font-mono text-xs text-white/55 leading-relaxed mb-6">
              Trusted by 250+ clients &amp; 40 brands. Building intelligent, scalable web &amp; AI solutions.
            </p>

            {/* Stats Row */}
            <div className="w-full grid grid-cols-3 border border-white/10 rounded-2xl overflow-hidden mb-6">
              <div className="flex flex-col items-center py-4 px-2">
                <span className="font-display text-xl font-bold text-white">600+</span>
                <span className="font-mono text-[9px] text-[#00BBFF] uppercase tracking-widest mt-0.5">Projects</span>
              </div>
              <div className="flex flex-col items-center py-4 px-2 border-l border-r border-white/10">
                <span className="font-display text-xl font-bold text-white">50+</span>
                <span className="font-mono text-[9px] text-[#00BBFF] uppercase tracking-widest mt-0.5">Partners</span>
              </div>
              <div className="flex flex-col items-center py-4 px-2">
                <span className="font-display text-xl font-bold text-white">12+</span>
                <span className="font-mono text-[9px] text-[#00BBFF] uppercase tracking-widest mt-0.5">Yrs Exp</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#00BBFF] text-white py-3.5 rounded-xl font-mono text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(138,43,226,0.4)] active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Call
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-8 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] text-white uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>

      {/* Vertical Navigation (Far Right) */}
      <div className="hero-nav absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-16 z-40 hidden 2xl:flex items-center">
        <a href="#projects" className="font-mono text-[10px] text-white/50 hover:text-[#00BBFF] tracking-[0.3em] uppercase transition-colors" style={{ writingMode: 'vertical-rl' }}>Works</a>
        <a href="#services" className="font-mono text-[10px] text-white/50 hover:text-[#00BBFF] tracking-[0.3em] uppercase transition-colors" style={{ writingMode: 'vertical-rl' }}>Services</a>
        <a href="#contact" className="font-mono text-[10px] text-white/50 hover:text-[#00BBFF] tracking-[0.3em] uppercase transition-colors" style={{ writingMode: 'vertical-rl' }}>Contact</a>
      </div>

    </section>
  );
}
