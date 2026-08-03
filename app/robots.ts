import type { MetadataRoute } from "next";

const PRIVATE_PATHS = [
  "/dashboard",
  "/billing",
  "/payment",
  "/profile",
  "/doctors",
  "/protected",
  "/on-boarding",
  "/confirm-email",
  "/auth/callback",
  "/verify",
  "/verif-plugin",
  "/thankyou",
  "/api/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      // AI crawlers are explicitly welcome on public pages (GEO).
      ...["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"].map(
        (userAgent) => ({
          userAgent,
          allow: "/",
          disallow: PRIVATE_PATHS,
        }),
      ),
    ],
    sitemap: "https://www.emmamatch.com/sitemap.xml",
  };
}
