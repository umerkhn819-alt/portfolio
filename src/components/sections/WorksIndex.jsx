import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { PROJECT_DATA } from "../../data/projectsDetail";
import { renderVisual, DetailDashboard } from "../ui/DetailDashboard";

gsap.registerPlugin(ScrollTrigger);



// --- Holographic Card Component ---
function HolographicCard({ project, onClick }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0 0 30px rgba(0, 240, 255, 0.8), inset 0 0 20px rgba(138, 43, 226, 0.5)",
      borderColor: "#00F0FF",
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        gsap.to(cardRef.current, {
          boxShadow: "0 0 15px rgba(0, 240, 255, 0.3)",
          borderColor: "rgba(0, 240, 255, 0.3)",
          duration: 0.2
        });
      }
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      boxShadow: "none",
      borderColor: "rgba(255,255,255,0.05)",
      duration: 0.3
    });
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      ref={cardRef}
      className="relative w-[240px] h-[340px] md:w-[280px] md:h-[380px] shrink-0 rounded-2xl cursor-pointer overflow-hidden border border-white/5 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center group"
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            {renderVisual(project.visualType)}
          </Float>
        </Canvas>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-display text-xl font-bold text-[var(--accent-primary)] mb-1 uppercase tracking-wider">{project.title}</h3>
        <p className="font-mono text-xs text-[var(--text-muted)]">{project.tag}</p>
      </div>
    </motion.div>
  );
}



// --- Main Works Index Section ---
export function WorksIndex() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    
    if (!section || !track) return;

    // Use xPercent for smoother and more accurate translation
    // We translate the track by its full width minus the viewport width + offset
    const getScrollAmount = () => track.scrollWidth - window.innerWidth + 300;

    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // When activeProject changes, disable body scroll
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  return (
    <>
      {/* Use h-screen, GSAP automatically adds pin spacing to create the scroll area */}
      <section ref={sectionRef} id="projects" className="h-screen relative bg-transparent">
        <div className="h-screen w-full sticky top-0 flex overflow-hidden pt-20">
          
          {/* Pinned Left Column */}
          <div className="w-[300px] shrink-0 h-full flex flex-col justify-center pl-10 md:pl-20 relative z-20 border-r border-white/5 bg-[#050505]/80 backdrop-blur-md">
            <h2 className="font-display text-sm text-[var(--text-muted)] tracking-[0.3em] uppercase mb-12">
              Works Index
            </h2>
            <div className="space-y-4">
              {PROJECT_DATA.map((p, i) => (
                <div key={p.id} className="group cursor-pointer" onClick={() => setActiveProject(p)}>
                  <div className="flex items-center gap-4 text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
                    <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                    <h3 className="font-display text-base md:text-lg uppercase tracking-wide">{p.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pb-20 font-mono text-xs text-[var(--text-muted)] opacity-50">
              SCROLL // TO EXPLORE
            </div>
          </div>

          {/* Horizontal Track */}
          <div className="flex-1 h-full flex items-center relative">
            <div ref={trackRef} className="flex gap-10 md:gap-16 px-10 md:px-20 will-change-transform">
              {PROJECT_DATA.map((project) => (
                <HolographicCard 
                  key={project.id} 
                  project={project} 
                  onClick={setActiveProject} 
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Detail Dashboard Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <DetailDashboard 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
