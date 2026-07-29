// utils/verifyJwt.js
// Environment variables should be set in Vercel dashboard
// No need to load .env file in production

/**
 * Verifies a JWT using the Supabase JWT secret and returns the user ID (sub).
 * @param {string} token - The JWT token to verify.
 * @returns {Promise<string>} The user ID (sub claim) if valid.
 * @throws Will throw an error if token is invalid or missing.
 */
async function verifyJwt(token) {
  if (!token) {
    throw new Error("Missing token for JWT verification.");
  }

  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) {
    throw new Error("Missing SUPABASE_JWT_SECRET in environment.");
  }

  // ✅ Dynamically import `jose` to avoid CommonJS vs ESM conflict
  const { jwtVerify } = await import("jose");

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload.sub;
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    throw err;
  }
}

module.exports = verifyJwt;