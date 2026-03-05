import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    { time: "00:00", title: "Introduction", content: "Setting the stage for our journey into resonance." },
    { time: "12:45", title: "The Science of Vibration", content: "Exploring how sound waves physically interact with matter." },
    { time: "25:30", title: "Digital Resonance", content: "How virtual spaces mimic acoustic properties." },
    { time: "40:15", title: "Closing Thoughts", content: "Final reflections on the invisible architecture of sound." }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans pb-24">
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero Section: Cover Art & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-10 aspect-square w-full max-w-[420px] overflow-hidden rounded-xl shadow-2xl shadow-primary/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <img 
              alt="Podcast cover art showing abstract sound waves" 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKGtScKVWWvsI59YzCnUmqseF1x4hNaRkBPuS7vSs36za7FDi173deze-uzgl57fR8lHP8w4Hq5_ysOHWmAVH-9dqNp9yAbv6NwAHBeMJCyQOner8zh2HCrF4CVhsDsCXsYCr-k57r376X1J1Vx9DfwP39EzPR1fg0rt_c8Kyb92QH9FuTrtqKkrGMiIDW6deeEDRJHHqRD7AACUGHo4kxpCvEEcXL555DvPi1qKtr29JaoiHSnpYEz8I-DRn4zyC-kT0wg9pyPK4I"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase">Episode 42</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white lg:text-6xl">
              El Poder de la Resonancia
            </h2>
            <p className="mt-4 text-lg text-slate-400">EMOTIONS Originals • 48 min</p>
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
            <h3 className="text-2xl font-bold text-white">About this episode</h3>
            <p className="text-slate-400 leading-relaxed">
              Explore the profound impact of acoustic resonance on human emotion and spatial awareness. In this episode, we dive deep into how frequencies interact with the architecture of our minds and the physical spaces we inhabit. From ancient cathedrals to modern digital landscapes, resonance is the invisible thread that connects sound to feeling.
            </p>
            <div className="flex gap-4">
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30 uppercase tracking-wide">Music Theory</span>
              <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30 uppercase tracking-wide">Mindfulness</span>
            </div>
          </div>

          {/* Accordion Topics */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">In this episode</h3>
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