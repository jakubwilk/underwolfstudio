import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { render } from '@/test/render';

import { Analytics } from './Analytics';

vi.mock('next/script', () => ({
  default: (props: ComponentProps<'script'>) => <script data-testid="umami" {...props} />,
}));

describe('Analytics', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders nothing without a website ID', () => {
    vi.stubEnv('NEXT_PUBLIC_UMAMI_WEBSITE_ID', '');
    const { container } = render(<Analytics />);
    expect(container.querySelector('script')).toBeNull();
  });

  it('loads the Umami script for the configured website', () => {
    vi.stubEnv('NEXT_PUBLIC_UMAMI_WEBSITE_ID', 'abc-123');
    const { container } = render(<Analytics />);
    const script = container.querySelector('script');
    expect(script).toHaveAttribute('src', 'https://cloud.umami.is/script.js');
    expect(script).toHaveAttribute('data-website-id', 'abc-123');
  });
});
