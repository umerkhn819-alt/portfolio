import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroCopy } from "../../data/heroCopy";

export function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(e => console.error("Auto-play prevented", e));
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full bg-background-dark flex items-center justify-center overflow-hidden pt-24 pb-16">
      
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video 
          ref={videoRef}
          src="/hero-bg.mp4" 
          autoPlay
          muted 
          loop
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
        />
        {/* Overlay gradient to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/40 to-background-dark"></div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse z-0"></div>
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-accent/50 rounded-full mix-blend-screen filter blur-[200px] opacity-10 z-0"></div>

      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Typography */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-5 py-2 flex items-center gap-3 shadow-2xl"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(133,238,0,0.8)]"></div>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white/90">
              {heroCopy.topBar.availability}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(4.5rem,12vw,10rem)] leading-[0.85] font-black tracking-tighter text-white mb-8"
          >
            {heroCopy.mega.line1}<br />
            <span className="text-white/40">{heroCopy.mega.line2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-lg md:text-2xl text-text-secondary max-w-xl mb-12 leading-relaxed"
          >
            {heroCopy.mega.subtitle}
          </motion.p>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex items-center gap-6 bg-white text-black rounded-full pl-8 pr-2 py-2 hover:bg-accent hover:shadow-[0_0_30px_rgba(133,238,0,0.3)] transition-all duration-500"
          >
            <span className="font-sans font-bold uppercase tracking-[0.15em] text-sm">
              {heroCopy.scheduleCta}
            </span>
            <div className="bg-black text-white rounded-full p-4 group-hover:bg-white group-hover:text-black transition-colors duration-500">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </div>

        {/* Right Glassmorphism Portrait */}
        <div className="lg:col-span-5 relative w-full h-[60vh] lg:h-[75vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm p-4"
          >
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative group">
              <img 
                src="/profile.jpeg" 
                alt={heroCopy.profileAltDesktop} 
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover object-center grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span className="font-display font-bold text-lg">Air University</span>
                <span className="font-sans text-xs uppercase tracking-widest text-accent">B.Sc CS '28</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
