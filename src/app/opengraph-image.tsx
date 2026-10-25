import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { BRAND_LOGO_FULL, SITE_NAME, SITE_TITLE } from '@/modules/common/utils/site';

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const logoSvg = await readFile(join(process.cwd(), 'public', BRAND_LOGO_FULL), 'base64');

export default function OpengraphImage() {
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
        background: '#08080f',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 2px, transparent 2px)',
        backgroundSize: '42px 42px',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
      <img src={`data:image/svg+xml;base64,${logoSvg}`} width={416} height={60} alt={SITE_NAME} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 112,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: -3,
        }}
      >
        <span>Welcome to</span>
        <span>the AI Era</span>
      </div>
    </div>,
    size,
  );
}
