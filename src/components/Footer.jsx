import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-emotions.png';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-12 px-6 bg-background-dark mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 h-28">
          <Link to="/" className="h-full flex items-center">
            <img src={logo} alt="Emotions Logo" className="h-[300%] w-auto object-contain" />
          </Link>
        </div>
        
        <div className="flex gap-8 text-slate-400 text-sm">
          <Link className="hover:text-white transition-colors" to="/privacidad">Privacidad</Link>
          <Link className="hover:text-white transition-colors" to="/terminos">Términos</Link>
          <a className="hover:text-white transition-colors" href="#">Contacto</a>
        </div>
        
        <div className="flex gap-4">
          <a className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-outlined text-lg">share</span>
          </a>
          <a className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-outlined text-lg">favorite</span>
          </a>
        </div>
      </div>
      
      <div className="text-center mt-8 text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} EMOTIONS Experience. Sintoniza con tu interior.
      </div>
    </footer>
  );
};

export default Footer;
