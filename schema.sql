-- VibePay Database Schema for Cloudflare D1 (SQLite)
-- Run with: npm run db:migrate

-- Products table: The only table we need
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  stripe_account_id TEXT NOT NULL,
  name TEXT NOT NULL,
  price_in_cents INTEGER NOT NULL CHECK (price_in_cents >= 200),
  destination_url TEXT NOT NULL,
  creator_email TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Index for fast lookups by stripe account
CREATE INDEX IF NOT EXISTS idx_products_stripe_account ON products(stripe_account_id);

-- Index for active products
CREATE INDEX IF NOT EXISTS idx_products_active ON products(id) WHERE is_active = 1;
