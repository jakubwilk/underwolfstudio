import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test/render';

import { ContactForm } from './ContactForm';

// Stand-in for the Cloudflare widget: a button that "solves" the challenge.
vi.mock('@marsidev/react-turnstile', () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
    <button type="button" onClick={() => onSuccess('turnstile-token')}>
      Verify
    </button>
  ),
}));

const NOW = 1_800_000_000_000;

async function fillIn() {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  await user.type(screen.getByLabelText('Imię'), 'Anna');
  await user.type(screen.getByLabelText('Email'), 'anna@biuro.pl');
  await user.type(
    screen.getByLabelText('W czym mogę pomóc?'),
    'Klienci wysyłają faktury na trzy adresy.',
  );
  return user;
}

describe('ContactForm', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'], now: NOW });
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    delete window.umami;
  });

  it('shows validation errors without sending', async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: 'Wyślij wiadomość' }));

    expect(screen.getByText('Podaj imię')).toBeInTheDocument();
    expect(screen.getByText('Podaj poprawny adres email')).toBeInTheDocument();
    expect(screen.getByText('Napisz kilka słów więcej')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends the message and confirms it', async () => {
    fetchMock.mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
    const track = vi.fn();
    window.umami = { track };
    render(<ContactForm />);
    const user = await fillIn();
    vi.setSystemTime(NOW + 5000);

    await user.click(screen.getByRole('button', { name: 'Wyślij wiadomość' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Dziękuję, wiadomość dotarła');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(JSON.parse(String(init?.body))).toEqual({
      name: 'Anna',
      email: 'anna@biuro.pl',
      message: 'Klienci wysyłają faktury na trzy adresy.',
      locale: 'pl',
      website: '',
      startedAt: NOW,
      turnstileToken: '',
    });
    expect(track).toHaveBeenCalledWith('contact_submit', { locale: 'pl' });
  });

  it('offers the email address when sending fails', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 502 }));
    render(<ContactForm />);
    const user = await fillIn();

    await user.click(screen.getByRole('button', { name: 'Wyślij wiadomość' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Nie udało się wysłać wiadomości. Napisz bezpośrednio na biznes@underwolfstudio.com.',
    );
  });

  it('asks to finish the spam check before sending', async () => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'site-key');
    fetchMock.mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
    render(<ContactForm />);
    const user = await fillIn();

    await user.click(screen.getByRole('button', { name: 'Wyślij wiadomość' }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Poczekaj, aż weryfikacja antyspamowa się zakończy',
    );
    expect(fetchMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Verify' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Wyślij wiadomość' }));

    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toMatchObject({
      turnstileToken: 'turnstile-token',
    });
  });

  it('explains how the data is processed', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: 'Jak przetwarzam dane?' })).toBeInTheDocument();
  });
});
