import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Astra Tanzania Safaris | Private Tanzania Safaris for USA Travelers",
  description: "Plan a private Tanzania safari with Astra: expert guides, USD pricing, vetted camps, migration timing, and planner support."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
