import { Box, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { ContactForm } from './ContactForm';
import { Section } from './Section';
import { EYEBROW, EYEBROW_CLASS, LEAD, LEAD_CLASS } from '../utils/typography';

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <Section
      id="contact"
      ariaLabel={t('ariaLabel')}
      className="grid gap-16 items-start grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))]"
    >
      <Stack gap={24}>
        <Text {...EYEBROW} className={EYEBROW_CLASS}>
          05 — {t('label')}
        </Text>
        <Title
          order={2}
          fz="clamp(2.25rem, 4.5vw, 3.25rem)"
          fw={600}
          lh={1.08}
          className="m-0 tracking-tight text-balance text-(--text-primary)"
        >
          {t('title')}
        </Title>
        <Text {...LEAD} className={`${LEAD_CLASS} max-w-115`}>
          {t('subtitle')}
        </Text>
      </Stack>

      <Box className="rounded-xl border border-(--border) bg-(--bg-card) p-6 sm:p-9">
        <ContactForm />
      </Box>
    </Section>
  );
}
