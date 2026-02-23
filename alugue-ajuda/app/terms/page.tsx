
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar Simplificada */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-700 tracking-tight">
            alugue<span className="text-gray-900">ajuda</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              Entrar
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Termos de Uso</h1>
        <p className="text-gray-500 mb-8">Última atualização: 22 de Fevereiro de 2026</p>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Propriedade Intelectual</h2>
            <p className="mb-4">
              O Alugue Ajuda respeita a propriedade intelectual alheia, e espera que os Usuários façam o mesmo. Se você considera de boa fé que algum dos materiais proporcionados na Plataforma Alugue Ajuda ou em relação com ele violam seus direitos de autor ou outros direitos de propriedade intelectual, envie a informação que figura a seguir à nossa equipe de suporte através do e-mail: legal@alugueajuda.com, com a identificação do direito de propriedade intelectual que presuntamente se tem violado. Deverão incluir-se todos os números de registro pertinentes, ou uma declaração sobre a titularidade da obra.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Uma declaração que identifique especificamente a localização do material que presuntamente viola seus direitos, com detalhes suficientes para que o Alugue Ajuda possa encontrá-lo na Plataforma. Tenha em conta que não é suficiente proporcionar simplesmente uma URL de nível superior.</li>
                <li>Seu nome, endereço, número de telefone e endereço de correio eletrônico.</li>
                <li>Uma declaração realizada por você indicando que considera de boa fé que o uso do material que presuntamente viola seus direitos não está autorizado pelo proprietário dos direitos, seus agentes ou a lei.</li>
                <li>Uma declaração realizada por você, indicando que a informação incluída em sua notificação é exata, e que você é o proprietário dos direitos de autor ou está autorizado a atuar em nome do proprietário dos direitos de autor.</li>
                <li>Uma assinatura física ou eletrônica do proprietário dos direitos de autor ou da pessoa autorizada a atuar em nome do proprietário dos direitos de autor.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informação Confidencial</h2>
            <p className="mb-4">
              Você reconhece que a Informação Confidencial (segundo se define a seguir) é um ativo valioso, especial e único do Alugue Ajuda e aceita que não divulgará, transferirá, utilizará, nem tentará induzir a outros a divulgar, transferir ou utilizar, Informação Confidencial e não utilizará dita informação para nenhum outro fim que o previsto nos presentes Termos, exceto no caso de que dita informação seja requerida em virtude de uma lei, decreto ou regulamentação aplicável, ou no caso de que receba um pedido efetuado em forma legal por uma autoridade ou um tribunal que lhe requeira toda ou parte de dita informação.
            </p>
            <p className="mb-4">
               Neste suposto, você deverá notificar imediatamente ao Alugue Ajuda acerca da existência, termos e circunstâncias relativas a dito requerimento a menos que isto implique violação dos termos do requerimento em questão. Além disso, você deverá notificar imediatamente ao Alugue Ajuda por escrito de qualquer circunstância que pudesse constituir uma divulgação, transferência ou uso não autorizados da Informação Confidencial. Você deverá realizar todo o possível para proteger a Informação Confidencial da divulgação, transferência ou uso não autorizados. Você deverá devolver todos os originais e qualquer cópia dos materiais que contenham Informação Confidencial ao Alugue Ajuda no momento de deixar de utilizar a Plataforma por qualquer motivo que fosse.
            </p>
            <p className="mb-4">
               O termo “Informação Confidencial” se referirá a todos os segredos comerciais e informação confidencial e de propriedade exclusiva do Alugue Ajuda e a toda outra informação e dados do Alugue Ajuda que em geral não sejam de conhecimento do público ou de outros terceiros que pudessem obter um valor, econômico ou de outro tipo, de seu uso ou divulgação. Considerar-se-á que a Informação Confidencial inclui dados técnicos, know-how, estudos, planos de produtos, produtos, serviços, clientes, mercados, software, desenvolvimentos, invenções, processos, fórmulas, tecnologia, desenhos, engenharia, informação de configuração de hardware, marketing, finanças ou outra informação comercial divulgada diretamente ou indiretamente por escrito, de forma oral ou através de desenhos ou observações.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Isenção e Limitação de Responsabilidade</h2>
            
            <h3 className="font-bold text-gray-900 mt-4 mb-2">a. Isenção de Responsabilidade</h3>
            <p className="mb-4">
              Os produtos e serviços adquiridos ou oferecidos através da Plataforma Alugue Ajuda (incluídos, a título enunciativo e não taxativo, os Serviços de Consultoria) são oferecidos “NO ESTADO EM QUE SE ENCONTRAM” e sem nenhuma garantia de nenhum tipo por parte do Alugue Ajuda ou terceiros, a menos que, com respeito a ditos terceiros unicamente, se haja brindado expressamente e inequivocamente por escrito para um produto específico.
            </p>
            <p className="mb-4 uppercase text-sm font-semibold">
              Os serviços do Alugue Ajuda estão sujeitos a disponibilidade. O uso que faça o usuário dos serviços o realiza baixo seu próprio risco. Na máxima medida permitida pela legislação aplicável, os serviços são oferecidos sem garantias de nenhum tipo. O Alugue Ajuda não garante a qualidade, idoneidade, segurança nem habilidade dos Profissionais. O usuário aceita que o uso dos serviços corre exclusivamente a seu risco.
            </p>

            <h3 className="font-bold text-gray-900 mt-4 mb-2">b. Limitação de Responsabilidade</h3>
            <p className="mb-4 uppercase text-sm font-semibold">
              O Alugue Ajuda não será responsável por danos indiretos, incidentais, especiais, exemplares, punitivos ou consequenciais, entre os que se incluem a perda de ingressos, a perda de dados, lesões pessoais ou danos à propriedade, relacionados com o uso dos serviços ou como consequência deste uso.
            </p>
            <p className="mb-4">
               O Alugue Ajuda não será responsável pelo atraso ou o incumprimento que resulte de causas que excedam o controle razoável da plataforma. O Usuário Cliente reconhece que é possível que os Profissionais que oferecem serviços não contam com licenças ou autorizações profissionais específicas, cabendo ao Cliente a verificação.
            </p>
            <p className="mb-4">
               Em nenhum caso a responsabilidade total do Alugue Ajuda frente a você em relação com os serviços por todos os danos, perdas e causas de ação excederá os cargos totais pagos ou recebidos por você através do Alugue Ajuda durante os seis (6) meses anteriores ao momento em que se apresentou a reclamação.
            </p>

            <h3 className="font-bold text-gray-900 mt-4 mb-2">c. Indenização</h3>
            <p className="mb-4">
              Você aceita liberar de responsabilidade e manter indemne ao Alugue Ajuda e seus executivos, diretores, empregados e agentes de qualquer reclamação, demanda, perda, responsabilidade e despesa (incluídos honorários de advogados) que surjam ou se relacionem com: (i) seu uso da Plataforma; (ii) seu incumprimento ou violação destes Termos; (iii) o uso de seu Conteúdo pelo Alugue Ajuda; ou (iv) sua violação de direitos de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Disputas entre Profissionais e Clientes</h2>
            <p className="mb-4">
              As interações entre Clientes e Profissionais, incluído o pagamento e a entrega de serviços, realizam-se exclusivamente entre você e ditos indivíduos. Você deve levar a cabo as investigações que considere necessárias antes de proceder com qualquer transação. O Cliente e/ou Profissional aceita que o Alugue Ajuda não será responsável por perdas e/ou danos de nenhum tipo que surjam como consequência de ditas comunicações.
            </p>
            <p className="mb-4">
              Se houver alguma disputa entre Clientes e Profissionais, você aceita que o Alugue Ajuda, a sua exclusiva discrição, poderá determinar o montante dos Cargos e a quem remiti-los, ficando entendido que o Alugue Ajuda em nenhum caso terá a obrigação de se ver envolvida em ditas disputas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Disputas com o Alugue Ajuda</h2>
            <h3 className="font-bold text-gray-900 mt-4 mb-2">a. Resolução de Conflitos</h3>
            <p className="mb-4">
              Você aceita que qualquer disputa, reclamação ou controvérsia que surja destes Termos se resolverá primeiramente mediante negociação informal e, caso não haja acordo, mediante arbitragem ou via judicial conforme a legislação brasileira.
            </p>
            
            <h3 className="font-bold text-gray-900 mt-4 mb-2">b. Negociação Informal</h3>
            <p className="mb-4">
              Para acelerar a resolução e reduzir o custo de qualquer Disputa, você aceita negociar de maneira informal durante pelo menos trinta (30) dias antes de iniciar qualquer procedimento judicial. Estas negociações informais começarão mediante notificação escrita para o e-mail legal@alugueajuda.com.
            </p>

            <h3 className="font-bold text-gray-900 mt-4 mb-2">c. Foro</h3>
            <p className="mb-4">
              Fica eleito o Foro da Comarca de São Paulo, Estado de São Paulo, Brasil, para dirimir quaisquer dúvidas ou controvérsias oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Outras Disposições</h2>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Legislação Aplicável:</strong> Estes Termos se regerão e interpretarão de conformidade com as leis da República Federativa do Brasil.</li>
              <li><strong>Notificações:</strong> O Alugue Ajuda poderá enviar notificações mediante aviso geral na Plataforma ou por e-mail.</li>
              <li><strong>Idioma:</strong> A versão em idioma português destes Termos prevalecerá em relação a quaisquer traduções.</li>
              <li><strong>Cessão:</strong> Você não pode ceder estes Termos sem a aprovação prévia por escrito do Alugue Ajuda.</li>
              <li><strong>Independência:</strong> Não existe nenhum tipo de empresa conjunta, associação, relação de emprego ou relação de agência entre você e o Alugue Ajuda.</li>
            </ul>
            <p className="mt-8 font-bold text-center border-t pt-8">
              AO CLICAR EM “ACEITO” OU UTILIZAR A PLATAFORMA, VOCÊ RECONHECE EXPRESSAMENTE QUE LEU, COMPREENDEU E ACEITA ESTES TERMOS.
            </p>
          </section>

        </div>
      </main>

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
  )
}
