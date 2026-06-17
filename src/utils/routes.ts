import type { Locale } from "@/i18n/config";

export function localizedHref(locale: Locale, href: string) {
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function localizedHomeAnchor(locale: Locale, anchor: string) {
  return `/${locale}#${anchor.replace(/^#/, "")}`;
}
