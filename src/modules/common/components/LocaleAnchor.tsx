'use client';

import { Anchor, type AnchorProps } from '@mantine/core';
import type { ReactNode } from 'react';

import { Link } from '../i18n/navigation';
import type { AppPathname } from '../i18n/routing';

interface LocaleAnchorProps extends AnchorProps {
  href: AppPathname;
  children: ReactNode;
}

// Mantine Anchor rendered as a locale-aware link. A client component, since
// server components can't pass `Link` to Mantine's `component` prop.
export function LocaleAnchor({ href, children, ...props }: LocaleAnchorProps) {
  return (
    <Anchor component={Link} href={href} {...props}>
      {children}
    </Anchor>
  );
}
