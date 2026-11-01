import { describe, expect, it } from 'vitest';

import { MESSAGES } from '.';

// Every key path of a nested message object, e.g. "hero.title".
function keyPaths(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe('messages', () => {
  it('has the same keys in every language', () => {
    expect(keyPaths(MESSAGES.en).sort()).toEqual(keyPaths(MESSAGES.pl).sort());
  });
});
