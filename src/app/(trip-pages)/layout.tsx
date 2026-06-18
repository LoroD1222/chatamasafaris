import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Astra Tanzania Safaris | Tanzania Safari Trips",
  description: "Browse Tanzania safari itineraries and request a quote from Astra Tanzania Safaris."
};

export default function TripPagesLayout({ children }: { children: ReactNode }) {
  return children;
}
