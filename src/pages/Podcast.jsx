import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import podcastCover from '../assets/images/emotions-podcast.png';
// Importamos el audio. Si no existe podcast.mp3, usaremos lofi-background.mp3 como fallback temporal para que no falle la compilación
// TODO: Asegúrate de tener el archivo src/assets/audio/podcast.mp3
import podcastAudio from '../assets/audio/lofi-background.mp3'; 

const Podcast = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [openTopic, setOpenTopic] = useState(null);
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleTopic = (index) => {
    setOpenTopic(openTopic === index ? null : index);
  };

  const topics = [
    { 
      time: "00:00 - 0:30", 
      title: "Intro", 
      content: "Música de entrada suave. 'Bienvenidos a Emotions, el podcast donde hablamos de música y lo que nos hace sentir'." 
    },
    { 
      time: "0:30 - 1:30", 
      title: "El tema", 
      content: "¿Por qué hay canciones que nos recuerdan a momentos concretos? Cada uno cuenta una canción que le transporta a un recuerdo específico (personal, cercano)." 
    },
    { 
      time: "1:30 - 3:00", 
      title: "La conversación", 
      content: "¿Usáis música para cambiar vuestro estado de ánimo conscientemente? ¿Playlist para estudiar, para entrenar, para llorar? Momento más divertido/personal del episodio." 
    },
    { 
      time: "3:00 - 4:00", 
      title: "El experimento", 
      content: "Habláis del quiz de la web: 'Hicimos una herramienta que te recomienda música según cómo te sientes'. Cada uno cuenta qué resultado le dio y si le pareció acertado." 
    },
    { 
      time: "4:00 - 4:30", 
      title: "Cierre", 
      content: "Recomendación de una canción cada uno para el oyente." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans pb-24">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section: Cover Art & Title */}
        <div className="relative w-full aspect-[3/4] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
            <img 
              src={podcastCover} 
              alt="Emotions Podcast Team" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 md:p-12 z-20 flex flex-col items-start text-left">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                 >
                    <div className="flex items-center gap-3 mb-2 md:mb-4">
                        <span className="inline-block px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest text-black bg-primary rounded-full uppercase">
                            Nuevo Episodio
                        </span>
                        <span className="text-xs md:text-sm font-semibold tracking-widest text-white/80 uppercase">
                            Episodio 42
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-3xl md:text-6xl font-black tracking-tighter text-white mb-2 drop-shadow-lg leading-tight">
                        Música y memoria: por qué las canciones nos transportan en el tiempo
                    </h1>
                    <p className="text-sm md:text-xl text-slate-200 font-medium max-w-2xl drop-shadow-md hidden md:block">
                        Una conversación cercana, sincera y con mucha música de fondo.
                    </p>
                 </motion.div>
            </div>
        </div>

        {/* Audio Player Component */}
        <div className="mt-12 w-full rounded-2xl bg-[#161616] p-8 shadow-xl ring-1 ring-white/10">
          <audio 
            ref={audioRef}
            src={podcastAudio}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
          
          <div className="flex flex-col gap-6">
            {/* Progress Bar */}
            <div 
              className="group relative cursor-pointer pt-4"
              onClick={handleProgressClick}
              ref={progressBarRef}
            >
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              {/* Thumb */}
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg ring-2 ring-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ left: `${(currentTime / duration) * 100}%`, marginTop: '8px' }} // Adjusted marginTop for alignment
              />
              <div className="mt-3 flex justify-between text-xs font-medium text-slate-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 0)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-2xl">shuffle</span>
                </button>
                <button 
                  onClick={() => {
                    audioRef.current.currentTime = Math.max(0, currentTime - 10);
                  }}
                  className="text-slate-100 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-3xl">skip_previous</span>
                </button>
              </div>

              <button 
                onClick={togglePlay}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform active:scale-95 hover:scale-105"
              >
                <span className="material-symbols-outlined text-4xl leading-none">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <div className="flex items-center gap-6">
                <button 
                  onClick={() => {
                    audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                  }}
                  className="text-slate-100 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-3xl">skip_next</span>
                </button>
                <button 
                  onClick={() => {
                    const newVolume = volume === 0 ? 1 : 0;
                    setVolume(newVolume);
                    audioRef.current.volume = newVolume;
                  }}
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {volume === 0 ? 'volume_off' : 'volume_up'}
                  </span>
                </button>
              </div>
            </div>

            {/* Footer Player Stats */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-sm">devices</span>
                <span className="text-xs text-slate-400">Available on all devices</span>
              </div>
              <div className="flex items-center gap-3 w-1/3 justify-end">
                <span className="material-symbols-outlined text-slate-400 text-xl">volume_up</span>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                    audioRef.current.volume = newVolume;
                  }}
                  className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-slate-400 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Description */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white">Sobre este episodio</h3>
            <div className="text-slate-400 leading-relaxed space-y-4">
              <p>
                <strong>Duración:</strong> 4:00 - 5:00 min
              </p>
              <p>
                <strong>Formato:</strong> Conversación entre 2 o 3 integrantes, estilo coloquial.
              </p>
              <p>
                <strong>Participantes:</strong> L modera, se apuntan 2 más (los que más cómodos estén hablando).
              </p>
              <p>
                Una conversación cercana, sincera y con mucha música de fondo donde exploramos por qué ciertas canciones funcionan como máquinas del tiempo emocionales.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30 uppercase tracking-wide">Memoria</span>
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30 uppercase tracking-wide">Emociones</span>
            </div>
          </div>

          {/* Accordion Topics */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">En este episodio</h3>
            {topics.map((topic, index) => (
              <div 
                key={index}
                className="group rounded-xl border border-white/10 bg-[#161616] overflow-hidden transition-all hover:border-primary/50"
              >
                <button 
                  onClick={() => toggleTopic(index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium text-slate-300">{topic.time} - {topic.title}</span>
                  <motion.span 
                    animate={{ rotate: openTopic === index ? 180 : 0 }}
                    className="material-symbols-outlined text-slate-500"
                  >
                    expand_more
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openTopic === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-xs text-slate-400 border-t border-white/5 pt-2">
                        {topic.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-24 border-t border-white/5 bg-[#222222] py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm text-slate-500">© 2024 EMOTIONS Music App. Designed for the soul.</p>
        </div>
      </footer>
    </div>
  );
};

export default Podcast;