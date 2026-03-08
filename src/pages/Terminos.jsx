import React from 'react';
import { motion } from 'framer-motion';

const Terminos = () => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Términos y Condiciones</h1>
            <p className="text-slate-400">Última actualización: {new Date().getFullYear()}</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-12 text-slate-300 leading-relaxed"
        >
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">1. Aceptación de los términos</h2>
                <p>
                    Al acceder y utilizar EMOTIONS, usted acepta cumplir con estos Términos y Condiciones de Uso. 
                    Si no está de acuerdo con alguna parte de estos términos, le recomendamos no utilizar nuestros servicios.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">2. Naturaleza del proyecto</h2>
                <p>
                    EMOTIONS es un proyecto académico desarrollado por estudiantes del Grado de Ingeniería Informática. 
                    Su propósito es estrictamente educativo y demostrativo.
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li>
                        La plataforma no ofrece servicios comerciales ni profesionales de salud mental.
                    </li>
                    <li>
                        El contenido generado (recomendaciones, textos, análisis) es automatizado y no sustituye el consejo profesional.
                    </li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">3. Propiedad Intelectual</h2>
                <p>
                    Todo el código fuente, diseño, logotipos y contenido original de EMOTIONS son propiedad intelectual del equipo de desarrollo, 
                    salvo aquellos recursos de terceros (imágenes, audios, librerías) que se utilizan bajo sus respectivas licencias.
                </p>
                <p>
                    Queda prohibida la reproducción, distribución o modificación del contenido de este proyecto sin la autorización expresa de los autores, 
                    salvo para fines educativos o de evaluación académica.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">4. Uso de Contenido Multimedia</h2>
                <p>
                    Las imágenes, videos y audios presentados en la plataforma pueden estar sujetos a derechos de autor de terceros. 
                    Se utilizan en este proyecto bajo el concepto de "uso justo" (fair use) con fines educativos y sin ánimo de lucro.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">5. Limitación de Responsabilidad</h2>
                <p>
                    EMOTIONS se proporciona "tal cual". Los autores no garantizan que la plataforma esté libre de errores o que el acceso sea ininterrumpido. 
                    No nos hacemos responsables de cualquier daño directo o indirecto que pueda surgir del uso de la plataforma.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">6. Modificaciones</h2>
                <p>
                    Nos reservamos el derecho de modificar o reemplazar estos términos en cualquier momento. 
                    Se recomienda revisar esta página periódicamente para estar al tanto de cualquier cambio.
                </p>
            </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Terminos;
