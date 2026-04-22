import { createClient } from '@supabase/supabase-js';

// Fall back to safe placeholder strings so the Next.js production build's
// page-data collection doesn't blow up when env vars aren't loaded at build
// time. Real credentials are injected at runtime on the hosting platform
// (Vercel, etc.).
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'placeholder-service-key';

// This is the server-side client
export const db = createClient(supabaseUrl, supabaseKey);

// Helper for consistency with previous API
export const supabase = db;

export default db;
