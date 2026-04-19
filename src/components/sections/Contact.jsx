import { useState, memo } from "react";
import { motion } from "framer-motion";
import { useGsapContext } from "../../hooks/useGsapContext";
import { bindStaggerReveal } from "../../animations/scrollReveal";
import { contactSection, contactForm } from "../../data/contact";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

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
    <Section id="contact" className="relative overflow-hidden bg-gray-50 dark:bg-transparent transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/8 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 -right-32 w-80 h-80 bg-indigo-500/5 dark:bg-accent/5 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <motion.div 
          ref={zoneRef} 
          className="grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[1fr_1fr] lg:items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <SectionHeading
              eyebrow={contactSection.eyebrow}
              title={contactSection.title}
              subtitle={contactSection.subtitle}
            />
          </div>

          <motion.form
            onSubmit={onSubmit}
            className="rounded-2xl border border-gray-300 dark:border-border-subtle/50 bg-gradient-to-br from-white dark:from-surface-overlay/60 to-gray-50 dark:to-surface/40 p-6 shadow-lg dark:shadow-2xl shadow-gray-400/20 dark:shadow-black/30 backdrop-blur-md sm:p-8 relative overflow-hidden group transition-colors duration-300"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Glow effect on form hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            </div>

            <motion.div 
              data-reveal 
              className="grid gap-5 sm:grid-cols-2 relative z-10"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  }
                }
              }}
            >
              <motion.label 
                className="flex flex-col gap-2 text-sm text-gray-600 dark:text-zinc-400 transition-colors duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                {contactForm.nameField.label}
                <motion.input
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="rounded-xl border border-gray-300 dark:border-border bg-white dark:bg-surface-raised px-4 py-3 text-sm text-gray-900 dark:text-white outline-none ring-accent/0 transition hover:border-gray-400 dark:hover:border-border-subtle focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
                  placeholder={contactForm.nameField.placeholder}
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
                />
              </motion.label>
              <motion.label 
                className="flex flex-col gap-2 text-sm text-gray-600 dark:text-zinc-400 transition-colors duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                {contactForm.emailField.label}
                <motion.input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="rounded-xl border border-gray-300 dark:border-border bg-white dark:bg-surface-raised px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition hover:border-gray-400 dark:hover:border-border-subtle focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
                  placeholder={contactForm.emailField.placeholder}
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
                />
              </motion.label>
            </motion.div>

            <motion.label
              data-reveal
              className="mt-5 flex flex-col gap-2 text-sm text-gray-600 dark:text-zinc-400 relative z-10 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {contactForm.messageField.label}
              <motion.textarea
                required
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                className="resize-none rounded-xl border border-gray-300 dark:border-border bg-white dark:bg-surface-raised px-4 py-3 text-sm text-gray-900 dark:text-white outline-none transition hover:border-gray-400 dark:hover:border-border-subtle focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
                placeholder={contactForm.messageField.placeholder}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
              />
            </motion.label>

            <motion.div 
              data-reveal 
              className="mt-6 flex flex-wrap items-center gap-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button type="submit" disabled={sent}>
                {sent
                  ? contactForm.submit.pendingLabel
                  : contactForm.submit.idleLabel}
              </Button>
              {sent ? (
                <span className="text-sm text-accent-glow">
                  {contactForm.successMessage}
                </span>
              ) : null}
            </motion.div>
          </motion.form>
        </motion.div>
      </Container>
    </Section>
  );
});
