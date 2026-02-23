
import Link from "next/link";
import Image from "next/image";
import { Wrench, BookOpen, HeartHandshake, Laptop, Briefcase, ChevronRight, Search } from 'lucide-react'
import NavbarUser from '@/app/components/navbar-user'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image 
                src="/logo.png" 
                alt="Alugue Ajuda" 
                width={180} 
                height={40} 
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/search" className="hover:text-indigo-600 transition-colors">Eu quero Ajuda</Link>
              <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Eu quero Ajudar</Link>
            </div>
          </div>
          
          {/* User Menu / Login Buttons */}
          <NavbarUser />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Consultoria verificada
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Pagamento seguro
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Resolva seu problema com o <span className="text-indigo-600">melhor especialista</span> em minutos.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
            Conecte-se via vídeo ou chat com profissionais validados. Pague apenas pelo tempo que usar. Rápido, seguro e eficiente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/search"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-bold text-center transition-all shadow-lg hover:shadow-xl"
            >
              Eu quero Ajuda
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 text-rose-600 font-bold px-8 py-4 hover:bg-rose-50 rounded-full transition-colors border-2 border-transparent hover:border-rose-100"
            >
              Você quer Ajudar? <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right Content (Image Placeholder) */}
        <div className="flex-1 relative w-full h-[400px] md:h-[500px] hidden md:block">
          {/* Using a placeholder div pattern that resembles the Workana blobs/images */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="relative z-10 w-full h-full bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/50 flex items-center justify-center">
             <div className="text-center p-8">
                <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl shadow-lg">
                    👨‍🔧
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Precisa de ajuda?</h3>
                <p className="text-gray-600 mt-2">Encontre encanadores, professores,<br/>consultores e muito mais.</p>
                
                <div className="mt-8 flex gap-4 justify-center">
                    <div className="w-14 h-14 bg-green-500 rounded-full border-4 border-white shadow-lg -ml-4 flex items-center justify-center text-white text-2xl" title="Educação">📚</div>
                    <div className="w-14 h-14 bg-blue-500 rounded-full border-4 border-white shadow-lg -ml-4 flex items-center justify-center text-white text-2xl" title="Tecnologia">💻</div>
                    <div className="w-14 h-14 bg-orange-500 rounded-full border-4 border-white shadow-lg -ml-4 flex items-center justify-center text-white text-2xl" title="Consertos">🔨</div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Categories Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-indigo-600 tracking-wide uppercase mb-2">Categorias</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Encontre ajuda em qualquer área</h3>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Nossa comunidade de especialistas está pronta para resolver seus problemas, desde tarefas domésticas até consultorias complexas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Categoria 1: Serviços Domésticos */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Serviços Domésticos</h4>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-500" /> Pequenos Reparos</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-500" /> Montagem de Móveis</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-500" /> Limpeza e Organização</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-orange-500" /> Jardinagem</li>
              </ul>
              <Link href="/search?c=servicos" className="text-indigo-600 font-semibold hover:text-indigo-800 text-sm flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Categoria 2: Educação */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Educação e Aulas</h4>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-blue-500" /> Reforço Escolar</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-blue-500" /> Idiomas (Inglês, Espanhol)</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-blue-500" /> Música e Instrumentos</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-blue-500" /> Preparatório Vestibular</li>
              </ul>
              <Link href="/search?c=educacao" className="text-indigo-600 font-semibold hover:text-indigo-800 text-sm flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Categoria 3: Tecnologia */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Laptop className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Tecnologia e Design</h4>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-indigo-500" /> Suporte Técnico</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-indigo-500" /> Design Gráfico</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-indigo-500" /> Marketing Digital</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-indigo-500" /> Edição de Vídeo</li>
              </ul>
              <Link href="/search?c=tecnologia" className="text-indigo-600 font-semibold hover:text-indigo-800 text-sm flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Categoria 4: Saúde */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Saúde e Bem-estar</h4>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-green-500" /> Personal Trainer</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-green-500" /> Nutrição e Dietas</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-green-500" /> Yoga e Meditação</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-green-500" /> Conselhos de Vida</li>
              </ul>
              <Link href="/search?c=saude" className="text-indigo-600 font-semibold hover:text-indigo-800 text-sm flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

             {/* Categoria 5: Negócios */}
             <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Negócios e Consultoria</h4>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gray-500" /> Finanças Pessoais</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gray-500" /> Contabilidade</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gray-500" /> Orientação Jurídica</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gray-500" /> Mentoria de Carreira</li>
              </ul>
              <Link href="/search?c=negocios" className="text-indigo-600 font-semibold hover:text-indigo-800 text-sm flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

             {/* Categoria 6: Outros */}
             <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Não achou o que procura?</h4>
              <p className="text-gray-600 mb-6">
                Temos especialistas em diversas outras áreas prontos para ajudar.
              </p>
              <Link href="/search" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors w-full">
                Buscar Profissionais
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-gray-500 text-sm">© 2026 AlugueAjuda. Todos os direitos reservados.</p>
           <div className="flex gap-6">
             <Link href="/terms" className="text-gray-400 hover:text-indigo-600">Termos</Link>
             <Link href="/privacy" className="text-gray-400 hover:text-indigo-600">Privacidade</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
