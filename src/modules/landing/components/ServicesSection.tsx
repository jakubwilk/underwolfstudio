'use client';

import { Box, Stack, Text } from '@mantine/core';
import { IconAppWindow, IconRoute, IconSparkles, type TablerIcon } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRef, useState, type KeyboardEvent } from 'react';

import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import {
  INDUSTRY_KEYS,
  PILLAR_KEYS,
  PROBLEM_KEYS,
  type IndustryKey,
  type PillarKey,
} from '../utils/services';
import { BODY, BODY_CLASS, H3, H3_CLASS, META, META_CLASS, SMALL } from '../utils/typography';

const PILLAR_ICONS: Record<PillarKey, TablerIcon> = {
  automation: IconRoute,
  agents: IconSparkles,
  webApps: IconAppWindow,
};

const tabId = (industry: IndustryKey) => `services-tab-${industry}`;
const PANEL_ID = 'services-panel';

// Cards separated by 1px lines: the grid's background shows through the gaps.
const GRID_CLASS =
  'list-none m-0 p-0 grid gap-px bg-(--border) border border-(--border) rounded-xl overflow-hidden';

// The three services, then typical uses switchable between industries.
export function ServicesSection() {
  const t = useTranslations('services');
  const [industry, setIndustry] = useState<IndustryKey>(INDUSTRY_KEYS[0]);
  const tabs = useRef<Partial<Record<IndustryKey, HTMLButtonElement | null>>>({});

  // Arrow keys move between tabs, as in the WAI-ARIA tabs pattern.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[e.key];
    if (!step) return;
    e.preventDefault();
    const index = INDUSTRY_KEYS.indexOf(industry);
    const next = INDUSTRY_KEYS[(index + step + INDUSTRY_KEYS.length) % INDUSTRY_KEYS.length];
    setIndustry(next);
    tabs.current[next]?.focus();
  };

  return (
    <Section id="services" ariaLabel={t('ariaLabel')} className="flex flex-col gap-12">
      <SectionHeader
        index="01"
        label={t('label')}
        title={t('title')}
        description={t('description')}
      />

      <Box component="ul" className={`${GRID_CLASS} md:grid-cols-3`}>
        {PILLAR_KEYS.map((key) => {
          const Icon = PILLAR_ICONS[key];
          return (
            <Stack component="li" key={key} gap={16} className="bg-(--bg-cell) p-8">
              <Box className="flex items-center justify-center w-11 h-11 rounded-lg border border-(--border-strong) bg-(--bg-raised)">
                <Icon size={22} stroke={1.5} aria-hidden="true" className="text-(--accent-light)" />
              </Box>
              <Text component="h3" {...H3} className={H3_CLASS}>
                {t(`pillars.${key}.title`)}
              </Text>
              <Text {...BODY} className={`${BODY_CLASS} text-(--text-secondary)`}>
                {t(`pillars.${key}.description`)}
              </Text>
              <Text {...SMALL} className="m-0 text-(--text-tertiary)">
                {t(`pillars.${key}.examples`)}
              </Text>
              <Text {...META} className={`${META_CLASS} mt-auto pt-2 text-(--accent-light)`}>
                {t(`pillars.${key}.tools`)}
              </Text>
            </Stack>
          );
        })}
      </Box>

      <Stack gap={24} className="mt-6">
        <Box className="flex flex-wrap items-end justify-between gap-6">
          <Text component="h3" {...H3} className={H3_CLASS}>
            {t('industriesTitle')}
          </Text>

          <Box
            role="tablist"
            aria-label={t('industriesLabel')}
            onKeyDown={onKeyDown}
            className="flex flex-wrap gap-1 p-1 rounded-lg border border-(--border) bg-(--bg-card)"
          >
            {INDUSTRY_KEYS.map((key) => {
              const selected = key === industry;
              return (
                <Box
                  key={key}
                  component="button"
                  type="button"
                  role="tab"
                  id={tabId(key)}
                  aria-selected={selected}
                  aria-controls={PANEL_ID}
                  tabIndex={selected ? 0 : -1}
                  ref={(el: HTMLButtonElement | null) => {
                    tabs.current[key] = el;
                  }}
                  onClick={() => setIndustry(key)}
                  className={`cursor-pointer border-0 rounded-[5px] px-3.5 py-2 text-[13px]! font-medium! transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${
                    selected
                      ? 'bg-(--accent) text-(--bg)'
                      : 'bg-transparent text-(--text-nav) hover:text-(--text-primary)'
                  }`}
                >
                  {t(`industries.${key}.name`)}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box role="tabpanel" id={PANEL_ID} aria-labelledby={tabId(industry)}>
          <Box
            component="ul"
            className={`${GRID_CLASS} grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]`}
          >
            {PROBLEM_KEYS.map((key, i) => (
              <Stack
                component="li"
                key={key}
                gap={14}
                className="bg-(--bg-cell) px-7 py-8 md:min-h-60"
              >
                <Text
                  aria-hidden="true"
                  {...META}
                  className={`${META_CLASS} text-(--text-tertiary)`}
                >
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Text component="h4" {...H3} className={H3_CLASS}>
                  {t(`industries.${industry}.items.${key}.title`)}
                </Text>
                <Text {...BODY} className={`${BODY_CLASS} text-(--text-secondary)`}>
                  {t(`industries.${industry}.items.${key}.description`)}
                </Text>
              </Stack>
            ))}
          </Box>
        </Box>
      </Stack>
    </Section>
  );
}
