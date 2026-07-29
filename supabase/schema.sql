-- Run this in the Supabase SQL editor (or via `supabase db push`)
-- after creating a new project.

-- 1. Enum types --------------------------------------------------------

create type user_role as enum ('admin', 'client');
create type reservation_status as enum ('pendiente', 'confirmada', 'cancelada', 'completada');

-- 2. Tables -------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role user_role not null default 'client',
  created_at timestamptz not null default now()
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  capacity int not null default 2,
  price_per_night numeric(10, 2) not null,
  total_units int not null default 1,
  image_url text,
  created_at timestamptz not null default now()
);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  room_id uuid not null references public.rooms (id) on delete cascade,
  check_in date not null,
  check_out date not null,
  guests int not null default 1,
  status reservation_status not null default 'pendiente',
  total_price numeric(10, 2) not null,
  created_at timestamptz not null default now(),
  constraint check_out_after_check_in check (check_out > check_in)
);

-- 3. Auto-create a profile row whenever a new auth user signs up --------

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Row Level Security ---------------------------------------------------

alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.reservations enable row level security;

-- Helper: is the current user an admin?
create function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles: users read/update their own row, admins read/update all
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own_or_admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- rooms: public read, admin-only writes
create policy "rooms_select_public" on public.rooms
  for select using (true);

create policy "rooms_write_admin" on public.rooms
  for insert with check (public.is_admin());

create policy "rooms_update_admin" on public.rooms
  for update using (public.is_admin());

create policy "rooms_delete_admin" on public.rooms
  for delete using (public.is_admin());

-- reservations: owners manage their own, admins manage all
create policy "reservations_select_own_or_admin" on public.reservations
  for select using (auth.uid() = user_id or public.is_admin());

create policy "reservations_insert_own" on public.reservations
  for insert with check (auth.uid() = user_id);

create policy "reservations_update_own_or_admin" on public.reservations
  for update using (auth.uid() = user_id or public.is_admin());

create policy "reservations_delete_admin" on public.reservations
  for delete using (public.is_admin());

-- 5. First admin ----------------------------------------------------------
-- After registering your first user through the app, promote it manually:
-- update public.profiles set role = 'admin' where id = '<user-uuid>';
