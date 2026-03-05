import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
// Asumiendo que Vite maneja la importación de mp3 correctamente
import lofiAudio from '../assets/audio/lofi-background.mp3';

const FloatingMoodPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log("Reproducción automática bloqueada o error:", error);
          // No desactivamos el estado, intentamos reanudar en la primera interacción
          const resumeAudio = () => {
            if (audioRef.current) {
              audioRef.current.play().catch(e => console.error("Error al reanudar audio:", e));
              window.removeEventListener('click', resumeAudio);
              window.removeEventListener('keydown', resumeAudio);
              window.removeEventListener('touchstart', resumeAudio);
            }
          };
          
          window.addEventListener('click', resumeAudio);
          window.addEventListener('keydown', resumeAudio);
          window.addEventListener('touchstart', resumeAudio);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed right-4 bottom-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-40 flex flex-col gap-4">
      <audio ref={audioRef} src={lofiAudio} loop autoPlay />
      
      {/* Botón Play (Happy) */}
      <motion.button
        onClick={() => setIsPlaying(true)}
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 shadow-lg cursor-pointer hover:bg-black/60 transition-colors group`}
        title="Reproducir música Lo-Fi"
      >
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform">😊</span>
      </motion.button>

      {/* Botón Pause (Sad) */}
      <motion.button
        onClick={() => setIsPlaying(false)}
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
        className="relative w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 shadow-lg cursor-pointer hover:bg-black/60 transition-colors group"
        title="Pausar música"
      >
        <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform">😢</span>
      </motion.button>
    </div>
  );
};

export default FloatingMoodPlayer;
