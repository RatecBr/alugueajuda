
import { getConversations } from '@/lib/chat/actions'
import ChatInterface from '@/components/chat/chat-interface'
import { redirect } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default async function ChatPage({
  searchParams,
}: {
  searchParams: { success?: string }
}) {
  const result = await getConversations()
  const showSuccess = searchParams.success === 'true'

  if (result.error === 'Not authenticated') {
      redirect('/login')
  }

  if (result.error) {
      return (
          <div className="p-8 text-center text-red-600">
              Erro ao carregar chat: {result.error}
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Central de Mensagens</h1>
        
        {showSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 mb-6 rounded-lg shadow-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-bold text-lg">Pagamento Confirmado!</h3>
                    <p className="text-green-700">Sua consulta foi agendada com sucesso. O chat com o especialista já está disponível abaixo.</p>
                    <p className="text-sm text-green-600 mt-1">Se a conversa não aparecer, aguarde alguns instantes e atualize a página.</p>
                </div>
            </div>
        )}

        <ChatInterface 
            conversations={result.conversations || []} 
            userId={result.userId} 
        />
      </div>
    </div>
  )
}
