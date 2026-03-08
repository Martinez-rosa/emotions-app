import { useState, useEffect } from 'react';

const videos = [
  {
    id: 1,
    title: '¿Por qué una canción te hace llorar?',
    description: 'Salimos a la calle a preguntarle a la gente qué canción les cambia el estado de ánimo y por qué. Respuestas reales, emociones reales.',
    duration: '1:45',
    youtubeId: '7dCwQC9Tdk4',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBREvdXhcw3VmHK6t1TRWDPr0KQGZvQIPcJ_QQZGd4AjcRE8ABRYEMw_EOe2-5bCTOASKVePOz-TLPDjVQxxr6_zFHw84po3I2buuVK8yQD-j11ulF98WNRqBsnlIZHGZxxscpgO3qEXFjitNLyw5rPkR-Ys6q22tt6zZnMSL5AiPAWEPZiwNKp5BOVzUSrmIfUEpG6qleTKOnQTvYVLjhSgYa4zGMuwmtrJ7JBNktUnMW4JsmJ-mVgmg-hw7MGMtER5HwJFH9l-bNN'
  },
  {
    id: 2,
    title: 'Tu cerebro con música vs sin música',
    description: '¿Qué le pasa realmente a tu cerebro cuando escuchas música? Te lo explicamos en menos de 3 minutos con datos que te van a sorprender.',
    duration: '2:30',
    youtubeId: 'UOJ4V3DAAx8',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF8L3-qT8WiqMRJz5P2VFYC7J8Bk7Ifhz2yCXJ2ASZKl2TdS6lKvlXp9_EPc-da74LjJbla3AsXjdnETb4kmGcnJOTQETbMapKxwvPazsAs9HFIq-dMSzYJ8z6qPxfjQo211DZWpwT4ODyV296uIMocXz2T4NcMG-ctptN_iHkGO1k9CvMlv2P_sW4UZVsJRgEyP0mANOqE5NBzyFJg1AWV6bmWblEJERekmRScubHQhwqLERswqSZskgT--gQTOfgX18Q8b_yTQPB'
  }
];

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Micro-documentales</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explora la ciencia y el arte detrás de los sonidos que definen nuestras experiencias más profundas.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo(video)}>
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-900 group-hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/90 text-white shadow-lg shadow-primary/20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-white tracking-wider border border-white/10">
                  {video.duration}
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-5 space-y-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-slate-400 line-clamp-2 leading-relaxed text-sm">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (Optional from design) */}
        <div className="mt-16 flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all font-semibold text-sm text-slate-300">
            Cargar más vídeos
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
        </div>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} 
              title={selectedVideo.title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
