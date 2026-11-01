import { locale as rootLocale } from 'next/root-params';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { MESSAGES } from './messages';
import { routing } from './routing';

// The locale comes from the `[locale]` root param, unless a server function was
// given one explicitly (e.g. `getTranslations({ locale })` in metadata).
export default getRequestConfig(async ({ locale: explicit }) => {
  const requested = explicit ?? (await rootLocale());
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: MESSAGES[locale] };
});
