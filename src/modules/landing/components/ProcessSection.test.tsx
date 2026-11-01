import { describe, expect, it } from 'vitest';

import { render, screen, within } from '@/test/render';

import { ProcessSection } from './ProcessSection';

// Intl separates thousands and currency with non-breaking spaces.
const normalize = (text: string | null) => text?.replace(/\s/g, ' ');

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

  it('shows the starting price next to the heading', () => {
    render(<ProcessSection />);
    expect(normalize(screen.getByText(/^od .* netto$/).textContent)).toBe('od 3 000 zł netto');
    expect(screen.getByText(/^Cena zależy od liczby systemów/)).toBeInTheDocument();
  });

  it('formats the price for English', () => {
    render(<ProcessSection />, { locale: 'en' });
    expect(normalize(screen.getByText(/^from PLN/).textContent)).toBe('from PLN 3,000 net');
  });
});
