'use client';

import { Anchor, Box, Burger, Button, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

import { BrandLogo } from '@/modules/common/components/BrandLogo';
import { LanguageSwitcher } from '@/modules/common/components/LanguageSwitcher';

const LINKS = [
  { key: 'services', href: '#services' },
  { key: 'caseStudies', href: '#case-studies' },
  { key: 'process', href: '#process' },
  { key: 'faq', href: '#faq' },
] as const;

const LINK_CLASS = 'text-(--text-nav)! hover:text-(--text-primary)!';

// Sticky top bar: logo, section links, language and the consultation button.
// Below `md` the links move into a drawer behind a burger button.
export function SiteHeader() {
  const t = useTranslations('header');
  const [opened, { toggle, close }] = useDisclosure(false);

  const cta = (
    <Button
      component="a"
      href="#contact"
      size="sm"
      fz={14}
      data-umami-event="header_cta_click"
      onClick={close}
    >
      {t('cta')}
    </Button>
  );

  return (
    <Box
      component="header"
      className="sticky top-0 z-50 border-b border-(--border-subtle) bg-[rgb(11_12_17/0.88)] backdrop-blur-[10px]"
    >
      <Box className="max-w-300 mx-auto h-17 px-6 md:px-8 flex items-center justify-between gap-6">
        <Anchor href="#top" className="flex shrink-0">
          <BrandLogo className="w-36 h-auto text-(--text-primary)" />
        </Anchor>

        <Group component="nav" aria-label={t('ariaLabel')} gap={32} visibleFrom="md">
          {LINKS.map(({ key, href }) => (
            <Anchor key={key} href={href} underline="never" fz={14} className={LINK_CLASS}>
              {t(`links.${key}`)}
            </Anchor>
          ))}
        </Group>

        <Group gap={20} wrap="nowrap">
          <LanguageSwitcher />
          <Box visibleFrom="sm">{cta}</Box>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            color="var(--text-primary)"
            aria-label={t('openMenu')}
            aria-expanded={opened}
            hiddenFrom="md"
          />
        </Group>
      </Box>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size={280}
        title={t('menu')}
        hiddenFrom="md"
        classNames={{ content: 'bg-(--bg-card)!', header: 'bg-(--bg-card)!' }}
      >
        <Stack component="nav" aria-label={t('ariaLabel')} gap={20} className="pt-4">
          {LINKS.map(({ key, href }) => (
            <Anchor
              key={key}
              href={href}
              underline="never"
              fz={17}
              onClick={close}
              className={LINK_CLASS}
            >
              {t(`links.${key}`)}
            </Anchor>
          ))}
          <Box className="pt-2">{cta}</Box>
        </Stack>
      </Drawer>
    </Box>
  );
}
