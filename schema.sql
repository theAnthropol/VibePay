-- VibePay Database Schema
-- Run this in your Supabase SQL Editor

-- Products table: The only table we need
create table products (
  id uuid primary key default gen_random_uuid(),
  stripe_account_id text not null,
  name text not null,
  price_in_cents int not null check (price_in_cents >= 200),
  destination_url text not null,
  creator_email text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Index for fast lookups by stripe account
create index idx_products_stripe_account on products(stripe_account_id);

-- Index for active products
create index idx_products_active on products(id) where is_active = true;

-- Row Level Security (optional but recommended)
alter table products enable row level security;

-- Allow anonymous reads for active products (for payment pages)
create policy "Anyone can view active products"
  on products for select
  using (is_active = true);

-- Service role can do everything (for API routes)
create policy "Service role has full access"
  on products for all
  using (true)
  with check (true);
