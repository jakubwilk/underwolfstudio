import type { Messages } from '@/modules/common/i18n/messages';
import type { AppLocale } from '@/modules/common/i18n/routing';

declare module 'next-intl' {
  interface AppConfig {
    Locale: AppLocale;
    Messages: Messages;
  }
}
