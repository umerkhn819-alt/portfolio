import { motion } from "framer-motion";
import { Services } from "../../components/sections/Services";

export function AboutSection() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-[1600px] mx-auto w-full">
      {/* BENTO BOX GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)]">
        
        {/* Main Summary - Spans 2 cols */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 lg:col-span-2 rounded-[2rem] bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col justify-between backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all cursor-default"
        >
          <div className="w-12 h-12 rounded-full bg-accent mb-8 flex items-center justify-center">
            <span className="font-display font-bold text-black text-xl">U</span>
          </div>
          <h2 className="font-display text-3xl font-bold uppercase mb-4 text-white">The Engineer</h2>
          <p className="font-sans text-lg text-text-secondary leading-relaxed">
            I am an AI/ML Engineer and Full Stack Developer. I build intelligent, end-to-end applications from custom PyTorch models to interactive React frontends and cloud-deployed infrastructure. My specialty lies in integrating complex AI architectures (like RAG and LLMs) into seamless user experiences.
          </p>
        </motion.div>

        {/* Education - Spans 1 col */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-1 lg:col-span-1 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-8 md:p-12 flex flex-col justify-end backdrop-blur-sm relative overflow-hidden group hover:border-white/30 hover:shadow-2xl transition-all cursor-default"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-accent mb-2">Education</h3>
          <h2 className="font-display text-3xl font-bold uppercase text-white mb-2">Air University</h2>
          <p className="font-sans text-sm text-text-secondary group-hover:text-white transition-colors">B.Sc. Computer Science<br/>Expected Jan 2028</p>
        </motion.div>

        {/* Location/Status - Spans 1 col */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: -1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-1 lg:col-span-1 rounded-[2rem] bg-accent p-8 md:p-12 flex flex-col justify-center items-center text-center text-black hover:shadow-[0_0_60px_rgba(133,238,0,0.4)] transition-shadow cursor-default"
        >
            <div className="w-16 h-16 rounded-full border border-black/20 flex items-center justify-center mb-6">
              <div className="w-4 h-4 rounded-full bg-black animate-pulse"></div>
            </div>
            <h2 className="font-display text-2xl font-bold uppercase mb-2">Available</h2>
            <p className="font-sans text-xs font-bold uppercase tracking-widest opacity-70">For New Roles</p>
        </motion.div>

        {/* Certifications - Spans 2 cols */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-3 lg:col-span-2 rounded-[2rem] bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80')] bg-cover bg-center border border-white/10 p-8 md:p-12 flex flex-col justify-end relative overflow-hidden group cursor-default"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] group-hover:bg-black/40 group-hover:backdrop-blur-0 transition-all duration-700"></div>
          <div className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-500">
            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-accent mb-4">Certifications</h3>
            <h2 className="font-display text-2xl font-bold uppercase text-white mb-2">AWS Certified AI Practitioner</h2>
            <p className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">Generative AI on AWS Bedrock & RAG</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
