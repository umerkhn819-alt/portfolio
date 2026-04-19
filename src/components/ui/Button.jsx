import { motion } from "framer-motion";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  primary: `${base} bg-accent text-white shadow-lg shadow-accent/25 hover:shadow-lg hover:shadow-accent/40`,
  ghost: `${base} border border-gray-300 dark:border-border bg-transparent text-gray-900 dark:text-zinc-100 hover:border-gray-400 dark:hover:border-accent/50 hover:bg-gray-100 dark:hover:bg-surface-overlay/60 hover:shadow-lg hover:shadow-accent/20`,
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
    scale: 1.05,
    rotateZ: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const tapVariants = disabled ? undefined : {
    scale: 0.92,
    rotateZ: -1.5,
    boxShadow: variant === "primary"
      ? "0 0 30px rgba(99,102,241,0.8), 0 0 60px rgba(99,102,241,0.4)"
      : "0 0 20px rgba(99,102,241,0.6)",
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
