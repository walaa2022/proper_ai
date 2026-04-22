import { createClient } from '@supabase/supabase-js';

// Fall back to safe placeholder strings so that production build's page-data
// collection doesn't blow up when env vars aren't loaded. The real
// NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are supplied at
// runtime on the host (Vercel, etc.).
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
