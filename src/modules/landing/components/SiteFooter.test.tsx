import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { SiteFooter } from './SiteFooter';

describe('SiteFooter', () => {
  it('links to LinkedIn in a new tab', () => {
    render(<SiteFooter />);
    const link = screen.getByRole('link', {
      name: /LinkedIn \(otwiera się w nowej karcie\)/,
    });
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/jakub-wilk/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows the copyright as a footer landmark', () => {
    render(<SiteFooter />);
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Underwolf Studio · Warszawa');
  });
});
