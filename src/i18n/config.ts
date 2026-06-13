export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar"] as const satisfies readonly Locale[];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getTextDirection(locale: Locale) {
  return rtlLocales.includes(locale as (typeof rtlLocales)[number]) ? "rtl" : "ltr";
}
