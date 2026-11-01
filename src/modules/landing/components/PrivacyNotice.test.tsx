import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/render';

import { PrivacyNotice } from './PrivacyNotice';

describe('PrivacyNotice', () => {
  it('states briefly what the form data is used for', () => {
    render(<PrivacyNotice />);
    expect(
      screen.getByText(/Dane z formularza wykorzystam tylko do odpowiedzi na wiadomość\./),
    ).toBeInTheDocument();
  });

  it('expands the full information in place', async () => {
    render(<PrivacyNotice />);
    const toggle = screen.getByRole('button', { name: 'Jak przetwarzam dane?' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('privacy-notice')).toBeInTheDocument();
    for (const term of ['Administrator', 'Cel', 'Odbiorcy', 'Przechowywanie', 'Prawa']) {
      expect(screen.getByText(term)).toBeInTheDocument();
    }
    expect(screen.getByText(/Do 30 dni od ostatniego kontaktu/)).toBeInTheDocument();
    expect(screen.getByText(/skarga do Prezesa UODO/)).toBeInTheDocument();
  });
});
