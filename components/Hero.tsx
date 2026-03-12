/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

const HERO_IMAGES = [
  "https://i.ibb.co/n8DgwvPq/521685167.jpg",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=2000"
];

const Hero: React.FC<{ lang: Language }> = ({ lang }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const t = translations[lang].hero;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[750px] overflow-hidden bg-[#FDFBF7]">
      {HERO_IMAGES.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out ${
            index === currentImage ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={img}
            alt="Hero"
            className="w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FDFBF7]/50"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="animate-fade-in-up max-w-5xl">
          <span className="block text-[11px] font-bold uppercase tracking-[0.6em] text-white mb-8 drop-shadow-sm border-l-4 border-[#7895B2] pl-6 inline-block">
            {t.tagline}
          </span>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tighter mb-10 drop-shadow-2xl leading-none">
            {t.title.split(' ')[0]} <span className="italic font-light">{t.title.split(' ')[1]}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-3xl text-white/95 font-light leading-relaxed mb-16 drop-shadow-lg">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a
              href="#products"
              onClick={(e) => handleNavClick(e, 'products')}
              className="px-14 py-5 bg-white text-[#7895B2] text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#7895B2] hover:text-white transition-all duration-700 shadow-2xl"
            >
              {t.btnRooms}
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="px-14 py-5 border-2 border-white text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all backdrop-blur-md"
            >
              {t.btnAbout}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
