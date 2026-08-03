import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create Your Account",
  description:
    "Create your Emma account.",
  alternates: { canonical: "/signup" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
