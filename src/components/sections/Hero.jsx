import { lazy, Suspense, useCallback, useRef } from "react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { scrollToSection } from "../../utils/scrollToId";
import { useGsapContext } from "../../hooks/useGsapContext";
import { TextReveal, TextRevealGradient } from "../ui/TextReveal";
import { LetterByLetterReveal } from "../ui/LetterByLetterReveal";
import {
  createHeroIntroTimeline,
  bindHeroParallaxLayer,
} from "../../animations/heroTimeline";
import { heroContent } from "../../data/hero";
import { socials } from "../../data/socials";
import { LeftPanel } from "../hero/LeftPanel";
import { RightPanel } from "../hero/RightPanel";
import { motion } from "framer-motion";

const HeroCanvas = lazy(() =>
  import("../../three/HeroCanvas.jsx").then((m) => ({
    default: m.HeroCanvas,
  }))
);

export function Hero() {
  const pointerRef = useRef({ x: 0, y: 0 });
  const bgGlowRef = useRef(null);
  const bgLineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subcopyRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollHintRef = useRef(null);

  const rootRef = useGsapContext((root) => {
    if (!root) return;
    createHeroIntroTimeline({
      eyebrow: eyebrowRef.current,
      headline: headlineRef.current,
      subcopy: subcopyRef.current,
      cta: ctaRef.current,
      scrollHint: scrollHintRef.current,
    });
    if (bgGlowRef.current) {
      bindHeroParallaxLayer(bgGlowRef.current, root, { strength: 160 });
    }
    if (bgLineRef.current) {
      bindHeroParallaxLayer(bgLineRef.current, root, { strength: 40 });
    }
  }, []);

  const { headlineParts } = heroContent;

  const onHeroPointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current = { x, y };
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      onPointerMove={onHeroPointerMove}
      className="relative min-h-dvh w-full overflow-hidden pt-16 bg-white dark:bg-transparent transition-colors duration-300"
    >
      {/* Live Wallpaper Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-accent/20 rounded-full blur-3xl mix-blend-screen"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-400/15 dark:bg-accent-muted/15 rounded-full blur-3xl mix-blend-screen"
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-indigo-500/15 dark:bg-accent/15 rounded-full blur-3xl mix-blend-screen"
          animate={{
            x: [0, -100, 80, 0],
            y: [0, 80, -100, 0],
            scale: [1, 1.1, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Grid pattern - subtle */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
          aria-hidden
        />

        {/* Main gradient glow */}
        <div
          ref={bgGlowRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-10%,rgba(99,102,241,0.45),transparent_70%)]"
          aria-hidden
        />

        {/* Bottom accent line */}
        <div
          ref={bgLineRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          aria-hidden
        />

        {/* Floating animated shapes for extra visual interest */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-2 h-2 bg-accent rounded-full opacity-30"
            animate={{
              y: [Math.random() * 100 - 50, Math.random() * -600],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content overlay - structured layout */}
      <div className="relative z-10 h-full min-h-dvh flex items-center justify-center pb-32">
        {/* Desktop 2-Column Layout - Profile + Content */}
        <div className="hidden lg:grid lg:w-full lg:grid-cols-2 lg:gap-20 lg:items-center lg:px-16 lg:py-16">
          {/* Left Column - Large Profile Image Focus */}
          <div className="flex flex-col items-center justify-center relative w-full space-y-8">
            {/* Large Profile Image - Main focus */}
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative aspect-square rounded-3xl border-2 border-accent/50 shadow-2xl shadow-accent/40 overflow-hidden"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ borderColor: "rgba(99,102,241,1)", scale: 1.02 }}
              >
                <img
                  src="/profile.jpeg"
                  alt="Muhammad Umer Khan"
                  className="h-full w-full object-cover"
                />

                {/* Glow overlay */}
                <div className="absolute inset-0 rounded-3xl border border-accent/30 opacity-50 pointer-events-none" />
              </motion.div>

              {/* Floating accent circles */}
              <motion.div
                className="absolute -top-8 -right-8 w-28 h-28 border-2 border-accent/40 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-accent/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-8 mt-8">
              {socials.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-accent transition-all duration-300 text-sm font-medium"
                  title={social.label}
                  whileHover={{ scale: 1.25, rotateZ: 2, color: "rgba(99,102,241,1)" }}
                  whileTap={{
                    scale: 0.85,
                    rotateZ: -3,
                    boxShadow: "0 0 25px rgba(99,102,241,0.6)",
                    transition: { duration: 0.15, ease: "easeIn" }
                  }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-glow"
            >
              {heroContent.eyebrow}
            </p>

            {/* Name */}
            <LetterByLetterReveal
              text={heroContent.name}
              className="mb-4 text-6xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300"
              delay={0}
              staggerDelay={0.04}
              duration={0.5}
            />

            {/* Role */}
            <p className="mb-6 text-xl text-accent font-semibold">
              {heroContent.role}
            </p>

            {/* Intro/Description */}
            <p className="mb-8 text-base text-zinc-300 leading-relaxed max-w-lg">
              {heroContent.intro}
            </p>

            {/* Headline */}
            <TextRevealGradient
              parts={headlineParts}
              className="mb-6 text-4xl font-semibold leading-tight text-gray-900 dark:text-white transition-colors duration-300"
              useWords={true}
              delay={0.2}
            />

            {/* Subcopy */}
            <p
              ref={subcopyRef}
              className="mb-10 text-base text-zinc-400 leading-relaxed max-w-lg"
            >
              {heroContent.subcopy}
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="mb-12 flex gap-4"
            >
              <Button
                type="button"
                onClick={() =>
                  scrollToSection(heroContent.primaryCta.scrollToId)
                }
              >
                {heroContent.primaryCta.label}
              </Button>
              <Button variant="ghost" href={heroContent.secondaryCta.href}>
                {heroContent.secondaryCta.label}
              </Button>
            </div>

            {/* Tech Stack */}
            <div className="pt-8 border-t border-zinc-800">
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {heroContent.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs text-accent font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <motion.div 
          className="lg:hidden w-full px-4 flex flex-col items-center justify-center text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image - Large focus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative aspect-square rounded-3xl border-2 border-accent/50 shadow-2xl shadow-accent/40 overflow-hidden transition-all duration-300"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ borderColor: "rgba(99,102,241,1)", scale: 1.03, boxShadow: "0 20px 50px rgba(99, 102, 241, 0.4)" }}
            >
              <img
                src="/profile.jpeg"
                alt="Muhammad Umer Khan"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-3xl border border-accent/30 opacity-50 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Content section */}
          <motion.div 
            className="space-y-4 max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
              <p
                ref={eyebrowRef}
                className="text-xs font-bold uppercase tracking-widest text-accent-glow"
              >
                {heroContent.eyebrow}
              </p>
              <div className="w-1 h-4 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
            </div>

            <LetterByLetterReveal
              text={heroContent.name}
              className="text-4xl font-black bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent"
              delay={0}
              staggerDelay={0.04}
              duration={0.5}
            />

            <motion.div 
              className="inline-flex justify-center w-full items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <p className="text-xs font-semibold text-accent">
                {heroContent.role}
              </p>
            </motion.div>

            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {heroContent.intro}
            </p>

            <TextRevealGradient
              parts={headlineParts}
              className="text-xl font-bold leading-tight text-gray-900 dark:text-white transition-colors duration-300"
              useWords={true}
              delay={0.2}
            />

            <p
              ref={subcopyRef}
              className="text-xs text-zinc-400 leading-relaxed font-light"
            >
              {heroContent.subcopy}
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col gap-3 pt-4 w-full"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{
                scale: 0.92,
                boxShadow: "0 0 30px rgba(99,102,241,0.8), 0 0 60px rgba(99,102,241,0.4)",
                transition: { duration: 0.15, ease: "easeIn" }
              }} className="w-full">
                <Button
                  type="button"
                  onClick={() =>
                    scrollToSection(heroContent.primaryCta.scrollToId)
                  }
                  className="w-full font-semibold"
                >
                  {heroContent.primaryCta.label}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                <Button 
                  variant="ghost" 
                  href={heroContent.secondaryCta.href}
                  className="w-full font-semibold"
                >
                  {heroContent.secondaryCta.label}
                </Button>
              </motion.div>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-zinc-800/50">
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3 font-semibold">Tech Stack</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {heroContent.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/40 text-xs text-accent font-medium backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 justify-center pt-4">
              {socials.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 text-sm font-medium transition-all duration-300"
                  title={social.label}
                  whileHover={{ scale: 1.25, rotateZ: 2, color: "rgba(99,102,241,1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint - bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <button
          ref={scrollHintRef}
          type="button"
          onClick={() => scrollToSection(heroContent.scrollHint.scrollToId)}
          className="hero-scroll-hint flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-zinc-500"
          aria-label={heroContent.scrollHint.ariaLabel}
        >
          {heroContent.scrollHint.label}
          <span className="block h-10 w-px bg-gradient-to-b from-accent/80 to-transparent" />
        </button>
      </div>
    </section>
  );
}
