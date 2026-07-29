"use client";

import React, { useEffect, useRef, useState } from "react";
import VeriffLoader from "../../components/VeriffLoader";
import { apiFetch } from "../../lib/api";

declare global { interface Window { Veriff?: any } }

type Status = "idle" | "starting" | "pending" | "approved" | "declined" | "error";

export default function VerifyPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearPoll() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  async function start() {
    setStatus("starting");
    setMessage(null);

    // 1) create Veriff session
    const r = await apiFetch("/api/veriff/session", { method: "POST" });
    const j = await r.json();
    if (!r.ok) {
      setStatus("error");
      setMessage(j?.error || "Failed to create Veriff session");
      return;
    }

    const { sessionToken } = j;

    // 2) launch SDK
    if (!window.Veriff) {
      setStatus("error");
      setMessage("Veriff SDK not loaded yet. Please try again in a moment.");
      return;
    }

    const v = window.Veriff({
      parentId: "veriff-container",
      sessionToken,
      onSession: () => setStatus("pending"),
      onError: (err: unknown) => {
        setStatus("error");
        setMessage(String(err));
      }
    });
    v?.launch?.();

    // 3) poll /api/me/doctor every 5s until approved/declined
    clearPoll();
    pollRef.current = setInterval(async () => {
      const meResp = await apiFetch("/api/me/doctor");
      const { doctor, error } = await meResp.json();
      if (error) return; // ignore transient

      // Your schema: treat identity_verified as source of truth
      const identityApproved = !!doctor?.identity_verified;
      const decision = doctor?.veriff_decision; // may be null in current schema

      if (identityApproved || decision === "approved") {
        setStatus("approved");
        clearPoll();
      } else if (decision === "declined") {
        setStatus("declined");
        clearPoll();
      }
    }, 5000);
  }

  // stop polling on unmount
  useEffect(() => () => clearPoll(), []);

  const canStart = status !== "starting" && status !== "pending";

  return (
    <div style={{ padding: 16 }}>
      {/* Loads Veriff SDK + CSS once */}
      <VeriffLoader />

      <h1>Identity verification</h1>

      <div id="veriff-container" style={{ minHeight: 420, marginBottom: 12 }} />

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={start} disabled={!canStart}>
          {status === "starting" ? "Starting…" : "Start verification"}
        </button>
        {status === "declined" && (
          <button onClick={start}>Retry verification</button>
        )}
      </div>

      {message && <p style={{ color: "crimson" }}>{message}</p>}

      <ul style={{ marginTop: 12 }}>
        <li>
          Identity (Veriff): {status === "approved" ? "✓" : status === "declined" ? "✗" : "…"}
        </li>
        <li>Cédula: (auto when your check passes)</li>
        <li>Board certification: (auto when your check passes)</li>
      </ul>
    </div>
  );
}