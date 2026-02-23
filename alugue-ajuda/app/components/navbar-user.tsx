
'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NavbarUser() {
  const [user, setUser] = useState<any>(null)
  const [profileName, setProfileName] = useState<string | null>(null)
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
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .single()
          
          if (profile?.full_name) {
              setProfileName(profile.full_name)
          }
      }
      setLoading(false)
    }

    getUser()

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .single()
          setProfileName(profile?.full_name || null)
      } else {
          setProfileName(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfileName(null)
    router.refresh()
  }

  if (loading) return <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-full"></div>

  if (user) {
    return (
      <div className="relative">
        <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none group"
        >
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-700 leading-tight group-hover:text-indigo-700">
                    {profileName || user.email?.split('@')[0]}
                </p>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                    Minha Conta
                </p>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-indigo-100 shadow-sm">
                {profileName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </div>
        </button>

        {menuOpen && (
            <>
                <div 
                    className="fixed inset-0 z-10 cursor-default" 
                    onClick={() => setMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs text-gray-400">Logado como</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                    </div>
                    <Link 
                        href="/chat" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                        onClick={() => setMenuOpen(false)}
                    >
                        Mensagens
                    </Link>
                    <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                        onClick={() => setMenuOpen(false)}
                    >
                        Meu Painel
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        Sair
                    </button>
                </div>
            </>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
        Faça login
      </Link>
      <Link
        href="/login"
        className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors"
      >
        Cadastre-se
      </Link>
    </div>
  )
}
