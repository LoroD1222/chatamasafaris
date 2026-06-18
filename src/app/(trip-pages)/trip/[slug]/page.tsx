import { TripDetailPage } from "@/features/trips/trip-pages";
import { sharedTripSlug } from "@/features/trips/trip-data";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return [{ slug: sharedTripSlug }];
}

export default function Page() {
  return <TripDetailPage dictionary={getDictionary("en")} />;
}
