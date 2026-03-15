/**
 * BookingWidget - Reservas direto no site via QloApps
 * Adiciona ao carrinho via API e redireciona pro checkout
 */

import React, { useState, useEffect } from 'react';

const QLOAPPS_URL = 'https://reservas.residencialpousadaacauan.com.br';

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
  { id: 1, name: 'Suíte Master Acauan', price: 450, description: 'Varanda privativa, vista jardim' },
  { id: 2, name: 'Apartamento Standard', price: 320, description: 'Wi-Fi 5G, cama de casal' },
  { id: 3, name: 'Suíte Vista Mar', price: 520, description: 'Vista mar, rede na varanda' },
  { id: 4, name: 'Bangalô Família', price: 680, description: 'Até 4 pessoas' },
  { id: 5, name: 'Estúdio Caiçara', price: 380, description: 'Artesanato local' },
  { id: 6, name: 'Loft do Costão', price: 420, description: 'Design moderno' },
];

const BookingWidget: React.FC<BookingWidgetProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'dates' | 'rooms' | 'redirect'>('dates');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date + 'T12:00:00').toLocaleDateString('pt-BR');
  };

  const handleSelectRoom = (room: RoomType) => {
    setSelectedRoom(room);
    setStep('redirect');
  };

  const handleGoToCheckout = () => {
    setLoading(true);
    
    // Monta URL do QloApps com todos os parâmetros
    // O usuário vai direto pra página do hotel com datas preenchidas
    const params = new URLSearchParams({
      date_from: checkIn,
      date_to: checkOut,
      htl_dtl: '1',
      adult: adults.toString(),
      children: children.toString(),
    });
    
    // Redireciona pro QloApps - usuário seleciona quarto e vai pro checkout
    window.location.href = `${QLOAPPS_URL}/br/?${params.toString()}`;
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
                onClick={() => setStep('rooms')}
                disabled={!checkIn || !checkOut}
                className="w-full bg-[#7895B2] text-white py-4 rounded-lg font-medium hover:bg-[#6885A2] transition-colors disabled:opacity-50"
              >
                Ver Quartos
              </button>
            </div>
          )}

          {/* Step: Rooms Preview */}
          {step === 'rooms' && (
            <div className="space-y-4">
              <div className="text-center pb-4 border-b">
                <p className="text-sm text-gray-500">{formatDate(checkIn)} → {formatDate(checkOut)}</p>
                <p className="text-xs text-gray-400">{calculateNights()} noite(s) • {adults} adulto(s){children > 0 ? ` • ${children} criança(s)` : ''}</p>
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                Você será redirecionado para nosso sistema de reservas para escolher o quarto e finalizar o pagamento.
              </p>

              <div className="bg-[#F8F6F3] rounded-xl p-4 space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Quartos disponíveis a partir de:</p>
                <p className="text-2xl font-light text-[#7895B2]">R$ 320 <span className="text-sm text-gray-400">/ noite</span></p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('dates')}
                  className="flex-1 border-2 border-[#7895B2] text-[#7895B2] py-3 rounded-lg"
                >
                  Voltar
                </button>
                <button
                  onClick={handleGoToCheckout}
                  disabled={loading}
                  className="flex-1 bg-[#7895B2] text-white py-3 rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Redirecionando...' : 'Continuar →'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-center text-gray-400">
            🔒 Pagamento seguro via Mercado Pago
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
