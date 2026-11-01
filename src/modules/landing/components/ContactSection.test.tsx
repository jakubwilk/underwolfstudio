import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  it('renders a labelled section the hero can link to', () => {
    render(<ContactSection />);
    const section = screen.getByRole('region', { name: 'Kontakt' });
    expect(section).toHaveAttribute('id', 'contact');
    expect(section).toContainElement(
      screen.getByRole('heading', { level: 2, name: 'Napisz, co zajmuje Ci najwięcej czasu' }),
    );
  });

  it('contains the contact form', () => {
    render(<ContactSection />);
    expect(screen.getByRole('button', { name: 'Wyślij wiadomość' })).toBeInTheDocument();
  });
});
