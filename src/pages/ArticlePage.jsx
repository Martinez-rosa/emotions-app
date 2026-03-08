import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import { useEffect } from 'react';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return <Navigate to="/explora" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100">
      {/* Full-width Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url("${article.image}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[700px] text-center"
          >
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase bg-primary text-white rounded">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
              {article.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto drop-shadow-md">
              {article.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Body */}
      <article className="max-w-[700px] mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-800">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
             <span className="material-symbols-outlined text-slate-400 text-2xl">person</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">{article.author}</p>
            <p className="text-xs text-slate-400 opacity-50">Editor • {article.readTime || '5 min'} lectura</p>
          </div>
        </div>

        <div 
          className="[&_p]:text-lg [&_p]:text-slate-300 [&_p]:mb-6 [&_p]:leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-6 [&_img]:rounded-xl [&_img]:my-8 [&_img]:shadow-2xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        >
        </div>

        {/* Bibliography Section */}
        {article.bibliography && article.bibliography.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Bibliografía</h3>
            <ul className="space-y-4">
              {article.bibliography.map((item, index) => (
                <li key={index} className="text-sm text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">{item.title}</span>
                  {item.source && <span className="italic"> — {item.source}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer of Content */}
        <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col items-center">
          <Link 
            to="/explora"
            className="group flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(35,151,246,0.3)]"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            Volver a Explora
          </Link>
          
          <div className="mt-16 flex gap-6 opacity-40 hover:opacity-100 transition-opacity text-white">
            <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">share</span></button>
            <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">favorite</span></button>
            <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">bookmark</span></button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
