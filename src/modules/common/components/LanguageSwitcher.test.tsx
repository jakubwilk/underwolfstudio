import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test/render';

import { LanguageSwitcher } from './LanguageSwitcher';

vi.mock('../i18n/navigation', () => ({
  usePathname: () => '/',
  Link: ({ href, locale, ...props }: ComponentProps<'a'> & { locale: string }) => (
    <a href={`/${locale}${href}`} {...props} />
  ),
}));

describe('LanguageSwitcher', () => {
  it('links to the current page in the other language', () => {
    render(<LanguageSwitcher />);
    const link = screen.getByRole('link', { name: 'English version' });
    expect(link).toHaveAttribute('href', '/en/');
    expect(link).toHaveAttribute('hreflang', 'en');
    expect(link).toHaveTextContent('EN');
  });

  it('shows the current language next to the link', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('pl')).toBeInTheDocument();
  });
});
