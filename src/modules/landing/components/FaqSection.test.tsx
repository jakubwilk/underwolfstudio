import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { FaqSection } from './FaqSection';

describe('FaqSection', () => {
  it('renders every question as a heading', () => {
    render(<FaqSection />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(7);
    expect(screen.getByRole('button', { name: 'Co z RODO?' })).toBeInTheDocument();
  });

  it('opens the first answer by default', () => {
    render(<FaqSection />);
    expect(screen.getByRole('button', { name: 'Co z RODO?' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('expands an answer when its question is clicked', async () => {
    render(<FaqSection />);
    const question = screen.getByRole('button', { name: 'Jakie aplikacje internetowe robisz?' });
    expect(question).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(question);

    expect(question).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Buduję je w Next.js, React i TypeScript/)).toBeInTheDocument();
  });

  it('points to the contact form for other questions', () => {
    render(<FaqSection />);
    expect(screen.getByRole('link', { name: 'Napisz bezpośrednio' })).toHaveAttribute(
      'href',
      '#contact',
    );
  });
});
