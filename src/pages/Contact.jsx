import { motion } from "framer-motion";
import { Footer } from "../components/layout/Footer";
import { ContactForm } from "../components/sections/ContactForm";

export function Contact() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen flex flex-col bg-background-dark pt-32 relative z-10 transform-gpu"
    >
      <ContactForm />
      <div className="flex-1 flex flex-col justify-end mt-24">
        <Footer />
      </div>
    </motion.main>
  );
}
