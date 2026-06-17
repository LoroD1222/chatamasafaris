import { notFound } from "next/navigation";

import { TripPage } from "@/features/pages/static-pages";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sharedTripSlug } from "@/utils/routes";

export function generateStaticParams() {
  return [{ locale: "en", slug: sharedTripSlug }];
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  if (slug !== sharedTripSlug) {
    notFound();
  }

  return <TripPage locale={locale} dictionary={dictionary} />;
}
