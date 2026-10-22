import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { ZanzibarSafariPage } from "@/features/zanzibar-safari/zanzibar-safari-page";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamic = "force-static";

export const metadata = {
  title: "Tanzania Safari + Zanzibar Escape | Chatama Safaris",
  description: "Three days of private Tanzania safari followed by three days in Zanzibar, including one extra Zanzibar day free. Request your personalized quote."
};

export default function ZanzibarSafariRoute() {
  const dictionary = getDictionary(defaultLocale);
  const landingDictionary = {
    ...dictionary,
    header: { ...dictionary.header, plannerCta: "Plan My Safari & Zanzibar Trip" }
  };

  return (
    <>
      <SiteHeader locale={defaultLocale} dictionary={landingDictionary} compactNavigation />
      <ZanzibarSafariPage dictionary={landingDictionary} />
      <SiteFooter locale={defaultLocale} dictionary={dictionary} />
    </>
  );
}
