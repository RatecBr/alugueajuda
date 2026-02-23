import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardClient from './profile-form'

export default async function DashboardPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header com Navegação */}
        <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col gap-1">
                <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors">
                    ← Voltar para Home
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Meu Painel</h1>
                <p className="text-gray-500">Gerencie suas informações e preferências</p>
            </div>
            <form action="/auth/signout" method="post">
                <button className="text-red-600 hover:text-red-800 text-sm font-medium border border-red-200 bg-white px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                    Sair da Conta
                </button>
            </form>
        </div>

        {/* Componente Principal com Abas */}
        {profile && <DashboardClient profile={profile} userEmail={user.email!} />}

        {/* Links Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/search" className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all group">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">🔍 Buscar Especialistas</h3>
            <p className="text-sm text-gray-500 mt-1">Encontre profissionais qualificados para te ajudar agora.</p>
          </Link>
          <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all cursor-not-allowed opacity-60">
            <h3 className="font-bold text-lg text-gray-900">📅 Minhas Sessões</h3>
            <p className="text-sm text-gray-500 mt-1">Histórico de atendimentos e agendamentos futuros. (Em breve)</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}
