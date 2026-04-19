import { motion } from "framer-motion";

/**
 * LetterByLetterReveal - Letter-by-letter animation component
 * Splits text into individual characters and animates each with translateY + opacity
 * @param {string} text - The text to animate
 * @param {string} className - Tailwind classes to apply
 * @param {number} delay - Initial delay before animation starts (seconds)
 * @param {number} staggerDelay - Delay between each letter (seconds)
 * @param {number} duration - Duration of each letter's animation (seconds)
 */
export function LetterByLetterReveal({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 0.04,
  duration = 0.5
}) {
  const letters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
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
      <div className="flex flex-wrap">
        {letters.map((letter, index) => (
          <motion.span
            key={`letter-${index}`}
            variants={letterVariants}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
