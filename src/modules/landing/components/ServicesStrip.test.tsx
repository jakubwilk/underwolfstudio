import { render, screen } from '@testing-library/react';
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

  it('applies accent class to AI tags', () => {
    render(<ServicesStrip />);
    expect(screen.getByText('AI Agents').className).toContain('services-orbit-tag--accent');
    expect(screen.getByText('AI Workflows').className).toContain('services-orbit-tag--accent');
    expect(screen.getByText('Frontend Application').className).not.toContain(
      'services-orbit-tag--accent',
    );
  });

  it('does not render removed services', () => {
    render(<ServicesStrip />);
    expect(screen.queryByText('Backend API')).not.toBeInTheDocument();
    expect(screen.queryByText('UI / UX Design')).not.toBeInTheDocument();
  });
});
