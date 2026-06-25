import { TripDetailPage } from "@/features/trips/trip-pages";
import { getTripBySlug } from "@/features/trips/trip-data";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  if (!trip) notFound();
  return <TripDetailPage dictionary={getDictionary("en")} trip={trip} />;
}
