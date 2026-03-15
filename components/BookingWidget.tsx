/**
 * BookingWidget v3 - Integrado com API do Hetzner
 */

import React, { useState } from 'react';

const BOOKING_API = 'https://reservas.residencialpousadaacauan.com.br/booking-api.php';

interface BookingWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoomType {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ROOMS: RoomType[] = [
  { id: 1, name: 'Loft Oceano', price: 450, description: 'Vista para o mar, conforto total' },
  { id: 2, name: 'Loft Horizonte', price: 450, description: 'Amplo, vista panorâmica' },
  { id: 3, name: 'Loft Brisa', price: 400, description: 'Aconchegante, ambiente tranquilo' },
  { id: 4, name: 'Loft Costão', price: 400, description: 'Próximo à natureza' },
  { id: 11, name: 'Loft Areia', price: 400, description: 'Acolhedor, clima praiano' },
];
// Adicional por pessoa extra ou criança: R$100

const BookingWidget: React.FC<BookingWidgetProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'dates' | 'rooms' | 'guest' | 'processing'>('dates');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [guest, setGuest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const nights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
  };

  const total = () => selectedRoom ? selectedRoom.price * nights() : 0;

  const formatDate = (d: string) => d ? new Date(d + 'T12:00:00').toLocaleDateString('pt-BR') : '';
  const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  const handleBook = async () => {
    if (!guest.firstName || !guest.email || !guest.phone) {
      setError('Preencha todos os campos');
      return;
    }

    setStep('processing');
    setLoading(true);

    try {
      const res = await fetch(BOOKING_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn,
          checkOut,
          adults,
          children,
          roomId: selectedRoom?.id || 1,
          firstName: guest.firstName,
          lastName: guest.lastName,
          email: guest.email,
          phone: guest.phone,
        }),
      });

      const data = await res.json();
      
      if (data.success && data.bookingUrl) {
        window.location.href = data.bookingUrl;
      } else {
        throw new Error(data.error || 'Erro ao processar');
      }
    } catch (err) {
      setError('Erro ao processar. Tente novamente.');
      setStep('guest');
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-[#7895B2] text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif">Reservar</h2>
              <p className="text-white/80 text-sm">Pousada Acauan</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">×</button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
              <button onClick={() => setError('')} className="float-right">×</button>
            </div>
          )}

          {step === 'dates' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-[#7895B2] mb-1">Check-in</label>
                <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-[#7895B2] outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase text-[#7895B2] mb-1">Check-out</label>
                <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-[#7895B2] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-[#7895B2] mb-1">Adultos</label>
                  <select value={adults} onChange={(e) => setAdults(+e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg p-3">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-[#7895B2] mb-1">Crianças</label>
                  <select value={children} onChange={(e) => setChildren(+e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg p-3">
                    {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => setStep('rooms')} disabled={!checkIn || !checkOut}
                className="w-full bg-[#7895B2] text-white py-4 rounded-lg disabled:opacity-50">
                Ver Quartos
              </button>
            </div>
          )}

          {step === 'rooms' && (
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-500 pb-2 border-b">
                {formatDate(checkIn)} → {formatDate(checkOut)} • {nights()} noite(s)
              </p>
              {ROOMS.map(room => (
                <div key={room.id} onClick={() => { setSelectedRoom(room); setStep('guest'); }}
                  className="border-2 rounded-xl p-4 cursor-pointer hover:border-[#7895B2]">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{room.name}</h3>
                      <p className="text-sm text-gray-500">{room.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl text-[#7895B2]">{formatCurrency(room.price)}</p>
                      <p className="text-xs text-gray-400">por noite</p>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => setStep('dates')} className="w-full text-[#7895B2] py-2 text-sm">← Voltar</button>
            </div>
          )}

          {step === 'guest' && selectedRoom && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedRoom.name}</h3>
                    <p className="text-sm text-gray-500">{formatDate(checkIn)} → {formatDate(checkOut)}</p>
                  </div>
                  <p className="text-xl text-[#7895B2]">{formatCurrency(total())}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nome *" value={guest.firstName}
                  onChange={(e) => setGuest({...guest, firstName: e.target.value})}
                  className="border-2 rounded-lg p-3" />
                <input type="text" placeholder="Sobrenome" value={guest.lastName}
                  onChange={(e) => setGuest({...guest, lastName: e.target.value})}
                  className="border-2 rounded-lg p-3" />
              </div>
              <input type="email" placeholder="E-mail *" value={guest.email}
                onChange={(e) => setGuest({...guest, email: e.target.value})}
                className="w-full border-2 rounded-lg p-3" />
              <input type="tel" placeholder="WhatsApp *" value={guest.phone}
                onChange={(e) => setGuest({...guest, phone: e.target.value})}
                className="w-full border-2 rounded-lg p-3" />
              <div className="flex gap-3">
                <button onClick={() => setStep('rooms')} className="flex-1 border-2 border-[#7895B2] text-[#7895B2] py-3 rounded-lg">Voltar</button>
                <button onClick={handleBook} className="flex-1 bg-[#7895B2] text-white py-3 rounded-lg">Pagar →</button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="animate-spin w-10 h-10 border-4 border-[#7895B2] border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-600">Redirecionando para pagamento...</p>
            </div>
          )}
        </div>

        <div className="px-6 pb-4">
          <p className="text-xs text-center text-gray-400">🔒 Pagamento seguro via Mercado Pago</p>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
