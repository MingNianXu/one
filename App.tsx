import React, { useState, useEffect } from 'react';
import { SECTIONS } from './constants';
import RegenerationDemo from './components/RegenerationDemo';
import { Menu, X, ArrowUp, ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 400);

      // Determine active section for highlighting
      const scrollPosition = window.scrollY + 200;
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700 bg-slate-50">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              LR
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-700">
              LifeRegen
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 overflow-x-auto no-scrollbar max-w-2xl">
            {SECTIONS.slice(0, 5).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeSection === section.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {section.title.split('：')[0].substring(0, 10)}...
              </button>
            ))}
             <button
                onClick={() => scrollToSection(SECTIONS[5].id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeSection === SECTIONS[5].id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                核心科技
              </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-t border-slate-100 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col p-4 space-y-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id 
                      ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="block text-xs text-slate-400 mb-1">{section.subtitle}</span>
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Hero Section (First Section special styling) */}
        <section className="text-center py-10 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            开启<span className="text-blue-600">再生医学</span>新纪元
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            从“细胞抗衰”到“器官再生”，LifeRegen 携手徐荣祥教授的传奇科技，
            为您揭示人体自我修复的终极奥秘。
          </p>
          <button 
            onClick={() => scrollToSection('section-1')}
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2 mx-auto"
          >
            探索生命奥秘 <ArrowDown size={20} />
          </button>
        </section>

        {SECTIONS.map((section, index) => (
          <article 
            key={section.id} 
            id={section.id}
            className="scroll-mt-24 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-md"
          >
            <div className="p-6 md:p-10">
              <header className="mb-8 border-b border-slate-100 pb-6">
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                  Part {index + 1}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <h3 className="text-xl text-slate-500 font-light italic">
                    —— {section.subtitle}
                  </h3>
                )}
              </header>

              <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Text Content */}
                <div className="space-y-6 text-lg leading-relaxed text-slate-700">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="first-letter:text-5xl first-letter:font-bold first-letter:text-slate-200 first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Media Column */}
                <div className="space-y-6">
                  {/* Image Placeholder */}
                  <div className="relative group bg-slate-100 rounded-xl overflow-hidden aspect-[4/3] border-2 border-dashed border-slate-300 flex items-center justify-center">
                    <img 
                      src={`https://picsum.photos/seed/${section.id}/800/600`} 
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 mix-blend-multiply"
                    />
                    <div className="relative z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm text-sm font-mono text-slate-600 text-center max-w-[80%]">
                      <p className="font-bold text-red-500 mb-1">图片替换指引</p>
                      {section.imageCaption}
                    </div>
                  </div>
                  
                  {/* Side Note / Caption */}
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-400 text-sm text-slate-600 italic">
                    {section.imageCaption ? section.imageCaption.replace("请插入", "") : "相关资料展示"}
                  </div>
                </div>
              </div>

              {/* Interactive Animation Insertion */}
              {section.hasAnimation && (
                <div className="mt-12 pt-10 border-t border-slate-100">
                   <RegenerationDemo />
                </div>
              )}
            </div>
          </article>
        ))}

        {/* Footer */}
        <footer className="text-center py-12 text-slate-400 text-sm">
          <p>© 2024 LifeRegen Interactive Presentation. Based on the works of Dr. Rongxiang Xu.</p>
          <p className="mt-2">Designed for educational purposes.</p>
        </footer>
      </main>

      {/* Floating Action Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-slate-900 text-white p-3 rounded-full shadow-xl hover:bg-blue-600 transition-all z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;