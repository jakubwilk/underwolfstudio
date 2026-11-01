import { MantineProvider } from '@mantine/core';
import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import '@mantine/core/styles.css';
import '../globals.css';

import { Analytics } from '@/modules/common/components/Analytics';
import { OG_LOCALES, routing } from '@/modules/common/i18n/routing';
import { SITE_NAME, SITE_URL } from '@/modules/common/utils/site';
import { theme } from '@/modules/common/utils/theme';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Site-wide defaults; each page sets its own title, description and alternates.
export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: t('title'),
      description: t('description'),
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    // Search engine ownership checks; the files in public/ verify the same accounts.
    verification: {
      google: 'bXwX5ZVI98qDNBc2ULzzJ6KZt_xzMgOYgXG64vILX0o',
      other: { 'msvalidate.01': '78E9F3E365E82884321010A05A058D95' },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#0b0c11',
  colorScheme: 'dark',
};

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    // The site is dark-only, so the colour scheme is fixed in the markup instead
    // of set by Mantine's <ColorSchemeScript>: a <script> in the root layout
    // makes React warn when switching language re-renders the layout.
    <html
      lang={locale}
      data-mantine-color-scheme="dark"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <MantineProvider theme={theme} forceColorScheme="dark">
            {children}
          </MantineProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
