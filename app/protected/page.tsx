"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";

export default function ProtectedPage() {
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchDoctor() {
      const r = await apiFetch("/api/me/doctor");
      const j = await r.json();
      setDoctor(j.doctor);
      setLoading(false);

      if (!j.doctor?.account_verified) {
        // not verified → bounce them
        router.push("/verify");
      }
    }
    fetchDoctor();
  }, [router]);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Welcome, {doctor.full_name}</h1>
      <p>Now you can use the full app 🎉</p>
    </div>
  );
}