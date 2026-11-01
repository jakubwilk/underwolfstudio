import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';

import { MESSAGES } from '@/modules/common/i18n/messages';
import { routing } from '@/modules/common/i18n/routing';
import { BRAND_LOGO_FULL, SITE_NAME } from '@/modules/common/utils/site';

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const logoSvg = await readFile(join(process.cwd(), 'public', BRAND_LOGO_FULL), 'base64');

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { metadata } =
    MESSAGES[hasLocale(routing.locales, locale) ? locale : routing.defaultLocale];

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        background: '#0b0c11',
        backgroundImage:
          'radial-gradient(circle at 50% 120%, rgba(123,124,246,0.22), transparent 60%)',
        color: '#ececf1',
        fontFamily: 'sans-serif',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
      <img src={`data:image/svg+xml;base64,${logoSvg}`} width={416} height={60} alt={SITE_NAME} />
      <div
        style={{
          display: 'flex',
          maxWidth: 1040,
          textAlign: 'center',
          fontSize: 92,
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: -3,
        }}
      >
        {metadata.ogHeadline}
      </div>
    </div>,
    size,
  );
}
