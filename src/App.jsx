import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Mood from './pages/Mood';
import Videos from './pages/Videos';
import Podcast from './pages/Podcast';
import Explora from './pages/Explora';
import ArticlePage from './pages/ArticlePage';
import Transmedia from './pages/Transmedia';
import Sobre from './pages/Sobre';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';
import FloatingMoodPlayer from './components/FloatingMoodPlayer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-sans">
      <FloatingMoodPlayer />
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/explora" element={<Explora />} />
          <Route path="/explora/:slug" element={<ArticlePage />} />
          <Route path="/transmedia" element={<Transmedia />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/terminos" element={<Terminos />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
