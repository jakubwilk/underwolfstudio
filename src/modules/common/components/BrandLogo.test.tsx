import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { BrandLogo } from './BrandLogo';

describe('BrandLogo', () => {
  it('is exposed as an image named after the studio', () => {
    render(<BrandLogo />);
    expect(screen.getByRole('img', { name: 'Underwolf Studio' })).toBeInTheDocument();
  });

  it('accepts a custom accessible label', () => {
    render(<BrandLogo label="Home" />);
    expect(screen.getByRole('img', { name: 'Home' })).toBeInTheDocument();
  });

  it('passes props through to the svg element', () => {
    render(<BrandLogo className="logo" />);
    expect(screen.getByRole('img')).toHaveClass('logo');
  });

  it('colours the wordmark with currentColor and the wolf with the accent token', () => {
    render(<BrandLogo />);
    const fills = Array.from(screen.getByRole('img').querySelectorAll('path')).map((path) =>
      path.getAttribute('fill'),
    );
    expect(fills).toContain('currentColor');
    expect(fills).toContain('var(--accent)');
  });
});
