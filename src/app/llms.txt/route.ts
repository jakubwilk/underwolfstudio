import { buildLlmsTxt } from '@/modules/landing/utils/seo';

// Generated once at build time from the same content as the page.
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
