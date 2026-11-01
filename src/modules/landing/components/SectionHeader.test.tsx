import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders the numbered label, the heading and the description', () => {
    render(<SectionHeader index="01" label="Usługi" title="Co robię" description="Opis" />);
    expect(screen.getByText('01 — Usługi')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Co robię' })).toBeInTheDocument();
    expect(screen.getByText('Opis')).toBeInTheDocument();
  });

  it('renders the aside next to the heading', () => {
    render(<SectionHeader index="03" label="Współpraca" title="Jak pracuję" aside={<p>Cena</p>} />);
    expect(screen.getByText('Cena')).toBeInTheDocument();
  });
});
