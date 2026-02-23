-- Create bookings table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references auth.users(id) not null,
  professional_id uuid references profiles(id) not null,
  minutes_booked integer not null,
  amount_paid numeric not null,
  stripe_session_id text unique,
  status text default 'paid',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table bookings enable row level security;

create policy "Users can view their own bookings (client)"
  on bookings for select
  using (auth.uid() = client_id);

create policy "Users can view their own bookings (professional)"
  on bookings for select
  using (auth.uid() = professional_id);

-- Grant access to service_role (implicit, but good to know)
