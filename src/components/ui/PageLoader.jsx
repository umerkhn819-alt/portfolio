import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-white/15 border-t-[#F5F5F4]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        aria-label="Loading"
      />
    </div>
  );
}
