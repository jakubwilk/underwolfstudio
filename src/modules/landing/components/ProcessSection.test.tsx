import { describe, expect, it } from 'vitest';

import { render, screen, within } from '@/test/render';

import { ProcessSection } from './ProcessSection';

describe('ProcessSection', () => {
  it('lists the four numbered steps in order', () => {
    render(<ProcessSection />);
    const section = screen.getByRole('region', { name: 'Jak pracuję' });
    expect(section).toHaveAttribute('id', 'process');
    const steps = within(section)
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(steps).toEqual(['Wiadomość', 'Analiza i wycena', 'Wdrożenie', 'Wsparcie']);
    expect(within(section).getByRole('list').tagName).toBe('OL');
    expect(within(section).getByText('Krok 01')).toBeInTheDocument();
  });

  it('shows individual pricing next to the heading', () => {
    render(<ProcessSection />);
    expect(screen.getByText('Indywidualna cena')).toBeInTheDocument();
    expect(screen.getByText(/^Cena zależy od liczby systemów/)).toBeInTheDocument();
  });

  it('shows the pricing in English', () => {
    render(<ProcessSection />, { locale: 'en' });
    expect(screen.getByText('Custom pricing')).toBeInTheDocument();
  });
});
