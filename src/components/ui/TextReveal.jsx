import { motion } from "framer-motion";

/**
 * TextReveal - Reusable text animation component
 * Animates text from bottom (translateY) with stagger effect
 * @param {string} text - The text to animate
 * @param {string} className - Tailwind classes to apply
 * @param {boolean} useWords - If true, stagger by word; if false, stagger by letter
 * @param {number} delay - Initial delay before animation starts
 */
export function TextReveal({ text, className = "", useWords = true, delay = 0, center = false }) {
  // Split text into words or letters
  const items = useWords 
    ? text.split(" ").map((word, i) => ({ id: i, text: word + (i < text.split(" ").length - 1 ? " " : "") }))
    : text.split("").map((char, i) => ({ id: i, text: char }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: useWords ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {useWords ? (
        <div className={`flex flex-wrap${center ? " justify-center" : ""}`}>
          {items.map((item) => (
            <motion.span key={item.id} variants={itemVariants} className="inline-block">
              {item.text}
            </motion.span>
          ))}
        </div>
      ) : (
        <div className={center ? "flex flex-wrap justify-center" : ""}>
          {items.map((item) => (
            <motion.span key={item.id} variants={itemVariants} className="inline-block">
              {item.text}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/**
 * Advanced TextReveal with gradient support
 * Useful for headlines with accent colors
 */
export function TextRevealGradient({ 
  parts = [], // Array of { type: "text"|"accent", value: string }
  className = "", 
  useWords = false,
  delay = 0,
  center = false,
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: useWords ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {parts.map((part, index) => {
        const items = part.value.split(" ");
        
        return (
          <div key={index} className={`flex flex-wrap${center ? " justify-center" : ""}`}>
            {items.map((word, wordIndex) => (
              <motion.span
                key={`${index}-${wordIndex}`}
                variants={itemVariants}
                className={`inline-block ${
                  part.type === "accent"
                    ? "bg-gradient-to-r from-white/95 via-white/70 to-white/45 bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {word}{wordIndex < items.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </div>
        );
      })}
    </motion.div>
  );
}
