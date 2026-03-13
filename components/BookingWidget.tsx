/**
 * BookingWidget - Reservas direto no site via API QloApps
 */

import React, { useState } from 'react';

const QLOAPPS_API = 'https://reservas.residencialpousadaacauan.com.br/api';
const QLOAPPS_KEY = 'I4VZAQNHXB49BAC73VKJ6EHEMJQMIBJM';
const QLOAPPS_URL = 'https://reservas.residencialpousadaacauan.com.br';

interface BookingWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoomAvailability {
  id: number;
  name: string;
  price: number;
  description: string;
  available: number;
  image?: string;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'dates' | 'rooms' | 'contact' | 'confirm'>('dates');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<RoomAvailability[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomAvailability | null>(null);
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });

  // Quartos disponíveis (cache local - idealmente viria da API)
  const availableRooms: RoomAvailability[] = [
    { id: 1, name: 'Suíte Master Acauan', price: 450, description: 'Varanda privativa, vista jardim, cama king size', available: 1 },
    { id: 2, name: 'Apartamento Standard', price: 320, description: 'Wi-Fi 5G, cama de casal, frigobar', available: 2 },
    { id: 3, name: 'Suíte Vista Mar', price: 520, description: 'Vista mar, rede na varanda, Smart TV', available: 1 },
    { id: 4, name: 'Bangalô Família', price: 680, description: 'Até 4 pessoas, dois ambientes', available: 1 },
    { id: 5, name: 'Estúdio Caiçara', price: 380, description: 'Artesanato local, cozinha básica', available: 2 },
    { id: 6, name: 'Loft do Costão', price: 420, description: 'Design moderno, integrado à natureza', available: 1 },
  ];

  const handleSearchRooms = async () => {
    if (!checkIn || !checkOut) return;
    
    setLoading(true);
    
    // Simula busca - idealmente faria chamada real à API
    setTimeout(() => {
      setRooms(availableRooms);
      setLoading(false);
      setStep('rooms');
    }, 1000);
  };

  const handleSelectRoom = (room: RoomAvailability) => {
    setSelectedRoom(room);
    setStep('contact');
  };

  const handleConfirmBooking = () => {
    // Redireciona pro QloApps com as datas selecionadas
    const checkInFormatted = checkIn; // formato YYYY-MM-DD
    const checkOutFormatted = checkOut;
    
    // URL do QloApps com parâmetros de busca
    const qloappsUrl = `${QLOAPPS_URL}?date_from=${checkInFormatted}&date_to=${checkOutFormatted}&htl_dtl=1&adult=${adults}&children=${children}`;
    
    // Abre QloApps pra finalizar reserva e pagamento
    window.open(qloappsUrl, '_blank');
    onClose();
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date + 'T12:00:00').toLocaleDateString('pt-BR');
  };

  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#7895B2] text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif">Reservar</h2>
              <p className="text-white/80 text-sm">Pousada Acauan • Guarda do Embaú</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">×</button>
          </div>
          
          {/* Steps */}
          <div className="flex gap-2 mt-4">
            {['dates', 'rooms', 'contact', 'confirm'].map((s, i) => (
              <div key={s} className={`flex-1 h-1 rounded ${step === s || ['dates', 'rooms', 'contact', 'confirm'].indexOf(step) >= i ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step: Dates */}
          {step === 'dates' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">Check-in</label>
                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">Check-out</label>
                <input
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">Adultos</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                  >
                    {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">Crianças</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                  >
                    {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearchRooms}
                disabled={!checkIn || !checkOut || loading}
                className="w-full bg-[#7895B2] text-white py-4 rounded-lg font-medium hover:bg-[#6885A2] transition-colors disabled:opacity-50"
              >
                {loading ? 'Buscando...' : 'Ver Disponibilidade'}
              </button>
            </div>
          )}

          {/* Step: Rooms */}
          {step === 'rooms' && (
            <div className="space-y-4">
              <div className="text-center pb-4 border-b">
                <p className="text-sm text-gray-500">{formatDate(checkIn)} → {formatDate(checkOut)}</p>
                <p className="text-xs text-gray-400">{calculateNights()} noite(s) • {adults} adulto(s)</p>
              </div>
              
              {rooms.map(room => (
                <div
                  key={room.id}
                  onClick={() => handleSelectRoom(room)}
                  className="border-2 border-[#D6D1C7] rounded-xl p-4 cursor-pointer hover:border-[#7895B2] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-lg text-[#3E3E3E]">{room.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{room.description}</p>
                      <p className="text-xs text-green-600 mt-2">✓ {room.available} disponível(is)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-[#7895B2]">R$ {room.price}</p>
                      <p className="text-xs text-gray-400">por noite</p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setStep('dates')}
                className="w-full text-[#7895B2] py-2 text-sm"
              >
                ← Alterar datas
              </button>
            </div>
          )}

          {/* Step: Contact */}
          {step === 'contact' && selectedRoom && (
            <div className="space-y-6">
              <div className="bg-[#F8F6F3] rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-serif text-lg">{selectedRoom.name}</h3>
                    <p className="text-sm text-gray-500">{formatDate(checkIn)} → {formatDate(checkOut)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-light text-[#7895B2]">R$ {calculateTotal()}</p>
                    <p className="text-xs text-gray-400">{calculateNights()} noite(s)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">Nome completo</label>
                <input
                  type="text"
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">E-mail</label>
                <input
                  type="email"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={guestInfo.phone}
                  onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                  placeholder="(47) 99999-9999"
                  className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('rooms')}
                  className="flex-1 border-2 border-[#7895B2] text-[#7895B2] py-3 rounded-lg"
                >
                  Voltar
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!guestInfo.name || !guestInfo.email}
                  className="flex-1 bg-[#7895B2] text-white py-3 rounded-lg disabled:opacity-50"
                >
                  Finalizar Reserva
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-center text-gray-400">
            🔒 Pagamento seguro • Confirmação imediata
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
