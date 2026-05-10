import { motion } from "framer-motion";
import { Footer } from "../components/layout/Footer";
import { projects } from "../data/projects";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function WorksPage() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col bg-background-dark text-text-primary pt-32 min-h-screen relative transform-gpu"
    >
      {/* Minimalist Theme Background */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/10 via-background-dark to-background-dark pointer-events-none"></div>

      <section className="relative z-10 px-6 md:px-12 py-12 max-w-[1600px] mx-auto w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-[8rem] leading-none font-black tracking-tighter uppercase mb-24 text-white"
        >
          All <span className="text-white/20">Works</span>
        </motion.h1>
        
        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center group"
            >
              <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] w-full rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative">
                  {project.video ? (
                    <video 
                      src={project.video} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.href.startsWith("/") ? (
                      <Link 
                        to={project.href} 
                        className="w-32 h-32 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-full flex flex-col items-center justify-center gap-2 hover:bg-accent hover:text-black hover:border-accent transition-all duration-300"
                      >
                        <span className="font-sans text-xs font-bold uppercase tracking-widest">Explore</span>
                        <ArrowUpRight size={20} />
                      </Link>
                    ) : (
                      <a 
                        href={project.href} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-32 h-32 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-full flex flex-col items-center justify-center gap-2 hover:bg-accent hover:text-black hover:border-accent transition-all duration-300"
                      >
                        <span className="font-sans text-xs font-bold uppercase tracking-widest">Explore</span>
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className={`lg:col-span-5 flex flex-col ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <h3 className="font-display text-4xl md:text-6xl font-bold uppercase mb-6 text-white leading-tight">
                  {project.title}
                </h3>
                <p className="font-sans text-lg text-text-secondary leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/20 bg-accent/5 rounded-full px-4 py-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </motion.main>
  );
}
