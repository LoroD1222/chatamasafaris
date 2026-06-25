import { TripDetailPage } from "@/features/trips/trip-pages";
import { getTripBySlug } from "@/features/trips/trip-data";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const trip = await getTripBySlug(params.slug);
  if (!trip) notFound();
  return <TripDetailPage dictionary={getDictionary("en")} trip={trip} />;
}
