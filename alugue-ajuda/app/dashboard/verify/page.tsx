import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import VerifyForm from './verify-form'

export default async function VerifyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.ai_verified) {
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow text-center max-w-md">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Perfil Verificado!</h1>
                <p className="text-gray-600 mb-6">Você já foi aprovado como especialista. Seu perfil está ativo.</p>
                <a href="/dashboard" className="text-indigo-600 font-medium hover:underline">Voltar ao Dashboard</a>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Validação de Especialista</h1>
            <p className="mt-2 text-gray-600">Complete o processo abaixo para começar a atender.</p>
        </div>
        <VerifyForm />
    </div>
  )
}
