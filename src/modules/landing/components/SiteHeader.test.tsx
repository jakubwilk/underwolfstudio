import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen, within } from '@/test/render';

import { SiteHeader } from './SiteHeader';

vi.mock('@/modules/common/i18n/navigation', () => ({
  usePathname: () => '/',
  Link: ({ locale, ...props }: ComponentProps<'a'> & { locale: string }) => (
    <a data-locale={locale} {...props} />
  ),
}));

describe('SiteHeader', () => {
  it('links to every section from the main navigation', () => {
    render(<SiteHeader />);
    const nav = screen.getByRole('navigation', { name: 'Nawigacja główna' });
    const links = within(nav)
      .getAllByRole('link')
      .map((link) => [link.textContent, link.getAttribute('href')]);
    expect(links).toEqual([
      ['Usługi', '#services'],
      ['Realizacje', '#case-studies'],
      ['Współpraca', '#process'],
      ['FAQ', '#faq'],
    ]);
  });

  it('sends the call to action to the contact form', () => {
    render(<SiteHeader />);
    expect(screen.getByRole('link', { name: 'Umów konsultację' })).toHaveAttribute(
      'href',
      '#contact',
    );
  });

  it('links the logo to the top of the page and offers the English version', () => {
    render(<SiteHeader />);
    expect(screen.getByRole('link', { name: 'Underwolf Studio' })).toHaveAttribute('href', '#top');
    expect(screen.getByRole('link', { name: 'English version' })).toHaveAttribute(
      'data-locale',
      'en',
    );
  });

  it('opens the menu drawer from the burger button', async () => {
    render(<SiteHeader />);
    const burger = screen.getByRole('button', { name: 'Otwórz menu' });
    expect(burger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(burger);

    expect(burger).toHaveAttribute('aria-expanded', 'true');
    const drawer = await screen.findByRole('dialog');
    expect(within(drawer).getByRole('link', { name: 'Realizacje' })).toBeInTheDocument();
  });
});
