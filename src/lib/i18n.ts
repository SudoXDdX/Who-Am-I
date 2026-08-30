export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}

/** Static params for every [locale] segment, used by generateStaticParams(). */
export function localeParams() {
  return locales.map((locale) => ({ locale }));
}
