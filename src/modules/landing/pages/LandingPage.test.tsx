import { describe, expect, it } from 'vitest';

import { render, screen, within } from '@/test/render';

import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders the main heading', () => {
    render(<LandingPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome tothe AI Era');
  });

  it('renders the studio logo', () => {
    render(<LandingPage />);
    expect(screen.getByRole('img', { name: 'Underwolf Studio' })).toBeInTheDocument();
  });

  it('wraps every section in the main landmark', () => {
    render(<LandingPage />);
    const main = screen.getByRole('main');
    expect(within(main).getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(within(main).getByRole('region', { name: 'How we work' })).toBeInTheDocument();
    expect(within(main).getByRole('region', { name: 'Services' })).toBeInTheDocument();
    expect(within(main).getByRole('region', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders the hero tags as a list', () => {
    render(<LandingPage />);
    const hero = screen.getByRole('region', { name: 'Introduction' });
    const tags = within(hero)
      .getAllByRole('listitem')
      .map((item) => item.textContent);
    expect(tags).toEqual(['Est.2026', 'Warsaw', 'AI-First']);
  });

  it('renders the footer outside the main landmark', () => {
    render(<LandingPage />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent('Underwolf Studio');
    expect(screen.getByRole('main')).not.toContainElement(footer);
  });
});
