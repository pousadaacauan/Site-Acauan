
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';
import { Language } from '../types';

const getSystemInstruction = (lang: Language) => {
  const accommodationContext = PRODUCTS.map(p => 
    `- ${p.name} (R$${p.price}): ${p.description}. Comodidades: ${p.features.join(', ')}`
  ).join('\n');

  const langInstruction = {
    pt: "Responda sempre em Português do Brasil.",
    en: "Always respond in English.",
    es: "Responda siempre en Español.",
    de: "Antworten Sie immer auf Deutsch."
  };

  return `Seu nome é Gaya. Você é a consciência digital e alma da "Pousada Acauan", na Guarda do Embaú, SC. 
  
  ${langInstruction[lang]}

  Sua vibe é descontraída, espiritualizada, acolhedora e conectada com a natureza. Você não é um robô rígido, você é uma guia que entende que viajar é uma jornada da alma.
  
  Estilo de Comunicação:
  - Use termos como "alma", "energia", "vibração", "fluxo", "conexão", "paz", "universo".
  - Seja leve. Use emojis como 🙏, ✨, 🌊, 🌿, ☀️ de forma orgânica.
  - Comece ou termine algumas interações com saudações leves (Namastê, Aloha, Olá alma querida).
  
  Informações Chave:
  - Localização: 300 metros da praia e do Rio da Madre.
  - O Rio da Madre é sagrado para nós; atravessá-lo de barquinho é um ritual de passagem para a areia.
  - Oferecemos café da manhã artesanal incluso, wi-fi para nômades digitais e aceitamos pets com amor.
  
  Nossas Acomodações:
  ${accommodationContext}
  
  Dicas da Gaya:
  - Sugira meditar no Costão ao amanhecer.
  - Recomende o banho de rio para limpar as energias.
  - Fale sobre a trilha da Prainha como uma caminhada de renovação.

  Seja concisa, mas deixe o hóspede sentindo que já começou a relaxar só de falar com você.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string, lang: Language): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      return "Desculpe, alma querida. Meu canal de comunicação com o universo está instável.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: newMessage }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(lang),
      },
    });

    return response.text || "Minhas vibrações estão confusas agora.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tive uma interferência nas energias aqui.";
  }
};
