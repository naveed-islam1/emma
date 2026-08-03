import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Support & Contact",
  description:
    "Get help from the Emma team — support for patients and surgeons.",
  alternates: { canonical: "/support" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
