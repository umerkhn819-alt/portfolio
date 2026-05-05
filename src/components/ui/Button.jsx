import { motion } from "framer-motion";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40";

const variants = {
  primary: `${base} border border-white/20 bg-white/[0.04] text-[#F5F5F4] shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:border-white/40 hover:bg-white/[0.08]`,
  ghost: `${base} border border-white/10 bg-transparent text-[#F5F5F4] hover:border-white/20 hover:bg-white/[0.05]`,
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  disabled = false,
  ...props
}) {
  const classes = `${variants[variant] ?? variants.primary} ${className}`;

  const hoverVariants = disabled ? {} : {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const tapVariants = disabled ? undefined : {
    scale: 0.98,
    boxShadow: "0 0 24px rgba(255,255,255,0.2)",
    transition: { duration: 0.15, ease: "easeIn" }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={hoverVariants}
        whileTap={tapVariants}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`${classes} disabled:pointer-events-none disabled:opacity-50`}
      whileHover={hoverVariants}
      whileTap={tapVariants}
      {...props}
    >
      {children}
    </motion.button>
  );
}
