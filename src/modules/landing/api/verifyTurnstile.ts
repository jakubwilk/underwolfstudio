const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export type TurnstileResult = 'passed' | 'failed' | 'skipped';

// Server only: checks a Cloudflare Turnstile token. With neither key set,
// Turnstile is off and the check is skipped. A site key without a secret means
// the widget runs but its tokens can't be checked, so the request fails rather
// than letting bots through.
export async function verifyTurnstile(token: string, ip: string | null): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return 'skipped';
    console.error('[contact] TURNSTILE_SECRET_KEY is not set, but the widget is enabled');
    return 'failed';
  }
  if (!token) return 'failed';

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const outcome = (await response.json()) as { success?: boolean };
    return outcome.success === true ? 'passed' : 'failed';
  } catch {
    return 'failed';
  }
}
