import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Chatama Safaris | Private Tanzania Safari Tours",
  description: "Private guided safaris across the Serengeti, Ngorongoro Crater, and Zanzibar. Tailor-made Tanzania trips with expert local guides. Start planning your safari today.",
  icons: {
    icon: [
      { url: "/icon.png?v=3", type: "image/png", sizes: "59x59" },
      { url: "/favicon.ico?v=3", type: "image/x-icon", sizes: "59x59" }
    ],
    shortcut: ["/icon.png?v=3"],
    apple: [{ url: "/icon.png?v=3", type: "image/png", sizes: "59x59" }]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18226330867"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18226330867');
          `}
        </Script>
      </body>
    </html>
  );
}
