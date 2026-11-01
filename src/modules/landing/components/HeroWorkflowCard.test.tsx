import { describe, expect, it } from 'vitest';

import { render, screen, within } from '@/test/render';

import { HeroWorkflowCard } from './HeroWorkflowCard';

describe('HeroWorkflowCard', () => {
  it('renders the example workflow as a captioned figure', () => {
    render(<HeroWorkflowCard />);
    const figure = screen.getByRole('figure', { name: /Dokumenty kosztowe → księgowość/ });
    expect(figure).toHaveTextContent('Aktywny');
  });

  it('lists the five steps in order, each lighting up after the previous one', () => {
    render(<HeroWorkflowCard />);
    const steps = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveTextContent('Nowa faktura w skrzynce');
    expect(steps[4]).toHaveTextContent('Powiadomienie zespołu');
    expect(steps.map((step) => step.style.animationDelay)).toEqual([
      '0s',
      '1.5s',
      '3s',
      '4.5s',
      '6s',
    ]);
  });
});
