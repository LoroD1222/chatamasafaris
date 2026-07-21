import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { HomePage } from "@/features/home/home-page";
import { getRecentTrips } from "@/features/trips/trip-data";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Page() {
  const dictionary = getDictionary(defaultLocale);
  const recentTrips = await getRecentTrips(6);

  return (
    <>
      <SiteHeader locale={defaultLocale} dictionary={dictionary} />
      <HomePage locale={defaultLocale} dictionary={dictionary} recentTrips={recentTrips} />
      <SiteFooter locale={defaultLocale} dictionary={dictionary} />
    </>
  );
}
