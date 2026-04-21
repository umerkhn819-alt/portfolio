import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { scrollToSection } from "../../utils/scrollToId";
import { useGsapContext } from "../../hooks/useGsapContext";
import { heroContent } from "../../data/hero";
import { socials } from "../../data/socials";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Custom Cursive Font for Signature (using Google Fonts dynamically or just a generic cursive stack)
const signatureFont = "'Cedarville Cursive', 'Dancing Script', cursive, serif";

export function Hero() {
  const rootRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  /* ── GSAP Intro Animations ───────────────────────────── */
  useGsapContext((root) => {
    if (!root) return;

    // Intro stagger for left column
    gsap.fromTo(
      ".hero-left-anim",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.1 }
    );

    // Intro stagger for right column
    gsap.fromTo(
      ".hero-right-anim",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
    );

    // Faded background text parallax
    gsap.to(".hero-bg-text", {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative z-10 min-h-[100dvh] w-full overflow-hidden pt-24 pb-16 transition-colors duration-500 flex items-center"
      style={{
        background: "transparent",
      }}
    >
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* ── LEFT SIDEBAR (approx 30% width) ────────────────────── */}
          <div
            ref={leftColRef}
            className="lg:col-span-4 flex flex-col justify-between items-center lg:items-start lg:pr-8 lg:border-r border-border-subtle/30 dark:border-white/5 relative"
          >
            {/* 1. Status Pill */}
            <div className="hero-left-anim flex items-center gap-2 mb-10 w-fit">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  background: "transparent",
                  border: "1px solid var(--color-border-subtle)",
                }}
                className="dark:border-white/10"
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span className="text-[13px] font-medium text-gray-700 dark:text-zinc-300 tracking-wide">
                  Available for projects
                </span>
              </div>
            </div>

            {/* 2. Rectangular Image Card Container */}
            <div className="hero-left-anim relative w-full max-w-[280px] lg:max-w-full aspect-[3/4] mx-auto lg:mx-0 mb-10 group">
              {/* Wireframe background lines (replicating the stacked border effect) */}
              <div className="absolute inset-0 border border-gray-300 dark:border-white/10 translate-x-4 translate-y-4 rounded-sm transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
              <div className="absolute inset-0 border border-gray-200 dark:border-white/5 translate-x-8 translate-y-8 rounded-sm transition-transform duration-500 group-hover:translate-x-12 group-hover:translate-y-12" />
              
              {/* Main Image */}
              <div className="relative w-full h-full rounded-sm overflow-hidden border-2 border-white dark:border-zinc-900 shadow-xl bg-gray-100 dark:bg-zinc-900 z-10">
                <img
                  src="/profile.jpeg"
                  alt="Muhammad Umer Khan"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100"
                />
              </div>
            </div>

            {/* 3. Footer Details (Signature + Email) */}
            <div className="hero-left-anim text-center lg:text-left">
              <h2
                style={{ fontFamily: signatureFont }}
                className="text-5xl lg:text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-2 rotate-[-4deg]"
              >
                Umer Khan
              </h2>
              <p className="text-sm font-medium text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] tracking-wider">
                umerkhn819@gmail.com
              </p>
            </div>
          </div>

          {/* ── RIGHT CONTENT COLUMN (approx 70% width) ──────────────── */}
          <div
            ref={rightColRef}
            className="lg:col-span-8 flex flex-col justify-center relative pl-0 lg:pl-10"
          >
            {/* Background Faded Text Layers (Removed) */}

            {/* Main Introduction Title */}
            <h1 className="hero-right-anim font-display text-4xl sm:text-5xl lg:text-[64px] font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] leading-[1.1] mb-6 tracking-tight">
              {heroContent.name}
            </h1>

            {/* Primary Description */}
            <p className="hero-right-anim text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mb-10">
              {heroContent.intro} <br className="hidden sm:block"/> {heroContent.subcopy}
            </p>

            {/* Glowing Skill Tags Block */}
            <div className="hero-right-anim flex flex-wrap gap-3 mb-12 max-w-3xl">
              {heroContent.techStack.map((tech) => (
                <div
                  key={tech}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-default"
                  style={{
                    color: "var(--text-primary)",
                    background: "rgba(99,102,241,0.03)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    boxShadow: "0 0 12px rgba(99,102,241,0.1) inset, 0 0 12px rgba(99,102,241,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.4) inset, 0 0 20px rgba(99,102,241,0.2)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(99,102,241,0.1) inset, 0 0 12px rgba(99,102,241,0.05)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* Software Logos Row */}
            <div className="hero-right-anim flex items-center gap-8 mb-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              {/* React SVG */}
              <svg viewBox="-11.5 -10.23174 23 20.46348" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                <g stroke="#61dafb" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                  <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                </g>
              </svg>
              {/* Python SVG */}
              <svg viewBox="0 0 110 108" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                <path fill="#3776ab" d="M54.1 3.5c-25.7 0-24.6 11.2-24.6 11.2l.1 11.5h25.4v3.6H23.8C7.5 29.8 7.3 46 7.3 46s-1.6 17.5 15.3 17.5h7.3V52c0-8.8 7.3-15.8 16-15.8h21.4s7.2 0 7.2-6.8V11.2S75.8 3.5 54.1 3.5zM38.8 11.7c1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5z"/>
                <path fill="#ffd343" d="M55.4 104.5c25.7 0 24.6-11.2 24.6-11.2l-.1-11.5H54.5v-3.6h31.2c16.3 0 16.5-16.2 16.5-16.2s1.6-17.5-15.3-17.5h-7.3v11.5c0 8.8-7.3 15.8-16 15.8H42.2s-7.2 0-7.2 6.8v18.2s-1.3 7.7 20.4 7.7zM70.7 96.3c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
              </svg>
              {/* Node SVG */}
              <svg viewBox="0 0 118 35" width="70" height="36" xmlns="http://www.w3.org/2000/svg">
                <path fill="#68A063" d="M33.6 17.9L24.8 2.6c-.6-1-1.8-1.7-3-1.7H4.3c-1.2 0-2.4.7-3 1.7L.4 17.9c-.6 1-.6 2.3 0 3.4l8.8 15.3c.6 1 1.8 1.7 3 1.7h17.5c1.2 0 2.4-.7 3-1.7l8.8-15.3c.7-1 .7-2.3.1-3.4zm-6 2.1l-6.8 11.7c-.2.3-.6.5-1 .5H8.5c-.4 0-.8-.2-1-.5L.7 20c-.2-.3-.2-.8 0-1.1l6.8-11.7c.2-.3.6-.5 1-.5h11.3c.4 0 .8.2 1 .5l6.8 11.7c.3.3.3.8 0 1.1z"/>
                <path fill="#333" className="dark:fill-white" d="M47.7 10.3h-3.4v14.4h3.4v-8.2c0-2.6 1-3.9 2.9-3.9 1.9 0 2.9 1.3 2.9 3.9v8.2h3.4v-8.5c0-4.3-2.1-6.4-6.4-6.4-2.5 0-4.3 1-5.1 2.8h-.1l-.1-2.5-3.5-.2.1.4zM66.4 10c-4.7 0-8 3.5-8 8.1 0 4.6 3.3 8.1 8 8.1 4.7 0 8-3.5 8-8.1 0-4.6-3.3-8.1-8-8.1zm0 13.5c-2.8 0-4.6-2.1-4.6-5.4 0-3.3 1.8-5.4 4.6-5.4s4.6 2.1 4.6 5.4c0 3.3-1.8 5.4-4.6 5.4zM86.1 20.1c0-2.6-1-4-2.9-4-1.9 0-3 1.3-3 4v4.5H76.8V1h3.4v8.8h.1c.8-1.8 2.6-2.8 5-2.8 4.3 0 6.4 2.1 6.4 6.4v11.3H88.3l-.1-.4-2.1.2zM96.7 10.2c-4 0-7.2 3.1-7.2 7.8 0 4.8 3 8.1 7.2 8.1 3 0 5.4-1.6 6.5-4l-2.8-1.5c-.8 1.4-2 2.3-3.8 2.3-2.3 0-4-1.5-4-4h11.1v-1.1c.1-4.2-2.7-7.6-7-7.6zm-3.8 6.1c.4-1.9 1.8-3.3 3.8-3.3 2 0 3.4 1.3 3.6 3.3h-7.4z"/>
              </svg>
              {/* Vercel SVG */}
              <svg viewBox="0 0 116 100" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" className="text-black dark:text-white" d="M57.5 0L115 100H0L57.5 0z"/>
              </svg>
            </div>

            {/* Buttons */}
            <div className="hero-right-anim flex flex-wrap gap-4 mt-auto">
              <Button type="button" onClick={() => scrollToSection(heroContent.primaryCta.scrollToId)}>
                {heroContent.primaryCta.label}
              </Button>
              <Button variant="ghost" href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
