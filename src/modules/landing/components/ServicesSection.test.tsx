import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen, within } from '@/test/render';

import { ServicesSection } from './ServicesSection';

const problems = () =>
  within(screen.getByRole('tabpanel'))
    .getAllByRole('heading', { level: 4 })
    .map((heading) => heading.textContent);

describe('ServicesSection', () => {
  it('renders the section heading the navigation links to', () => {
    render(<ServicesSection />);
    const section = screen.getByRole('region', { name: 'Usługi' });
    expect(section).toHaveAttribute('id', 'services');
    expect(within(section).getByRole('heading', { level: 2 })).toHaveTextContent('Co robię');
  });

  it('presents automation, AI agents and web applications', () => {
    render(<ServicesSection />);
    for (const name of ['Automatyzacje procesów', 'Agenci AI', 'Aplikacje internetowe']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
    expect(screen.getByText('Next.js · React · TypeScript')).toBeInTheDocument();
  });

  it('shows the accounting problems first', () => {
    render(<ServicesSection />);
    expect(screen.getByRole('tab', { name: 'Biura rachunkowe' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(problems()).toHaveLength(4);
    expect(problems()).toContain('Przepisywanie faktur');
  });

  it('switches the problems to the chosen industry', async () => {
    render(<ServicesSection />);
    await userEvent.click(screen.getByRole('tab', { name: 'Kancelarie' }));

    expect(screen.getByRole('tab', { name: 'Kancelarie' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Kancelarie');
    expect(problems()).toContain('Pilnowanie terminów');
    expect(problems()).not.toContain('Przepisywanie faktur');
  });

  it('moves between industries with the arrow keys', async () => {
    render(<ServicesSection />);
    await userEvent.click(screen.getByRole('tab', { name: 'Biura rachunkowe' }));
    await userEvent.keyboard('{ArrowLeft}');

    const services = screen.getByRole('tab', { name: 'Firmy usługowe' });
    expect(services).toHaveAttribute('aria-selected', 'true');
    expect(services).toHaveFocus();
  });
});
