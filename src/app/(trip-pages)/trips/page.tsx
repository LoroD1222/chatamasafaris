import { Suspense } from "react";

import { TripsListPage } from "@/features/trips/trip-pages";
import { getTripCards } from "@/features/trips/trip-data";
import { getDictionary } from "@/i18n/dictionaries";

// Refresh the trip catalogue from Sanity at least once per minute.
export const revalidate = 60;

export default async function Page() {
  const trips = await getTripCards();
  return (
    <Suspense fallback={null}>
      <TripsListPage dictionary={getDictionary("en")} initialTrips={trips} />
    </Suspense>
  );
}
