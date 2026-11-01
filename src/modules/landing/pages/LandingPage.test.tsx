import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen, within } from '@/test/render';

import { LandingPage } from './LandingPage';

vi.mock('@/modules/common/i18n/navigation', () => ({
  usePathname: () => '/',
  Link: ({ locale, ...props }: ComponentProps<'a'> & { locale?: string }) => (
    <a data-locale={locale} {...props} />
  ),
}));

describe('LandingPage', () => {
  it('renders the sections in order inside the main landmark', () => {
    render(<LandingPage />);
    const main = screen.getByRole('main');
    // Open accordion panels are regions too, so only <section>s count.
    const sections = within(main)
      .getAllByRole('region')
      .filter((region) => region.tagName === 'SECTION')
      .map((section) => section.getAttribute('aria-label'));
    expect(sections).toEqual([
      'Wprowadzenie',
      'Integracje',
      'Usługi',
      'Realizacje',
      'Jak pracuję',
      'Najczęstsze pytania',
      'Kontakt',
    ]);
  });

  it('renders a single main heading', () => {
    render(<LandingPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders the page in English', () => {
    render(<LandingPage />, { locale: 'en' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Your business on autopilot',
    );
  });

  it('renders the header with the navigation before the main landmark', () => {
    render(<LandingPage />);
    const header = screen.getByRole('banner');
    expect(within(header).getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).not.toContainElement(header);
  });

  it('gives every navigation link a section to scroll to', () => {
    const { container } = render(<LandingPage />);
    const nav = screen.getByRole('navigation');
    for (const link of within(nav).getAllByRole('link')) {
      const target = link.getAttribute('href') ?? '';
      expect(container.querySelector(target)).not.toBeNull();
    }
  });

  it('renders the footer outside the main landmark', () => {
    render(<LandingPage />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent('Underwolf Studio');
    expect(screen.getByRole('main')).not.toContainElement(footer);
  });
});
