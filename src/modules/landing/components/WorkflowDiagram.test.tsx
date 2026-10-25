import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { WorkflowDiagram } from './WorkflowDiagram';

describe('WorkflowDiagram', () => {
  it('renders the workflow as a described image on a canvas', () => {
    render(<WorkflowDiagram />);
    const canvas = screen.getByRole('group', { name: 'Workflow canvas' });
    const diagram = screen.getByRole('img', { name: /^Workflow: New process, then/ });
    expect(canvas).toContainElement(diagram);
    expect(diagram).toHaveAccessibleName(
      /Integrations include Google, .*PostgreSQL, Redis and more\.$/,
    );
  });

  it('labels every step of the chain', () => {
    render(<WorkflowDiagram />);
    for (const label of ['New process', 'Prepare data', 'Integrations', 'Ship to production']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('labels the integrations', () => {
    render(<WorkflowDiagram />);
    for (const label of ['REST API', 'SMTP', 'Slack', 'SAP / ERP', 'PostgreSQL', 'Redis']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('lights the chain edges up in order', () => {
    const { container } = render(<WorkflowDiagram />);
    const delays = [...container.querySelectorAll<SVGElement>('.animate-flow-draw')].map(
      (el) => el.style.animationDelay,
    );
    expect(delays).toEqual(['300ms', '900ms', '1500ms', '2100ms', '2700ms', '3300ms']);
  });
});
