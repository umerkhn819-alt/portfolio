import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-border border-t-accent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        aria-label="Loading"
      />
    </div>
  );
}
