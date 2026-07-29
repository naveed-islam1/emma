import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabaseServer } from "../../../utils/supabaseServer";
import { getAuthUserId } from "../../../utils/auth";
import { createHmac } from "crypto";

function hmacHex(str: string) {
  return createHmac("sha256", process.env.VERIFF_SECRET!)
    .update(str)
    .digest("hex");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") return res.status(405).end();

    const userId = await getAuthUserId(req);
    const sb = supabaseServer();

    const { data: doctor, error } = await sb
      .from("doctors")
      .select("id, identity_verified")
      .eq("user_id", userId)
      .single();

    if (error || !doctor)
      return res.status(404).json({ error: "Doctor not found" });
    if (doctor.identity_verified)
      return res.status(400).json({ error: "Already identity-verified" });

    const body = JSON.stringify({ verification: { vendorData: doctor.id } });

    const resp = await fetch("https://stationapi.veriff.com/v1/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-CLIENT": process.env.VERIFF_PUBLIC_KEY!,
        "X-Signature": hmacHex(body),
      },
      body,
    });

    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json(data);

    const { id: sessionId, token: sessionToken } = data?.verification || {};

    await sb
      .from("doctors")
      .update({
        veriff_session_id: sessionId,
        veriff_status: "created",
        veriff_last_event_at: new Date().toISOString(),
      })
      .eq("id", doctor.id);

    return res.status(200).json({ sessionId, sessionToken });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
