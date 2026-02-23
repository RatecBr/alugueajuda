
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile, updatePassword } from './actions'
import { User, Shield, Briefcase, Lock, Loader2 } from 'lucide-react'

interface Profile {
  full_name: string | null
  role: 'user' | 'professional' | 'admin' | null
  bio: string | null
  price_per_minute: number | null
  ai_verified: boolean | null
  ai_score: number | null
}

export default function DashboardClient({ profile, userEmail }: { profile: Profile, userEmail: string }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'security'>('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Form States
  const [role, setRole] = useState(profile.role || 'user')

  async function handleProfileSubmit(formData: FormData) {
    setLoading(true)
    setMessage({ type: '', text: '' })
    
    const result = await updateProfile(formData)
    
    if (result?.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' })
      router.refresh()
    }
    setLoading(false)
  }

  async function handlePasswordSubmit(formData: FormData) {
    setLoading(true)
    setMessage({ type: '', text: '' })

    const result = await updatePassword(formData)

    if (result?.error) {
        setMessage({ type: 'error', text: result.error })
    } else {
        setMessage({ type: 'success', text: 'Senha alterada com sucesso!' })
        // Clear form fields manually if needed, but native form reset is better
        (document.getElementById('passwordForm') as HTMLFormElement)?.reset()
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'profile' 
              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <User className="w-4 h-4" />
          Perfil
        </button>
        
        {role === 'professional' && (
            <button
            onClick={() => setActiveTab('experience')}
            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'experience' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            >
            <Briefcase className="w-4 h-4" />
            Experiência
            </button>
        )}

        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'security' 
              ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Lock className="w-4 h-4" />
          Segurança
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8">
        {/* Messages */}
        {message.text && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                {message.type === 'error' ? '⚠️' : '✅'} {message.text}
            </div>
        )}

        {/* TAB: PERFIL */}
        {activeTab === 'profile' && (
            <form action={handleProfileSubmit} className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                        <input
                        name="fullName"
                        type="text"
                        defaultValue={profile.full_name || ''}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                        type="text"
                        value={userEmail}
                        disabled
                        className="w-full rounded-lg border-gray-300 bg-gray-50 text-gray-500 shadow-sm p-2.5 border cursor-not-allowed"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Conta</label>
                    <div className="relative">
                        <select
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border appearance-none bg-white"
                        >
                            <option value="user">Usuário (Cliente) - Quero contratar</option>
                            <option value="professional">Profissional (Especialista) - Quero trabalhar</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    {role === 'professional' && profile.role !== 'professional' && (
                        <p className="text-xs text-indigo-600 mt-2 font-bold animate-pulse flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            Salve para liberar a aba de Experiência e Validação.
                        </p>
                    )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Salvar Perfil
                    </button>
                </div>
            </form>
        )}

        {/* TAB: EXPERIÊNCIA */}
        {activeTab === 'experience' && (
            <form action={handleProfileSubmit} className="space-y-6 animate-in fade-in duration-300">
                {/* Hidden fields to keep other data consistent if needed, 
                    but updateProfile handles partial updates if we send everything.
                    Here we might need to send fullName and role again to avoid overwriting them with null/default if action expects all fields.
                    Let's check action: it reads all fields. So we should include hidden inputs for fields not in this tab.
                */}
                <input type="hidden" name="fullName" value={profile.full_name || ''} />
                <input type="hidden" name="role" value={role} />

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
                    <h3 className="text-indigo-900 font-bold flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Status da Validação
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-indigo-700">
                                {profile.ai_verified 
                                    ? `Perfil Verificado com Score ${profile.ai_score}/100` 
                                    : 'Seu perfil ainda não foi validado pela nossa IA.'}
                            </p>
                        </div>
                        {!profile.ai_verified ? (
                             <a href="/dashboard/verify" className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
                                Validar Agora
                             </a>
                        ) : (
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                                Verificado ✅
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio / Resumo Profissional</label>
                    <textarea
                    name="bio"
                    rows={4}
                    defaultValue={profile.bio || ''}
                    placeholder="Descreva suas habilidades, formação e o que você oferece..."
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preço por Minuto (R$)</label>
                    <div className="relative rounded-md shadow-sm w-1/3 min-w-[150px]">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">R$</span>
                        </div>
                        <input
                        name="pricePerMinute"
                        type="number"
                        step="0.01"
                        defaultValue={profile.price_per_minute || ''}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                        placeholder="0.00"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Defina quanto vale o seu tempo de consultoria.</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Salvar Experiência
                    </button>
                </div>
            </form>
        )}

        {/* TAB: SEGURANÇA */}
        {activeTab === 'security' && (
            <form id="passwordForm" action={handlePasswordSubmit} className="space-y-6 animate-in fade-in duration-300">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nova Senha</label>
                    <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Nova Senha</label>
                    <input
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                    />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Alterar Senha
                    </button>
                </div>
            </form>
        )}
      </div>
    </div>
  )
}
