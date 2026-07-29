import { createClient } from "@supabase/supabase-js";

export function supabaseServer() {
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  const SUPABASE_URL = `https://${projectId}.supabase.co`;
  return createClient(
    process.env.SUPABASE_URL!, // server URL
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, // service role key
    { auth: { persistSession: false } }
  );
}
