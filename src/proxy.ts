import createMiddleware from 'next-intl/middleware';

import { routing } from '@/modules/common/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals, generated icons and OG
  // images, and files with an extension (llms.txt, sitemap.xml, verification files).
  matcher: '/((?!api|_next|_vercel|apple-icon|.*opengraph-image|.*\\..*).*)',
};
