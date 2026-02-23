# MARKETPLACE DE CONSULTORIA POR MINUTO

## Documento Técnico Completo + Arquitetura + PRD + IA

------------------------------------------------------------------------

# 1. VISÃO GERAL

Plataforma web mobile-first que conecta usuários a profissionais que
cobram por minuto via: - Chat - Áudio - Vídeo

Inclui: - Supabase (Auth + PostgreSQL + Realtime) - Stripe Connect
(repasse 70--80%) - Daily.co (Video/VoIP) - Sistema de IA para
entrevista e validação profissional - Next.js 14 (App Router) -
TailwindCSS

------------------------------------------------------------------------

# 2. ARQUITETURA GERAL

Cliente (PWA Mobile First) ↓ Next.js 14 ↓ API Routes / Server Actions ↓
Supabase \| Stripe Connect \| Daily.co \| OpenAI API

------------------------------------------------------------------------

# 3. STACK TECNOLÓGICA

Frontend: - Next.js 14 - React - TailwindCSS - PWA Ready

Backend: - API Routes - Edge Functions

Banco: - Supabase PostgreSQL

Pagamentos: - Stripe Connect Express

Video: - Daily.co WebRTC

IA: - OpenAI GPT-4o ou superior

------------------------------------------------------------------------

# 4. MODELAGEM DO BANCO

## profiles

create table profiles ( id uuid references auth.users on delete cascade
primary key, role text check (role in ('user','professional','admin')),
full_name text, avatar_url text, bio text, price_per_minute
numeric(10,2), stripe_account_id text, ai_verified boolean default
false, ai_score numeric(5,2), created_at timestamp default now() );

## skills

create table skills ( id uuid primary key default gen_random_uuid(),
name text unique );

## professional_skills

create table professional_skills ( professional_id uuid references
profiles(id), skill_id uuid references skills(id), primary key
(professional_id, skill_id) );

## sessions

create table sessions ( id uuid primary key default gen_random_uuid(),
user_id uuid references profiles(id), professional_id uuid references
profiles(id), status text check (status in
('pending','active','finished','cancelled')), started_at timestamp,
ended_at timestamp, total_minutes integer, total_amount numeric(10,2),
created_at timestamp default now() );

## messages

create table messages ( id uuid primary key default gen_random_uuid(),
session_id uuid references sessions(id), sender_id uuid references
profiles(id), content text, created_at timestamp default now() );

## transactions

create table transactions ( id uuid primary key default
gen_random_uuid(), session_id uuid references sessions(id),
stripe_payment_intent text, amount numeric(10,2), platform_fee
numeric(10,2), professional_amount numeric(10,2), status text,
created_at timestamp default now() );

## ai_interviews

create table ai_interviews ( id uuid primary key default
gen_random_uuid(), professional_id uuid references profiles(id),
responses jsonb, ai_analysis text, ai_score numeric(5,2), approved
boolean default false, created_at timestamp default now() );

------------------------------------------------------------------------

# 5. SISTEMA DE IA -- ENTREVISTA PROFISSIONAL

Fluxo: 1. Profissional se cadastra 2. Preenche formulário dinâmico
baseado na skill 3. Respostas enviadas à OpenAI 4. IA gera score
(0--100) 5. Se score \>= 70 → aprovado automaticamente

API Route exemplo:

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const completion = await openai.chat.completions.create({ model:
"gpt-4o", messages: \[{ role: "user", content: prompt }\], });

------------------------------------------------------------------------

# 6. STRIPE CONNECT

Criar conta Express:

const account = await stripe.accounts.create({ type: 'express' });

Criar PaymentIntent com taxa:

const paymentIntent = await stripe.paymentIntents.create({ amount:
totalInCents, currency: 'brl', application_fee_amount:
platformFeeInCents, transfer_data: { destination: professionalStripeId }
});

Repasse profissional: 70--80%

------------------------------------------------------------------------

# 7. SISTEMA DE CHAMADA (DAILY)

Criar sala:

await fetch('https://api.daily.co/v1/rooms', { method: 'POST', headers:
{ Authorization: `Bearer ${process.env.DAILY_API_KEY}` } });

Frontend:

import DailyIframe from '@daily-co/daily-js'; const callFrame =
DailyIframe.createFrame(); callFrame.join({ url: roomUrl });

------------------------------------------------------------------------

# 8. TIMER DE COBRANÇA

const duration = Math.ceil((Date.now() - startTime) / 60000); const
total = duration \* pricePerMinute;

------------------------------------------------------------------------

# 9. VARIÁVEIS DE AMBIENTE

NEXT_PUBLIC_SUPABASE_URL= NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY= STRIPE_WEBHOOK_SECRET= DAILY_API_KEY= OPENAI_API_KEY=

------------------------------------------------------------------------

# 10. PRD RESUMIDO

Objetivo: Marketplace de especialistas cobrando por minuto.

MVP: - Login - Perfil - Busca - Video - Chat - Timer - Stripe - IA
validação profissional

Modelo Receita: 20--30% comissão por sessão.

------------------------------------------------------------------------

# 11. ESTRUTURA DE PASTAS

/app /login /register /dashboard /call/\[sessionId\] /api /stripe
/webhooks /session /ai-interview /lib /components /types /middleware.ts

------------------------------------------------------------------------

# FIM DO DOCUMENTO
