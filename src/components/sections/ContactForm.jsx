import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send data to our new Vercel Node.js backend
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 5000); // Reset after 5s
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to connect to the server.");
    }
  };

  return (
    <section className="relative px-6 md:px-12 py-32 w-full border-t border-white/10 overflow-hidden">
      {/* Minimalist Theme Background */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background-dark to-background-dark"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-[1200px] mx-auto">
        
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-[6rem] leading-none font-black tracking-tighter uppercase mb-8 text-white"
          >
            Let's <span className="text-white/20">Talk</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-xl text-text-secondary leading-relaxed mb-8"
          >
            Available for freelance opportunities, AI consulting, and full-stack engineering roles. Drop a message and I'll get back to you within 24 hours.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="mailto:umerkhn819@gmail.com" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors text-sm font-bold uppercase tracking-widest relative z-50">Email Me</a>
            <a href="https://wa.me/923181412819" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors text-sm font-bold uppercase tracking-widest relative z-50">WhatsApp</a>
            <Link to="/cv" className="px-6 py-3 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-colors text-sm font-bold uppercase tracking-widest relative z-50">Preview CV</Link>
            <a href="/Umer_Khan_CV.pdf" download className="px-6 py-3 rounded-full bg-accent text-black hover:bg-white transition-colors text-sm font-bold uppercase tracking-widest relative z-50">Download CV</a>
          </motion.div>
        </div>

        <motion.form 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8 relative z-50"
          onSubmit={handleSubmit}
        >
          <div className="relative group">
            <input 
              type="text" 
              name="name"
              id="name"
              className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-lg text-white placeholder-transparent focus:outline-none focus:border-accent peer disabled:opacity-50"
              placeholder="Name"
              required
              disabled={status === "loading" || status === "success"}
            />
            <label htmlFor="name" className="absolute left-0 top-4 font-sans text-text-secondary uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-accent peer-focus:text-[10px] peer-valid:-top-4 peer-valid:text-[10px]">Your Name</label>
          </div>

          <div className="relative group">
            <input 
              type="email" 
              name="email"
              id="email"
              className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-lg text-white placeholder-transparent focus:outline-none focus:border-accent peer disabled:opacity-50"
              placeholder="Email"
              required
              disabled={status === "loading" || status === "success"}
            />
            <label htmlFor="email" className="absolute left-0 top-4 font-sans text-text-secondary uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-accent peer-focus:text-[10px] peer-valid:-top-4 peer-valid:text-[10px]">Email Address</label>
          </div>

          <div className="relative group mt-4">
            <textarea 
              name="message"
              id="message"
              rows="4"
              className="w-full bg-transparent border-b border-white/20 py-4 font-sans text-lg text-white placeholder-transparent focus:outline-none focus:border-accent peer resize-none disabled:opacity-50"
              placeholder="Message"
              required
              disabled={status === "loading" || status === "success"}
            ></textarea>
            <label htmlFor="message" className="absolute left-0 top-4 font-sans text-text-secondary uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-accent peer-focus:text-[10px] peer-valid:-top-4 peer-valid:text-[10px]">Project Details</label>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`self-start group relative flex items-center gap-6 rounded-full pl-8 pr-2 py-2 transition-all duration-500 disabled:cursor-not-allowed
                ${status === "success" ? "bg-accent text-black" : "bg-white text-black hover:bg-accent"}
              `}
            >
              <span className="font-sans font-bold uppercase tracking-[0.15em] text-sm">
                {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
              </span>
              <div className="bg-black text-white rounded-full p-4">
                {status === "loading" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle2 size={18} className="text-accent" />
                ) : (
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
              </div>
            </button>
            
            {/* Error Message Display */}
            <AnimatePresence>
              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-red-500 text-sm font-sans tracking-wide"
                >
                  <AlertCircle size={16} />
                  <span>{errorMessage || "Failed to send message."}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
