import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const urlPrefix = siteUrl || basePath;

  return {
    title: {
      default: dict.meta.siteName,
      template: `%s · ${dict.meta.titleSuffix}`,
    },
    description: dict.meta.description,
    alternates: {
      languages: {
        pt: `${urlPrefix}/pt/`,
        en: `${urlPrefix}/en/`,
      },
    },
    openGraph: {
      title: dict.meta.siteName,
      description: dict.meta.description,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteName,
      description: dict.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return (
    <div lang={locale === "pt" ? "pt-BR" : "en"} className="flex min-h-screen flex-col">
      <BackgroundCanvas />
      <ScrollProgress />
      <ScrollToTop />
      <Nav locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
