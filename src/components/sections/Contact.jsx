import { useState, memo } from "react";
import { motion } from "framer-motion";
import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import { contactSection, contactForm } from "../../data/contact";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

const initial = { name: "", email: "", message: "" };

export const Contact = memo(function Contact() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  const zoneRef = useGsapContext((el) => {
    if (!el) return;
    bindStaggerReveal(
      el,
      "[data-reveal]",
      { autoAlpha: 0, y: 36 },
      { autoAlpha: 1, y: 0 },
      { start: "top 86%", stagger: 0.1 }
    );
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
    <Section id="contact" className="relative overflow-hidden bg-transparent transition-colors duration-300">
      <Container className="relative z-10 py-20">
        <div 
          ref={zoneRef} 
          className="grid gap-12 lg:gap-20 lg:grid-cols-[1fr_1.2fr] lg:items-start"
        >
          <div>
            <SectionHeading
              eyebrow={contactSection.eyebrow}
              title={contactSection.title}
              subtitle={contactSection.subtitle}
            />
            
            <div data-reveal className="mt-12 font-mono text-[var(--accent-primary)] text-sm tracking-widest uppercase opacity-80 flex flex-col gap-4 border-l border-[var(--accent-primary)]/30 pl-6">
              <div>&gt; STATUS: ONLINE</div>
              <div>&gt; CHANNELS: OPEN</div>
              <div>&gt; ENCRYPTION: ACTIVE</div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative group perspective-1000"
          >
            <motion.form
              onSubmit={onSubmit}
              className="rounded-2xl border border-[var(--accent-secondary)]/30 bg-[#050505]/90 backdrop-blur-xl p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(138,43,226,0.1)] transition-colors duration-300"
              initial={{ opacity: 0, x: 40, rotateY: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Animated top border glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-secondary)] to-transparent opacity-50" />

              <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--accent-secondary)] uppercase">Transmission Interface</span>
              </div>

              <motion.div 
                data-reveal 
                className="grid gap-8 sm:grid-cols-2 relative z-10"
              >
                <label className="flex flex-col gap-3 font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase">
                  {contactForm.nameField.label}
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="bg-transparent border-b border-white/10 px-0 py-2 text-sm text-white outline-none transition-all focus:border-[var(--accent-primary)] focus:shadow-[0_4px_15px_-3px_rgba(0,240,255,0.3)] placeholder:text-white/20"
                    placeholder="ENTER_IDENTIFIER..."
                  />
                </label>
                
                <label className="flex flex-col gap-3 font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase">
                  {contactForm.emailField.label}
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="bg-transparent border-b border-white/10 px-0 py-2 text-sm text-white outline-none transition-all focus:border-[var(--accent-primary)] focus:shadow-[0_4px_15px_-3px_rgba(0,240,255,0.3)] placeholder:text-white/20"
                    placeholder="ENTER_COMM_LINK..."
                  />
                </label>
              </motion.div>

              <motion.label
                data-reveal
                className="mt-10 flex flex-col gap-3 font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase relative z-10"
              >
                {contactForm.messageField.label}
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  className="bg-transparent border border-white/10 rounded-lg p-4 text-sm text-white outline-none transition-all focus:border-[var(--accent-primary)] focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] placeholder:text-white/20 resize-none mt-2"
                  placeholder="TRANSMIT_PAYLOAD..."
                />
              </motion.label>

              <motion.div 
                data-reveal 
                className="mt-10 flex flex-wrap items-center gap-6 relative z-10"
              >
                <button
                  type="submit"
                  disabled={sent}
                  className="font-mono text-sm tracking-widest uppercase border border-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] px-8 py-4 rounded hover:bg-[var(--accent-secondary)]/20 hover:shadow-[0_0_20px_rgba(138,43,226,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {sent ? contactForm.submit.pendingLabel : contactForm.submit.idleLabel || "INITIALIZE_TRANSFER"}
                </button>
                {sent && (
                  <span className="font-mono text-sm text-[#00F0FF] animate-pulse">
                    &gt; {contactForm.successMessage || "TRANSMISSION_SUCCESSFUL"}
                  </span>
                )}
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
});
