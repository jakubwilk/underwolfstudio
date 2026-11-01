import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { handleContactRequest } from './handleContactRequest';
import { MIN_FILL_MS } from '../utils/contact';

const WEBHOOK = 'https://n8n.example/webhook/contact';

const body = () => ({
  name: 'Anna',
  email: 'anna@biuro.pl',
  message: 'Klienci wysyłają faktury na trzy adresy.',
  locale: 'pl',
  website: '',
  startedAt: Date.now() - MIN_FILL_MS,
  turnstileToken: 'token',
});

const post = (payload: unknown) =>
  handleContactRequest(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      body: typeof payload === 'string' ? payload : JSON.stringify(payload),
    }),
  );

describe('handleContactRequest', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('CONTACT_WEBHOOK_URL', WEBHOOK);
    vi.stubEnv('CONTACT_WEBHOOK_SECRET', 's3cret');
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', '');
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('forwards a valid inquiry to the webhook with the secret', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));
    const response = await post(body());

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(WEBHOOK);
    expect(init?.headers).toMatchObject({ 'X-Webhook-Secret': 's3cret' });
    expect(JSON.parse(String(init?.body))).toMatchObject({
      name: 'Anna',
      email: 'anna@biuro.pl',
      locale: 'pl',
      source: 'underwolfstudio.com',
    });
  });

  it('sends a keyed hash of the IP instead of the IP itself', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));
    await handleContactRequest(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'x-forwarded-for': '203.0.113.7, 10.0.0.1' },
        body: JSON.stringify(body()),
      }),
    );

    const sent = String(fetchMock.mock.calls[0][1]?.body);
    expect(sent).not.toContain('203.0.113.7');
    expect(JSON.parse(sent).ipHash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('sends an empty IP hash when the IP is unknown', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));
    await post(body());
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body)).ipHash).toBe('');
  });

  it('verifies the Turnstile token before forwarding', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'turnstile-secret');
    fetchMock
      .mockResolvedValueOnce(Response.json({ success: true }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));

    expect((await post(body())).status).toBe(200);
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      WEBHOOK,
    ]);
  });

  it('rejects a failed Turnstile check without forwarding', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'turnstile-secret');
    fetchMock.mockResolvedValueOnce(Response.json({ success: false }));

    expect((await post(body())).status).toBe(403);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('rejects malformed JSON and invalid fields', async () => {
    expect((await post('{')).status).toBe(400);
    expect((await post({ ...body(), email: 'nope' })).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('accepts spam silently without forwarding it', async () => {
    const response = await post({ ...body(), website: 'https://spam.example' });
    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 503 when the webhook is not configured', async () => {
    vi.stubEnv('CONTACT_WEBHOOK_URL', '');
    expect((await post(body())).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 502 when the webhook fails or is unreachable', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }));
    expect((await post(body())).status).toBe(502);

    fetchMock.mockRejectedValueOnce(new TypeError('network down'));
    expect((await post(body())).status).toBe(502);
  });
});
