import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Works", path: "/works" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference text-white"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="flex-1 font-sans text-xs md:text-sm uppercase tracking-widest hidden sm:block opacity-80">
          Islamabad, PK
        </div>
        <Link to="/" className="flex-1 text-center font-display text-2xl md:text-3xl font-bold tracking-tight">
          UMER
        </Link>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => setIsOpen(true)} 
            className="flex items-center justify-center p-2 hover:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <div className="grid grid-cols-2 gap-[4px]">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-background-dark flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 md:right-12 p-2 text-white hover:text-accent transition-colors"
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((item, i) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="font-display text-5xl md:text-7xl font-bold uppercase hover:text-accent transition-colors"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ))}
              
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  to="/cv"
                  className="font-display text-3xl md:text-5xl font-bold uppercase text-text-secondary hover:text-white transition-colors"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                  >
                    Preview CV
                  </motion.div>
                </Link>
                
                <a
                  href="/Umer_Khan_CV.pdf"
                  download
                  className="font-display text-3xl md:text-5xl font-bold uppercase text-accent hover:text-white transition-colors"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (navLinks.length + 1) * 0.1 }}
                  >
                    Download CV
                  </motion.div>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
