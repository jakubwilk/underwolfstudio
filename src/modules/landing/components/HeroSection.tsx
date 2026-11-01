import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useFormatter, useTranslations } from 'next-intl';

import { HeroWorkflowCard } from './HeroWorkflowCard';
import { PRICE_FORMAT, PRICE_FROM_PLN } from '../utils/pricing';
import { BUTTON_FZ, EYEBROW, EYEBROW_CLASS, LEAD, LEAD_CLASS } from '../utils/typography';

const STAT_KEYS = ['price', 'gdpr'] as const;

export function HeroSection() {
  const t = useTranslations('hero');
  const format = useFormatter();
  const price = format.number(PRICE_FROM_PLN, PRICE_FORMAT);

  return (
    <Box
      component="section"
      id="top"
      aria-label={t('ariaLabel')}
      className="border-b border-(--border-subtle)"
    >
      <Box className="max-w-300 mx-auto px-6 md:px-8 pt-16 pb-20 md:pt-24 md:pb-22 grid gap-16 items-center grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))]">
        <Stack gap={28} className="animate-fade-up-1">
          <Text {...EYEBROW} className={EYEBROW_CLASS}>
            {t('eyebrow')}
          </Text>

          <Title
            order={1}
            fz="clamp(2.75rem, 6vw, 4.25rem)"
            fw={600}
            lh={1.02}
            className="m-0 tracking-[-0.03em] text-balance text-(--text-primary)"
          >
            {t('title')}
          </Title>

          <Text {...LEAD} className={`${LEAD_CLASS} max-w-130`}>
            {t('subtitle')}
          </Text>

          <Group>
            <Button
              component="a"
              href="#contact"
              size="lg"
              fz={BUTTON_FZ}
              data-umami-event="cta_click"
              rightSection={<IconArrowRight size={16} stroke={2} aria-hidden="true" />}
            >
              {t('cta')}
            </Button>
          </Group>

          {/* Key facts; each value is shown above its label. */}
          <Box
            component="dl"
            className="m-0 mt-2 pt-6 grid grid-cols-2 max-w-105 border-t border-(--border-subtle)"
          >
            {STAT_KEYS.map((key, i) => (
              <Box
                key={key}
                className={`flex flex-col-reverse gap-1 ${i === 0 ? 'pr-4' : 'pl-4 border-l border-(--border-subtle)'}`}
              >
                <Box component="dt" className="text-[13px] text-(--text-tertiary)">
                  {t(`stats.${key}.label`)}
                </Box>
                <Box component="dd" className="m-0 text-[20px] font-semibold text-(--text-primary)">
                  {t(`stats.${key}.value`, { price })}
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>

        <HeroWorkflowCard />
      </Box>
    </Box>
  );
}
