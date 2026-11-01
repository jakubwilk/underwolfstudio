import { defineRouting } from 'next-intl/routing';

// Polish is the main language and lives at `/`; English sits under `/en`.
// No redirects based on the browser language: Polish clients often browse in
// English, and `/` should always be the Polish page.
export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export const OG_LOCALES: Record<AppLocale, string> = { pl: 'pl_PL', en: 'en_US' };
