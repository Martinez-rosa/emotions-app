import { Link } from 'react-router-dom';

const Transmedia = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 pb-20">
      
      {/* Hero / Header Section */}
      <section className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Transmedia
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          La experiencia EMOTIONS continúa más allá de la pantalla. Únete a nuestra narrativa expandida.
        </p>
      </section>

      {/* Social Connect Section */}
      <section className="px-6 mb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">Conecta con nosotros</h2>
            <p className="text-slate-400">Sigue nuestra narrativa a través de tus redes favoritas</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-2xl mx-auto">
            {/* Instagram Button */}
            <a 
              href="#" 
              className="group flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-bold py-5 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20"
            >
              <span className="material-symbols-outlined text-3xl">camera_alt</span>
              <span className="text-lg">Instagram</span>
            </a>

            {/* TikTok Button */}
            <a 
              href="#" 
              className="group flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-white text-black font-bold py-5 px-8 rounded-full hover:bg-slate-200 transition-all transform hover:scale-105 shadow-lg shadow-white/10"
            >
              <span className="material-symbols-outlined text-3xl">play_circle</span>
              <span className="text-lg">TikTok</span>
            </a>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto bg-primary/10 border border-primary/20 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Challenge Info */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div>
                <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  Reto Mensual
                </span>
                <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-white mb-2">
                  #MyMoodSong
                </h2>
                <p className="text-lg text-slate-300 max-w-lg leading-relaxed mx-auto lg:mx-0">
                  Demuestra tu vibración musical al mundo. Participa en el reto transmedia más grande de la temporada y gana accesos exclusivos a eventos premium.
                </p>
              </div>
              
              <Link 
                to="/mood" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(35,151,246,0.4)] transition-all transform hover:scale-105"
              >
                <span>Participar ahora</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Steps Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Step 1 */}
              <div className="bg-[#0A0A0A]/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 flex flex-col gap-4 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-primary/30">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-2">Haz el quiz</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Descubre qué canción define tu estado de ánimo actual con nuestro algoritmo.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#0A0A0A]/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 flex flex-col gap-4 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-primary/30">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-2">Comparte</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Publica tu resultado usando el filtro especial de EMOTIONS en Stories o Reels.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#0A0A0A]/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 flex flex-col gap-4 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-primary/30">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-2">Etiquétanos</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Usa el hashtag <span className="text-primary">#MyMoodSong</span> y menciónanos para ganar.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Transmedia;
