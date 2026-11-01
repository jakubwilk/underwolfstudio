'use client';

import { Anchor, Box } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '../i18n/navigation';
import { routing } from '../i18n/routing';

// "PL / EN": the current language, then a link to this page in the other one.
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const target = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <Box
      component="span"
      className={`font-mono text-[12px] uppercase text-(--text-tertiary) whitespace-nowrap ${className}`}
    >
      <span aria-hidden="true" className="text-(--text-primary)">
        {locale}
      </span>
      <span aria-hidden="true"> / </span>
      <Anchor
        component={Link}
        href={pathname}
        locale={target}
        hrefLang={target}
        aria-label={t('switchToLabel')}
        underline="never"
        inherit
        className="text-(--text-tertiary)! hover:text-(--text-primary)!"
      >
        {t('switchTo')}
      </Anchor>
    </Box>
  );
}
