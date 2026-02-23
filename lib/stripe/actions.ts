
'use server'

import { createClient } from '@/lib/supabase/server'
import { stripe } from './server'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(professionalId: string, pricePerMinute: number, minutes: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Você precisa estar logado para contratar.' }
  }

  if (!process.env.STRIPE_SECRET_KEY) {
      return { error: 'Sistema de pagamento não configurado (Falta STRIPE_SECRET_KEY).' }
  }

  // 1. Buscar dados do profissional para garantir que existe
  const { data: professional } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', professionalId)
    .single()

  if (!professional) return { error: 'Profissional não encontrado.' }

  const totalAmount = pricePerMinute * minutes
  const totalAmountCents = Math.round(totalAmount * 100) // Stripe works with cents

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  try {
    // 2. Criar Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Adicionar 'boleto', 'pix' se ativado no Stripe
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Consultoria com ${professional.full_name}`,
              description: `${minutes} minutos de atendimento personalizado`,
            },
            unit_amount: totalAmountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/chat?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/search?canceled=true`,
      metadata: {
        clientId: user.id,
        professionalId: professionalId,
        minutes: minutes.toString(),
        type: 'consultation_booking'
      },
      customer_email: user.email, // Pre-fill customer email
    })

    if (!session.url) throw new Error('No session URL')

    return { url: session.url }

  } catch (error: any) {
    console.error('Stripe Error:', error)
    return { error: `Erro ao criar pagamento: ${error.message}` }
  }
}
