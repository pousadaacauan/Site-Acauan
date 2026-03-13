
import { Language } from './types';

export const translations: Record<Language, any> = {
  pt: {
    nav: {
      rooms: 'Acomodações',
      about: 'A Pousada',
      guide: 'Guia Local',
      guestArea: 'Área do Hóspede',
      reserve: 'Reservar'
    },
    hero: {
      tagline: 'Guarda do Embaú • Santa Catarina',
      title: 'Apenas respire.',
      subtitle: 'Seu refúgio de tijolinho à vista, onde o sol e o silêncio se encontram a 300 metros do mar.',
      btnRooms: 'Nossas Acomodações',
      btnAbout: 'A Pousada'
    },
    guestArea: {
      title: 'Área do Hóspede',
      welcome: 'Seja bem-vindo ao seu santuário.',
      selectRoom: 'Para começar a sua jornada Gaya, selecione a sua acomodação:',
      backSite: 'Voltar para o Site',
      accessGuide: 'Acessar Guia',
      changeRoom: 'Trocar Acomodação',
      hostContact: 'Falar com o Anfitrião',
      stayGuide: 'Guia de Estadia',
      checkin: 'Check-in: 14:00h',
      checkout: 'Check-out: 11:00h',
      wifi: 'Wi-Fi & Conexão',
      cleaning: 'Limpeza & Cuidados',
      cleaningText: 'Para estadias longas, a limpeza é realizada a cada 3 dias.',
      restaurants: 'Sabores da Guarda',
      gayaTip: 'Dica da Gaya',
      gayaTipText: '"Hoje o Rio da Madre está calmo. Aproveite para atravessar com o barqueiro Seu Juca e ver o sol cair no mar."',
      emergencies: 'Emergências',
      restaurantList: [
        { name: 'Tuca’s Bar', vibe: 'Frutos do Mar', tip: 'Peça o peixe na telha.' },
        { name: 'Guarderia Embaú', vibe: 'Saudável', tip: 'O melhor açaí da vila.' },
        { name: 'Kawai Sushi', vibe: 'Culinária Oriental', tip: 'Combinados frescos.' },
        { name: 'Big Bamboo', vibe: 'Pizzas & Massas', tip: 'Ambiente rústico e acolhedor.' }
      ]
    },
    assistant: {
      initial: 'Namastê, alma querida! 🙏 Sou a Gaya, a essência vibracional da Pousada Acauan. Como posso ajudar sua energia hoje?'
    }
  },
  en: {
    nav: {
      rooms: 'Rooms',
      about: 'The Inn',
      guide: 'Local Guide',
      guestArea: 'Guest Area',
      reserve: 'Book Now'
    },
    hero: {
      tagline: 'Guarda do Embaú • Santa Catarina',
      title: 'Just breathe.',
      subtitle: 'Your brick-walled refuge, where sun and silence meet 300 meters from the sea.',
      btnRooms: 'Our Rooms',
      btnAbout: 'The Inn'
    },
    guestArea: {
      title: 'Guest Area',
      welcome: 'Welcome to your sanctuary.',
      selectRoom: 'To begin your Gaya journey, please select your accommodation:',
      backSite: 'Back to Website',
      accessGuide: 'Access Guide',
      changeRoom: 'Change Room',
      hostContact: 'Contact Host',
      stayGuide: 'Stay Guide',
      checkin: 'Check-in: 2:00 PM',
      checkout: 'Check-out: 11:00 AM',
      wifi: 'Wi-Fi & Connection',
      cleaning: 'Cleaning & Care',
      cleaningText: 'For long stays, cleaning is performed every 3 days.',
      restaurants: 'Local Flavors',
      gayaTip: 'Gaya\'s Tip',
      gayaTipText: '"Today the Madre River is calm. Take the opportunity to cross with the boatman Seu Juca and watch the sunset."',
      emergencies: 'Emergencies',
      restaurantList: [
        { name: 'Tuca’s Bar', vibe: 'Seafood', tip: 'Order the "fish on the tile".' },
        { name: 'Guarderia Embaú', vibe: 'Healthy Food', tip: 'The best açaí in town.' },
        { name: 'Kawai Sushi', vibe: 'Asian Cuisine', tip: 'Fresh combinations.' },
        { name: 'Big Bamboo', vibe: 'Pizza & Pasta', tip: 'Rustic and cozy atmosphere.' }
      ]
    },
    assistant: {
      initial: 'Welcome, dear soul! 🙏 I am Gaya, the vibrational essence of Pousada Acauan. How can I help your energy find the perfect refuge today?'
    }
  },
  es: {
    nav: {
      rooms: 'Habitaciones',
      about: 'La Posada',
      guide: 'Guía Local',
      guestArea: 'Área del Huésped',
      reserve: 'Reservar'
    },
    hero: {
      tagline: 'Guarda do Embaú • Santa Catarina',
      title: 'Solo respira.',
      subtitle: 'Tu refugio de ladrillo a la vista, donde el sol y el silencio se encuentran a 300 metros del mar.',
      btnRooms: 'Habitaciones',
      btnAbout: 'La Posada'
    },
    guestArea: {
      title: 'Área del Huésped',
      welcome: 'Bienvenido a tu santuario.',
      selectRoom: 'Para comenzar tu viaje Gaya, selecciona tu alojamiento:',
      backSite: 'Volver al Sitio',
      accessGuide: 'Acceder Guía',
      changeRoom: 'Cambiar Habitación',
      hostContact: 'Hablar con Anfitrión',
      stayGuide: 'Guía de Estancia',
      checkin: 'Check-in: 14:00h',
      checkout: 'Check-out: 11:00h',
      wifi: 'Wi-Fi & Conexión',
      cleaning: 'Limpieza & Cuidado',
      cleaningText: 'Para estancias largas, la limpieza se realiza cada 3 días.',
      restaurants: 'Sabores de la Guarda',
      gayaTip: 'Consejo de Gaya',
      gayaTipText: '"Hoy el río Madre está tranquilo. Aprovecha para cruzar con el barquero Seu Juca y ver el atardecer."',
      emergencies: 'Emergencias',
      restaurantList: [
        { name: 'Tuca’s Bar', vibe: 'Mariscos', tip: 'Pida el pescado en la teja.' },
        { name: 'Guarderia Embaú', vibe: 'Saludable', tip: 'El mejor açaí del pueblo.' },
        { name: 'Kawai Sushi', vibe: 'Cocina Oriental', tip: 'Combinados frescos.' },
        { name: 'Big Bamboo', vibe: 'Pizzas y Pastas', tip: 'Ambiente rústico y acogedor.' }
      ]
    },
    assistant: {
      initial: '¡Bienvenido, alma querida! 🙏 Soy Gaya, la esencia vibracional de Pousada Acauan. ¿Cómo puedo ayudar a tu energía hoy?'
    }
  },
  de: {
    nav: {
      rooms: 'Zimmer',
      about: 'Das Gasthaus',
      guide: 'Reiseführer',
      guestArea: 'Gästebereich',
      reserve: 'Buchen'
    },
    hero: {
      tagline: 'Guarda do Embaú • Santa Catarina',
      title: 'Atme einfach.',
      subtitle: 'Ihr Refugium aus Sichtmauerwerk, wo Sonne und Stille 300 Meter vom Meer entfernt aufeinandertreffen.',
      btnRooms: 'Unsere Zimmer',
      btnAbout: 'Das Gasthaus'
    },
    guestArea: {
      title: 'Gästebereich',
      welcome: 'Willkommen in Ihrem Heiligtum.',
      selectRoom: 'Um Ihre Gaya-Reise zu beginnen, wählen Sie bitte Ihre Unterkunft aus:',
      backSite: 'Zurück zur Webseite',
      accessGuide: 'Guide öffnen',
      changeRoom: 'Zimmer wechseln',
      hostContact: 'Gastgeber kontaktieren',
      stayGuide: 'Aufenthaltsleitfaden',
      checkin: 'Check-in: 14:00 Uhr',
      checkout: 'Check-out: 11:00 Uhr',
      wifi: 'WLAN & Verbindung',
      cleaning: 'Reinigung & Pflege',
      cleaningText: 'Bei längeren Aufenthalten erfolgt die Reinigung alle 3 Tage.',
      restaurants: 'Lokale Aromen',
      gayaTip: 'Gayas Tipp',
      gayaTipText: '"Heute ist der Madre-Fluss ruhig. Nutzen Sie die Gelegenheit, mit dem Bootsmann Seu Juca überzusetzen und den Sonnenuntergang zu beobachten."',
      emergencies: 'Notfälle',
      restaurantList: [
        { name: 'Tuca’s Bar', vibe: 'Meeresfrüchte', tip: 'Bestellen Sie den Fisch auf der Fliese.' },
        { name: 'Guarderia Embaú', vibe: 'Gesundes Essen', tip: 'Das beste Açaí im Dorf.' },
        { name: 'Kawai Sushi', vibe: 'Asiatische Küche', tip: 'Frische Kombinationen.' },
        { name: 'Big Bamboo', vibe: 'Pizza & Pasta', tip: 'Rustikale und gemütliche Atmosphäre.' }
      ]
    },
    assistant: {
      initial: 'Willkommen, liebe Seele! 🙏 Ich bin Gaya, die Schwingungsessenz der Pousada Acauan. Wie kann ich Ihrer Energie heute helfen?'
    }
  }
};
