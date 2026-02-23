
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getConversations() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Buscar conversas onde o usuário é participante
  // Precisamos fazer um join para pegar os dados do OUTRO participante
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select(`
      *,
      participant1:profiles!conversations_participant1_id_fkey(id, full_name, role),
      participant2:profiles!conversations_participant2_id_fkey(id, full_name, role)
    `)
    .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
    .order('last_message_at', { ascending: false })

  if (error) {
    console.error('Error fetching conversations:', error)
    return { error: 'Erro ao carregar conversas' }
  }

  // Formatar para o frontend identificar quem é o "outro"
  const formatted = conversations.map(c => {
    const otherUser = c.participant1_id === user.id ? c.participant2 : c.participant1
    return {
      id: c.id,
      otherUser: otherUser || { full_name: 'Usuário Desconhecido' }, // Fallback
      lastMessageAt: c.last_message_at
    }
  })

  return { conversations: formatted, userId: user.id }
}

export async function sendMessage(conversationId: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content
    })

  if (error) {
    return { error: error.message }
  }

  // Atualizar timestamp da conversa
  await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversationId)

  return { success: true }
}

export async function createConversation(otherUserId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Verificar se já existe (ordem dos IDs importa para a unique constraint se não tratada, 
  // mas nossa query de busca usa OR, aqui vamos tentar achar qualquer uma)
  
  // Melhor abordagem: Tentar inserir e se der conflito, buscar a existente.
  // Mas o Supabase não tem "ON CONFLICT DO NOTHING RETURNING ID" fácil via JS client para constraints complexas as vezes.
  // Vamos buscar primeiro.
  
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${otherUserId}),and(participant1_id.eq.${otherUserId},participant2_id.eq.${user.id})`)
    .single()

  if (existing) {
    return { conversationId: existing.id }
  }

  // Criar nova
  const { data: newConv, error } = await supabase
    .from('conversations')
    .insert({
      participant1_id: user.id,
      participant2_id: otherUserId,
      last_message_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/chat')
  return { conversationId: newConv.id }
}
