import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/modules/common/utils/site';
import { theme } from '@/modules/common/utils/theme';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  // Search engine ownership checks; the files in public/ verify the same accounts.
  verification: {
    google: 'bXwX5ZVI98qDNBc2ULzzJ6KZt_xzMgOYgXG64vILX0o',
    other: { 'msvalidate.01': '78E9F3E365E82884321010A05A058D95' },
  },
};

export const viewport: Viewport = {
  themeColor: '#08080f',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
