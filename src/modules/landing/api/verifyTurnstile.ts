const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export type TurnstileResult = 'passed' | 'failed' | 'skipped';

// Server only: checks a Cloudflare Turnstile token. Without a secret key
// (local development) the check is skipped, so the form still works.
export async function verifyTurnstile(token: string, ip: string | null): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return 'skipped';
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
