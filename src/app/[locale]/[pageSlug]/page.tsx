import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ContactPage, isServicePageSlug, ServicePage, servicePageSlugs } from "@/features/pages/static-pages";

export function generateStaticParams() {
  return [...servicePageSlugs, "contact"].map((pageSlug) => ({ locale: "en", pageSlug }));
}

export default async function Page({ params }: { params: Promise<{ locale: string; pageSlug: string }> }) {
  const { locale: localeParam, pageSlug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  if (pageSlug === "contact") {
    return <ContactPage locale={locale} dictionary={dictionary} />;
  }

  if (!isServicePageSlug(pageSlug)) {
    notFound();
  }

  return <ServicePage locale={locale} dictionary={dictionary} slug={pageSlug} />;
}
