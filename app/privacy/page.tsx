
import Link from 'next/link'

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Política de Privacidade e Proteção de Dados</h1>
        <p className="text-gray-500 mb-8">Última atualização: 22 de Fevereiro de 2026</p>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8 text-gray-700 leading-relaxed">
          <p>
            O Alugue Ajuda implementa em sua operação, as orientações, normas, controles e ações estabelecidas pelas legislações de proteção de dados onde atua, em especial a General Data Protection Regulation - GDPR da União Europeia e a Lei Geral de Proteção de Dados - LGPD do Brasil. Esta política de privacidade e proteção de dados explicará como nossa organização usa os dados pessoais que coletamos de você quando você usa nossa plataforma e aplicações.
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Que dados coletamos?</h2>
            <p className="mb-4">Coletamos informações no momento em que você se registra em nosso site, faz um pagamento, preenche um formulário ou navega no site.</p>
            <p className="mb-4">O Alugue Ajuda coleta os seguintes dados:</p>
            
            <h3 className="font-bold text-gray-900 mt-4 mb-2">1.1. Dados que você nos fornece:</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Informações de contato e cadastro:</strong> nome, endereço de e-mail, endereço de correspondência, número de telefone, nome de usuário da conta, senha;</li>
              <li><strong>Identificação e dados demográficos:</strong> CPF, ID, nacionalidade, data de nascimento, dados necessários para processar pagamentos e saques e somente para isso.</li>
              <li><strong>Informações transacionais:</strong> informações de cartão de crédito, dados de conta bancária, outras informações de pagamento (por exemplo, Mercado Pago, Paypal, Payoneer, Stripe), histórico de pagamentos e histórico de saque;</li>
              <li><strong>Conteúdo gerado pelos usuários:</strong> fotos, vídeos, áudios e outra informação que você venha nos fornecer, por meio do uso da plataforma Alugue Ajuda;</li>
              <li><strong>Pesquisa e feedback:</strong> Comentários fornecidos por você, enquanto usuário da plataforma, por meio de formulários online, e-mail e/ou pesquisas;</li>
            </ul>

            <h3 className="font-bold text-gray-900 mt-4 mb-2">1.2. Dados que coletamos automaticamente de você e/ou do seu dispositivo:</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Informações de seu dispositivo e identificadores:</strong> endereço de IP, tipo de navegador e linguagem, sistema operacional, tipo de plataforma, tipo de dispositivo e identificadores de propaganda e de aplicativo.</li>
              <li><strong>Conexão e uso:</strong> nomes de domínio, histórico de navegação, anúncios visualizados, formulários ou campos de formulários que você completar parcial ou integralmente, logs e outras informações similares.</li>
              <li><strong>Geolocalização:</strong> Cidade, Estado, País, associado ao seu endereço de IP ou derivados de sua triangulação wi-fi. Solicitamos sua permissão antes de utilizar sua localização precisa com base na funcionalidade GPS do seu dispositivo.</li>
            </ul>

            <h3 className="font-bold text-gray-900 mt-4 mb-2">1.3. Informações que coletamos de terceiros</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Informações de fontes públicas e comerciais:</strong> informações de contato e demográficas, informações sobre indivíduos usando um mesmo dispositivo.</li>
              <li><strong>Informações de mídia social:</strong> interações conosco por meio de um serviço de mídia social, ou fazer login usando suas credenciais de sua mídia social, poderemos ter acesso a sua informação dessa rede social tais como seu nome e endereço de e-mail;</li>
            </ul>

            <h3 className="font-bold text-gray-900 mt-4 mb-2">1.4. Informações adicionais que coletamos somente para fins comerciais</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Informações comerciais de contato:</strong> nome da empresa, seu nome, endereço de e-mail, cargo ocupado;</li>
              <li><strong>Informações de Due Diligence:</strong> ID, às vezes rede social, informação de contato, nacionalidade, posição ocupada, idade, sexo, data de nascimento, país de residência.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Como coletamos seus dados?</h2>
            <p className="mb-4">Você fornece diretamente ao Alugue Ajuda a maioria dos dados que coletamos. Coletamos dados e processamos dados quando você:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Registra-se em nossa plataforma ou faz o pagamento e uso de um de nossos serviços;</li>
              <li>Preenche voluntariamente uma pesquisa ou fornece informações e feedback por e-mail;</li>
              <li>Utiliza ou visualiza a nossa plataforma através dos cookies do seu navegador;</li>
            </ul>
            <p className="mb-4">O Alugue Ajuda também pode receber seus dados indiretamente das seguintes fontes:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Empresas que forneçam serviços de analítica;</li>
              <li>Empresas que forneçam serviços de marketing;</li>
              <li>Bases de dados públicas;</li>
              <li>Redes de mídia sociais;</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Como usamos seus dados?</h2>
            <p className="mb-4">Qualquer uma das informações que coletamos de você pode ser usada em uma das seguintes formas:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Para personalizar sua experiência:</strong> (suas informações nos ajudam a responder melhor às suas necessidades individuais);</li>
              <li><strong>Para melhorar nosso site:</strong> continuamos nos esforçando para melhorar as ofertas de nosso site, com base nas informações e feedbacks que recebemos de você;</li>
              <li><strong>Para melhorar nosso atendimento ao cliente:</strong> suas informações nos ajudam a responder com maior eficácia às suas solicitações de atendimento ao cliente e necessidades de suporte;</li>
              <li><strong>Para processar transações:</strong> Suas informações, sejam públicas ou privadas, não serão vendidas, trocadas, transferidas ou dadas a qualquer outra empresa por qualquer motivo que seja sem seu consentimento, a não ser com o propósito expresso de entrega de produto adquirido ou serviço solicitado;</li>
              <li><strong>Para administrar um concurso, promoção, pesquisa ou outra característica do site;</strong></li>
              <li><strong>Para enviar e-mails periódicos:</strong> O endereço de e-mail que você fornecer para o processamento de pagamentos pode ser usado para enviar para você informações ou atualizações com relação às suas solicitações e para recebimento ocasional de notícias institucionais, atualizações e informações relacionadas ao produto ou serviço adquirido, etc.</li>
            </ul>
            <p className="text-sm italic">Observação: Se, a qualquer momento, você desejar cancelar sua inscrição de recebimento de futuros e-mails, nós incluímos instruções detalhadas de cancelamento de inscrição ao final de cada e-mail.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Como armazenamos seus dados?</h2>
            <p className="mb-4">Nós implementamos uma variedade de medidas de segurança para manter a segurança de suas informações pessoais quando você envia um pagamento, faz login, envia ou acessa suas informações pessoais.</p>
            <p className="mb-4">Oferecemos o uso de um servidor seguro. Todas as informações sensíveis/de crédito fornecido são transmitidas via tecnologia de Secure Socket Layer (SSL) e, então, encriptada em nossa Base de Dados para acesso apenas de indivíduos autorizados, com direitos especiais de acesso a nossos sistemas, a quem a manutenção da confidencialidade das informações é obrigatória.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Marketing</h2>
            <p className="mb-4">Desejamos enviar a você informações sobre serviços nossos que achamos que você pode gostar.</p>
            <p className="mb-4">Se você concordou em receber marketing, você sempre pode optar por sair em uma data posterior.</p>
            <p className="mb-4">Você tem o direito de, a qualquer momento, impedir que o Alugue Ajuda o contate para fins de marketing.</p>
            <p className="mb-4">Se você não deseja mais ser contatado para fins de marketing, altere as suas configurações de notificação por e-mail em sua conta na plataforma.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Quais são os seus direitos de proteção de dados?</h2>
            <p className="mb-4">O Alugue Ajuda gostaria de ter certeza de que você está totalmente ciente de todos os seus direitos de proteção de dados. Cada usuário tem direito ao seguinte:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>O direito de acesso:</strong> você tem o direito de solicitar ao Alugue Ajuda cópias de seus dados pessoais. Podemos cobrar uma pequena taxa por este serviço.</li>
              <li><strong>O direito de retificação:</strong> você tem o direito de solicitar que o Alugue Ajuda corrija qualquer informação que você acredite estar incorreta. Você também tem o direito de solicitar que o Alugue Ajuda preencha as informações que você acredita estar incompletas.</li>
              <li><strong>O direito de apagar:</strong> você tem o direito de solicitar que o Alugue Ajuda apague seus dados pessoais, sob certas condições.</li>
              <li><strong>O direito de restringir o processamento:</strong> você tem o direito de solicitar que o Alugue Ajuda restrinja o processamento de seus dados pessoais, sob certas condições.</li>
              <li><strong>O direito de se opor ao processamento:</strong> você tem o direito de se opor ao processamento de seus dados pessoais pelo Alugue Ajuda, sob certas condições.</li>
              <li><strong>O direito à portabilidade dos dados:</strong> você tem o direito de solicitar que o Alugue Ajuda transfira os dados que coletamos para outra organização, ou diretamente para você, sob certas condições.</li>
              <li><strong>Direito de não ser submetido a decisões automatizadas:</strong> o titular dos dados tem direito a solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais que afetem seus interesses, incluídas as decisões destinadas a definir o seu perfil pessoal, profissional, de consumo e de crédito ou os aspectos de sua personalidade.</li>
            </ul>
            <p className="mb-4">Se você efetuar uma solicitação, temos um mês para responder. Se você deseja exercer algum desses direitos, entre em contato conosco pelo nosso e-mail: privacidade@alugueajuda.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. O que são cookies?</h2>
            <p className="mb-4">Cookies são pequenos arquivos que um site ou seu provedor de serviço transfere para o disco rígido do seu computador através de seu navegador Web (se você permitir). Esses arquivos permitem que os sites ou sistemas de prestadores de serviços reconheçam o seu browser e capturem e lembrem de certas informações.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Como usamos cookies?</h2>
            <p className="mb-4">Usamos cookies para nos ajudar a lembrar e processar seus pagamentos, entender e guardar as suas preferências para futuras visitas e compilar dados agregados sobre o tráfego e a interação no site, para podermos oferecer um site e ferramentas melhores no futuro. Poderemos contratar prestadores de serviços de terceiros para nos ajudar a compreender melhor os nossos visitantes do site. Esses prestadores de serviços não estão autorizados a usar as informações coletadas em nosso nome, exceto para nos ajudar a conduzir e melhorar o nosso negócio.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Que tipos de cookies usamos?</h2>
            <p className="mb-4">Existem vários tipos diferentes de cookies, no entanto, nosso site usa:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Funcionalidade:</strong> usamos cookies para que possamos reconhecê-lo em nossa plataforma e lembrar suas preferências previamente selecionadas. Isso pode incluir o idioma de sua preferência e o local em que está. Uma combinação de cookies primários e de terceiros é usada.</li>
              <li><strong>Publicidade:</strong> Utilizamos cookies para recolher informações sobre a sua visita à nossa plataforma, o conteúdo que visualizou, os links que seguiu e informações sobre os seus dados pessoais, navegador, dispositivo e endereço IP.</li>
            </ul>
            <p className="mb-4">O Alugue Ajuda às vezes compartilha alguns aspectos limitados desses dados com terceiros para fins publicitários. Também podemos compartilhar dados online coletados por meio de cookies com nossos parceiros de publicidade. Isso significa que quando você visita outro site, pode ser exibida publicidade com base em seus padrões de navegação em nosso site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Como gerenciar seus cookies</h2>
            <p className="mb-4">Você pode configurar seu navegador para não aceitar cookies, e o site acima informa como remover cookies de seu navegador. No entanto, em alguns casos, alguns dos recursos do nosso site podem não funcionar como resultado.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Políticas de privacidade de outros sites</h2>
            <p className="mb-4">Ocasionalmente, a nosso critério, podemos incluir ou oferecer produtos ou serviços de terceiros em nosso site. Esses sites de terceiros têm políticas de privacidade separadas e independentes. Não temos, portanto, qualquer responsabilidade ou obrigação com relação ao conteúdo e atividades desses sites vinculados. No entanto, buscamos proteger a integridade do nosso site e agradecemos qualquer feedback acerca desses sites.</p>
            <p className="mb-4">Nossa política de privacidade e proteção de dados se aplica apenas ao nosso site, portanto, se você clicar em um link para outro site, deverá ler a política de privacidade.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">12. Mudanças em nossa política de privacidade</h2>
            <p className="mb-4">Se decidirmos modificar nossas políticas de privacidade, publicaremos as alterações realizadas nesta página e/ou atualizaremos a data de modificação da Política de Privacidade e Proteção de Dados.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">13. Como entrar em contato conosco</h2>
            <p className="mb-4">Se você tiver quaisquer perguntas com relação à nossa política de privacidade e proteção de dados, os dados que mantemos sobre você, ou se gostaria de exercer um de seus direitos de proteção de dados, não hesite em nos contatar.</p>
            <p className="mb-4">Você pode entrar em contato com o nosso Data Protection Officer (“DPO”) enviando um e-mail para: privacidade@alugueajuda.com.</p>
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
