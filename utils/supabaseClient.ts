"use client";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID!;
  const SUPABASE_URL = `https://${projectId}.supabase.co`;
  const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

  // 🔍 Debug output (safe: no secrets)
  console.log("🔎 DEBUG: Supabase config", {
    url: SUPABASE_URL ? "[SET]" : "❌ MISSING",
    key: publicAnonKey ? "[SET]" : "❌ MISSING",
  });

  if (!SUPABASE_URL || !publicAnonKey) {
    throw new Error(
      "❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables."
    );
  }
  try {
    supabaseInstance = createSupabaseClient(SUPABASE_URL, publicAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  } catch (error) {
    const errorMsg = error?.message || "Unknown error";
    if (
      errorMsg.includes("supabaseKey") ||
      errorMsg.includes("key is required")
    ) {
      throw new Error(
        `Supabase key validation failed: ${errorMsg}\n\n` +
          "Please check that VITE_SUPABASE_ANON_KEY is set correctly in your Vercel environment variables."
      );
    }
    throw error;
  }
  return supabaseInstance;
}
