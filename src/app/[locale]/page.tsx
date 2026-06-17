import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { HomePage } from "@/features/home/home-page";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <HomePage locale={locale} dictionary={dictionary} />
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  );
}
