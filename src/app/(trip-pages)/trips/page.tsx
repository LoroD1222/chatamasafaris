import { Suspense } from "react";

import { TripsListPage } from "@/features/trips/trip-pages";
import { getTripCards } from "@/features/trips/trip-data";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Page() {
  const trips = await getTripCards();
  return (
    <Suspense fallback={null}>
      <TripsListPage dictionary={getDictionary("en")} initialTrips={trips} />
    </Suspense>
  );
}
