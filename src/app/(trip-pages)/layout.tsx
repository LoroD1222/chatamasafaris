import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Catama Safaris | Tanzania Safari Trips",
  description: "Browse Tanzania safari itineraries and request a quote from Catama Safaris.",
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png", sizes: "59x59" },
      { url: "/favicon.ico?v=2", type: "image/x-icon", sizes: "59x59" }
    ],
    shortcut: ["/icon.png?v=2"],
    apple: [{ url: "/icon.png?v=2", type: "image/png", sizes: "59x59" }]
  }
};

export default function TripPagesLayout({ children }: { children: ReactNode }) {
  return children;
}
