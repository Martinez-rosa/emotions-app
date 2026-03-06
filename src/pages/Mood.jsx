import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AlbumArt from '../components/AlbumArt';
import songsData from '../data/songs.json';
import { generatePoeticTitle, generateQuote } from '../utils/phraseGenerator';

const moods = [
  { id: 'feliz', label: 'Feliz', emoji: '😊', color: 'yellow', hoverBg: 'hover:bg-yellow-500/5', hoverBorder: 'hover:border-yellow-500/50', gradient: 'from-yellow-500/10' },
  { id: 'triste', label: 'Triste', emoji: '😔', color: 'blue', hoverBg: 'hover:bg-blue-500/5', hoverBorder: 'hover:border-blue-500/50', gradient: 'from-blue-500/10' },
  { id: 'energico', label: 'Enérgico', emoji: '⚡', color: 'red', hoverBg: 'hover:bg-red-500/5', hoverBorder: 'hover:border-red-500/50', gradient: 'from-red-500/10' },
  { id: 'tranquilo', label: 'Tranquilo', emoji: '🍃', color: 'green', hoverBg: 'hover:bg-green-500/5', hoverBorder: 'hover:border-green-500/50', gradient: 'from-green-500/10' },
  { id: 'nostalgico', label: 'Nostálgico', emoji: '🌙', color: 'purple', hoverBg: 'hover:bg-purple-500/5', hoverBorder: 'hover:border-purple-500/50', gradient: 'from-purple-500/10' },
  { id: 'motivado', label: 'Motivado', emoji: '🔥', color: 'orange', hoverBg: 'hover:bg-orange-500/5', hoverBorder: 'hover:border-orange-500/50', gradient: 'from-orange-500/10' },
];

const backgroundColors = {
  triste: 'from-[#0f172a] to-[#020617]', // Blue-950
  feliz: 'from-[#422006] to-[#451a03]', // Yellow/Amber-950 (simulated dark gold)
  energico: 'from-[#450a0a] to-[#450a0a]', // Red-950
  tranquilo: 'from-[#052e16] to-[#022c22]', // Green-950
  nostalgico: 'from-[#3b0764] to-[#2e1065]', // Purple-950
  motivado: 'from-[#431407] to-[#451a03]', // Orange-950
};

