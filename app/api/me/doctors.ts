// api/me/doctor.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabaseServer } from "../../../utils/supabaseServer";
import { getAuthUserId } from "../../../utils/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const userId = await getAuthUserId(req);
    const sb = supabaseServer();

    // Fetch the doctor row
    const { data: doctor, error } = await sb
      .from("doctors")
      .select("id, is_verified, cedula_verified, certified")
      .eq("user_id", userId)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Derived fields for the client
    const identity_verified = !!doctor.is_verified;
    const account_verified =
      !!doctor.is_verified && !!doctor.cedula_verified && !!doctor.certified;

    return res.status(200).json({
      doctor: {
        id: doctor.id,

        // Synthetic veriff fields (compatibility with VerifyPage)
        veriff_status: null,
        veriff_decision: identity_verified ? "approved" : null,

        // Native booleans
        identity_verified,
        cedula_verified: !!doctor.cedula_verified,
        certified: !!doctor.certified,

        // Overall gate + onboarding UX
        account_verified,
        onboarding_status: account_verified ? "complete" : "pending",
      },
    });
  } catch (e: any) {
    return res.status(401).json({ error: e.message });
  }
}
