import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test/render';

import { LocaleAnchor } from './LocaleAnchor';

vi.mock('../i18n/navigation', () => ({
  Link: ({ href, ...props }: ComponentProps<'a'>) => <a href={`/en${href}`} {...props} />,
}));

describe('LocaleAnchor', () => {
  it('renders a locale-aware link', () => {
    render(<LocaleAnchor href="/">Home</LocaleAnchor>);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/en/');
  });
});
