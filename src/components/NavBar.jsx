import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  return (
    <nav className="sticky top-0 z-[60] w-full border-b border-slate-200/10 bg-background-dark/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 z-[70] group">
          {/* Animated Wave Icon */}
          <div className="flex items-end justify-center gap-1 h-10 w-10 pb-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-[#2397f6] rounded-full"
                animate={{
                  height: [
                    i === 0 ? "30%" : i === 1 ? "40%" : i === 2 ? "100%" : i === 3 ? "60%" : "30%",
                    i === 0 ? "70%" : i === 1 ? "80%" : i === 2 ? "40%" : i === 3 ? "30%" : "60%",
                    i === 0 ? "30%" : i === 1 ? "40%" : i === 2 ? "100%" : i === 3 ? "60%" : "30%"
                  ]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
          
          {/* Typewriter Text Effect */}
          <motion.div 
            className="flex overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {"EMOTIONS".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="text-2xl font-black tracking-tighter text-slate-100"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Inicio</Link>
          <Link to="/mood" className="text-sm font-medium hover:text-primary transition-colors">Mood</Link>
          <Link to="/videos" className="text-sm font-medium hover:text-primary transition-colors">Vídeos</Link>
          <Link to="/podcast" className="text-sm font-medium hover:text-primary transition-colors">Podcast</Link>
          <Link to="/explora" className="text-sm font-medium hover:text-primary transition-colors">Explora</Link>
          <Link to="/transmedia" className="text-sm font-medium hover:text-primary transition-colors">Transmedia</Link>
          <Link to="/sobre" className="text-sm font-medium hover:text-primary transition-colors">Sobre</Link>
        </div>

        <div className="hidden md:block">
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 cursor-pointer">
            Perfil
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white p-2 z-[70]"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background-dark/95 border-b border-slate-200/10 absolute top-20 left-0 w-full shadow-2xl"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              <Link to="/" onClick={toggleMenu} className="text-lg font-medium hover:text-primary transition-colors">Inicio</Link>
              <Link to="/mood" onClick={toggleMenu} className="text-lg font-medium hover:text-primary transition-colors">Mood</Link>
              <Link to="/videos" onClick={toggleMenu} className="text-lg font-medium hover:text-primary transition-colors">Vídeos</Link>
              <Link to="/podcast" onClick={toggleMenu} className="text-lg font-medium hover:text-primary transition-colors">Podcast</Link>
              <Link to="/explora" onClick={toggleMenu} className="text-lg font-medium hover:text-primary transition-colors">Explora</Link>
              <Link to="/transmedia" onClick={toggleMenu} className="text-lg font-medium hover:text-primary transition-colors">Transmedia</Link>
              <Link to="/sobre" onClick={toggleMenu} className="text-lg font-medium hover:text-primary transition-colors">Sobre</Link>
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg font-bold transition-all w-3/4 max-w-xs">
                Perfil
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
