import { useNavigate, Link } from 'react-router-dom';
// motion is imported but not used in this snippet; keep for consistency with rest of file
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const waveVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.6, 1, 0.6],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const scrollToContent = () => {
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <main className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden sound-wave-bg px-6">
        {/* Subtle Particles/Waves decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          {/* Enhanced Gradient Orbs for color pop without square borders */}
          <div className="absolute w-[500px] h-[500px] bg-blue-600/40 blur-[100px] rounded-full mix-blend-screen animate-pulse"></div>
          <div className="absolute w-[400px] h-[400px] bg-purple-600/40 blur-[80px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <motion.div 
            variants={waveVariants}
            animate="animate"
            className="absolute w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] bg-no-repeat bg-center bg-contain mix-blend-screen" 
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQQzWf0Qpzi-oJ2TesOqm0bAlXM5SM0ru35z4Pkrj0oydvYlq20GbnPUsUbcBDfJ2nOFMbHBogU_dFdDJTkb53HN5hmBdPP8lU9Rg2L_uCGqsOgGpe_saYbWyEfNh-L4oxQfudS157FJxtaXPTTpjZKkpXfJ-0YrmlVlGcvcOaYscJIRqHOYfPaXqRhljuBnzrnEsW6fpFRged2mVv_OnJJ7P1q2o7DUbJ942XmT7fJMjlAat8GgSwJ00hjqAdn2Fh2LvLVJ4MD4a0')",
              maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
            }}
          ></motion.div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-6 uppercase drop-shadow-lg"
          >
            EMOTIONS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 font-light mb-12 tracking-wide"
          >
            ¿Cómo te sientes hoy?
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={() => navigate('/mood')}
            className="bg-white hover:bg-slate-100 text-black px-10 py-5 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(35,151,246,0.5)] hover:shadow-[0_0_50px_rgba(35,151,246,0.8)] flex items-center gap-3 mx-auto cursor-pointer"
          >
            <span className="material-symbols-outlined">play_arrow</span>
            Descubre tu mood
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={scrollToContent}
          className="mt-10 flex flex-col items-center gap-2 opacity-80 cursor-pointer hover:opacity-100 transition-opacity z-20"
        >
          <span className="text-xs uppercase tracking-widest text-white font-semibold">Sintoniza</span>
          <span className="material-symbols-outlined animate-bounce text-white">expand_more</span>
        </motion.div>
      </main>

      {/* Featured Section */}
      <motion.section 
        id="featured"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-24 px-6 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl font-bold mb-4">Experiencia Transmedia</h2>
            <p className="text-slate-400 max-w-xl">Sumérgete en un ecosistema diseñado para conectar con tus sentimientos a través de diferentes formatos y canales digitales.</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link to="/transmedia" className="text-primary font-bold flex items-center gap-2 hover:underline">
              Ver todo <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Music Card */}
          <motion.div variants={fadeInUp}>
            <Link to="/mood" className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all hover:border-primary/50 block h-full shadow-lg hover:shadow-primary/20">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDktJP5hjdxXubq_vD_uuQXaFfhfoTU_JBZjOpxKqLsXt6HbTuDshMiaObgI2a67OG0UhxEDL7za6DzGL5bnGHoptY1CxpRFKIE3b6hvDppPI4XcLzy_soGmnezaI746Xum6S2vJYU3Yfl1mRAEBgdZSIp3aqmgcVx60TYiKE2_hXxB3Jft-ee16R7CrZ_O2NaNG12zlefNS_Roc75PVaRPsWQBNWaBacuLUq_ivt0cNGbCaUzP1k3kqRWp-uuYjvBJtWnGl8b8fSn')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <span className="material-symbols-outlined text-primary mb-4 text-3xl">music_note</span>
                <h3 className="text-2xl font-bold text-white mb-2">Música</h3>
                <p className="text-slate-300 text-sm">Curación de playlists exclusivas según tu estado de ánimo actual.</p>
              </div>
            </Link>
          </motion.div>

          {/* Video Card */}
          <motion.div variants={fadeInUp}>
            <Link to="/videos" className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all hover:border-primary/50 block h-full shadow-lg hover:shadow-primary/20">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoAc3H-RQ2LGYh07a85HzI2fUlovdRmV7Wab0lPHihUuZlcxmEN6U8OanMv1BOLhKcQ2fZPkBcS-tyNbgmu2akSyOwnZag1Hk0-bb3FfTjxg7ZjQO6kXIN9UiWPyYZz0dqbd9cD7gGUxzN79mjr0NSJjI6DWS74B9slASdjB0gBaMvk31Nzp4Ufz1fwZ0pcHKguJorAOv3HsR1_MIsKeBFDuNcjhXASMb-HEvRd_A-fNA2afouU3vlvYRAYA7L-kUTYVfZR6jnLHu_')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <span className="material-symbols-outlined text-primary mb-4 text-3xl">videocam</span>
                <h3 className="text-2xl font-bold text-white mb-2">Visuales</h3>
                <p className="text-slate-300 text-sm">Piezas cinematográficas y visuales que resuenan con tu interior.</p>
              </div>
            </Link>
          </motion.div>

          {/* Stories Card */}
          <motion.div variants={fadeInUp}>
            <Link to="/podcast" className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all hover:border-primary/50 block h-full shadow-lg hover:shadow-primary/20">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdFC0WkaSAKHisTvUKpLGzHb9zXMK--K_82Fg5T-4h4Qufk2IxUdVkNqAopLuIHtbyWR23JZbu7hT-y-cYgQ1ia174TirfoDXJfGzuKjfhFW2LZD2DjOzi2PEzRjbvVX5lkkvXLkGecXOJAjjyOMZCcfX2mYJuOMGYC60PBzqQpyyHj_4UsdwN7496veerlzyvEMqy2NPdZBqR3CHl2J4cfQT-Mz24oMsTEHFp0KktfFUqt_r_zU04s3Q1fmHKGvPNaukwIjI0GiW7')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <span className="material-symbols-outlined text-primary mb-4 text-3xl">mic</span>
                <h3 className="text-2xl font-bold text-white mb-2">Relatos</h3>
                <p className="text-slate-300 text-sm">Historias y podcasts que profundizan en la psicología humana.</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Content Bar Section */}
      <section className="bg-slate-900/50 py-16 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">mood</span>
              </div>
              <h4 className="font-bold">Tu Mood</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Analizamos tu estado actual para ofrecerte el mejor contenido.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">headphones</span>
              </div>
              <h4 className="font-bold">Podcast</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Audio inmersivo 8D para una experiencia sensorial completa.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">explore</span>
              </div>
              <h4 className="font-bold">Explora</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Descubre nuevas emociones a través de nuestra biblioteca.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
              </div>
              <h4 className="font-bold">Intuitivo</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Una interfaz diseñada para fluir con tus sentimientos.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
