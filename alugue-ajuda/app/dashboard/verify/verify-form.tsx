
'use client'

import { useState } from 'react'
import { generateQuiz, submitQuizCorrection, submitIdentityCheck } from './actions'

interface Question {
  id: number
  text: string
  options: string[]
}

export default function VerifyForm() {
  const [step, setStep] = useState<'INITIAL' | 'QUIZ' | 'IDENTITY' | 'RESULT'>('INITIAL')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Data
  const [skill, setSkill] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [extraComments, setExtraComments] = useState('')
  const [result, setResult] = useState<any>(null)
  
  // Identity Data
  const [identityFile, setIdentityFile] = useState<File | null>(null)
  const [identityResult, setIdentityResult] = useState<any>(null)

  // Step 1: Start Quiz
  async function handleStartQuiz(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
        const res = await generateQuiz(skill)
        if (res.error) {
            setError(res.error)
        } else if (res.questions) {
            setQuestions(res.questions)
            setStep('QUIZ')
        }
    } catch (err) {
        setError('Erro ao conectar com o servidor.')
    } finally {
        setLoading(false)
    }
  }

  // Step 2: Submit Quiz
  async function handleSubmitQuiz(e: React.FormEvent) {
      e.preventDefault()
      setLoading(true)
      setError('')

      // Check if all questions are answered
      if (Object.keys(answers).length < questions.length) {
          setError('Por favor, responda todas as perguntas.')
          setLoading(false)
          return
      }

      try {
          const res = await submitQuizCorrection(skill, answers, extraComments)
          if (res.error) {
              setError(res.error)
          } else {
              setResult(res)
              // If quiz approved, go to identity check. Else, show result immediately.
              if (res.approved) {
                  setStep('IDENTITY')
              } else {
                  setStep('RESULT')
              }
          }
      } catch (err) {
          setError('Erro ao enviar respostas.')
      } finally {
          setLoading(false)
      }
  }

  // Step 3: Submit Identity
  async function handleSubmitIdentity(e: React.FormEvent) {
      e.preventDefault()
      if (!identityFile) {
          setError('Por favor, selecione uma foto.')
          return
      }

      setLoading(true)
      setError('')

      const formData = new FormData()
      formData.append('identityFile', identityFile)
      
      // Handle Video Upload (if any)
      const videoInput = (document.getElementById('video-upload') as HTMLInputElement)?.files?.[0]
      if (videoInput) {
          formData.append('presentationVideo', videoInput)
      }

      try {
          const res = await submitIdentityCheck(formData)
          if (res.error) {
              setError(res.error)
          } else {
              setIdentityResult(res)
              setStep('RESULT')
          }
      } catch (err) {
          setError('Erro ao enviar documento.')
      } finally {
          setLoading(false)
      }
  }

  // Render Result
  if (step === 'RESULT') {
    const isQuizApproved = result?.approved
    const isIdentityValid = identityResult?.valid
    const finalApproved = isQuizApproved && (identityResult ? isIdentityValid : false) // Identity is mandatory if we reached that step

    // If failed at quiz, identityResult is null.
    // If passed quiz but failed identity, identityResult is present.

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100 animate-in fade-in zoom-in duration-300">
          <div className={`text-center mb-6`}>
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${finalApproved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {finalApproved ? '🎉' : '⚠️'}
              </div>
              <h3 className={`text-2xl font-bold ${finalApproved ? 'text-green-800' : 'text-red-800'}`}>
                {finalApproved ? 'Cadastro Aprovado!' : 'Validação Não Concluída'}
              </h3>
              <p className="text-gray-500 text-sm mt-1">Confira os detalhes abaixo</p>
          </div>

          <div className="space-y-4 mb-6">
              {/* Quiz Result */}
              <div className={`p-4 rounded-lg border ${isQuizApproved ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <h4 className="font-bold mb-2 flex justify-between">
                      Avaliação Técnica (IA)
                      <span>{result.score}/100</span>
                  </h4>
                  <p className="text-sm text-gray-700">{result.analysis}</p>
              </div>

              {/* Identity Result (only if attempted) */}
              {identityResult && (
                  <div className={`p-4 rounded-lg border ${isIdentityValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <h4 className="font-bold mb-2">Verificação de Identidade</h4>
                      <p className="text-sm text-gray-700">
                          {isIdentityValid 
                              ? 'Documento validado com sucesso. Foto e rosto coincidem.' 
                              : `Falha na validação: ${identityResult.reason}`}
                      </p>
                  </div>
              )}
          </div>
          
          <div className="flex gap-4 justify-center">
              {finalApproved ? (
                <a href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
                  Acessar Dashboard
                </a>
              ) : (
                <button onClick={() => { setStep('INITIAL'); setAnswers({}); setQuestions([]); setIdentityResult(null); }} className="bg-white border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors">
                  Tentar Novamente
                </button>
              )}
          </div>
        </div>
    )
  }

  // Render Identity Check
  if (step === 'IDENTITY') {
      return (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="mb-6 border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-900">Etapa 2: Validação de Identidade</h2>
                  <p className="text-green-600 font-medium text-sm mb-2">✓ Teste técnico aprovado!</p>
                  <p className="text-gray-600 text-sm">
                      Para segurança de todos, precisamos confirmar sua identidade. 
                      Envie uma <strong>foto sua segurando seu documento (RG ou CNH)</strong> ao lado do rosto.
                  </p>
              </div>

              <form onSubmit={handleSubmitIdentity} className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
                      <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setIdentityFile(e.target.files?.[0] || null)}
                          className="hidden" 
                          id="identity-upload"
                      />
                      <label htmlFor="identity-upload" className="cursor-pointer flex flex-col items-center">
                          {identityFile ? (
                              <div className="text-green-600 font-medium">
                                  <div className="text-4xl mb-2">📸</div>
                                  {identityFile.name}
                              </div>
                          ) : (
                              <>
                                  <div className="text-4xl mb-2 text-gray-400">🆔</div>
                                  <span className="text-indigo-600 font-bold">Foto com Documento (Obrigatório)</span>
                                  <span className="text-xs text-gray-400 mt-2">Segure seu RG/CNH ao lado do rosto</span>
                              </>
                          )}
                      </label>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
                      <input 
                          type="file" 
                          accept="video/*"
                          className="hidden" 
                          id="video-upload"
                          onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                  const label = document.getElementById('video-label-text');
                                  if (label) label.innerText = `🎥 ${file.name}`;
                              }
                          }}
                      />
                      <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
                          <div className="text-4xl mb-2 text-gray-400">🎬</div>
                          <span id="video-label-text" className="text-indigo-600 font-bold">Vídeo de Apresentação (Opcional)</span>
                          <span className="text-xs text-gray-400 mt-2">Grave um vídeo curto se apresentando aos clientes</span>
                      </label>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !identityFile}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-70"
                  >
                      {loading ? 'Analisando Documento...' : 'Validar Identidade'}
                  </button>
              </form>
          </div>
      )
  }

  // Render Quiz
  if (step === 'QUIZ') {
      return (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="mb-6 border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-900">Teste de Competência: {skill}</h2>
                  <p className="text-gray-600 text-sm">Responda as perguntas abaixo geradas pela IA para sua área.</p>
              </div>

              <form onSubmit={handleSubmitQuiz} className="space-y-8">
                  {questions.map((q, index) => (
                      <div key={q.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <p className="font-semibold text-gray-800 mb-3">{index + 1}. {q.text}</p>
                          <div className="space-y-2">
                              {q.options.map((opt) => (
                                  <label key={opt} className={`flex items-center gap-3 p-3 rounded cursor-pointer border transition-colors ${answers[q.id] === opt ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-gray-200 hover:bg-gray-100'}`}>
                                      <input 
                                        type="radio" 
                                        name={`q-${q.id}`} 
                                        value={opt}
                                        onChange={() => setAnswers({...answers, [q.id]: opt})}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <span className="text-sm text-gray-700">{opt}</span>
                                  </label>
                              ))}
                          </div>
                      </div>
                  ))}

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Comentários Adicionais (Opcional)</label>
                    <textarea
                      value={extraComments}
                      onChange={(e) => setExtraComments(e.target.value)}
                      rows={3}
                      placeholder="Algo mais que queira acrescentar sobre sua experiência..."
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-70"
                  >
                      {loading ? 'Corrigindo Teste...' : 'Finalizar e Enviar Respostas'}
                  </button>
              </form>
          </div>
      )
  }

  // Render Initial Form
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Validação Profissional</h2>
          <p className="mt-2 text-gray-600">
            Informe sua especialidade para gerarmos um teste técnico personalizado.
          </p>
      </div>

      <form onSubmit={handleStartQuiz} className="space-y-6">
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sua Especialidade Principal</label>
            <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Ex: Encanador, Professor de Inglês, Advogado..."
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
            />
        </div>

        {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded text-sm">
                {error}
            </div>
        )}

        <button
            type="submit"
            disabled={loading || skill.length < 3}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-50"
        >
            {loading ? 'Gerando Perguntas...' : 'Iniciar Teste Técnico'}
        </button>
      </form>
    </div>
  )
}
