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
        <div className="hidden lg:grid lg:w-full lg:grid-cols-12 lg:gap-8 lg:items-center lg:px-20 lg:py-24">
          {/* Left Column - Large Profile Image Focus */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full space-y-8">
            {/* Large Profile Image - Main focus */}
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative aspect-square rounded-2xl border-2 border-accent/60 shadow-2xl shadow-accent/40 overflow-hidden"
                animate={{
                  y: [0, -25, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ borderColor: "rgba(99,102,241,1)", scale: 1.03, shadow: "0 20px 60px rgba(99, 102, 241, 0.5)" }}
              >
                <img
                  src="/profile.jpeg"
                  alt="Muhammad Umer Khan"
                  className="h-full w-full object-cover"
                />

                {/* Glow overlay */}
                <div className="absolute inset-0 rounded-2xl border border-accent/20 opacity-40 pointer-events-none" />
              </motion.div>

              {/* Floating accent circles - enhanced */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 border-2 border-accent/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 border-2 border-accent/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Social Links - Improved spacing */}
            <motion.div
              className="flex gap-10 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {socials.map((social, idx) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-accent transition-all duration-300 text-sm font-semibold uppercase tracking-wide"
                  title={social.label}
                  whileHover={{ scale: 1.2, rotateZ: 3, color: "rgba(99,102,241,1)" }}
                  whileTap={{
                    scale: 0.85,
                    rotateZ: -5,
                    boxShadow: "0 0 25px rgba(99,102,241,0.6)",
                    transition: { duration: 0.15, ease: "easeIn" }
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.65 + idx * 0.05 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent via-accent-glow to-accent-muted" />
                <p
                  ref={eyebrowRef}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-accent-glow"
                >
                  {heroContent.eyebrow}
                </p>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
              <LetterByLetterReveal
                text={heroContent.name}
                className="text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-tight tracking-tight transition-colors duration-300"
                delay={0}
                staggerDelay={0.04}
                duration={0.5}
              />
            </motion.div>

            {/* Role - Highlighted */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 w-fit px-4 py-3 rounded-xl bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/40 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-glow animate-pulse" />
              <p className="text-lg font-semibold bg-gradient-to-r from-accent via-accent-glow to-accent-muted bg-clip-text text-transparent">
                {heroContent.role}
              </p>
            </motion.div>

            {/* Intro/Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-zinc-300 dark:text-zinc-400 leading-relaxed max-w-2xl font-light"
            >
              {heroContent.intro}
            </motion.p>

            {/* Headline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <TextRevealGradient
                parts={headlineParts}
                className="text-5xl font-bold leading-tight text-gray-900 dark:text-white transition-colors duration-300"
                useWords={true}
                delay={0.2}
              />
            </motion.div>

            {/* Subcopy */}
            <motion.p
              ref={subcopyRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-2xl font-light"
            >
              {heroContent.subcopy}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 pt-4"
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
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="pt-8 border-t border-zinc-800/60"
            >
              <div className="flex items-center gap-2 mb-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Tech Stack</p>
                <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2">
                {heroContent.techStack.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/40 text-xs font-semibold text-accent/90 hover:bg-accent/25 hover:border-accent/60 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <motion.div 
          className="lg:hidden w-full px-6 flex flex-col items-center justify-center text-center space-y-10 max-w-2xl mx-auto"
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
              className="relative mx-auto aspect-square w-full max-w-xs rounded-2xl border-2 border-accent/50 shadow-2xl shadow-accent/40 overflow-hidden transition-all duration-300"
              animate={{
                y: [0, -15, 0],
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
              <div className="absolute inset-0 rounded-2xl border border-accent/20 opacity-40 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Content section */}
          <motion.div 
            className="space-y-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-1 h-1 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
              <p
                ref={eyebrowRef}
                className="text-xs font-bold uppercase tracking-wider text-accent-glow"
              >
                {heroContent.eyebrow}
              </p>
              <div className="w-1 h-1 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <LetterByLetterReveal
                text={heroContent.name}
                className="text-5xl font-black bg-gradient-to-r from-gray-900 via-accent to-gray-900 dark:from-white dark:via-accent dark:to-white bg-clip-text text-transparent transition-colors duration-300"
                delay={0}
                staggerDelay={0.04}
                duration={0.5}
              />
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="inline-flex justify-center w-full items-center gap-2 px-4 py-3 rounded-xl border border-accent/40 bg-accent/10 backdrop-blur-sm mx-auto"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <p className="text-sm font-semibold text-accent">
                {heroContent.role}
              </p>
            </motion.div>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base text-zinc-300 dark:text-zinc-400 leading-relaxed font-light"
            >
              {heroContent.intro}
            </motion.p>

            {/* Headline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}>
              <TextRevealGradient
                parts={headlineParts}
                className="text-2xl font-bold leading-tight text-gray-900 dark:text-white transition-colors duration-300"
                useWords={true}
                delay={0.2}
              />
            </motion.div>

            {/* Subcopy */}
            <motion.p
              ref={subcopyRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-zinc-400 dark:text-zinc-500 leading-relaxed font-light"
            >
              {heroContent.subcopy}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
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
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-6 border-t border-zinc-800/50"
            >
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3 font-bold">Tech Stack</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {heroContent.techStack.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.75 + idx * 0.04 }}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/40 text-xs font-semibold text-accent/90 backdrop-blur-sm hover:bg-accent/30 hover:border-accent/60 transition-all duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-8 justify-center pt-6"
            >
              {socials.map((social, idx) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:text-accent"
                  title={social.label}
                  whileHover={{ scale: 1.2, rotateZ: 3, color: "rgba(99,102,241,1)" }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + idx * 0.05 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint - bottom */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.button
          ref={scrollHintRef}
          type="button"
          onClick={() => scrollToSection(heroContent.scrollHint.scrollToId)}
          className="hero-scroll-hint flex flex-col items-center gap-3 text-xs uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors duration-300"
          aria-label={heroContent.scrollHint.ariaLabel}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {heroContent.scrollHint.label}
          <motion.span
            className="block h-12 w-px bg-gradient-to-b from-accent/80 via-accent/40 to-transparent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
}
