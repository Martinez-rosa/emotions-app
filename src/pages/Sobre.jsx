import React from 'react';
import { motion } from 'framer-motion';

// Import images
import daniImg from '../assets/integrantes/Dani.png';
import lidiaImg from '../assets/integrantes/Lidia.png';
import luisImg from '../assets/integrantes/Luis.png';
import mauImg from '../assets/integrantes/Mau.png';
import paulaImg from '../assets/integrantes/Paula.png';

const Sobre = () => {
  const team = [
    { name: 'Lidia', role: 'Grado de Ingeniería Informática', img: lidiaImg },
    { name: 'Maura', role: 'Grado de Ingeniería Informática', img: mauImg },
    { name: 'Paula', role: 'Grado de Ingeniería Informática', img: paulaImg },
    { name: 'Daniel', role: 'Grado de Ingeniería Informática', img: daniImg },
    { name: 'Luis', role: 'Grado de Ingeniería Informática', img: luisImg },
  ];

  return (
    <div className="w-full">
        {/* Section: Quiénes somos */}
        <section className="max-w-7xl mx-auto px-6 py-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 space-y-6"
            >
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Sobre nosotros</h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    Somos un grupo de 5 estudiantes del Grado de Ingeniería Informática apasionados por la música y su impacto emocional en las personas. 
                    Este proyecto nació como trabajo final de curso con la idea de explorar cómo los medios digitales, en este caso, la música, pueden contar 
                    historias más cercanas y personales. Emotions es nuestra forma de unir creatividad, tecnología y música en un solo lugar.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {team.map((member, index) => (
                    <motion.div 
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-slate-800 group-hover:border-primary transition-colors duration-300 shadow-lg shadow-black/50">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-sm text-primary font-medium uppercase tracking-wide">{member.role}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Section: El Proyecto */}
        <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#111111] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
                 <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm uppercase tracking-widest mb-8">
                    Proyecto Universitario — Curso 2024/25
                </span>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">El Proyecto</h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        EMOTIONS es una experiencia transmedia diseñada para conectar tus emociones con el arte. 
                        A través de una curaduría algorítmica y humana, buscamos ofrecerte el soundtrack perfecto para cada momento de tu vida, 
                        integrando música, video y narrativa en una sola plataforma.
                    </p>
                </div>
            </div>
        </section>

        {/* Section: Transparencia */}
        <section className="py-24 bg-[#111111]">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center text-white">Transparencia</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Block 1: Ficción */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors hover:bg-white/[0.07]">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                            <span className="material-symbols-outlined text-2xl">auto_stories</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">Narrativa </h3>
                        <p className="text-slate-400 leading-relaxed">
                            Este proyecto es un ejercicio académico. La narrativa presentada en la sección de podcast y videos es creada con fines educativos y narrativos.
                        </p>
                    </div>

                    {/* Block 2: IA */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors hover:bg-white/[0.07]">
                         <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                            <span className="material-symbols-outlined text-2xl">smart_toy</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">Uso de IA</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Se han utilizado herramientas de Inteligencia Artificial para la generación de prototipos 3D, texturas y como asistente en la redacción de contenidos para el prototipo.
                        </p>
                    </div>

                    {/* Block 3: Fuentes */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors hover:bg-white/[0.07]">
                         <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
                            <span className="material-symbols-outlined text-2xl">copyright</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">Fuentes y Recursos</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Recursos gráficos y sonoros obtenidos de bancos de imágenes libres de derechos (Unsplash, Pexels) y bibliotecas de audio autorizadas para uso educativo y sin fines de lucro.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Sobre;
