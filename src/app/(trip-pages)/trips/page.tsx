import { TripsListPage } from "@/features/trips/trip-pages";
import { getDictionary } from "@/i18n/dictionaries";

export default function Page() {
  return <TripsListPage dictionary={getDictionary("en")} />;
}
