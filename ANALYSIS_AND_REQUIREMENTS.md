# MARKETPLACE DE CONSULTORIA POR MINUTO - ANÁLISE E ESPECIFICAÇÃO TÉCNICA

## 1. ANÁLISE DE MERCADO E CONCORRÊNCIA

Embora não haja um "líder de mercado global" consolidado para exatamente pay-per-minute de experts gerais, existem soluções próximas que validam o modelo:

### Concorrentes e Modelos Semelhantes
*   **PicDoc**: Conecta profissionais de saúde para consultas online por vídeo, valor por consulta, 24/7.
*   **Intro.co**: Marketplace global para reservar experts (foco em sessões, não necessariamente minutos).
*   **Fliffr** (Conceitual): Marketplace de especialistas por minuto com chat/vídeo.
*   **Plataformas de Telemedicina**: Conexa Saúde, GestãoDS (agendamento, vídeo, pagamento).

**Oportunidade**: Criar um marketplace escalável e responsivo para experts gerais com cobrança precisa por minuto.

---

## 2. VISÃO GERAL DO PRODUTO (PRD)

**Objetivo**: Plataforma web mobile-first que conecta usuários a profissionais que cobram por minuto via Chat, Áudio e Vídeo.

**MVP (Produto Mínimo Viável)**:
*   Login/Cadastro (Supabase Auth)
*   Perfil de Usuário e Profissional
*   Busca de Especialistas
*   Vídeo/Áudio Chamadas (Daily.co)
*   Chat em Tempo Real (Supabase Realtime)
*   Timer de Cobrança (Billing por minuto)
*   Pagamentos e Repasse (Stripe Connect)
*   **Diferencial**: Sistema de IA para entrevista e validação técnica de profissionais.

**Modelo de Receita**: Comissão de 20-30% por sessão sobre o valor do minuto do profissional.

---

## 3. ARQUITETURA E STACK TECNOLÓGICA

**Arquitetura Geral**:
Cliente (PWA Mobile First) → Next.js 14 → API Routes / Server Actions → Supabase | Stripe Connect | Daily.co | OpenAI API

### Stack Recomendada
*   **Frontend**: Next.js 14 (App Router), React, TailwindCSS. PWA Ready.
*   **Backend**: Next.js API Routes, Edge Functions.
*   **Banco de Dados**: Supabase PostgreSQL.
*   **Autenticação**: Supabase Auth (Email, Social).
*   **Pagamentos**: Stripe Connect Express (Marketplace).
*   **Vídeo/VoIP**: Daily.co WebRTC (fácil integração, alta qualidade).
*   **IA / Validação**: OpenAI API (GPT-4o) para análise de perfil.

---

## 4. ESPECIFICAÇÃO TÉCNICA DETALHADA

### 4.1. Modelagem de Dados (Supabase PostgreSQL)

```sql
-- Profiles: Usuários e Profissionais
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role text check (role in ('user','professional','admin')),
  full_name text,
  avatar_url text,
  bio text,
  price_per_minute numeric(10,2),
  stripe_account_id text,
  ai_verified boolean default false,
  ai_score numeric(5,2),
  created_at timestamp default now()
);

-- Skills: Habilidades disponíveis
create table skills (
  id uuid primary key default gen_random_uuid(),
  name text unique
);

-- Professional Skills: Relacionamento N:N
create table professional_skills (
  professional_id uuid references profiles(id),
  skill_id uuid references skills(id),
  primary key (professional_id, skill_id)
);

-- Sessions: Sessões de consultoria
create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  professional_id uuid references profiles(id),
  status text check (status in ('pending','active','finished','cancelled')),
  started_at timestamp,
  ended_at timestamp,
  total_minutes integer,
  total_amount numeric(10,2),
  created_at timestamp default now()
);

-- Messages: Chat da sessão
create table messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id),
  sender_id uuid references profiles(id),
  content text,
  created_at timestamp default now()
);

-- Transactions: Registros financeiros
create table transactions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id),
  stripe_payment_intent text,
  amount numeric(10,2),
  platform_fee numeric(10,2),
  professional_amount numeric(10,2),
  status text,
  created_at timestamp default now()
);

-- AI Interviews: Registros de validação
create table ai_interviews (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid references profiles(id),
  responses jsonb,
  ai_analysis text,
  ai_score numeric(5,2),
  approved boolean default false,
  created_at timestamp default now()
);
```

### 4.2. Sistema de IA - Validação de Profissional
**Fluxo**:
1. Profissional cadastra-se e escolhe skills.
2. Sistema gera formulário dinâmico de perguntas técnicas.
3. Respostas enviadas para OpenAI (GPT-4o).
4. IA gera score (0-100) baseado em profundidade, coerência e experiência.
5. Se Score >= 70 → `ai_verified = true`.

**Exemplo de Implementação (API Route)**:
```typescript
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Prompt de análise
const prompt = `Avalie a experiência... Critérios: Profundidade, Clareza...`;
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }]
});
```

### 4.3. Pagamentos (Stripe Connect)
*   **Tipo de Conta**: Express (melhor UX para onboarding de profissionais).
*   **Fluxo**:
    1.  Criar conta: `stripe.accounts.create({ type: 'express' })`
    2.  Cobrar usuário: `stripe.paymentIntents.create` com `application_fee_amount` (taxa da plataforma).
    3.  Repasse: 70-80% para o `destination` (ID do profissional).

### 4.4. Vídeo e Chamadas (Daily.co)
*   **Backend**: Criar sala via API REST (`POST https://api.daily.co/v1/rooms`).
*   **Frontend**: Usar `@daily-co/daily-js` para embedar iframe da chamada.
    ```javascript
    const callFrame = DailyIframe.createFrame();
    callFrame.join({ url: roomUrl });
    ```

### 4.5. Timer de Cobrança
Lógica crítica para o modelo de negócios:
```javascript
const duration = Math.ceil((Date.now() - startTime) / 60000); // Arredonda para cima
const total = duration * pricePerMinute;
```
*Deve ser validado no backend ao finalizar a sessão.*

---

## 5. ESTRUTURA DO PROJETO E VARIÁVEIS

**Estrutura de Pastas Sugerida**:
```
/app
  /login
  /register
  /dashboard
  /call/[sessionId]
  /api
    /stripe
    /webhooks
    /session
    /ai-interview
/lib (Supabase client, Stripe helpers)
/components (UI)
/types (Interfaces DB)
/middleware.ts (Auth protection)
```

**Variáveis de Ambiente Necessárias**:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
DAILY_API_KEY=
OPENAI_API_KEY=
```
