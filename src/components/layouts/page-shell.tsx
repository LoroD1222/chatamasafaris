import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import type { Locale } from "@/i18n/config";
import type { HomeDictionary } from "@/i18n/types";

export function PageShell({
  locale,
  dictionary,
  children
}: {
  locale: Locale;
  dictionary: HomeDictionary;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      {children}
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  );
}
