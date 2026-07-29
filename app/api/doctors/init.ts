import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabaseServer } from "../../../utils/supabaseServer";
import { getAuthUserId } from "../../../utils/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") return res.status(405).end();

    // Body can be string or object on Vercel
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
    const { cedula, full_name } = body || {};
    if (!cedula || !full_name) {
      return res
        .status(400)
        .json({ error: "cedula and full_name are required" });
    }

    const userId = await getAuthUserId(req);
    const sb = supabaseServer();

    // 1) Do we already have a doctor row for this user?
    const { data: existing, error: selErr } = await sb
      .from("doctors")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (selErr) return res.status(400).json({ error: selErr.message });

    let doctorId: string | null = existing?.id ?? null;

    if (!doctorId) {
      // 2) Insert new
      const { data: inserted, error: insErr } = await sb
        .from("doctors")
        .insert({
          user_id: userId,
          cedula,
          full_name,
          // your schema fields:
          is_verified: false,
          cedula_verified: false,
          certified: false,
        })
        .select(
          "id, full_name, cedula, is_verified, cedula_verified, certified"
        )
        .single();

      if (insErr) return res.status(400).json({ error: insErr.message });
      doctorId = inserted.id;

      // 3) Link users.doctor_id ⇄ doctors.id
      const { error: linkErr } = await sb
        .from("users")
        .upsert(
          { auth_user_id: userId, doctor_id: doctorId },
          { onConflict: "auth_user_id" }
        );
      if (linkErr) return res.status(400).json({ error: linkErr.message });

      return res.status(200).json({ doctor: inserted });
    } else {
      // 2b) Update existing
      const { data: updated, error: updErr } = await sb
        .from("doctors")
        .update({ cedula, full_name })
        .eq("id", doctorId)
        .select(
          "id, full_name, cedula, is_verified, cedula_verified, certified"
        )
        .single();

      if (updErr) return res.status(400).json({ error: updErr.message });

      // 3b) Ensure users link exists
      const { error: linkErr } = await sb
        .from("users")
        .upsert(
          { auth_user_id: userId, doctor_id: doctorId },
          { onConflict: "auth_user_id" }
        );
      if (linkErr) return res.status(400).json({ error: linkErr.message });

      return res.status(200).json({ doctor: updated });
    }
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
