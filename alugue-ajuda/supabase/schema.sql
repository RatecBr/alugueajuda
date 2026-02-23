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
