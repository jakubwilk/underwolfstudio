import { useLocale } from 'next-intl';

import { buildJsonLd, serializeJsonLd } from '../utils/seo';

// JSON-LD describing the studio, its services and founder for search engines and LLMs.
export function StructuredData() {
  const locale = useLocale();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd(locale)) }}
    />
  );
}
