import type { Metadata } from "next";
import type { ReactNode } from "react";
import DashboardShell from "./dashboard-shell";

// Private doctor portal — keep out of search engines.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
