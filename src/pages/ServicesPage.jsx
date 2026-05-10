import { motion } from "framer-motion";
import { Footer } from "../components/layout/Footer";
import { Services } from "../components/sections/Services";

export function ServicesPage() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col bg-background-dark pt-32 min-h-screen relative transform-gpu"
    >
      {/* Minimalist Theme Background */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background-dark to-background-dark pointer-events-none"></div>

      <section className="relative z-10 px-6 md:px-12 py-12 max-w-[1600px] mx-auto w-full flex-1">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-[8rem] leading-none font-black tracking-tighter uppercase mb-16 text-white"
        >
          My <span className="text-white/20">Services</span>
        </motion.h1>
        
        <Services />
      </section>

      <Footer />
    </motion.main>
  );
}
