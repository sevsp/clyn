-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  comment text not null,
  verified_purchase boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_slug, user_id)
);

create index if not exists reviews_product_slug_idx on public.reviews (product_slug);

alter table public.reviews enable row level security;

-- Reviews are public content — anyone can read them.
create policy "reviews: public read" on public.reviews
  for select using (true);

-- A user can only write/update their own review.
create policy "reviews: insert own" on public.reviews
  for insert with check (auth.uid() = user_id);

create policy "reviews: update own" on public.reviews
  for update using (auth.uid() = user_id);

-- No public delete policy — removing a review (if ever needed) is a manual
-- admin action via the Supabase Table Editor.
