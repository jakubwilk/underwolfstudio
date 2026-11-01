import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { Section } from './Section';

describe('Section', () => {
  it('renders a labelled region the navigation can link to', () => {
    render(
      <Section id="faq" ariaLabel="FAQ">
        <p>Treść</p>
      </Section>,
    );
    const section = screen.getByRole('region', { name: 'FAQ' });
    expect(section).toHaveAttribute('id', 'faq');
    expect(section).toHaveTextContent('Treść');
  });

  it('uses the alternate background when asked', () => {
    render(
      <Section ariaLabel="FAQ" alt>
        <p>Treść</p>
      </Section>,
    );
    expect(screen.getByRole('region', { name: 'FAQ' })).toHaveClass('bg-(--bg-alt)');
  });
});
