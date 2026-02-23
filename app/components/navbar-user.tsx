
'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NavbarUser() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Check active session
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      
      if (session?.user) {
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('*') // Get all fields including avatar_url
            .eq('id', session.user.id)
            .single()
          
          setProfile(userProfile)
      }
      setLoading(false)
    }

    getUser()

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          setProfile(userProfile)
      } else {
          setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    router.refresh()
  }

  if (loading) return <div className="h-10 w-10 bg-gray-100 animate-pulse rounded-full"></div>

  if (user) {
    const displayName = profile?.full_name || user.email?.split('@')[0]
    const initial = displayName?.charAt(0).toUpperCase()

    return (
      <div className="relative">
        <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none group"
        >
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-indigo-700 leading-tight">
                    {displayName}
                </p>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide group-hover:text-rose-600 transition-colors">
                    Minha Conta
                </p>
            </div>
            
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm group-hover:border-rose-200 transition-colors">
                {profile?.avatar_url ? (
                    <img 
                        src={profile.avatar_url} 
                        alt={displayName} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                        {initial}
                    </div>
                )}
            </div>
        </button>

        {menuOpen && (
            <>
                <div 
                    className="fixed inset-0 z-10 cursor-default" 
                    onClick={() => setMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-200 origin-top-right ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Logado como</p>
                        <p className="text-sm font-bold text-indigo-900 truncate">{user.email}</p>
                    </div>
                    
                    <div className="py-1">
                        <Link 
                            href="/chat" 
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xs">💬</span>
                            Mensagens
                        </Link>
                        <Link 
                            href="/dashboard" 
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xs">⚙️</span>
                            Meu Painel
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                            onClick={handleSignOut}
                            className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                        >
                            <span className="w-5 h-5 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full text-xs">🚪</span>
                            Sair da Conta
                        </button>
                    </div>
                </div>
            </>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 whitespace-nowrap">
        Entrar
      </Link>
      <Link
        href="/login"
        className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap"
      >
        Cadastrar
      </Link>
    </div>
  )
}
