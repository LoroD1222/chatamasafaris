import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Astra Tanzania Safaris | Tanzania Safari Trips",
  description: "Browse Tanzania safari itineraries and request a quote from Astra Tanzania Safaris."
};

export default function TripPagesLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#fdfaf3] text-[#403229] antialiased">{children}</body>
    </html>
  );
}
