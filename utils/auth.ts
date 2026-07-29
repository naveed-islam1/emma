// utils/auth.ts
import { jwtVerify } from "jose";

/**
 * Extracts the Supabase auth user id (auth.uid()) from a Bearer token.
 * Works with:
 *  - Web Fetch API Request (req.headers.get)
 *  - VercelRequest (@vercel/node) (req.headers as object)
 *  - Plain objects { headers: Record<string,string> }
 */
export async function getAuthUserId(req: any): Promise<string> {
  const getHeader = (k: string): string | null => {
    // Case 1: Web Request
    if (typeof req?.headers?.get === "function") {
      return req.headers.get(k);
    }
    // Case 2: VercelRequest or plain object
    if (req?.headers && typeof req.headers === "object") {
      const v = (req.headers[k] || req.headers[k.toLowerCase()]) as string | undefined;
      return v ?? null;
    }
    return null;
  };

  const auth = getHeader("authorization") || getHeader("Authorization") || "";
  const token = auth && auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) throw new Error("Missing token");

  const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);

  const sub = payload.sub as string | undefined;
  if (!sub) throw new Error("Invalid token (no sub)");

  return sub;
}