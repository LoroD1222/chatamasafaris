import { notFound } from "next/navigation";

import { TripDetailPage } from "@/features/trips/trip-pages";
import { sharedTripSlug } from "@/features/trips/trip-data";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: sharedTripSlug }];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug !== sharedTripSlug) {
    notFound();
  }

  return <TripDetailPage dictionary={getDictionary("en")} />;
}
