-- Migration: Add protected URL support
-- Run with: npx wrangler d1 execute vibepay --remote --file=./migrations/001_add_protected_url.sql

-- Add protected_url column to products (nullable - only used for link protection)
ALTER TABLE products ADD COLUMN protected_url TEXT;

-- Create access_tokens table for time-limited access
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
