import { MantineProvider } from '@mantine/core';
import { render as tlRender } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';

import { MESSAGES } from '@/modules/common/i18n/messages';
import type { AppLocale } from '@/modules/common/i18n/routing';
import { theme } from '@/modules/common/utils/theme';

export function render(ui: ReactElement, { locale = 'pl' }: { locale?: AppLocale } = {}) {
  return tlRender(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]} timeZone="Europe/Warsaw">
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </NextIntlClientProvider>
    ),
  });
}

export { screen, within, fireEvent, waitFor } from '@testing-library/react';
