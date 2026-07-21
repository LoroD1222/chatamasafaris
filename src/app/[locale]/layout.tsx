import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getTextDirection, isLocale, locales, type Locale } from "@/i18n/config";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;

  return <div lang={locale} dir={getTextDirection(locale)}>{children}</div>;
}
