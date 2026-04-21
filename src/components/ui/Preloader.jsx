import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Aggressive slice/fade out
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
          onComplete: () => setIsFinished(true),
        });
      }
    });

    const lines = [
      "> INITIALIZING SYSTEM...",
      "> LOADING NEURAL WEIGHTS...",
      "> BYPASSING SECURITY PROTOCOLS...",
      "> SYSTEM READY."
    ];

    // Initial delay
    tl.to({}, { duration: 0.5 });

    // Type out each line
    lines.forEach((line) => {
      tl.to({}, {
        duration: 0.1, // slight pause before next line
        onComplete: () => {
          if (textRef.current) {
            const span = document.createElement('div');
            span.textContent = line;
            span.style.opacity = '0';
            span.style.color = 'var(--accent-primary)';
            span.style.marginBottom = '8px';
            textRef.current.appendChild(span);
            
            gsap.to(span, { opacity: 1, duration: 0.1 });
          }
        }
      });
      tl.to({}, { duration: 0.4 }); // wait a bit after typing line
    });

    // Hold before exiting
    tl.to({}, { duration: 0.6 });

    return () => tl.kill();
  }, [isFinished]);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      <div 
        ref={textRef}
        className="text-[var(--text-main)] font-mono text-sm md:text-base lg:text-lg text-left w-full max-w-2xl px-6"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Lines appended here by GSAP */}
      </div>
      
      {/* Subtle CRT scanning line effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 2px, 3px 100%'
        }}
      />
    </div>
  );
}
