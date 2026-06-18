import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getTextDirection, isLocale, locales, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Astra Tanzania Safaris | Private Tanzania Safaris for USA Travelers",
  description: "Plan a private Tanzania safari with Astra: expert guides, USD pricing, vetted camps, migration timing, and planner support."
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
