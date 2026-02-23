
'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { sendMessage } from '@/lib/chat/actions'
import { Send, Video } from 'lucide-react'
import { createRoom } from '@/lib/daily/actions'

interface Message {
  id: string
  sender_id: string
  content: string
  created_at: string
}

interface ChatWindowProps {
  conversationId: string
  userId: string
  otherUserName: string
}

export default function ChatWindow({ conversationId, userId, otherUserName }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [creatingVideo, setCreatingVideo] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load initial messages and subscribe
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
      
      if (data) setMessages(data)
    }

    fetchMessages()

    // Realtime subscription
    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId, supabase])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const content = newMessage
    setNewMessage('') // Otimista

    // Envia via server action (mais seguro e limpo)
    await sendMessage(conversationId, content)
  }

  const handleVideoCall = async () => {
      setCreatingVideo(true)
      try {
          const room = await createRoom()
          if (room && room.url) {
              await sendMessage(conversationId, `📞 Iniciei uma chamada de vídeo: ${room.url}`)
              // Opcional: Abrir automaticamente
              window.open(room.url, '_blank')
          } else {
              alert('Erro ao criar sala. Verifique a API Key.')
          }
      } catch (error) {
          alert('Erro ao conectar com servidor de vídeo.')
      } finally {
          setCreatingVideo(false)
      }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-800">{otherUserName}</h3>
        <button 
            onClick={handleVideoCall}
            disabled={creatingVideo}
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
            <Video className="w-3 h-3" />
            {creatingVideo ? 'Criando Sala...' : 'Vídeo Chamada'}
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => {
          const isMe = msg.sender_id === userId
          // Check if message is a video link
          const isVideoLink = msg.content.includes('https://') && msg.content.includes('daily.co')
          
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                isMe 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}>
                {isVideoLink ? (
                    <div>
                        <p className="mb-2">📞 Chamada de Vídeo</p>
                        <a 
                            href={msg.content.split(': ')[1]} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-bold inline-block hover:bg-gray-100"
                        >
                            Entrar na Sala &rarr;
                        </a>
                    </div>
                ) : (
                    msg.content
                )}
                <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-indigo-200' : 'text-gray-400'}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim()}
          className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
