import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { verifyTurnstile } from './verifyTurnstile';

describe('verifyTurnstile', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret');
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('is skipped when Turnstile is off', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', '');
    expect(await verifyTurnstile('', null)).toBe('skipped');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fails when the widget is on but the secret key is missing', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'site-key');
    expect(await verifyTurnstile('token', null)).toBe('failed');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith(expect.stringContaining('TURNSTILE_SECRET_KEY'));
    error.mockRestore();
  });

  it('fails a missing token without asking Cloudflare', async () => {
    expect(await verifyTurnstile('', null)).toBe('failed');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends the token, secret and IP to Cloudflare', async () => {
    fetchMock.mockResolvedValue(Response.json({ success: true }));
    expect(await verifyTurnstile('token', '203.0.113.7')).toBe('passed');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    const body = init?.body as URLSearchParams;
    expect(Object.fromEntries(body)).toEqual({
      secret: 'secret',
      response: 'token',
      remoteip: '203.0.113.7',
    });
  });

  it('fails rejected tokens and unreachable verification', async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ success: false }));
    expect(await verifyTurnstile('token', null)).toBe('failed');

    fetchMock.mockRejectedValueOnce(new TypeError('network down'));
    expect(await verifyTurnstile('token', null)).toBe('failed');
  });
});
