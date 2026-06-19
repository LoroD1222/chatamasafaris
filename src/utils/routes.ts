import type { Locale } from "@/i18n/config";

export const sharedTripSlug = "great-migration-classic";

export function localizedHref(locale: Locale, href: string) {
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (href === "/trips" || href.startsWith("/trip/")) {
    return href;
  }

  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function localizedHomeAnchor(locale: Locale, anchor: string) {
  return `/${locale}#${anchor.replace(/^#/, "")}`;
}

export function localizedSharedTripHref(locale: Locale) {
  return localizedHref(locale, `/trip/${sharedTripSlug}`);
}
