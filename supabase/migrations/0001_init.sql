-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles: one row per auth.users, created automatically on signup
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- orders / order_items
-- ---------------------------------------------------------------------------
create type public.order_status as enum ('pending', 'paid', 'failed', 'cancelled');

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  status public.order_status not null default 'pending',
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  shipping_address text not null,
  subtotal integer not null,
  shipping integer not null,
  total integer not null,
  currency text not null default 'PYG',
  pagopar_order_id text,
  pagopar_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create unique index if not exists orders_pagopar_order_id_idx
  on public.orders (pagopar_order_id) where pagopar_order_id is not null;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_slug text not null,
  variant_id text not null,
  product_name text not null,
  unit_price integer not null,
  quantity integer not null check (quantity > 0)
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Owners can read their own orders; guest orders (user_id null) are only
-- readable via the server's service-role client (checkout/success pages
-- pass the order id explicitly and fetch with the admin client).
create policy "orders: read own" on public.orders
  for select using (auth.uid() = user_id);

create policy "order_items: read own" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

-- Inserts/updates happen exclusively through the server (service role),
-- which bypasses RLS — no insert/update policy is granted to anon/authenticated.
