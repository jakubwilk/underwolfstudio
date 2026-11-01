import { afterEach, describe, expect, it, vi } from 'vitest';

import { trackEvent } from './analytics';

describe('trackEvent', () => {
  afterEach(() => {
    delete window.umami;
  });

  it('forwards the event to Umami', () => {
    const track = vi.fn();
    window.umami = { track };
    trackEvent('contact_submit', { locale: 'pl' });
    expect(track).toHaveBeenCalledWith('contact_submit', { locale: 'pl' });
  });

  it('does nothing when Umami is not loaded', () => {
    expect(() => trackEvent('contact_submit')).not.toThrow();
  });
});
