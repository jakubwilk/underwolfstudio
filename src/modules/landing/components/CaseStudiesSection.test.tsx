import { describe, expect, it } from 'vitest';

import { MESSAGES } from '@/modules/common/i18n/messages';
import { render, screen, within } from '@/test/render';

import { CaseStudiesSection } from './CaseStudiesSection';

describe('CaseStudiesSection', () => {
  it('shows the deployment running on this site', () => {
    render(<CaseStudiesSection />);
    const section = screen.getByRole('region', { name: 'Realizacje' });
    expect(section).toHaveAttribute('id', 'case-studies');
    expect(within(section).getByRole('heading', { level: 2 })).toHaveTextContent(
      'Jak to działa w praktyce',
    );
    expect(within(section).getAllByRole('listitem')).toHaveLength(1);
    expect(
      within(section).getByRole('heading', { level: 3, name: 'Obsługa zapytań od klientów' }),
    ).toBeInTheDocument();
    expect(within(section).getByText('Działa na tej stronie')).toBeInTheDocument();
  });

  it('lists only real deployments, with no demo projects', () => {
    render(<CaseStudiesSection />);
    expect(screen.queryByText('Demo')).not.toBeInTheDocument();
    expect(Object.keys(MESSAGES.pl.caseStudies.items)).toEqual(['inquiries']);
  });

  it('labels the situation before and after', () => {
    render(<CaseStudiesSection />);
    const study = screen.getByRole('listitem');
    expect(within(study).getByText('Przed').nextElementSibling).toHaveTextContent(
      'musi przeczytać, ocenić',
    );
    expect(within(study).getByText('Po').nextElementSibling).toHaveTextContent(
      'AI klasyfikuje zapytanie',
    );
  });

  it('hides the result until it is filled in', () => {
    render(<CaseStudiesSection />);
    expect(MESSAGES.pl.caseStudies.items.inquiries.result).toBe('');
    // The "after" cell holds only its label and the effect.
    expect(screen.getByRole('listitem').lastElementChild?.children).toHaveLength(2);
  });
});
