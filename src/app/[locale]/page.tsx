import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';

import { buildAlternates } from '@/modules/common/i18n/metadata';
import { routing } from '@/modules/common/i18n/routing';
import { LandingPage } from '@/modules/landing/pages/LandingPage';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return { alternates: buildAlternates('/', locale) };
}

export default function Home() {
  return <LandingPage />;
}
