import { describe, expect, it } from 'vitest';

import {
  MIN_FILL_MS,
  parseContactRequest,
  validateEmail,
  validateMessage,
  validateName,
} from './contact';

const NOW = 1_800_000_000_000;

const valid = {
  name: ' Anna ',
  email: 'anna@biuro.pl',
  message: 'Klienci wysyłają faktury na trzy adresy.',
  locale: 'pl',
  website: '',
  startedAt: NOW - MIN_FILL_MS,
  turnstileToken: 'token',
};

describe('field validators', () => {
  it('requires a name of reasonable length', () => {
    expect(validateName('  ')).toBe('nameRequired');
    expect(validateName('a'.repeat(101))).toBe('nameTooLong');
    expect(validateName('Anna')).toBeNull();
  });

  it('requires an email address', () => {
    expect(validateEmail('anna')).toBe('emailInvalid');
    expect(validateEmail('anna@biuro')).toBe('emailInvalid');
    expect(validateEmail(' anna@biuro.pl ')).toBeNull();
  });

  it('requires a message between the limits', () => {
    expect(validateMessage('za mało')).toBe('messageTooShort');
    expect(validateMessage('a'.repeat(3001))).toBe('messageTooLong');
    expect(validateMessage('Wystarczająco długa wiadomość')).toBeNull();
  });
});

describe('parseContactRequest', () => {
  it('accepts a valid request and trims its fields', () => {
    expect(parseContactRequest(valid, NOW)).toEqual({
      kind: 'valid',
      data: { ...valid, name: 'Anna' },
    });
  });

  it('rejects bodies that are not objects', () => {
    expect(parseContactRequest(null, NOW)).toEqual({ kind: 'invalid' });
    expect(parseContactRequest('hello', NOW)).toEqual({ kind: 'invalid' });
  });

  it('rejects invalid fields and unknown locales', () => {
    expect(parseContactRequest({ ...valid, email: 'nope' }, NOW)).toEqual({ kind: 'invalid' });
    expect(parseContactRequest({ ...valid, locale: 'de' }, NOW)).toEqual({ kind: 'invalid' });
  });

  it('flags a filled honeypot as spam', () => {
    expect(parseContactRequest({ ...valid, website: 'https://spam.example' }, NOW)).toEqual({
      kind: 'spam',
    });
  });

  it('flags forms submitted too quickly or without a start time as spam', () => {
    expect(parseContactRequest({ ...valid, startedAt: NOW - 500 }, NOW)).toEqual({ kind: 'spam' });
    expect(parseContactRequest({ ...valid, startedAt: undefined }, NOW)).toEqual({ kind: 'spam' });
  });
});
