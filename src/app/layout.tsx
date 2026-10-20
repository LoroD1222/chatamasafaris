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
        <noscript>
          {/* Meta's required noscript tracking fallback cannot use Next's image optimizer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1617053106571679&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Analytics />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1617053106571679');
            fbq('track', 'PageView');
          `}
        </Script>
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
