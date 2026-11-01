import { forwardContact } from './forwardContact';
import { verifyTurnstile } from './verifyTurnstile';
import { parseContactRequest } from '../utils/contact';

const STATUS = { sent: 200, 'not-configured': 503, failed: 502 } as const;

// The visitor's IP as seen by Cloudflare or the hosting proxy.
function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return request.headers.get('cf-connecting-ip') ?? forwarded ?? null;
}

// POST /api/contact. Honeypot and too-fast spam gets a 200 without being
// forwarded, so bots can't tell they were filtered out; a failed Turnstile
// check is a 403, since a real visitor may need to retry it.
export async function handleContactRequest(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const parsed = parseContactRequest(body);
  if (parsed.kind === 'invalid') return Response.json({ ok: false }, { status: 400 });
  if (parsed.kind === 'spam') return Response.json({ ok: true });

  const ip = clientIp(request);
  const turnstile = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (turnstile === 'failed') return Response.json({ ok: false }, { status: 403 });

  const result = await forwardContact(parsed.data, ip);
  if (result === 'not-configured') console.error('[contact] CONTACT_WEBHOOK_URL is not set');
  if (result === 'failed') console.error('[contact] Forwarding to the webhook failed');
  return Response.json({ ok: result === 'sent' }, { status: STATUS[result] });
}
