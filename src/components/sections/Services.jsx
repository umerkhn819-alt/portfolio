import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "../../data/servicesData";

export function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full flex flex-col border-t border-white/10">
      {servicesData.map((srv, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div 
            key={srv.id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/10 overflow-hidden"
          >
            <button 
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full py-8 md:py-12 flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-8 md:gap-16">
                <span className="font-display text-2xl md:text-4xl font-bold text-white/20 group-hover:text-accent transition-colors">
                  0{index + 1}
                </span>
                <h3 className="font-display text-3xl md:text-6xl font-bold uppercase text-white group-hover:translate-x-4 transition-transform duration-500">
                  {srv.title}
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 flex-shrink-0 ${isOpen ? 'border-accent text-accent rotate-45' : 'border-white/20 text-white group-hover:border-white'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="pb-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                    <div className="md:col-start-3 md:col-span-4">
                      <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-accent mb-4">
                        {srv.category}
                      </h4>
                      <p className="font-sans text-base text-text-secondary leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                    <div className="md:col-span-6">
                      <ul className="flex flex-col gap-4">
                        {srv.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-4 font-sans text-sm text-text-secondary bg-white/5 border border-white/5 rounded-xl p-4">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
