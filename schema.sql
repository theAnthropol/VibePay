-- VibePay Database Schema for Cloudflare D1 (SQLite)
-- Run with: npm run db:migrate

-- Products table: The only table we need
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  stripe_account_id TEXT NOT NULL,
  name TEXT NOT NULL,
  price_in_cents INTEGER NOT NULL CHECK (price_in_cents >= 200),
  destination_url TEXT NOT NULL,
  -- Protected URL (encrypted) - if set, destination_url becomes success page, this is the actual content
  protected_url TEXT,
  creator_email TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Index for fast lookups by stripe account
CREATE INDEX IF NOT EXISTS idx_products_stripe_account ON products(stripe_account_id);

-- Index for active products
CREATE INDEX IF NOT EXISTS idx_products_active ON products(id) WHERE is_active = 1;

-- Access tokens for protected links (time-limited, one-time use)
CREATE TABLE IF NOT EXISTS access_tokens (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  product_id TEXT NOT NULL REFERENCES products(id),
  payment_intent_id TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Index for token lookups
CREATE INDEX IF NOT EXISTS idx_access_tokens_token ON access_tokens(token);

-- Index for cleanup of expired tokens
CREATE INDEX IF NOT EXISTS idx_access_tokens_expires ON access_tokens(expires_at);
