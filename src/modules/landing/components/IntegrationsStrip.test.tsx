import { describe, expect, it } from 'vitest';

import { render, screen, within } from '@/test/render';

import { IntegrationsStrip } from './IntegrationsStrip';
import { INTEGRATIONS } from '../utils/integrations';

describe('IntegrationsStrip', () => {
  it('lists every tool, then "more"', () => {
    render(<IntegrationsStrip />);
    const section = screen.getByRole('region', { name: 'Integracje' });
    const chips = within(section)
      .getAllByRole('listitem')
      .map((chip) => chip.textContent);
    expect(chips).toEqual([...INTEGRATIONS, '+ inne']);
  });

  it('translates the label', () => {
    render(<IntegrationsStrip />, { locale: 'en' });
    expect(screen.getByText('Integrations with the tools you already use')).toBeInTheDocument();
    expect(screen.getByText('+ more')).toBeInTheDocument();
  });
});
