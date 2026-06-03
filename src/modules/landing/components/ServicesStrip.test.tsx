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
    expect(screen.getByText('AI Agents')).toBeInTheDocument();
    expect(screen.getByText('AI Workflows')).toBeInTheDocument();
    expect(screen.getByText('Fullstack Web Application')).toBeInTheDocument();
    expect(screen.getByText('Frontend Application')).toBeInTheDocument();
  });

  it('applies accent colour to AI tags and not to others', () => {
    render(<ServicesStrip />);
    expect(screen.getByText('AI Agents').className).toContain('text-[var(--accent)]');
    expect(screen.getByText('AI Workflows').className).toContain('text-[var(--accent)]');
    expect(screen.getByText('Frontend Application').className).not.toContain(
      'text-[var(--accent)]',
    );
  });

  it('does not render removed services', () => {
    render(<ServicesStrip />);
    expect(screen.queryByText('Backend API')).not.toBeInTheDocument();
    expect(screen.queryByText('UI / UX Design')).not.toBeInTheDocument();
  });
});
