
-- 1. Create a table for Conversations (Rooms)
create table if not exists conversations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  participant1_id uuid references auth.users(id) not null,
  participant2_id uuid references auth.users(id) not null,
  last_message_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Constraint to ensure unique pair of participants
  unique(participant1_id, participant2_id)
);

-- 2. Create a table for Messages
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id uuid references auth.users(id) not null,
  content text not null,
  read_at timestamp with time zone
);

-- 3. Enable Realtime for Messages
alter publication supabase_realtime add table messages;

-- 4. RLS Policies for Conversations
alter table conversations enable row level security;

create policy "Users can view their own conversations"
  on conversations for select
  using (auth.uid() = participant1_id or auth.uid() = participant2_id);

create policy "Users can create conversations"
  on conversations for insert
  with check (auth.uid() = participant1_id or auth.uid() = participant2_id);

-- 5. RLS Policies for Messages
alter table messages enable row level security;

create policy "Users can view messages in their conversations"
  on messages for select
  using (
    exists (
      select 1 from conversations
      where conversations.id = messages.conversation_id
      and (conversations.participant1_id = auth.uid() or conversations.participant2_id = auth.uid())
    )
  );

create policy "Users can insert messages in their conversations"
  on messages for insert
  with check (
    auth.uid() = sender_id and
    exists (
      select 1 from conversations
      where conversations.id = messages.conversation_id
      and (conversations.participant1_id = auth.uid() or conversations.participant2_id = auth.uid())
    )
  );
