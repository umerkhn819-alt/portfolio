import { useState, memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatedText } from "../ui/AnimatedText";
import { contactSection, contactForm } from "../../data/contact";
import { Container } from "../ui/Container";

gsap.registerPlugin(ScrollTrigger);

const initial = { name: "", email: "", message: "" };

export const Contact = memo(function Contact() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // ── Left column: slide in from left with clip-path ──
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { x: -120, opacity: 0, clipPath: "inset(0 100% 0 0)" },
          {
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Right column (form): slide in from right ──
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { x: 120, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Status indicators: stagger in ──
      gsap.fromTo(
        ".contact-status-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Form fields: stagger reveal ──
      gsap.fromTo(
        ".contact-field",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm(initial);
    }, 2400);
  };

  return (
    <section
      ref={sectionRef}
      id="contact-inner"
      className="relative overflow-hidden bg-transparent py-16 md:py-32"
    >
      <Container className="relative z-10">
        <div className="grid gap-16 lg:gap-20 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Left Column: Typography & Info */}
          <div ref={leftRef} className="flex flex-col">
            <h2 className="font-mono text-sm text-[#00BBFF] tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#00BBFF]" />
              {contactSection.eyebrow}
            </h2>

            <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 uppercase tracking-wide leading-tight">
              <AnimatedText text={contactSection.title} type="letter" delay={0.2} stagger={0.05} />
            </h3>

            <p className="font-mono text-base text-white/70 leading-relaxed max-w-lg mb-12">
              <AnimatedText text={contactSection.subtitle} type="word" delay={0.5} stagger={0.02} />
            </p>

            {/* Cyber Status Indicators */}
            <div className="font-mono text-[#00BBFF] text-xs tracking-[0.2em] uppercase flex flex-col gap-5 border-l-2 border-[#00BBFF]/30 pl-6 bg-gradient-to-r from-[#00BBFF]/5 to-transparent py-4">
              <div className="contact-status-item flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00BBFF] shadow-[0_0_10px_#00BBFF] animate-pulse" />
                SYSTEM STATUS: ONLINE
              </div>
              <div className="contact-status-item flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00BBFF] shadow-[0_0_10px_#00BBFF] animate-pulse" />
                COMMS CHANNELS: OPEN
              </div>
              <div className="contact-status-item flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00BBFF] shadow-[0_0_10px_#00BBFF] animate-pulse" />
                ENCRYPTION: ACTIVE
              </div>
            </div>
          </div>

          {/* Right Column: Cybernetic Form */}
          <div ref={rightRef} className="contact-scroll-out relative w-full">
            <motion.form
              onSubmit={onSubmit}
              className="relative rounded-[32px] border border-white/10 bg-[#050505]/60 backdrop-blur-2xl p-8 sm:p-12 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] glass-panel"
            >
              {/* Form Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="w-2 h-2 bg-[#00BBFF] rounded-full animate-ping" />
                  </div>
                  <div>
                    <h4 className="font-display text-white text-lg uppercase tracking-wide">Secure Link</h4>
                    <p className="font-mono text-[10px] text-white/50 tracking-widest uppercase">Direct connection established</p>
                  </div>
                </div>
                <div className="font-mono text-[10px] text-[#00BBFF] border border-[#00BBFF]/30 px-3 py-1 rounded bg-[#00BBFF]/10">
                  READY
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-6 sm:grid-cols-2 relative z-10 mb-6">
                <div className="contact-field flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase ml-1">
                    {contactForm.nameField.label}
                  </label>
                  <motion.input
                    required
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    whileFocus={{ scale: 1.02, backgroundColor: "rgba(0,187,255,0.05)", borderColor: "#00BBFF" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white font-mono outline-none shadow-[0_0_20px_rgba(0,187,255,0)] focus:shadow-[0_0_20px_rgba(0,187,255,0.1)] placeholder:text-white/20"
                    placeholder="Enter Identifier..."
                  />
                </div>

                <div className="contact-field flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase ml-1">
                    {contactForm.emailField.label}
                  </label>
                  <motion.input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    whileFocus={{ scale: 1.02, backgroundColor: "rgba(0,187,255,0.05)", borderColor: "#00BBFF" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white font-mono outline-none shadow-[0_0_20px_rgba(0,187,255,0)] focus:shadow-[0_0_20px_rgba(0,187,255,0.1)] placeholder:text-white/20"
                    placeholder="Enter Comms Link..."
                  />
                </div>
              </div>

              <div className="contact-field flex flex-col gap-2 relative z-10 mb-10">
                <label className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase ml-1">
                  {contactForm.messageField.label}
                </label>
                <motion.textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  whileFocus={{ scale: 1.02, backgroundColor: "rgba(0,187,255,0.05)", borderColor: "#00BBFF" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white font-mono outline-none shadow-[0_0_20px_rgba(0,187,255,0)] focus:shadow-[0_0_20px_rgba(0,187,255,0.1)] placeholder:text-white/20 resize-none"
                  placeholder="Transmit Payload Details..."
                />
              </div>

              {/* Submit Button */}
              <div className="relative z-10">
                <motion.button
                  type="submit"
                  disabled={sent}
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(0,187,255,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full font-display font-bold text-sm tracking-widest uppercase bg-white text-black px-8 py-5 rounded-xl transition-colors duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  data-cursor="Send"
                >
                  {sent ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full animate-ping" />
                      {contactForm.submit.pendingLabel || "TRANSMITTING..."}
                    </span>
                  ) : (
                    <span>{contactForm.submit.idleLabel || "INITIALIZE TRANSFER"}</span>
                  )}
                </motion.button>
                {sent && (
                  <p className="font-mono text-xs text-[#00BBFF] mt-4 text-center animate-pulse tracking-widest">
                    &gt; {contactForm.successMessage || "TRANSMISSION SUCCESSFUL."}
                  </p>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </Container>
    </section>
  );
});
