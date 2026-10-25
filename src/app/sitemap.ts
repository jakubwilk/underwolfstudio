import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/modules/common/utils/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: 'monthly', priority: 1 }];
}
