import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Chatama Safaris | Private Tanzania Safari Tours",
  description: "Private guided safaris across the Serengeti, Ngorongoro Crater, and Zanzibar. Tailor-made Tanzania trips with expert local guides. Start planning your safari today.",
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