const moodOptions = {
  triste: [
    { id: 'desahogarme', label: 'Quiero desahogarme', desc: 'Libera tus emociones con música profunda y melancólica.', icon: 'cloudy_snowing' },
    { id: 'animarme', label: 'Quiero animarme', desc: 'Encuentra el ritmo perfecto para cambiar la energía de tu día.', icon: 'auto_awesome' },
    { id: 'reflexionar', label: 'Quiero reflexionar', desc: 'Un espacio de calma sonora diseñado para el pensamiento introspectivo.', icon: 'visibility' },
  ],
  feliz: [
    { id: 'celebrar', label: 'Quiero celebrar', desc: 'Música festiva para potenciar tu alegría.', icon: 'celebration' },
    { id: 'compartir', label: 'Quiero compartir', desc: 'Canciones perfectas para escuchar con amigos.', icon: 'share' },
    { id: 'mantener', label: 'Quiero mantener el momento', desc: 'Melodías que acompañan tu buen humor sin interrumpir.', icon: 'sentiment_satisfied' },
  ],
  energico: [
    { id: 'entrenar', label: 'Quiero entrenar', desc: 'Beats potentes para llevar tu rutina al límite.', icon: 'fitness_center' },
    { id: 'concentrarme', label: 'Quiero concentrarme', desc: 'Energía focalizada para maximizar tu productividad.', icon: 'bolt' },
    { id: 'bailar', label: 'Quiero bailar', desc: 'Ritmos contagiosos que no te dejarán estar quieto.', icon: 'music_note' },
  ],
  tranquilo: [
    { id: 'meditar', label: 'Quiero meditar', desc: 'Sonidos ambientales para conectar con tu interior.', icon: 'self_improvement' },
    { id: 'leer', label: 'Quiero leer', desc: 'Acompañamiento sutil para sumergirte en tus historias.', icon: 'menu_book' },
    { id: 'dormir', label: 'Quiero dormir', desc: 'Frecuencias relajantes para conciliar el sueño.', icon: 'bedtime' },
  ],
  nostalgico: [
    { id: 'recordar', label: 'Quiero recordar', desc: 'Viaja al pasado con los clásicos que marcaron tu vida.', icon: 'history' },
    { id: 'soltar', label: 'Quiero soltar', desc: 'Música para cerrar ciclos y mirar hacia adelante.', icon: 'flight_takeoff' },
    { id: 'escribir', label: 'Quiero escribir', desc: 'Inspiración melódica para plasmar tus sentimientos.', icon: 'edit' },
  ],
  motivado: [
    { id: 'trabajar', label: 'Quiero trabajar', desc: 'Flow constante para avanzar en tus proyectos.', icon: 'work' },
    { id: 'crear', label: 'Quiero crear', desc: 'Estímulos sonoros para despertar tu creatividad.', icon: 'brush' },
    { id: 'superarme', label: 'Quiero superarme', desc: 'Canciones épicas para conquistar tus metas.', icon: 'emoji_events' },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const Mood = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [currentPoeticName, setCurrentPoeticName] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [dynamicPlaylistUrls, setDynamicPlaylistUrls] = useState({ spotify: null, youtube: null });
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false);
  const [currentSongs, setCurrentSongs] = useState([]);

  useEffect(() => {
    console.log('Current State:', { step, selectedMood, selectedNeed, currentSongsCount: currentSongs.length, hasPlaylist: !!dynamicPlaylistUrls.spotify });
  }, [step, selectedMood, selectedNeed, currentSongs, dynamicPlaylistUrls]);

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    setStep(2);
  };

  const handleNeedSelect = async (needId) => {
    if (!selectedMood) {
      setStep(1);
      return;
    }
    
    console.log(`Selecting need: ${needId} for mood: ${selectedMood}`);
    setSelectedNeed(needId);
    setCurrentPoeticName(generatePoeticTitle(selectedMood));
    setCurrentQuote(generateQuote(selectedMood));
    setIsLoadingPlaylist(true);
    setStep(3);

    // Generate songs immediately
    const songs = getFilteredSongs(selectedMood, needId);
    console.log('Generated songs:', songs.map(s => s.title));
    setCurrentSongs(songs);
    
    try {
      const result = await generatePlaylistUrls(songs);
      setDynamicPlaylistUrls({ spotify: result.spotify, youtube: result.youtube });
    } catch (error) {
      console.error("Error generating playlist URLs:", error);
      // Fallback or error state could go here, but for now we just stop loading
    } finally {
      setIsLoadingPlaylist(false);
    }
  };

  const currentMood = moods.find(m => m.id === selectedMood);
  const currentOptions = selectedMood ? moodOptions[selectedMood] : [];

  const currentBgGradient = selectedMood ? backgroundColors[selectedMood] : '';

  // Helper to normalize strings for comparison (remove accents and lowercase)
  const normalizeString = (str) => {
    return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : '';
  };

  // Filter songs based on mood and need
  const getFilteredSongs = (moodId, needId) => {
    const mood = moodId || selectedMood;
    const need = needId || selectedNeed;
    
    if (!mood) return [];

    const needMapping = {
      // Triste
      desahogarme: 'Llorar', animarme: 'Consuelo', reflexionar: 'Introspección',
      // Feliz
      celebrar: 'Bailar', compartir: 'Energía positiva', mantener: 'Sentirse bien',
      // Energico
      entrenar: 'Entrenar', concentrarme: 'Poder', bailar: 'Adrenalina',
      // Tranquilo
      meditar: 'Relajación profunda', leer: 'Paz', dormir: 'Calma mental',
      // Nostalgico
      recordar: 'Recordar', soltar: 'Reflexionar', escribir: 'Melancolía dulce',
      // Motivado
      trabajar: 'Logro', crear: 'Esperanza', superarme: 'Superación'
    };

    const targetNeed = needMapping[need];
    
    // 1. Obtener TODAS las canciones que coinciden con el mood
    const moodSongs = songsData.filter(song => 
      normalizeString(song.emotion) === normalizeString(mood)
    );

    // 2. Separar las que coinciden con la necesidad específica
    const specificMatches = moodSongs.filter(song => 
      targetNeed ? normalizeString(song.need) === normalizeString(targetNeed) : true
    );

    // 3. Obtener el resto de canciones del mismo mood
    const otherMoodSongs = moodSongs.filter(song => 
      targetNeed ? normalizeString(song.need) !== normalizeString(targetNeed) : false
    );

    // Mezclamos ambos grupos de forma independiente para máxima aleatoriedad
    const shuffledSpecifics = shuffleArray([...specificMatches]);
    const shuffledOthers = shuffleArray([...otherMoodSongs]);

    // Combinamos priorizando las específicas, pero como ahora hay muchas más, 
    // la selección de 10 siempre será distinta.
    const combined = [...shuffledSpecifics, ...shuffledOthers].slice(0, 10);

    return combined;
  };

  const generatePlaylistUrls = async (songs) => {
    if (!songs || songs.length === 0) {
      return { spotify: null, youtube: null, updatedSongs: [] };
    }

    // Spotify: Trackset URL
    // Extract ID safely, filtering out any invalid URLs
    const spotifyTrackIds = songs
      .map(song => {
        try {
          return song.spotifyUrl ? song.spotifyUrl.split('/').pop() : null;
        } catch {
          return null;
        }
      })
      .filter(id => id)
      .join(',');
      
    const spotifyUrl = spotifyTrackIds ? `https://open.spotify.com/trackset/playlist/${spotifyTrackIds}` : null;

    // URL de playlist en YouTube (usando video_ids si es posible)
    // Opción A: Crear una playlist "on the fly" con video_ids separados por comas
    // Formato: https://www.youtube.com/watch_videos?video_ids=ID1,ID2,ID3
    const videoIds = songs
      .filter(s => s.videoId)
      .map(s => s.videoId)
      .join(',');

    let youtubeSearchUrl;
    if (videoIds) {
      youtubeSearchUrl = `https://www.youtube.com/watch_videos?video_ids=${videoIds}`;
    } else {
      // Fallback a búsqueda si no hay IDs (aunque ahora debería haberlos)
      const youtubeQuery = songs.map(song => `${song.title} ${song.artist}`).join(',');
      youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery)}`;
    }

    // Simulamos una pequeña espera
    await new Promise(resolve => setTimeout(resolve, 800));

    return { spotify: spotifyUrl, youtube: youtubeSearchUrl, updatedSongs: songs };
  };

  const handleImageError = (e) => {
    // Si la imagen falla, usamos una imagen de placeholder de alta calidad (un disco de vinilo real)
    const target = e.target;
    
    // Evitamos bucles infinitos si la imagen de respaldo también falla
    if (target.src.includes('images.unsplash.com')) {
      return;
    }

    // Fallback a una imagen genérica de música de alta calidad
    target.src = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop';
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMood(null);
    setSelectedNeed(null);
    setCurrentPoeticName('');
    setCurrentQuote('');
    setDynamicPlaylistUrls({ spotify: null, youtube: null });
    setCurrentSongs([]);
  };

  const handleShare = () => {
    const text = `Mi mood hoy es ${currentPoeticName} 🎵 Descubre el tuyo → #EmotionsProject`;
    navigator.clipboard.writeText(text);
    alert('¡Copiado al portapapeles!');
  };

  return (
    <div className={`min-h-[calc(100vh-80px)] w-full flex flex-col items-center py-12 px-6 transition-colors duration-1000 ${step === 3 ? `bg-gradient-to-b ${currentBgGradient}` : ''}`}>
      
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-12 space-y-4">
        <div className="flex items-end justify-between text-sm mb-2">
          <span className="font-semibold text-primary">Paso {step} de 3</span>
          <span className="text-slate-400">{step === 1 ? '33%' : step === 2 ? '66%' : '100%'} completado</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${step * 33.33}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            className="w-full max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-16">
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                ¿Cómo te sientes ahora mismo?
              </motion.h1>
              <motion.p variants={itemVariants} className="text-slate-400 text-lg">
                Selecciona la emoción que mejor describa tu estado actual.
              </motion.p>
            </div>

            <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {moods.map((mood) => (
                <motion.button
                  key={mood.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`mood-card group relative overflow-hidden aspect-square rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center gap-4 transition-colors
                    ${mood.hoverBg} ${mood.hoverBorder}`}
                >
                  <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {mood.emoji}
                  </div>
                  <span className="text-xl font-bold text-white">{mood.label}</span>
                  <div className={`absolute inset-0 bg-gradient-to-t ${mood.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.button>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-16 flex items-center justify-center gap-6">
              <button 
                onClick={() => navigate('/')}
                className="px-8 py-3 rounded-full border border-white/10 font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            className="w-full max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-12">
              <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold leading-tight mb-2 text-white">
                ¿Qué necesitas ahora?
              </motion.h1>
              <motion.div variants={itemVariants} className="flex items-center gap-2 text-primary">
                <span className="text-xl">{currentMood?.emoji}</span>
                <p className="text-slate-400 text-lg font-medium">Estás sintiéndote <span className={`text-${currentMood?.color}-500 font-bold capitalize`}>{currentMood?.label}</span></p>
              </motion.div>
            </div>

            <motion.div variants={containerVariants} className="flex flex-col gap-4">
              {currentOptions.map((option) => (
                <motion.button
                  key={option.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleNeedSelect(option.id)}
                  className={`group relative flex items-center gap-6 p-6 rounded-xl bg-white/5 border border-white/10 text-left transition-all
                    hover:bg-${currentMood?.color}-500/5 hover:border-${currentMood?.color}-500/50`}
                >
                  <div className={`flex size-14 shrink-0 items-center justify-center rounded-lg bg-${currentMood?.color}-500/10 text-${currentMood?.color}-500 group-hover:bg-${currentMood?.color}-500 group-hover:text-white transition-colors`}>
                    <span className="material-symbols-outlined !text-3xl">{option.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-lg font-bold text-white group-hover:text-${currentMood?.color}-500 transition-colors`}>{option.label}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{option.desc}</p>
                  </div>
                  <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-${currentMood?.color}-500`}>
                    <span className="material-symbols-outlined">chevron_right</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex justify-start">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-medium"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Atrás
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            className="w-full max-w-4xl flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-12">
              <motion.span variants={itemVariants} className="text-primary text-sm font-semibold uppercase tracking-widest mb-2 block">
                Tu mood de hoy es
              </motion.span>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
                {currentPoeticName}
              </motion.h1>
              <motion.p variants={itemVariants} className="text-slate-300 text-xl md:text-2xl italic font-serif max-w-2xl mx-auto leading-relaxed">
                {currentQuote}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="w-full mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <h3 className="text-xl font-medium text-white/80">Tu playlist recomendada</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {isLoadingPlaylist ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <motion.div 
                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="mt-4 text-slate-400 font-medium">Generando tu playlist personalizada...</p>
                </div>
              ) : (
                dynamicPlaylistUrls.spotify && (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
                    <a 
                      href={dynamicPlaylistUrls.spotify}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#1DB954] text-black font-bold hover:scale-105 transition-transform shadow-lg shadow-green-900/20"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.2-1.32 9.6-0.66 13.38 1.68.42.24.6.841.36 1.141zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                      Abrir Playlist en Spotify
                    </a>
                    <a 
                      href={dynamicPlaylistUrls.youtube}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#FF0000] text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-red-900/20"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      Abrir Playlist en YouTube
                    </a>
                  </div>
                )
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSongs.map((song) => (
                  <motion.div 
                      className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-square w-full overflow-hidden relative bg-white/5">
                        <img 
                          src={song.coverUrl} 
                          alt={song.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <a 
                          href={`https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110 shadow-lg shadow-black/50"
                          title="Buscar en Spotify"
                        >
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.2-1.32 9.6-0.66 13.38 1.68.42.24.6.841.36 1.141zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                        </a>
                        <a 
                          href={song.videoId ? `https://www.youtube.com/watch?v=${song.videoId}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(song.title + ' ' + song.artist)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110 shadow-lg shadow-black/50 delay-75"
                          title="Ver en YouTube"
                        >
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        </a>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white truncate text-lg">{song.title}</h4>
                      <p className="text-slate-400 text-sm truncate">{song.artist}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <button 
                onClick={handleReset}
                className="px-8 py-4 rounded-full border border-white/10 font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all w-full md:w-auto"
              >
                Repetir quiz
              </button>
              <button 
                onClick={handleShare}
                className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 w-full md:w-auto"
              >
                <span className="material-symbols-outlined text-xl">share</span>
                Compartir mi mood
              </button>
              <button 
                onClick={() => navigate('/explora')}
                className="px-8 py-4 rounded-full bg-primary/20 border border-primary/50 text-primary font-bold hover:bg-primary/30 transition-all flex items-center justify-center gap-2 w-full md:w-auto"
              >
                Explorar más
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mood;
