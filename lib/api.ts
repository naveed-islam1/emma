import { supabaseBrowser } from "./supabaseClient";

export async function apiFetch(path: string, init: RequestInit = {}) {
  const supabase = supabaseBrowser();
  const { data: { session } } = await supabase.auth.getSession();
  const url = path.startsWith("http") ? path : path; // same-origin /api/*
  return fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {})
    }
  });
}