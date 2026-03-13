
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product, Language } from '../types';
import { translations } from '../translations';

const GuestArea: React.FC<{ lang: Language; onBack: () => void }> = ({ lang, onBack }) => {
  const [selectedApartment, setSelectedApartment] = useState<Product | null>(null);
  const t = translations[lang].guestArea;

  if (!selectedApartment) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6 animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center">
          <button onClick={onBack} className="text-[10px] font-bold uppercase tracking-widest text-[#7895B2] mb-12 flex items-center gap-2 mx-auto hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            {t.backSite}
          </button>
          <h1 className="text-4xl md:text-6xl font-serif text-[#2C2A26] mb-6">{t.title}</h1>
          <p className="text-[#5D5A53] font-light text-lg mb-16 max-w-xl mx-auto">
            {t.welcome} <br/>{t.selectRoom}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map(p => (
              <div 
                key={p.id} 
                onClick={() => setSelectedApartment(p)}
                className="group cursor-pointer bg-white border border-[#D6D1C7] p-6 transition-all hover:border-[#7895B2] hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden mb-6">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h3 className="font-serif text-xl text-[#2C2A26] mb-2">{p.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7895B2]">{t.accessGuide}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6 animate-fade-in-up">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <button onClick={() => setSelectedApartment(null)} className="text-[10px] font-bold uppercase tracking-widest text-[#7895B2] mb-4 flex items-center gap-2 hover:opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              {t.changeRoom}
            </button>
            <h1 className="text-4xl font-serif text-[#2C2A26]">{lang === 'en' ? `Welcome to ${selectedApartment.name}` : `Bem-vindo à ${selectedApartment.name}`}</h1>
            <p className="text-[#7895B2] font-serif italic text-lg mt-2">"Sinta o fluxo, respire a paz." — Gaya</p>
          </div>
          <a 
            href="https://wa.me/554899999999" 
            target="_blank" 
            className="bg-[#2C2A26] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#7895B2] transition-all flex items-center gap-3 shadow-lg"
          >
            {t.hostContact}
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 border border-[#D6D1C7] shadow-sm">
              <h2 className="font-serif text-2xl text-[#2C2A26] mb-8 border-b border-[#F5F2EB] pb-4">{t.stayGuide}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#7895B2]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                    <span className="text-xs font-bold uppercase tracking-widest">{t.checkin}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#7895B2]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                    <span className="text-xs font-bold uppercase tracking-widest">{t.checkout}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#EBE7DE] p-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">{t.wifi}</h3>
                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] text-[#A8A29E] uppercase mb-1">Network</span>
                    <span className="font-serif text-lg text-[#2C2A26]">Acauan_Guest_5G</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#A8A29E] uppercase mb-1">Password</span>
                    <span className="font-serif text-lg text-[#2C2A26]">vibra_acauan_2025</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#2C2A26] p-8 text-white">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">{t.cleaning}</h3>
                <p className="text-sm font-light opacity-80 leading-relaxed mb-4">
                  {t.cleaningText}
                </p>
              </div>
            </div>

            <div className="bg-white p-8 border border-[#D6D1C7] shadow-sm">
              <h2 className="font-serif text-2xl text-[#2C2A26] mb-8">{t.restaurants}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.restaurantList.map((res: any) => (
                  <div key={res.name} className="border-l-2 border-[#7895B2] pl-6 py-2">
                    <h4 className="font-serif text-lg text-[#2C2A26]">{res.name}</h4>
                    <span className="block text-[10px] text-[#7895B2] uppercase font-bold mb-2">{res.vibe}</span>
                    <p className="text-xs text-[#5D5A53] italic">"Gaya indica: {res.tip}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 border border-[#D6D1C7] shadow-sm">
              <h3 className="font-serif text-xl text-[#2C2A26] mb-6">{t.gayaTip}</h3>
              <div className="aspect-square bg-[#F5F2EB] mb-6 flex items-center justify-center p-8 text-center">
                 <p className="font-serif italic text-[#7895B2]">{t.gayaTipText}</p>
              </div>
            </div>

            <div className="bg-[#7895B2] p-8 text-white shadow-lg">
               <h3 className="font-serif text-xl mb-4">{t.emergencies}</h3>
               <div className="space-y-3 text-xs uppercase tracking-widest font-bold">
                 <p>Samu: 192</p>
                 <p>Bombeiros: 193</p>
                 <p>Anfitrião: (48) 99999-9999</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GuestArea;
