import type { Metadata } from "next";
import type { ReactNode } from "react";
import { faqs } from "./faqs";

export const metadata: Metadata = {
  title: "FAQ — Surgery in Mexico, Answered",
  description:
    "Answers to common questions about getting surgery in Mexico with Emma: safety, surgeon verification, pricing, travel, and recovery.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
