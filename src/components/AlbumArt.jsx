import React from 'react';
import { motion } from 'framer-motion';

const AlbumArt = ({ title, mood, className }) => {
  // Generar un hash simple a partir del título para que el diseño sea consistente pero único
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const getMoodColors = (mood) => {
    switch (mood?.toLowerCase()) {
      case 'feliz': return ['from-yellow-400', 'to-orange-500', 'bg-yellow-200'];
      case 'triste': return ['from-blue-400', 'to-indigo-600', 'bg-blue-200'];
      case 'enérgico': return ['from-red-500', 'to-purple-600', 'bg-red-200'];
      case 'tranquilo': return ['from-teal-300', 'to-blue-400', 'bg-teal-100'];
      case 'nostálgico': return ['from-amber-700', 'to-orange-300', 'bg-amber-100'];
      case 'motivado': return ['from-emerald-400', 'to-cyan-600', 'bg-emerald-100'];
      default: return ['from-gray-400', 'to-gray-600', 'bg-gray-200'];
    }
  };

  const [gradFrom, gradTo, bgColor] = getMoodColors(mood);
  
  // Patrones geométricos basados en el hash
  const patterns = [
    // Círculos
    <circle cx="50%" cy="50%" r="40%" fill="url(#grad1)" fillOpacity="0.8" />,
    // Triángulos
    <path d="M50 10 L90 90 L10 90 Z" fill="url(#grad1)" fillOpacity="0.8" />,
    // Ondas
    <path d="M0 50 Q 25 25, 50 50 T 100 50 V 100 H 0 Z" fill="url(#grad1)" fillOpacity="0.8" />,
    // Rectángulos rotados
    <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" fill="url(#grad1)" fillOpacity="0.8" />
  ];

  const selectedPattern = patterns[hash % patterns.length];

  return (
    <div className={`relative overflow-hidden ${className} ${bgColor}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={`stop-color-${gradFrom.replace('from-', '')}`} style={{ stopColor: 'currentColor' }} />
            <stop offset="100%" className={`stop-color-${gradTo.replace('to-', '')}`} style={{ stopColor: 'currentColor' }} />
          </linearGradient>
        </defs>
        {selectedPattern}
      </svg>
      
      {/* Texto artístico superpuesto */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-black/10">
        <span className="text-white font-bold text-xs uppercase tracking-widest opacity-80 drop-shadow-md">
          {mood}
        </span>
      </div>
    </div>
  );
};

export default AlbumArt;
