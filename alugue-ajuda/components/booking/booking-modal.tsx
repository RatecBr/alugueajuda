
'use client'

import { useState } from 'react'
import { createCheckoutSession } from '@/lib/stripe/actions'
import { X, Clock, CreditCard, CheckCircle, Loader2 } from 'lucide-react'

interface Professional {
  id: string
  full_name: string | null
  price_per_minute: number | null
  avatar_url?: string | null
}

interface BookingModalProps {
  professional: Professional
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ professional, isOpen, onClose }: BookingModalProps) {
  const [minutes, setMinutes] = useState(30)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const pricePerMinute = professional.price_per_minute || 0
  const total = pricePerMinute * minutes

  async function handleCheckout() {
    setLoading(true)
    setError('')

    try {
      const result = await createCheckoutSession(professional.id, pricePerMinute, minutes)
      
      if (result.error) {
        setError(result.error)
        setLoading(false)
      } else if (result.url) {
        // Redirecionar para o Stripe
        window.location.href = result.url
      }
    } catch (e) {
      setError('Erro ao conectar com o pagamento.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl shadow-lg border-2 border-indigo-200">
              {professional.avatar_url ? (
                  <img src={professional.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                  professional.full_name?.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <p className="text-indigo-100 text-xs font-semibold uppercase tracking-wider">Contratar Especialista</p>
              <h3 className="text-xl font-bold">{professional.full_name}</h3>
              <p className="text-white/90 text-sm flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                R$ {pricePerMinute.toFixed(2)} / min
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Duration Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Quanto tempo você precisa?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[15, 30, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => setMinutes(m)}
                  className={`py-3 px-2 rounded-xl border-2 text-sm font-bold transition-all ${
                    minutes === m 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm transform scale-105' 
                      : 'border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Duração</span>
              <span>{minutes} minutos</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Taxa do Profissional</span>
              <span>R$ {pricePerMinute.toFixed(2)}/min</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total a Pagar</span>
              <span className="text-2xl font-bold text-indigo-700">
                R$ {total.toFixed(2)}
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* Action */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                Confirmar e Pagar
                <CheckCircle className="w-5 h-5" />
              </>
            )}
          </button>
          
          <p className="text-center text-xs text-gray-400">
            Pagamento seguro processado pelo Stripe. 
            <br/>O valor só é liberado após a confirmação.
          </p>
        </div>
      </div>
    </div>
  )
}
