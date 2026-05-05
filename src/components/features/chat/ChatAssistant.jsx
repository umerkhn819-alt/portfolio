import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { getAssistantReply } from "../../../ai/chatService";
import { assistantUi } from "../../../data/assistant";

function ChatInterface({ onClose, loading, setLoading }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your interactive portfolio assistant. How can I help you today?" }
  ]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const question = input.trim();
    const history = [...messages, { role: "user", content: question }];
    
    setMessages(history);
    setInput("");
    setLoading(true);

    const answer = await getAssistantReply(question, history);
    setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="relative flex h-full w-full max-w-[500px] flex-col justify-center border-l border-white/10 bg-[#050505]/60 p-6 shadow-[-20px_0_50px_rgba(0,0,0,0.35)] backdrop-blur-md"
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50">✕</button>
      
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <span className="h-2 w-2 animate-pulse rounded-full bg-white/80" />
        <span className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">Neural Chat Overlay</span>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4 font-mono text-sm hide-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-xl p-3 ${m.role === "user" ? "rounded-br-none border border-white/20 bg-white/[0.08] text-white" : "rounded-bl-none border border-white/10 bg-white/5 text-white/80"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="flex items-center gap-2 rounded-xl rounded-bl-none border border-white/10 bg-white/5 p-3 text-white/85">
               <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white/70" />
               {assistantUi.thinkingLabel}
             </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={assistantUi.placeholder}
          className="flex-1 rounded-lg border border-white/20 bg-black/50 px-4 py-3 font-mono text-sm text-white transition-colors focus:border-white/50 focus:outline-none"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || loading}
          className="bg-white/5 text-white border border-white/10 px-6 rounded-lg font-mono text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          {assistantUi.sendLabel}
        </button>
      </form>
    </motion.div>
  );
}

