import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  it('renders a labelled section with a heading', () => {
    render(<ContactSection />);
    const section = screen.getByRole('region', { name: 'Contact' });
    expect(section).toContainElement(
      screen.getByRole('heading', { level: 2, name: "Let's work together" }),
    );
  });

  it('links to the LinkedIn profile in a new tab', () => {
    render(<ContactSection />);
    const link = screen.getByRole('link', { name: /Connect on LinkedIn \(opens in a new tab\)/ });
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/jakub-wilk/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
