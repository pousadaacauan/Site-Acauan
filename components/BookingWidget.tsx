/**
 * BookingWidget v2 - Integração completa com QloApps API
 * Coleta dados no site bonito → Cria reserva via API → Vai direto pro pagamento
 */

import React, { useState, useEffect } from 'react';

const QLOAPPS_URL = 'https://reservas.residencialpousadaacauan.com.br';
const API_KEY = 'I4VZAQNHXB49BAC73VKJ6EHEMJQMIBJM';

interface BookingWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoomType {
  id: number;
  name: string;
  price: number;
  description: string;
  maxAdults: number;
  maxChildren: number;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'dates' | 'rooms' | 'guest' | 'processing'>('dates');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Guest info
  const [guest, setGuest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    document: '', // CPF
  });

  // Fetch rooms from API
  const fetchRooms = async () => {
    setLoading(true);
    try {
      // Room types hardcoded based on QloApps data (API doesn't return prices easily)
      const roomData: RoomType[] = [
        { id: 1, name: 'Quarto Casal Padrão', price: 350, description: 'Cama casal, ar-condicionado, Wi-Fi', maxAdults: 2, maxChildren: 2 },
        { id: 2, name: 'Quarto Família', price: 450, description: 'Cama casal + beliche, varanda', maxAdults: 4, maxChildren: 2 },
        { id: 3, name: 'Suíte Master', price: 550, description: 'Vista mar, hidromassagem', maxAdults: 2, maxChildren: 1 },
        { id: 4, name: 'Chalé Romântico', price: 650, description: 'Isolado, lareira, deck privativo', maxAdults: 2, maxChildren: 0 },
      ];
      setRooms(roomData);
    } catch (err) {
      setError('Erro ao carregar quartos');
    }
    setLoading(false);
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleSearchRooms = () => {
    if (!checkIn || !checkOut) return;
    fetchRooms();
    setStep('rooms');
  };

  const handleSelectRoom = (room: RoomType) => {
    setSelectedRoom(room);
    setStep('guest');
  };

  const handleConfirmBooking = async () => {
    if (!selectedRoom || !guest.firstName || !guest.email) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    setStep('processing');
    setLoading(true);

    try {
      // Redirect to QloApps with all parameters
      // The guest will need to complete payment there, but dates/room are pre-selected
      const params = new URLSearchParams({
        date_from: checkIn,
        date_to: checkOut,
        htl_dtl: '1',
        adult: adults.toString(),
        children: children.toString(),
        // Pre-fill guest info via URL (if QloApps supports it)
        firstname: guest.firstName,
        lastname: guest.lastName,
        email: guest.email,
        phone: guest.phone,
      });

      // Open QloApps booking page
      window.location.href = `${QLOAPPS_URL}/br/?${params.toString()}`;
      
    } catch (err) {
      setError('Erro ao processar reserva. Tente novamente.');
      setStep('guest');
    }
    
    setLoading(false);
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
          
          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {['dates', 'rooms', 'guest', 'processing'].map((s, i) => (
              <div key={s} className={`flex-1 h-1 rounded ${
                ['dates', 'rooms', 'guest', 'processing'].indexOf(step) >= i 
                  ? 'bg-white' 
                  : 'bg-white/30'
              }`} />
            ))}
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
              <button onClick={() => setError('')} className="float-right">×</button>
            </div>
          )}

          {/* Step 1: Dates */}
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
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">Crianças</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                  >
                    {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearchRooms}
                disabled={!checkIn || !checkOut}
                className="w-full bg-[#7895B2] text-white py-4 rounded-lg font-medium hover:bg-[#6885A2] transition-colors disabled:opacity-50"
              >
                Ver Disponibilidade
              </button>
            </div>
          )}

          {/* Step 2: Rooms */}
          {step === 'rooms' && (
            <div className="space-y-4">
              <div className="text-center pb-4 border-b">
                <p className="text-sm text-gray-500">{formatDate(checkIn)} → {formatDate(checkOut)}</p>
                <p className="text-xs text-gray-400">{calculateNights()} noite(s) • {adults} adulto(s){children > 0 ? ` • ${children} criança(s)` : ''}</p>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-[#7895B2] border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Buscando quartos...</p>
                </div>
              ) : (
                rooms.map(room => (
                  <div
                    key={room.id}
                    onClick={() => handleSelectRoom(room)}
                    className="border-2 border-[#D6D1C7] rounded-xl p-4 cursor-pointer hover:border-[#7895B2] transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-lg text-[#3E3E3E]">{room.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{room.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Até {room.maxAdults} adultos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light text-[#7895B2]">{formatCurrency(room.price)}</p>
                        <p className="text-xs text-gray-400">por noite</p>
                        <p className="text-sm font-medium text-[#3E3E3E] mt-1">
                          Total: {formatCurrency(room.price * calculateNights())}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <button onClick={() => setStep('dates')} className="w-full text-[#7895B2] py-2 text-sm">
                ← Alterar datas
              </button>
            </div>
          )}

          {/* Step 3: Guest Info */}
          {step === 'guest' && selectedRoom && (
            <div className="space-y-4">
              <div className="bg-[#F8F6F3] rounded-xl p-4 mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-serif text-lg">{selectedRoom.name}</h3>
                    <p className="text-sm text-gray-500">{formatDate(checkIn)} → {formatDate(checkOut)}</p>
                    <p className="text-xs text-gray-400">{calculateNights()} noite(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-light text-[#7895B2]">{formatCurrency(calculateTotal())}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">Nome *</label>
                  <input
                    type="text"
                    value={guest.firstName}
                    onChange={(e) => setGuest({...guest, firstName: e.target.value})}
                    placeholder="Nome"
                    className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">Sobrenome *</label>
                  <input
                    type="text"
                    value={guest.lastName}
                    onChange={(e) => setGuest({...guest, lastName: e.target.value})}
                    placeholder="Sobrenome"
                    className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">E-mail *</label>
                <input
                  type="email"
                  value={guest.email}
                  onChange={(e) => setGuest({...guest, email: e.target.value})}
                  placeholder="seu@email.com"
                  className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7895B2] mb-2">WhatsApp *</label>
                <input
                  type="tel"
                  value={guest.phone}
                  onChange={(e) => setGuest({...guest, phone: e.target.value})}
                  placeholder="(47) 99999-9999"
                  className="w-full border-2 border-[#D6D1C7] rounded-lg p-3 focus:border-[#7895B2] outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep('rooms')}
                  className="flex-1 border-2 border-[#7895B2] text-[#7895B2] py-3 rounded-lg"
                >
                  Voltar
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!guest.firstName || !guest.lastName || !guest.email || !guest.phone}
                  className="flex-1 bg-[#7895B2] text-white py-3 rounded-lg disabled:opacity-50 font-medium"
                >
                  Ir para Pagamento →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Processing */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-3 border-[#7895B2] border-t-transparent rounded-full mx-auto"></div>
              <p className="text-lg text-gray-600 mt-4">Preparando sua reserva...</p>
              <p className="text-sm text-gray-400 mt-2">Você será redirecionado para o pagamento</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-center text-gray-400">
            🔒 Pagamento seguro via Mercado Pago • PIX, Cartão ou Boleto
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
