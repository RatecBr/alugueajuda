import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('Stripe-Signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  // Initialize Supabase Admin Client
  // This requires SUPABASE_SERVICE_ROLE_KEY to be set in environment variables
  // to bypass RLS and insert bookings/conversations on behalf of users.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables for Webhook')
      return new NextResponse('Server Configuration Error', { status: 500 })
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const metadata = session.metadata

    if (metadata && metadata.type === 'consultation_booking') {
        const clientId = metadata.clientId
        const professionalId = metadata.professionalId
        const minutes = parseInt(metadata.minutes)
        const amountPaid = session.amount_total / 100 

        console.log(`Processing booking: Client ${clientId} -> Pro ${professionalId} (${minutes} min)`)

        // 1. Register Booking
        const { error: bookingError } = await supabaseAdmin.from('bookings').insert({
            client_id: clientId,
            professional_id: professionalId,
            minutes_booked: minutes,
            amount_paid: amountPaid,
            stripe_session_id: session.id,
            status: 'paid'
        })

        if (bookingError) {
            console.error('Error inserting booking:', bookingError)
            return new NextResponse('Error inserting booking', { status: 500 })
        }

        // 2. Create/Get Conversation
        const { data: existingConvs } = await supabaseAdmin
            .from('conversations')
            .select('id')
            .or(`and(participant1_id.eq.${clientId},participant2_id.eq.${professionalId}),and(participant1_id.eq.${professionalId},participant2_id.eq.${clientId})`)
        
        let conversationId = existingConvs?.[0]?.id

        if (!conversationId) {
            const { data: newConv, error: convError } = await supabaseAdmin
                .from('conversations')
                .insert({
                    participant1_id: clientId,
                    participant2_id: professionalId,
                    last_message_at: new Date().toISOString()
                })
                .select()
                .single()
            
            if (convError) {
                 console.error('Error creating conversation:', convError)
            } else {
                conversationId = newConv.id
            }
        }

        // 3. Send system message (using client as sender for now, or could use a system bot ID if available)
        if (conversationId) {
             await supabaseAdmin.from('messages').insert({
                 conversation_id: conversationId,
                 sender_id: clientId, 
                 content: `[SISTEMA] Contratação confirmada: ${minutes} minutos de consultoria.`
             })
        }
    }
  }

  return new NextResponse(null, { status: 200 })
}
