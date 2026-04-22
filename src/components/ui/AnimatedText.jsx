import { motion } from "framer-motion";

export function AnimatedText({ 
  text, 
  className = "", 
  delay = 0, 
  stagger = 0.03,
  type = "letter" // "letter" or "word"
}) {
  const elements = type === "word" ? text.split(" ") : Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay 
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -45, // Slight 3D rotation for cinematic feel
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block", perspective: 800 }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      className={className}
    >
      {elements.map((el, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ 
            display: "inline-block", 
            whiteSpace: el === " " && type === "letter" ? "pre" : "normal",
            marginRight: type === "word" && index !== elements.length - 1 ? "0.25em" : "0"
          }}
        >
          {el === " " && type === "letter" ? "\u00A0" : el}
        </motion.span>
      ))}
    </motion.span>
  );
}
