import { getRequestContext } from "@cloudflare/next-on-pages";

// Product type
export interface Product {
  id: string;
  stripe_account_id: string;
  name: string;
  price_in_cents: number;
  destination_url: string;
  creator_email: string | null;
  is_active: number; // SQLite uses 0/1 for boolean
  created_at: string;
}

// Get D1 database from request context
export function getDB(): D1Database {
  const env = getRequestContext().env as Record<string, unknown>;
  return env.DB as D1Database;
}

// Helper to generate UUID-like ID
export function generateId(): string {
  return crypto.randomUUID().replace(/-/g, "");
}
