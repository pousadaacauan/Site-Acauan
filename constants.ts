
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'loft-oceano',
    name: 'Loft Oceano',
    tagline: 'Vista para o mar.',
    description: 'Acordar com o som das ondas e a vista do oceano.',
    longDescription: 'O Loft Oceano oferece a melhor vista da pousada. Amplo, confortável e com decoração praiana. Ideal para casais que buscam romance e tranquilidade.',
    price: 450,
    category: 'Loft',
    imageUrl: 'https://i.ibb.co/jvDWWRpm/521682003.jpg',
    features: ['Vista Mar', 'Ar Condicionado', 'Wi-Fi', 'Cama Queen']
  },
  {
    id: 'loft-horizonte',
    name: 'Loft Horizonte',
    tagline: 'Amplo e panorâmico.',
    description: 'Espaço generoso com vista privilegiada do horizonte.',
    longDescription: 'O Loft Horizonte combina amplitude com conforto. Grandes janelas permitem entrada de luz natural e ventilação da brisa do mar.',
    price: 450,
    category: 'Loft',
    imageUrl: 'https://i.ibb.co/qLn5pRbq/521682605.jpg',
    features: ['Vista Panorâmica', 'Ar Condicionado', 'Wi-Fi', 'Varanda']
  },
  {
    id: 'loft-brisa',
    name: 'Loft Brisa',
    tagline: 'Aconchego e tranquilidade.',
    description: 'Um refúgio acolhedor para descansar.',
    longDescription: 'O Loft Brisa oferece um ambiente tranquilo e aconchegante. Decoração suave e conforto para você relaxar após um dia de praia.',
    price: 400,
    category: 'Loft',
    imageUrl: 'https://i.ibb.co/C5DT7qm8/515141479.jpg',
    features: ['Ambiente Tranquilo', 'Ar Condicionado', 'Wi-Fi', 'Frigobar']
  },
  {
    id: 'loft-costao',
    name: 'Loft Costão',
    tagline: 'Próximo à natureza.',
    description: 'Integrado ao ambiente natural da Guarda.',
    longDescription: 'O Loft Costão fica em uma posição privilegiada, próximo à vegetação nativa. Perfeito para quem ama a natureza e busca conexão com o ambiente.',
    price: 400,
    category: 'Loft',
    imageUrl: 'https://i.ibb.co/CKVs70Wn/Gemini-Generated-Image-8115v18115v18115.png',
    features: ['Contato com Natureza', 'Ar Condicionado', 'Wi-Fi', 'Varanda']
  },
  {
    id: 'loft-areia',
    name: 'Loft Areia',
    tagline: 'Clima praiano.',
    description: 'Acolhedor e com a essência da praia.',
    longDescription: 'O Loft Areia traz toda a essência da Guarda do Embaú para dentro do seu quarto. Decoração praiana e ambiente acolhedor.',
    price: 400,
    category: 'Loft',
    imageUrl: 'https://i.ibb.co/jPMQpGKW/Gemini-Generated-Image-t83bh6t83bh6t83b.png',
    features: ['Decoração Praiana', 'Ar Condicionado', 'Wi-Fi', 'Frigobar']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "As Ondas da Guarda",
        date: "Esporte",
        excerpt: "Por que somos considerados uma das melhores praias de surf do Brasil.",
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "A Guarda do Embaú não é apenas uma praia, é um santuário. Suas ondas perfeitas atraem surfistas de todo o mundo, mantendo uma cultura de respeito e preservação única no litoral catarinense."
            )
        )
    },
    {
        id: 2,
        title: "Trilhas e Mirantes",
        date: "Natureza",
        excerpt: "Um guia pelas paisagens intocadas ao redor da Pousada Acauan.",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Explore o Costão da Guarda e a Prainha. Caminhadas leves que revelam a magnitude da nossa costa, com paradas obrigatórias para fotos inesquecíveis."
            )
        )
    }
];

export const BRAND_NAME = 'Pousada Acauan';
export const PRIMARY_COLOR = 'stone-900'; 
export const ACCENT_COLOR = 'blue-400';
