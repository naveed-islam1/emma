/**
 * Client-side first-touch attribution + chat session helpers.
 *
 * Privacy rules:
 * - Attribution params and user-typed text are NEVER kept in URLs after
 *   capture (we strip them via history.replaceState).
 * - Never log procedure/free-text content.
 * - Everything lives in sessionStorage only (first touch wins, per tab).
 */

const CID_KEY = "emma_cid";
const ATTRIB_KEY = "emma_attrib";
const ATTRIB_SENT_KEY = "emma_attrib_sent";
const SEED_KEY = "emma_seed";

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type AttributionParam = (typeof ATTRIBUTION_PARAMS)[number];

export type Attribution = {
  [K in AttributionParam]: string | null;
} & {
  /** Pathname only — never includes the query string. */
  landing_path: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Extremely old browsers only — still unique enough for a session id.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

/**
 * Returns the per-session conversation id, creating it on first call.
 * Never regenerates an existing id — first touch wins.
 */
export function getOrCreateCid(): string {
  if (!isBrowser()) return "";
  let cid = sessionStorage.getItem(CID_KEY);
  if (!cid) {
    cid = generateUuid();
    sessionStorage.setItem(CID_KEY, cid);
  }
  return cid;
}

/**
 * Captures first-touch attribution from the current URL (if any tracked
 * params are present and nothing was captured before), then strips those
 * params from the URL while preserving all other params.
 */
export function captureAttribution(): void {
  if (!isBrowser()) return;

  const url = new URL(window.location.href);
  const present = ATTRIBUTION_PARAMS.filter((p) => url.searchParams.has(p));

  // First touch wins: only store if nothing captured yet this session.
  if (present.length > 0 && !sessionStorage.getItem(ATTRIB_KEY)) {
    const attribution: Attribution = {
      utm_source: url.searchParams.get("utm_source"),
      utm_medium: url.searchParams.get("utm_medium"),
      utm_campaign: url.searchParams.get("utm_campaign"),
      utm_content: url.searchParams.get("utm_content"),
      utm_term: url.searchParams.get("utm_term"),
      fbclid: url.searchParams.get("fbclid"),
      gclid: url.searchParams.get("gclid"),
      landing_path: url.pathname, // pathname only, never the query
    };
    sessionStorage.setItem(ATTRIB_KEY, JSON.stringify(attribution));
  }

  // Always strip tracked params from the URL after capture, preserving
  // any other params (and the hash).
  if (present.length > 0) {
    for (const p of present) url.searchParams.delete(p);
    const rest = url.searchParams.toString();
    const clean = url.pathname + (rest ? `?${rest}` : "") + url.hash;
    window.history.replaceState(window.history.state, "", clean);
  }
}

/** Runs the full first-touch bootstrap (cid + attribution capture + URL strip). */
export function bootstrapAttribution(): void {
  if (!isBrowser()) return;
  getOrCreateCid();
  captureAttribution();
}

/** Parsed attribution captured this session, or null. */
export function getStoredAttribution(): Attribution | null {
  if (!isBrowser()) return null;
  const raw = sessionStorage.getItem(ATTRIB_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

/** Whether attribution was already sent to the backend this session. */
export function hasSentAttribution(): boolean {
  if (!isBrowser()) return true;
  return sessionStorage.getItem(ATTRIB_SENT_KEY) === "1";
}

/** Marks attribution as sent so it is only ever included on the first send. */
export function markAttributionSent(): void {
  if (!isBrowser()) return;
  sessionStorage.setItem(ATTRIB_SENT_KEY, "1");
}

/**
 * Stores the homepage hero seed for the /chat page.
 * Seeds travel via sessionStorage only — never via query params.
 */
export function setChatSeed(text: string): void {
  if (!isBrowser()) return;
  sessionStorage.setItem(SEED_KEY, text);
}

/**
 * Reads and removes the chat seed. Removal happens FIRST so a page
 * refresh can never replay the auto-send.
 */
export function consumeChatSeed(): string | null {
  if (!isBrowser()) return null;
  const seed = sessionStorage.getItem(SEED_KEY);
  sessionStorage.removeItem(SEED_KEY);
  return seed;
}
