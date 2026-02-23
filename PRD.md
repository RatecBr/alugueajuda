# Product Requirements Document (PRD) - AlugueAjuda

## 1. Visão Geral do Produto
O **AlugueAjuda** é uma plataforma marketplace que conecta pessoas que precisam de ajuda rápida (clientes) com especialistas qualificados (profissionais) para consultorias ou serviços breves, pagos por tempo ou tarefa.

**Proposta de Valor:** "Resolva seu problema com o melhor especialista em minutos."

## 2. Personas

### Cliente (Quem precisa de ajuda)
- **Objetivo:** Resolver um problema específico (conserto, dúvida técnica, aula rápida) sem burocracia.
- **Dores:** Dificuldade de achar profissionais confiáveis; medo de pagar adiantado sem garantia; demora no atendimento.

### Profissional (Quem oferece ajuda)
- **Objetivo:** Monetizar seu tempo ocioso ou conhecimento específico.
- **Dores:** Dificuldade de captar clientes; problemas para receber pagamento; gestão de agenda complexa.

## 3. Funcionalidades Principais (MVP)

### 3.1 Autenticação e Perfil
- [x] Login/Cadastro com Email e Senha.
- [x] Login Social com Google (Prioritário).
- [x] Criação de Perfil Básico (Nome, Foto).
- [x] Definição de Tipo de Conta (Cliente ou Profissional).
- [x] Configuração de Preço e Especialidade (para Profissionais).
- [x] Exibição instantânea de Avatar após login.

### 3.2 Busca e Descoberta
- [x] Página de Busca (`/search`) com listagem de profissionais.
- [x] Filtros por Categoria (Tecnologia, Saúde, Educação, etc.).
- [x] Visualização de card do profissional com foto, nome, especialidade e preço.

### 3.3 Contratação e Pagamento
- [x] Botão "Contratar" direto no card do profissional.
- [x] Integração com Stripe para pagamentos seguros.
- [x] Fluxo de Checkout transparente.
- [x] Webhook para liberação automática do serviço após pagamento.

### 3.4 Entrega do Serviço (Chat)
- [x] Sistema de Chat interno (`/chat`).
- [x] Criação automática de sala após pagamento confirmado.
- [x] Troca de mensagens em tempo real.
- [x] Histórico de conversas.

### 3.5 Painel de Controle
- [x] Dashboard (`/dashboard`) para gestão de conta.
- [x] Edição de dados pessoais e Avatar.
- [x] Logout seguro.

## 4. Requisitos Não-Funcionais

- **Responsividade:** O site deve funcionar perfeitamente em Desktop e Mobile (Navbar responsiva).
- **Performance:** Carregamento rápido das páginas (Next.js SSR/SSG).
- **Segurança:** Dados sensíveis protegidos; pagamentos processados por gateway certificado (Stripe).
- **SEO:** Otimização para motores de busca nas páginas públicas.

## 5. Roadmap Futuro (V2.0)

- [ ] **Videochamada:** Integração com Daily.co ou similar para atendimento por vídeo.
- [ ] **Avaliações:** Sistema de estrelas e comentários após o atendimento.
- [ ] **Agenda:** Integração com Google Calendar para agendamento futuro.
- [ ] **Carteira:** Sistema de saldo para o profissional solicitar saque.
- [ ] **Notificações:** Email e Push notifications para novas mensagens/vendas.

## 6. Métricas de Sucesso (KPIs)
- Número de cadastros (Clientes vs Profissionais).
- Taxa de conversão (Visualização de Perfil -> Contratação).
- Volume total transacionado (GMV).
- Retenção (Usuários que voltam a contratar).
