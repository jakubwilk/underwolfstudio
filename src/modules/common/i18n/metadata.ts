import type { Metadata } from 'next';

import { getPathname } from './navigation';
import { routing, type AppLocale, type AppPathname } from './routing';

// Canonical URL plus hreflang links to every language version of a page.
export function buildAlternates(href: AppPathname, locale: AppLocale): Metadata['alternates'] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ href, locale: l })]),
  );
  return {
    canonical: getPathname({ href, locale }),
    languages: {
      ...languages,
      'x-default': getPathname({ href, locale: routing.defaultLocale }),
    },
  };
}
