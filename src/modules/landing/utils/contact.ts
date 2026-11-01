import { routing, type AppLocale } from '@/modules/common/i18n/routing';

// Validation shared by the contact form and the /api/contact handler. Error
// values are keys of the `contact.errors` messages.

export const NAME_MAX = 100;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 3000;
// Humans need a few seconds to fill the form in; faster submissions are bots.
export const MIN_FILL_MS = 3000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactErrorKey =
  'nameRequired' | 'nameTooLong' | 'emailInvalid' | 'messageTooShort' | 'messageTooLong';

export interface ContactFields {
  name: string;
  email: string;
  message: string;
}

export interface ContactRequest extends ContactFields {
  locale: AppLocale;
  // Honeypot: hidden from people, so anything in it comes from a bot.
  website: string;
  // When the form was rendered (ms since epoch).
  startedAt: number;
  // Cloudflare Turnstile token; empty when Turnstile isn't configured.
  turnstileToken: string;
}

export function validateName(name: string): ContactErrorKey | null {
  const trimmed = name.trim();
  if (!trimmed) return 'nameRequired';
  if (trimmed.length > NAME_MAX) return 'nameTooLong';
  return null;
}

export function validateEmail(email: string): ContactErrorKey | null {
  return EMAIL_PATTERN.test(email.trim()) ? null : 'emailInvalid';
}

export function validateMessage(message: string): ContactErrorKey | null {
  const trimmed = message.trim();
  if (trimmed.length < MESSAGE_MIN) return 'messageTooShort';
  if (trimmed.length > MESSAGE_MAX) return 'messageTooLong';
  return null;
}

export type ParsedContact =
  { kind: 'valid'; data: ContactRequest } | { kind: 'spam' } | { kind: 'invalid' };

const str = (value: unknown) => (typeof value === 'string' ? value : '');

// Checks an untrusted request body; trims the fields it accepts.
export function parseContactRequest(body: unknown, now = Date.now()): ParsedContact {
  if (typeof body !== 'object' || body === null) return { kind: 'invalid' };
  const input = body as Record<string, unknown>;

  const name = str(input.name);
  const email = str(input.email);
  const message = str(input.message);
  const locale = routing.locales.find((l) => l === input.locale);
  const startedAt = typeof input.startedAt === 'number' ? input.startedAt : NaN;

  if (validateName(name) || validateEmail(email) || validateMessage(message) || !locale) {
    return { kind: 'invalid' };
  }
  if (str(input.website) || !(now - startedAt >= MIN_FILL_MS)) return { kind: 'spam' };

  return {
    kind: 'valid',
    data: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      locale,
      website: '',
      startedAt,
      turnstileToken: str(input.turnstileToken),
    },
  };
}
