
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Star, CheckCircle, Filter } from 'lucide-react'
import ProfessionalCardActions from '@/components/professional-card-actions'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; c?: string }
}) {
  const supabase = await createClient()
  const query = searchParams.q || ''
  const category = searchParams.c || ''

  // Base query
  let dbQuery = supabase
    .from('profiles')
    .select('*')
    .eq('role', 'professional')
    .eq('ai_verified', true)

  // Apply filters (simple text search for now)
  if (query) {
    dbQuery = dbQuery.or(`full_name.ilike.%${query}%,bio.ilike.%${query}%`)
  }

  // Category filter (mapping category slugs to keywords for bio search)
  // This is a temporary solution until we have a proper 'specialty' column
  if (category) {
      const categoryKeywords: Record<string, string> = {
          'servicos': 'limpeza,reparos,montagem,jardinagem,conserto,casa',
          'educacao': 'aula,professor,inglês,espanhol,música,matemática,ensino',
          'tecnologia': 'programação,design,marketing,computador,site,app',
          'saude': 'treino,nutrição,yoga,meditação,terapia,saúde',
          'negocios': 'finanças,contabilidade,jurídico,carreira,mentoria,business'
      }
      
      const keywords = categoryKeywords[category]
      if (keywords) {
          // Construct an OR filter for keywords
          const orFilter = keywords.split(',').map(k => `bio.ilike.%${k}%`).join(',')
          dbQuery = dbQuery.or(orFilter)
      }
  }

  const { data: professionals, error } = await dbQuery

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar Simplificada */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Link href="/" className="hover:opacity-80 transition-opacity">
               <Image 
                 src="/logo.png" 
                 alt="Alugue Ajuda" 
                 width={140} 
                 height={32} 
                 className="h-8 w-auto"
               />
             </Link>
             <Link href="/" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors hidden sm:block">
               ← Voltar para Home
             </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              Entrar
            </Link>
             <Link href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              Sou Profissional
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Search Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Encontre o especialista ideal</h1>
          
          <form className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                name="q"
                defaultValue={query}
                type="text" 
                placeholder="Busque por nome, habilidade ou serviço (ex: encanador, professor de inglês...)" 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
              Buscar
            </button>
          </form>

          {category && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Filter className="w-4 h-4" />
                  Filtro ativo: <span className="font-semibold capitalize">{category}</span>
                  <Link href={query ? `/search?q=${encodeURIComponent(query)}` : '/search'} className="text-indigo-600 hover:underline ml-2 text-xs">(Limpar)</Link>
              </div>
          )}
        </div>

        {/* Results Grid */}
        {error ? (
           <div className="bg-red-50 p-4 rounded-lg text-red-600">Erro ao carregar profissionais. Tente novamente.</div>
        ) : (
            <>
                <p className="mb-6 text-gray-500 text-sm">
                    {professionals?.length === 0 ? 'Nenhum profissional encontrado.' : `${professionals?.length} profissionais encontrados.`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {professionals?.map((pro) => (
                        <div key={pro.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-xl font-bold text-gray-500">
                                            {pro.avatar_url ? (
                                                <img src={pro.avatar_url} alt={pro.full_name} className="w-full h-full object-cover" />
                                            ) : (
                                                pro.full_name?.charAt(0).toUpperCase() || '?'
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{pro.full_name}</h3>
                                            <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full w-fit mt-1">
                                                <CheckCircle className="w-3 h-3" /> Verificado pela IA
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>{pro.ai_score || 'N/A'}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">Score</span>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 min-h-[60px]">
                                    {pro.bio || 'Sem descrição disponível.'}
                                </p>

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">Online agora</span>
                                    {/* Placeholder tags based on bio analysis could go here */}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Preço</p>
                                        <p className="text-lg font-bold text-indigo-700">
                                            R$ {pro.price_per_minute?.toFixed(2)} <span className="text-sm font-normal text-gray-500">/ min</span>
                                        </p>
                                    </div>
                                </div>
                                <ProfessionalCardActions professional={pro} />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-gray-500 text-sm">© 2026 AlugueAjuda. Todos os direitos reservados.</p>
           <div className="flex gap-6">
             <Link href="/terms" className="text-gray-400 hover:text-indigo-600">Termos</Link>
             <Link href="/privacy" className="text-gray-400 hover:text-indigo-600">Privacidade</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}
