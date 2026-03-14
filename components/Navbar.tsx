
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onGuestAreaClick: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Logo: React.FC<{ scrolled: boolean }> = ({ scrolled }) => (
  <div className="flex items-center gap-3 group">
    <img 
      src="/logo.png"
      alt="Pousada Acauan" 
      className="w-20 h-20 transition-all duration-500"
    />
    <div className="flex flex-col">
      <span className={`hidden sm:block font-serif text-lg tracking-[0.1em] uppercase leading-none transition-colors duration-500 ${scrolled ? 'text-[#3E3E3E]' : 'text-white'}`}>Pousada</span>
      <span className={`hidden sm:block font-serif text-sm italic font-light tracking-widest transition-colors duration-500 ${scrolled ? 'text-[#7895B2]' : 'text-white/80'}`}>Acauan</span>
    </div>
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onNavClick, onGuestAreaClick, cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColorClass = (scrolled || mobileMenuOpen) ? 'text-[#3E3E3E]' : 'text-white';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${scrolled || mobileMenuOpen ? 'bg-[#FDFBF7]/95 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavClick(e, ''); }} className="z-50 relative"><Logo scrolled={scrolled || mobileMenuOpen} /></a>
          
          <div className={`hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${textColorClass}`}>
            <a href="#products" onClick={(e) => onNavClick(e, 'products')} className="hover:text-[#7895B2] transition-colors">{t.rooms}</a>
            <a href="#about" onClick={(e) => onNavClick(e, 'about')} className="hover:text-[#7895B2] transition-colors">{t.about}</a>
            <a href="#journal" onClick={(e) => onNavClick(e, 'journal')} className="hover:text-[#7895B2] transition-colors">{t.guide}</a>
            <button onClick={onGuestAreaClick} className="hover:text-[#7895B2] transition-colors text-[#7895B2]">{t.guestArea}</button>
          </div>

          <div className={`flex items-center gap-6 z-50 relative transition-colors duration-500 ${textColorClass}`}>
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity"
              >
                {lang}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-4 bg-white shadow-xl border border-[#D6D1C7] min-w-[80px] py-2 flex flex-col items-center animate-fade-in-up">
                  {(['pt', 'en', 'es', 'de'] as Language[]).map(l => (
                    <button 
                      key={l}
                      onClick={() => { setLang(l); setLangMenuOpen(false); }}
                      className={`w-full py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-[#F5F2EB] ${lang === l ? 'text-[#7895B2]' : 'text-[#3E3E3E]'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={onOpenCart} className={`text-[10px] font-bold uppercase tracking-[0.2em] border-2 px-5 py-2.5 transition-all hidden sm:block ${scrolled || mobileMenuOpen ? 'border-[#7895B2] text-[#7895B2] hover:bg-[#7895B2] hover:text-white' : 'border-white text-white hover:bg-white hover:text-[#7895B2]'}`}>
              {t.reserve} ({cartCount})
            </button>
            
            <button className={`block lg:hidden focus:outline-none transition-colors duration-500 ${textColorClass}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               {mobileMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>}
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-[#FDFBF7] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
          <div className="flex flex-col items-center space-y-10 text-xl font-serif font-medium text-[#3E3E3E]">
            <a href="#products" onClick={(e) => { setMobileMenuOpen(false); onNavClick(e, 'products'); }} className="hover:text-[#7895B2]">{t.rooms}</a>
            <a href="#about" onClick={(e) => { setMobileMenuOpen(false); onNavClick(e, 'about'); }} className="hover:text-[#7895B2]">{t.about}</a>
            <a href="#journal" onClick={(e) => { setMobileMenuOpen(false); onNavClick(e, 'journal'); }} className="hover:text-[#7895B2]">{t.guide}</a>
            <button onClick={() => { setMobileMenuOpen(false); onGuestAreaClick(); }} className="text-[#7895B2]">{t.guestArea} ✨</button>
            <button onClick={() => { setMobileMenuOpen(false); onOpenCart(); }} className="mt-4 px-8 py-4 bg-[#7895B2] text-white text-sm font-bold uppercase tracking-[0.2em] rounded-lg shadow-lg">
              {t.reserve} 🏨
            </button>
          </div>
      </div>
    </>
  );
};

export default Navbar;
