import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test/render';

import { NotFoundPage } from './NotFoundPage';

vi.mock('@/modules/common/i18n/navigation', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
}));

describe('NotFoundPage', () => {
  it('explains the page is missing and links home', () => {
    render(<NotFoundPage />, { locale: 'en' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found');
    expect(screen.getByRole('link', { name: 'Back to the home page' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
