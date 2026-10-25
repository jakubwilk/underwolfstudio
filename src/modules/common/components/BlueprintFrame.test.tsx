import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { BlueprintFrame } from './BlueprintFrame';

describe('BlueprintFrame', () => {
  it('renders children', () => {
    render(
      <BlueprintFrame>
        <p>Content</p>
      </BlueprintFrame>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(<BlueprintFrame label="underwolf">content</BlueprintFrame>);
    expect(screen.getByText('underwolf')).toBeInTheDocument();
  });

  it('renders the index when provided', () => {
    render(<BlueprintFrame index="01">content</BlueprintFrame>);
    expect(screen.getByText('[01]')).toBeInTheDocument();
  });

  it('does not render label or index when omitted', () => {
    render(<BlueprintFrame>content</BlueprintFrame>);
    expect(screen.queryByText('underwolf')).not.toBeInTheDocument();
    expect(screen.queryByText(/^\[.*\]$/)).not.toBeInTheDocument();
  });
});
