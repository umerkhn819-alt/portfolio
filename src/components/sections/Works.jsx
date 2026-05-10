import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../../data/projects";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Works() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // Added pb-[100vh] to pin the section until the user completely scrolls through
    <section ref={containerRef} className="relative w-full pb-[100vh]">
      
      {/* Title */}
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto z-10 relative">
        <h2 className="font-display text-5xl md:text-[8rem] leading-none font-black tracking-tighter uppercase text-white drop-shadow-2xl">
          Featured <span className="text-white/20">Works</span>
        </h2>
      </div>

      {/* The Flex Column Container matching user's requested CSS snippet */}
      <div className="flex flex-col gap-[20vh] relative w-full px-6 md:px-12 max-w-[1400px] mx-auto mt-24">
        {projects.map((project, index) => {
          // Dynamic scale physics: Underneath cards shrink
          const targetScale = 1 - ((projects.length - index) * 0.05);
          
          // Framer motion scroll interpolation
          const scale = useTransform(
            scrollYProgress,
            [index * 0.25, 1],
            [1, targetScale]
          );

          return (
            <motion.div
              key={project.id}
              style={{ 
                scale,
                top: `calc(15vh + ${index * 40}px)`,
                willChange: "transform", // Force GPU acceleration to stop shadow repaint lag
              }}
              whileHover={{
                borderColor: "#85EE00",
                boxShadow: "0 0 50px rgba(133, 238, 0, 0.15)",
              }}
              className="sticky mx-auto w-full max-w-[1200px] h-[600px] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 bg-[#0c0c0e]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] origin-top transform-gpu transition-[border-color,box-shadow] duration-500 ease-out"
            >
              
              {/* Left Side: Typography */}
              <div className="w-full md:w-1/2 flex flex-col justify-center text-white h-full">
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
                  {project.title}
                </h3>
                <p className="font-sans text-base md:text-lg opacity-80 leading-relaxed mb-10 max-w-md drop-shadow-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/20 bg-accent/5 rounded-full px-4 py-2">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {project.href.startsWith("/") ? (
                  <Link 
                    to={project.href} 
                    className="group w-max flex items-center gap-4 bg-accent text-black hover:bg-white transition-colors rounded-full pl-6 pr-2 py-2 shadow-xl"
                  >
                    <span className="font-sans font-bold uppercase tracking-[0.1em] text-xs">View Project</span>
                    <div className="bg-black text-white rounded-full p-2 group-hover:bg-accent group-hover:text-black transition-colors">
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                ) : (
                  <a 
                    href={project.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className="group w-max flex items-center gap-4 bg-accent text-black hover:bg-white transition-colors rounded-full pl-6 pr-2 py-2 shadow-xl"
                  >
                    <span className="font-sans font-bold uppercase tracking-[0.1em] text-xs">View Project</span>
                    <div className="bg-black text-white rounded-full p-2 group-hover:bg-accent group-hover:text-black transition-colors">
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                )}
              </div>

              {/* Right Side: Image/Video Mockup */}
              <div className="w-full md:w-1/2 h-[400px] md:h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative shadow-2xl hidden md:block bg-[#18181b] border border-white/5">
                {project.video ? (
                  <video 
                    src={project.video} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                )}
              </div>
              
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
