/**
 * Database Setup Script for VibePay
 *
 * Run with: npm run db:setup
 *
 * Before running, create a .env file with:
 * - NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 * - SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 */

import { config } from "dotenv";
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(`
❌ Missing environment variables!

Create a .env file in the project root with:

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

Get these from: https://supabase.com/dashboard/project/_/settings/api
`);
  process.exit(1);
}

const SQL = `
-- VibePay Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_account_id text NOT NULL,
  name text NOT NULL,
  price_in_cents int NOT NULL CHECK (price_in_cents >= 200),
  destination_url text NOT NULL,
  creator_email text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_stripe_account ON products(stripe_account_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(id) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous reads for active products (payment pages)
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = true);

-- Policy: Service role has full access (API routes)
DROP POLICY IF EXISTS "Service role has full access" ON products;
CREATE POLICY "Service role has full access"
  ON products FOR ALL
  USING (true)
  WITH CHECK (true);
`;

async function setupDatabase() {
  console.log("🚀 Setting up VibePay database...\n");

  // Use Supabase's SQL endpoint
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify({ sql: SQL }),
  });

  if (!response.ok) {
    // exec_sql RPC doesn't exist by default, let's try another approach
    console.log("⚠️  Direct SQL execution not available via API.\n");
    console.log("📋 Run this SQL in your Supabase Dashboard:\n");
    console.log("   1. Go to https://supabase.com/dashboard");
    console.log("   2. Select your project → SQL Editor (left sidebar)");
    console.log("   3. Click 'New query'");
    console.log("   4. Paste and run this SQL:\n");
    console.log("─".repeat(50));
    console.log(SQL);
    console.log("─".repeat(50));
    console.log("\n   5. Click 'Run' (or Cmd/Ctrl + Enter)\n");

    // Still verify if table already exists
    const checkResponse = await fetch(
      `${supabaseUrl}/rest/v1/products?select=id&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (checkResponse.ok) {
      console.log("✅ Good news: 'products' table already exists!");
      console.log("   You may already be set up.\n");
    }

    return;
  }

  console.log("✅ Database schema created successfully!\n");

  // Verify
  const checkResponse = await fetch(
    `${supabaseUrl}/rest/v1/products?select=id&limit=1`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (checkResponse.ok) {
    console.log("✅ Verified: 'products' table is ready!\n");
  }
}

setupDatabase().catch(console.error);
