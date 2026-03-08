import React from 'react';
import { motion } from 'framer-motion';

const Privacidad = () => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Política de Privacidad</h1>
            <p className="text-slate-400">Última actualización: {new Date().getFullYear()}</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-12 text-slate-300 leading-relaxed"
        >
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">1. Introducción</h2>
                <p>
                    Bienvenido a EMOTIONS. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información 
                    cuando utiliza nuestra plataforma web. Al ser un proyecto académico del Grado de Ingeniería Informática, 
                    nuestra prioridad es la transparencia y el respeto por su privacidad.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">2. Información que recopilamos</h2>
                <p>
                    Actualmente, EMOTIONS no recopila datos personales identificables (como nombres, correos electrónicos o direcciones) de forma persistente en servidores externos.
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li>
                        <strong className="text-white">Datos de Mood:</strong> La información sobre su estado de ánimo seleccionada en el quiz se procesa localmente en su navegador para generar las recomendaciones de música y contenido.
                    </li>
                    <li>
                        <strong className="text-white">Cookies Técnicas:</strong> Utilizamos almacenamiento local (localStorage) únicamente para recordar sus preferencias de sesión de forma temporal.
                    </li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">3. Uso de la información</h2>
                <p>
                    La información generada durante su interacción con la plataforma se utiliza exclusivamente para:
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li>Personalizar la experiencia de usuario y el contenido mostrado (música, videos, podcast).</li>
                    <li>Fines académicos y de demostración del funcionamiento del algoritmo de recomendación.</li>
                </ul>
                <p>
                    No compartimos, vendemos ni alquilamos ninguna información a terceros.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">4. Enlaces a terceros</h2>
                <p>
                    Nuestra plataforma puede contener enlaces a sitios web externos (como YouTube, Spotify o redes sociales). 
                    No nos hacemos responsables de las prácticas de privacidad de dichos sitios. Le recomendamos leer las políticas de privacidad de cualquier sitio externo que visite.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">5. Contacto</h2>
                <p>
                    Si tiene preguntas sobre esta Política de Privacidad o sobre el proyecto académico, puede contactarnos a través de los canales oficiales de la universidad o mediante los perfiles de los integrantes en la sección "Sobre Nosotros".
                </p>
            </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Privacidad;
