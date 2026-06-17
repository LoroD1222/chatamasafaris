import { notFound } from "next/navigation";

import { TripPage } from "@/features/pages/static-pages";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  const dictionary = getDictionary("en");

  return dictionary.itineraries.items.map((item) => ({ locale: "en", slug: item.slug }));
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const itinerary = dictionary.itineraries.items.find((item) => item.slug === slug);

  if (!itinerary) {
    notFound();
  }

  return <TripPage locale={locale} dictionary={dictionary} itinerary={itinerary} />;
}
