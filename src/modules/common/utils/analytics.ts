// Umami's tracker (loaded by <Analytics />) exposes `window.umami`; it's
// missing when analytics is disabled or blocked, so every call is optional.
declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';

export function trackEvent(event: string, data?: Record<string, string>) {
  window.umami?.track(event, data);
}