export function ChatAssistant() {
  const containerRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Map mouse position to pupil/head movement
  const headRotateX = useTransform(smoothMouseY, [-1, 1], ["-10deg", "10deg"]);
  const headRotateY = useTransform(smoothMouseX, [-1, 1], ["-15deg", "15deg"]);
  
  const eyeMoveX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const eyeMoveY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      mouseX.set(Math.max(-1, Math.min(1, x)));
      mouseY.set(Math.max(-1, Math.min(1, y)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random blink interval
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    };
    const intervalId = setInterval(() => {
      if (Math.random() > 0.4) blink();
    }, 3500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[600px] relative rounded-3xl overflow-hidden bg-transparent flex group"
    >
      {/* Robot Container */}
      <motion.div
        layout
        className={`relative flex items-center justify-center z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${chatOpen ? 'w-full md:w-1/2' : 'w-full'}`}
      >
        <motion.div
          className="relative cursor-pointer flex flex-col items-center justify-center"
          onClick={() => !chatOpen && setChatOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Floating Animation Wrapper */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col items-center justify-center pt-8"
          >
            {/* HEAD CONTAINER (Sleek White Plastic) */}
            <motion.div 
              className="relative w-48 h-40 bg-[#F1F5F9] rounded-[60px] shadow-[inset_-5px_-10px_20px_#94A3B8,inset_5px_10px_15px_#ffffff,0_15px_35px_rgba(0,0,0,0.8)] z-20 flex items-center justify-center"
              style={{ rotateX: headRotateX, rotateY: headRotateY, transformStyle: "preserve-3d" }}
            >
              {/* Left Ear */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-14 bg-[#E2E8F0] rounded-l-full shadow-[inset_-2px_0_5px_#94A3B8] border-l border-white" />
              {/* Right Ear */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-14 bg-[#E2E8F0] rounded-r-full shadow-[inset_2px_0_5px_#94A3B8] border-r border-white" />

              {/* Visor (Face Plate) */}
              <div className="w-[85%] h-[70%] bg-[#050505] rounded-[40px] shadow-[inset_0_5px_15px_#000,0_2px_5px_rgba(255,255,255,0.8)] relative overflow-hidden flex flex-col items-center justify-center pt-2">
                {/* Glass Reflection */}
                <div className="absolute top-0 right-0 w-full h-[60%] bg-white/5 skew-y-12 translate-y-[-50%] pointer-events-none z-20" />
                
                {/* Eyes Container */}
                <div className="flex justify-between w-24 mb-3 relative z-10">
                  {/* Left Eye */}
                  <AnimatePresence>
                    {!isBlinking && (
                      <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-black shadow-[inset_0_0_6px_rgba(255,255,255,0.12)]">
                          <motion.div 
                            className={`relative h-6 w-6 rounded-full transition-colors duration-300 ${isHovered || loading ? "bg-white/50 shadow-[0_0_12px_rgba(255,255,255,0.35)]" : "bg-white/35 shadow-[0_0_10px_rgba(255,255,255,0.2)]"}`}
                            style={{ x: eyeMoveX, y: eyeMoveY }}
                          >
                            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
                          </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Right Eye */}
                  <AnimatePresence>
                    {!isBlinking && (
                      <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-black shadow-[inset_0_0_6px_rgba(255,255,255,0.12)]">
                          <motion.div 
                            className={`relative h-6 w-6 rounded-full transition-colors duration-300 ${isHovered || loading ? "bg-white/50 shadow-[0_0_12px_rgba(255,255,255,0.35)]" : "bg-white/35 shadow-[0_0_10px_rgba(255,255,255,0.2)]"}`}
                            style={{ x: eyeMoveX, y: eyeMoveY }}
                          >
                            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
                          </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Smile */}
                <motion.div 
                  className="w-4 h-2 border-b-2 border-white/50 rounded-full mt-1 relative z-10" 
                  animate={{ scaleX: isHovered ? 1.5 : 1, y: isHovered ? -2 : 0 }}
                />
              </div>
            </motion.div>

            {/* NECK */}
            <div className="w-10 h-6 bg-[#CBD5E1] -mt-2 z-10 shadow-[inset_0_5px_10px_#94A3B8] flex justify-center gap-1">
              <div className="w-0.5 h-full bg-black/10" />
              <div className="w-0.5 h-full bg-black/10" />
            </div>

            {/* BODY CONTAINER */}
            <motion.div className="relative z-20 flex flex-col items-center">
              {/* Main Body */}
              <div className="w-32 h-36 bg-[#F1F5F9] rounded-[50px] shadow-[inset_-5px_-10px_20px_#94A3B8,inset_5px_10px_15px_#ffffff,0_10px_20px_rgba(0,0,0,0.5)] relative flex items-center justify-center">
                
                {/* Chest Button */}
                <div className="w-10 h-10 rounded-full bg-[#E2E8F0] shadow-[inset_0_2px_5px_#94A3B8] flex items-center justify-center">
                  <motion.div 
                    className="h-4 w-4 rounded-full border-2 border-white/45 bg-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    animate={{ scale: loading ? [1, 1.2, 1] : 1, opacity: loading ? [0.5, 1, 0.5] : 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>

                {/* Left Arm */}
                <motion.div 
                  className="absolute -left-5 top-4 w-6 h-20 bg-[#F1F5F9] rounded-full shadow-[inset_-2px_-5px_10px_#94A3B8,inset_2px_5px_10px_#ffffff] transform origin-top z-[-1]"
                  animate={{ rotateZ: isHovered ? [0, 20, 0] : 0 }}
                  transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                />
                
                {/* Right Arm */}
                <motion.div 
                  className="absolute -right-5 top-4 w-6 h-20 bg-[#F1F5F9] rounded-full shadow-[inset_-2px_-5px_10px_#94A3B8,inset_2px_5px_10px_#ffffff] transform origin-top z-[-1]"
                  animate={{ rotateZ: isHovered ? [0, -20, 0] : 0 }}
                  transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                />
              </div>

              {/* Legs */}
              <div className="flex gap-4 -mt-4 z-0">
                <div className="w-8 h-10 bg-[#E2E8F0] rounded-b-full shadow-[inset_0_-5px_10px_#94A3B8]" />
                <div className="w-8 h-10 bg-[#E2E8F0] rounded-b-full shadow-[inset_0_-5px_10px_#94A3B8]" />
              </div>
            </motion.div>

            {/* Prompt Label */}
            <AnimatePresence>
              {!chatOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-10 whitespace-nowrap font-mono text-[10px] tracking-widest text-white/50 opacity-50 transition-opacity group-hover:opacity-100"
                >
                  [ CLICK TO CHAT ]
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      </motion.div>

      {/* Chat Overlay (Takes right half) */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            layout
            className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 z-20"
          >
            <ChatInterface onClose={() => setChatOpen(false)} loading={loading} setLoading={setLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Chat Overlay (Full width) */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            className="md:hidden absolute inset-0 z-20 bg-[#020202]/80 backdrop-blur-sm"
          >
            <ChatInterface onClose={() => setChatOpen(false)} loading={loading} setLoading={setLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
