import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Start exit animation after 1 second
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 500); // Wait for fade out
    }, 800); // Fast load duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            {/* AI Core Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-20 h-20 border-[3px] border-white/10 border-t-[#F5F5F4] border-r-white/30 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            />
            {/* Inner pulsing core */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]"
              />
            </div>
            {/* Text */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 font-mono text-white/55 text-[10px] tracking-[0.4em] uppercase"
            >
              INIT_AI_CORE
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
