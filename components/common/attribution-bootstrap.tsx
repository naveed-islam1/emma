"use client";

import { useEffect } from "react";
import { bootstrapAttribution } from "@/lib/attribution";

/**
 * Global first-touch attribution bootstrap.
 * Mounted once in the root layout; renders nothing.
 * On first mount of any route it:
 *  1. ensures a session-scoped conversation id (emma_cid),
 *  2. captures utm params, fbclid, gclid + landing_path into sessionStorage
 *     (first touch wins),
 *  3. strips those params from the URL via history.replaceState.
 */
export default function AttributionBootstrap() {
  useEffect(() => {
    bootstrapAttribution();
  }, []);

  return null;
}
