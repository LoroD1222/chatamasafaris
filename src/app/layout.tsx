import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Catama Safaris | Private Tanzania Safaris for USA Travelers",
  description: "Plan a private Tanzania safari with Catama Safaris: expert guides, USD pricing, vetted camps, migration timing, and planner support.",
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png", sizes: "59x59" },
      { url: "/favicon.ico?v=2", type: "image/x-icon", sizes: "59x59" }
    ],
    shortcut: ["/icon.png?v=2"],
    apple: [{ url: "/icon.png?v=2", type: "image/png", sizes: "59x59" }]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
