import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.emmamatch.com"),
  title: {
    default: "Emma — Safe, Affordable Surgery in Mexico",
    template: "%s | Emma",
  },
  description:
    "Emma matches you with verified, board-certified surgeons in Mexico for safe, affordable surgery abroad — with personalized guidance from first chat to recovery.",
  openGraph: {
    siteName: "Emma",
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import React from "react";
import type { ReactNode } from "react";
import "./globals.css";
import AttributionBootstrap from "@/components/common/attribution-bootstrap";
import { ReduxProvider } from "@/redux/redux-provider";
import { Toaster } from "react-hot-toast";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://www.emmamatch.com/#organization",
      name: "Emma",
      alternateName: "Emma Match",
      url: "https://www.emmamatch.com",
      logo: "https://www.emmamatch.com/assets/svg/Emma-logo.svg",
      description:
        "Emma matches patients with verified, board-certified surgeons in Mexico for safe, affordable surgery abroad.",
      areaServed: ["US", "MX"],
      sameAs: [
        "https://www.facebook.com/people/Emma-Match/61585245964949/",
        "https://www.instagram.com/emmamatch_",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.emmamatch.com/#website",
      name: "Emma",
      url: "https://www.emmamatch.com",
      publisher: { "@id": "https://www.emmamatch.com/#organization" },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-locator-target="vscode">
      <body
        cz-shortcut-listen="true"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ReduxProvider>
          <AttributionBootstrap />
          {children}

          <Toaster />
          <Sonner />
        </ReduxProvider>
      </body>
    </html>
  );
}
