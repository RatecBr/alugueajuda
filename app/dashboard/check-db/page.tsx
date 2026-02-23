
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CheckDbPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Check Profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 2. Check AI Interviews
  const { data: interviews, error: interviewsError } = await supabase
    .from('ai_interviews')
    .select('*')
    .eq('professional_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Diagnóstico do Banco de Dados</h1>
      
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Usuário Atual</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4 flex justify-between">
          <span>Tabela: Profiles</span>
          <span className={profileError ? "text-red-500" : "text-green-500"}>
            {profileError ? "Erro" : "Sucesso"}
          </span>
        </h2>
        {profileError ? (
          <div className="text-red-600">
            <p>Erro ao buscar perfil: {profileError.message}</p>
            <p className="text-sm mt-2 text-gray-600">
              Dica: Verifique se a tabela 'profiles' foi criada no Supabase e se o Trigger de criação de usuário está ativo.
            </p>
          </div>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4 flex justify-between">
          <span>Tabela: AI Interviews</span>
          <span className={interviewsError ? "text-red-500" : "text-green-500"}>
            {interviewsError ? "Erro" : "Sucesso"}
          </span>
        </h2>
        {interviewsError ? (
           <div className="text-red-600">
             <p>Erro ao buscar entrevistas: {interviewsError.message}</p>
             <p className="text-sm mt-2 text-gray-600">
               Dica: Verifique se a tabela 'ai_interviews' foi criada no Supabase.
             </p>
           </div>
        ) : (
          <div className="space-y-4">
            {interviews?.length === 0 ? (
              <p>Nenhuma entrevista encontrada.</p>
            ) : (
              interviews?.map((interview) => (
                <div key={interview.id} className="border p-4 rounded">
                  <p><strong>ID:</strong> {interview.id}</p>
                  <p><strong>Score:</strong> {interview.ai_score}</p>
                  <p><strong>Aprovado:</strong> {interview.approved ? 'Sim' : 'Não'}</p>
                  <p><strong>Data:</strong> {new Date(interview.created_at).toLocaleString()}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-600">Ver JSON completo</summary>
                    <pre className="bg-gray-50 p-2 mt-2 text-xs overflow-auto">
                      {JSON.stringify(interview, null, 2)}
                    </pre>
                  </details>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
