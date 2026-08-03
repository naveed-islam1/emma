import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Chat with Emma — Get Matched with a Surgeon",
  description:
    "Tell Emma the results you want and get matched with a verified, board-certified surgeon in Mexico.",
  alternates: { canonical: "/chat" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
