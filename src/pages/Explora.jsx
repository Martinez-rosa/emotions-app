import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Points, PointMaterial, Center, Environment } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Import the model explicitly to ensure Vite resolves the path correctly
import bustoModel from '../assets/3d/busto.glb';

const GalaxyParticles = (props) => {
  const ref = useRef();
  // Increased particle count and radius to cover the entire Hero Section
  const sphere = random.inSphere(new Float32Array(15000), { radius: 10 });
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20; // Slower rotation for larger field
    ref.current.rotation.y -= delta / 30;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#d8b4fe" // Light purple/white
          size={0.01} // Slightly larger to be visible at distance
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Busto = (props) => {
  // Use the imported URL
  const { scene } = useGLTF(bustoModel);
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2; // Slower rotation
    }
  });

  return (
    <group ref={ref} {...props}>
      <Center>
         <primitive object={scene} scale={[2.5, 2.5, 2.5]} />
      </Center>
    </group>
  );
};

// Preload the model to avoid waterfall loading
useGLTF.preload(bustoModel);

const Explora = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Full Screen Hero Section */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 35 }}>
            <color attach="background" args={['#000000']} />
            
            <Suspense fallback={null}>
              {/* Lighting for Purple Effect */}
              <ambientLight intensity={0.2} color="#581c87" /> {/* Dark purple ambient */}
              <spotLight 
                position={[5, 5, 5]} 
                angle={0.3} 
                penumbra={1} 
                intensity={2} 
                color="#d8b4fe" /* Light purple */
              />
              <pointLight position={[-3, -3, 2]} intensity={1.5} color="#7e22ce" /> {/* Deep purple fill */}
              
              {/* Environment for reflections (important for PBR materials) */}
              <Environment preset="city" environmentIntensity={0.5} />

              <GalaxyParticles />
              <Busto />
            </Suspense>
            
            <OrbitControls enableZoom={false} autoRotate={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Text Overlay - Centered vertically but positioned left */}
        <div className="relative z-10 w-full h-full flex items-center px-6 md:px-16 pointer-events-none">
           <div className="max-w-xl w-full pointer-events-auto mt-20 md:mt-0">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-sm md:text-base text-slate-300 mb-4 tracking-[0.2em] uppercase font-light"
              >
                Forma parte de nuestra comunidad 
                <br />
                Emociones con ritmo
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight"
              >
                Explora
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-slate-300 font-light mb-12 leading-relaxed"
              >
                En esta sección encontrarás los artículos y noticias más actualizados sobre música y emociones. Creemos que podemos crear nuevas emociones.
              </motion.p>
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => navigate('/sobre')}
                className="px-8 py-3 border border-white/30 text-white uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
              >
                ¿ Qué es Emotions ?
              </motion.button>
           </div>
           
           {/* Decorative Number */}
           <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1, duration: 1 }}
             className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 text-[20rem] font-serif text-white/5 pointer-events-none select-none"
           >
             01
           </motion.div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/30 transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-400 line-clamp-2 mb-6 flex-grow font-light">
                  {article.description}
                </p>
                
                <Link 
                  to={`/explora/${article.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-purple-400 transition-colors"
                >
                  Leer más
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explora;
