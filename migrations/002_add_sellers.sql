-- Migration: Add sellers table for returning user detection
-- This allows users who have already completed Stripe onboarding to skip it on future products

-- Sellers table: Maps email to Stripe Connect account
CREATE TABLE IF NOT EXISTS sellers (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT NOT NULL UNIQUE,
  stripe_account_id TEXT NOT NULL,
  is_verified INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_sellers_email ON sellers(email);
