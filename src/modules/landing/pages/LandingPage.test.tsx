import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders the main heading', () => {
    render(<LandingPage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
  });

  it('renders the studio label', () => {
    render(<LandingPage />);
    expect(screen.getByText('Underwolf Studio')).toBeDefined();
  });
});
