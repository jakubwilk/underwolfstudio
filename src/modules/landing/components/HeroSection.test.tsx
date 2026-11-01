import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { HeroSection } from './HeroSection';

// Intl separates thousands and currency with non-breaking spaces.
const normalize = (text: string | null) => text?.replace(/\s/g, ' ');

describe('HeroSection', () => {
  it('renders the outcome as the main heading in the section the logo links to', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Twoja firma na autopilocie',
    );
    expect(screen.getByRole('region', { name: 'Wprowadzenie' })).toHaveAttribute('id', 'top');
  });

  it('names all three services above the heading', () => {
    render(<HeroSection />);
    expect(
      screen.getByText('Automatyzacje · Agenci AI · Aplikacje internetowe'),
    ).toBeInTheDocument();
  });

  it('has no frame label or index, which the top of the page would cut off', () => {
    render(<HeroSection />);
    expect(screen.queryByText('underwolf')).not.toBeInTheDocument();
    expect(screen.queryByText('[00]')).not.toBeInTheDocument();
  });

  it('sends the call to action to the contact form and tracks it', () => {
    render(<HeroSection />);
    const cta = screen.getByRole('link', { name: 'Opisz swój proces' });
    expect(cta).toHaveAttribute('href', '#contact');
    expect(cta).toHaveAttribute('data-umami-event', 'cta_click');
  });

  it('shows the starting price and GDPR as key facts', () => {
    render(<HeroSection />);
    const values = screen.getAllByRole('definition').map((value) => normalize(value.textContent));
    expect(values).toEqual(['od 3 000 zł', 'RODO']);
  });

  it('shows the example workflow', () => {
    render(<HeroSection />);
    expect(screen.getByRole('figure')).toHaveTextContent('Odczyt danych przez AI');
  });
});
