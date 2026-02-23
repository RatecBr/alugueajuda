
'use client'

import { useState } from 'react'
import ChatWindow from '@/components/chat/chat-window'

interface ChatInterfaceProps {
  conversations: any[]
  userId: string
}

export default function ChatInterface({ conversations, userId }: ChatInterfaceProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(conversations[0]?.id || null)

  const activeConversation = conversations.find(c => c.id === selectedChat)

  if (conversations.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-[600px] text-center p-8 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 text-3xl">
                  💬
              </div>
              <h3 className="text-xl font-bold text-gray-900">Nenhuma conversa ainda</h3>
              <p className="text-gray-500 mt-2 max-w-sm">
                  Busque um especialista e inicie um atendimento para conversar por aqui.
              </p>
              <a href="/search" className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors">
                  Buscar Especialistas
              </a>
          </div>
      )
  }

  return (
    <div className="flex h-[calc(100vh-140px)] min-h-[500px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/30">
        <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Minhas Conversas</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
            {conversations.map((chat) => (
                <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full text-left p-4 hover:bg-indigo-50 transition-colors border-b border-gray-50 flex items-center gap-3 ${selectedChat === chat.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}
                >
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                        {chat.otherUser.full_name?.charAt(0) || '?'}
                    </div>
                    <div>
                        <p className="font-bold text-sm text-gray-900 truncate">{chat.otherUser.full_name || 'Usuário'}</p>
                        <p className="text-xs text-gray-500 truncate">
                            {new Date(chat.lastMessageAt).toLocaleDateString()}
                        </p>
                    </div>
                </button>
            ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-4 bg-gray-50">
        {activeConversation ? (
            <ChatWindow 
                conversationId={activeConversation.id} 
                userId={userId} 
                otherUserName={activeConversation.otherUser.full_name || 'Usuário'}
            />
        ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
                Selecione uma conversa para iniciar
            </div>
        )}
      </div>
    </div>
  )
}
