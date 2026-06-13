import { render, screen } from '@/test/render';
import { describe, expect, it } from 'vitest';

import { ServicesStrip } from './ServicesStrip';

describe('ServicesStrip', () => {
  it('renders the section label', () => {
    render(<ServicesStrip />);
    expect(screen.getByText('What we build')).toBeInTheDocument();
  });

  it('renders all service tags', () => {
    render(<ServicesStrip />);
    expect(screen.getAllByText('AI Agents').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI Workflows').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Fullstack Web Application').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Frontend Application').length).toBeGreaterThan(0);
  });

  it('applies accent colour to AI tags and not to others', () => {
    render(<ServicesStrip />);
    expect(screen.getAllByText('AI Agents')[0].className).toContain('text-(--accent)');
    expect(screen.getAllByText('AI Workflows')[0].className).toContain('text-(--accent)');
    expect(screen.getAllByText('Frontend Application')[0].className).not.toContain(
      'text-(--accent)',
    );
  });

  it('does not render removed services', () => {
    render(<ServicesStrip />);
    expect(screen.queryByText('Backend API')).not.toBeInTheDocument();
    expect(screen.queryByText('UI / UX Design')).not.toBeInTheDocument();
  });
});
