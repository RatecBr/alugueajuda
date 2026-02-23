'use client'

import { useState } from 'react'
import { MessageSquare, Video } from 'lucide-react'
import BookingModal from '@/components/booking/booking-modal'

interface Professional {
  id: string
  full_name: string | null
  price_per_minute: number | null
  avatar_url?: string | null
  bio?: string | null
}

export default function ProfessionalCardActions({ professional }: { professional: Professional }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  
  const hasPrice = professional.price_per_minute && professional.price_per_minute > 0

  return (
    <div className="flex gap-2">
      <button 
        className="flex-1 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
        onClick={() => {
            // Future: Navigate to full profile
            // router.push(`/professionals/${professional.id}`)
        }}
      >
        Ver Perfil
      </button>
      
      <button 
        onClick={() => setIsBookingOpen(true)}
        disabled={!hasPrice}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2 ${
            hasPrice 
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Video className="w-4 h-4" />
        {hasPrice ? 'Contratar' : 'Indisponível'}
      </button>

      {hasPrice && (
        <BookingModal 
            professional={professional} 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
        />
      )}
    </div>
  )
}
