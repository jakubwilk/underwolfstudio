import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { BRAND_LOGO_MARK } from '@/modules/common/utils/site';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const markSvg = await readFile(join(process.cwd(), 'public', BRAND_LOGO_MARK), 'base64');

// iOS requires a raster apple-touch-icon and fills transparency with black,
// so the mark is placed on the site background.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#08080f',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
      <img src={`data:image/svg+xml;base64,${markSvg}`} width={128} height={125} alt="" />
    </div>,
    size,
  );
}
