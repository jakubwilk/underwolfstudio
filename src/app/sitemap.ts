import type { MetadataRoute } from 'next';

import { getPathname } from '@/modules/common/i18n/navigation';
import { routing, type AppPathname } from '@/modules/common/i18n/routing';
import { SITE_URL } from '@/modules/common/utils/site';

const PAGES: { href: AppPathname; priority: number }[] = [{ href: '/', priority: 1 }];

const url = (href: AppPathname, locale: (typeof routing.locales)[number]) =>
  `${SITE_URL}${getPathname({ href, locale })}`.replace(/\/$/, '');

// One entry per page and language, each listing all its language versions.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ href, priority }) =>
    routing.locales.map((locale) => ({
      url: url(href, locale),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, url(href, l)])),
      },
    })),
  );
}
