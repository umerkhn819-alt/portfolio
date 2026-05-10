import { Hero } from "../components/sections/Hero";
import { Works } from "../components/sections/Works";
import { Footer } from "../components/layout/Footer";
import { AboutSection } from "../components/sections/AboutSection";
import { Services } from "../components/sections/Services";
import { ContactForm } from "../components/sections/ContactForm";
import { motion } from "framer-motion";

export function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col bg-background-dark transform-gpu"
    >
      <Hero />
      
      <div className="mt-12">
        <AboutSection />
      </div>
      
      <section className="px-6 md:px-12 py-24 max-w-[1600px] mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold uppercase mb-12 text-white"
        >
          What I Do
        </motion.h2>
        <Services />
      </section>

      <div className="mt-24">
        <Works />
      </div>
      
      <div className="mt-32">
        <ContactForm />
      </div>
      
      <Footer />
    </motion.main>
  );
}
