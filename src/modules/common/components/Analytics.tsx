import Script from 'next/script';

import { UMAMI_SCRIPT_URL } from '../utils/analytics';

// Cookie-free Umami analytics; rendered only when a website ID is configured,
// so local and preview builds don't report visits.
export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;
  return <Script src={UMAMI_SCRIPT_URL} data-website-id={websiteId} strategy="afterInteractive" />;
}
