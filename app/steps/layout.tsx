import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Join Emma as a Surgeon",
  description:
    "Welcome to Emma, Doctor. Join our growing network of trusted, board-certified surgeons in Mexico.",
  alternates: { canonical: "/steps" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
