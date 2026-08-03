import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Emma account.",
  alternates: { canonical: "/signin" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
