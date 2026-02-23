# Arquitetura do Sistema - AlugueAjuda

Este documento descreve a arquitetura técnica, stack tecnológica e estrutura do projeto **AlugueAjuda**.

## 1. Stack Tecnológica

### Frontend & Framework
- **Next.js 15 (App Router)**: Framework React principal para renderização server-side e estática.
- **React**: Biblioteca de UI.
- **Tailwind CSS**: Framework de estilização utilitária.
- **Lucide React**: Biblioteca de ícones.
- **TypeScript**: Linguagem base para tipagem estática e segurança.

### Backend & Banco de Dados (BaaS)
- **Supabase**: Plataforma Backend-as-a-Service.
  - **Auth**: Gerenciamento de usuários (Email/Senha, Google OAuth).
  - **PostgreSQL**: Banco de dados relacional.
  - **Storage**: Armazenamento de arquivos (avatares, documentos).
  - **Realtime**: Atualizações em tempo real para o Chat.

### Pagamentos
- **Stripe**: Processamento de pagamentos.
  - **Checkout Session**: Fluxo de pagamento hospedado.
  - **Webhooks**: Confirmação assíncrona de pagamentos para liberar o serviço.

### Deploy & Infraestrutura
- **Vercel**: Hospedagem do Frontend e Serverless Functions.
- **GitHub**: Controle de versão e CI/CD.

## 2. Estrutura de Pastas

```
/
├── app/                  # Rotas e Páginas (App Router)
│   ├── api/              # API Routes (Webhooks, etc)
│   ├── auth/             # Rotas de callback de autenticação
│   ├── chat/             # Página e lógica de chat
│   ├── components/       # Componentes React reutilizáveis
│   ├── dashboard/        # Painel do usuário (perfil, sessões)
│   ├── login/            # Página de login/cadastro
│   ├── search/           # Página de busca de profissionais
│   ├── layout.tsx        # Layout raiz
│   └── page.tsx          # Landing Page (Home)
├── lib/                  # Bibliotecas e utilitários
│   ├── stripe/           # Configuração do Stripe
│   ├── supabase/         # Clientes Supabase (Client/Server)
│   └── utils.ts          # Funções auxiliares (cn, formatters)
├── public/               # Arquivos estáticos (imagens, ícones)
├── types/                # Definições de tipos TypeScript globais
└── middleware.ts         # Middleware de proteção de rotas e sessão
```

## 3. Fluxos de Dados Principais

### Autenticação
1. Usuário acessa `/login`.
2. Supabase Auth gerencia o login (Email ou Google).
3. Middleware protege rotas privadas (`/dashboard`, `/chat`).
4. Sessão é persistida em Cookies seguros.
5. Navbar detecta sessão automaticamente e exibe Avatar do usuário.

### Contratação de Serviço
1. Cliente busca profissional em `/search` (Supabase Query).
2. Cliente clica em "Contratar".
3. Backend cria uma Sessão de Checkout no Stripe.
4. Cliente paga no Stripe.
5. Webhook do Stripe recebe `checkout.session.completed`.
6. Webhook atualiza banco de dados:
   - Cria registro em `bookings`.
   - Cria registro em `conversations`.
7. Cliente é redirecionado para `/chat`.

### Chat em Tempo Real
1. Página `/chat` carrega conversas do usuário.
2. Supabase Realtime escuta novas mensagens na tabela `messages`.
3. Interface atualiza instantaneamente quando uma mensagem chega.

## 4. Segurança

- **RLS (Row Level Security)**: Todas as tabelas no Supabase têm políticas RLS ativas.
  - Usuários só podem ler/editar seus próprios dados.
  - Mensagens só são visíveis pelos participantes da conversa.
- **Variáveis de Ambiente**: Chaves sensíveis (Stripe Secret, Supabase Service Role) ficam apenas no servidor (Vercel/env), nunca expostas no cliente.

## 5. Padrões de Código

- **Server Components**: Prioridade para renderização no servidor (RSC) para performance e SEO.
- **Client Components**: Usados apenas quando interatividade (hooks, eventos) é necessária (`'use client'`).
- **Design System**: Cores e espaçamentos padronizados via Tailwind (`app/globals.css`).
