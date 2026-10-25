import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { ServicesStrip } from './ServicesStrip';

const SERVICE_TITLES = [
  'AI Agents',
  'AI Workflows',
  'Fullstack Web Application',
  'Frontend Application',
];

describe('ServicesStrip', () => {
  it('renders the section heading', () => {
    render(<ServicesStrip />);
    expect(screen.getByRole('heading', { level: 2, name: 'What we build' })).toBeInTheDocument();
  });

  it('renders every service as a level-3 heading', () => {
    render(<ServicesStrip />);
    for (const title of SERVICE_TITLES) {
      expect(screen.getAllByRole('heading', { level: 3, name: title }).length).toBeGreaterThan(0);
    }
  });

  it('renders services as list items', () => {
    render(<ServicesStrip />);
    // Desktop and mobile layouts are both in the DOM; CSS hides one of them.
    expect(screen.getAllByRole('listitem')).toHaveLength(SERVICE_TITLES.length * 2);
  });

  it('applies accent colour to AI tags and not to others', () => {
    render(<ServicesStrip />);
    expect(screen.getAllByText('AI Agents')[0].className).toContain('text-(--accent)');
    expect(screen.getAllByText('AI Workflows')[0].className).toContain('text-(--accent)');
    expect(screen.getAllByText('Frontend Application')[0].className).not.toContain(
      'text-(--accent)',
    );
  });
});
