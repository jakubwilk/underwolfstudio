import { createHmac } from 'node:crypto';

import { SITE_URL } from '@/modules/common/utils/site';

import type { ContactRequest } from '../utils/contact';

export type ForwardResult = 'sent' | 'not-configured' | 'failed';

// Keyed hash of the visitor's IP, so n8n can rate-limit per address without
// ever storing it. Keyed with the webhook secret, since plain IPv4 hashes can
// be reversed by trying every address.
function hashIp(ip: string | null, secret: string | undefined) {
  if (!ip || !secret) return '';
  return createHmac('sha256', secret).update(ip).digest('hex');
}

// Server only: hands the inquiry to the n8n workflow (guardrails, rate limits,
// classification, auto-reply, notification). The webhook URL and secret never
// reach the browser.
export async function forwardContact(
  { name, email, message, locale }: ContactRequest,
  ip: string | null = null,
): Promise<ForwardResult> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return 'not-configured';

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  if (secret) headers['X-Webhook-Secret'] = secret;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        email,
        message,
        locale,
        ipHash: hashIp(ip, secret),
        source: new URL(SITE_URL).hostname,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok ? 'sent' : 'failed';
  } catch {
    return 'failed';
  }
}
