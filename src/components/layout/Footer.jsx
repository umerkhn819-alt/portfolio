import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative min-h-[90vh] bg-background-dark border-t border-border flex flex-col justify-end px-6 md:px-12 py-12">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-24">
        
        <div className="flex flex-col gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(4rem,15vw,14rem)] leading-[0.8] font-bold tracking-tighter text-white uppercase"
          >
            Let's<br/>Connect
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-12 border-t border-border pt-12">
            <a 
              href="mailto:umerkhn819@gmail.com"
              className="group flex items-center gap-4 text-xl md:text-3xl font-display font-bold hover:text-accent transition-colors"
            >
              umerkhn819@gmail.com
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                <ArrowUpRight size={24} />
              </div>
            </a>

            <div className="flex flex-wrap gap-8">
              <a href="https://github.com/umerkhn819-alt" target="_blank" rel="noreferrer" className="font-sans text-sm uppercase tracking-widest text-text-secondary hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/muhammad-umerkhan-293922404" target="_blank" rel="noreferrer" className="font-sans text-sm uppercase tracking-widest text-text-secondary hover:text-white transition-colors">LinkedIn</a>
              <a href="https://wa.me/923181412819" target="_blank" rel="noreferrer" className="font-sans text-sm uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-text-secondary tracking-widest uppercase opacity-50">
          <div>© {new Date().getFullYear()} Umer Khan</div>
          <div>All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
