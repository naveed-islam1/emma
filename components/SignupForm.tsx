"use client";

import React, { useState } from "react";
import { supabaseBrowser } from "../lib/supabaseClient";
import { apiFetch } from "../lib/api";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [cedula, setCedula] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;

      // ensure session exists
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("No session after sign up");

      const r = await apiFetch("/api/doctors/init", {
        method: "POST",
        body: JSON.stringify({ cedula, full_name: fullName }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Failed to init doctor");

      setMsg("Account created — proceed to identity verification.");
      // navigate to your verify page if you have routing:
      // router.push("/verify");
    } catch (err: any) {
      setMsg(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <input
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        required
      />
      <button disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
