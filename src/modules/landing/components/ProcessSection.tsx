import { Box, Stack, Text } from '@mantine/core';
import { useFormatter, useTranslations } from 'next-intl';

import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import { PRICE_FORMAT, PRICE_FROM_PLN } from '../utils/pricing';
import { BODY, BODY_CLASS, H3, H3_CLASS, META, META_CLASS } from '../utils/typography';

const STEP_KEYS = ['message', 'analysis', 'build', 'support'] as const;

// The four steps of working together, with the starting price beside the heading.
export function ProcessSection() {
  const t = useTranslations('process');
  const format = useFormatter();

  const priceBox = (
    <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 rounded-[10px] border border-(--border-strong) bg-(--bg-card) px-6 py-4.5">
      <Stack gap={2}>
        <Text fz={12} className="m-0 text-(--text-tertiary)">
          {t('priceLabel')}
        </Text>
        <Text fz={24} fw={600} className="m-0 whitespace-nowrap text-(--accent-light)">
          {t('price', { price: format.number(PRICE_FROM_PLN, PRICE_FORMAT) })}
        </Text>
      </Stack>
      <Box aria-hidden="true" className="hidden sm:block w-px self-stretch bg-(--border-strong)" />
      <Text fz={13} lh={1.5} className="m-0 max-w-60 text-(--text-secondary)">
        {t('priceNote')}
      </Text>
    </Box>
  );

  return (
    <Section id="process" ariaLabel={t('ariaLabel')} className="flex flex-col gap-14">
      <SectionHeader index="03" label={t('label')} title={t('title')} aside={priceBox} />

      <Box
        component="ol"
        className="list-none m-0 p-0 grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))]"
      >
        {STEP_KEYS.map((key, i) => (
          <Stack
            component="li"
            key={key}
            gap={14}
            className={`pt-6 border-t-2 ${i === 0 ? 'border-(--accent)' : 'border-(--border-strong)'}`}
          >
            <Text {...META} className={`${META_CLASS} text-(--accent-light)`}>
              {t('step', { number: String(i + 1).padStart(2, '0') })}
            </Text>
            <Text component="h3" {...H3} className={H3_CLASS}>
              {t(`steps.${key}.title`)}
            </Text>
            <Text {...BODY} className={`${BODY_CLASS} text-(--text-secondary)`}>
              {t(`steps.${key}.description`)}
            </Text>
          </Stack>
        ))}
      </Box>
    </Section>
  );
}
