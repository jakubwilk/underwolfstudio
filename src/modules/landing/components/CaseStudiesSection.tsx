import { Box, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import { CASE_STUDIES } from '../utils/caseStudies';
import { BODY, BODY_CLASS, META, META_CLASS } from '../utils/typography';

const ROW_CLASS = 'grid gap-4 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8';

// Column label: a header row on wide screens; on narrow ones each cell shows
// it above its text. Kept for screen readers either way.
const CELL_LABEL_CLASS = `${META_CLASS} uppercase tracking-[0.08em] text-(--text-tertiary) md:sr-only`;

// Case studies as a table: the process, how it worked before and after.
export function CaseStudiesSection() {
  const t = useTranslations('caseStudies');

  return (
    <Section id="case-studies" ariaLabel={t('ariaLabel')} alt className="flex flex-col gap-12">
      <SectionHeader
        index="02"
        label={t('label')}
        title={t('title')}
        description={t('description')}
      />

      <Box>
        <Box
          aria-hidden="true"
          visibleFrom="md"
          className={`${ROW_CLASS} py-3.5 border-y border-(--border)`}
        >
          {(['process', 'before', 'after'] as const).map((column) => (
            <Text
              key={column}
              fz={11}
              className={`${META_CLASS} uppercase tracking-[0.08em] text-(--text-tertiary)`}
            >
              {t(`columns.${column}`)}
            </Text>
          ))}
        </Box>

        <Box component="ol" className="list-none m-0 p-0 border-t border-(--border) md:border-t-0">
          {CASE_STUDIES.map((key) => {
            const result = t(`items.${key}.result`);
            return (
              <Box
                component="li"
                key={key}
                className={`${ROW_CLASS} items-start py-8 border-b border-(--border)`}
              >
                <Stack gap={12} align="flex-start">
                  <Text
                    component="h3"
                    fz={19}
                    fw={600}
                    lh={1.3}
                    className="m-0 text-(--text-primary)"
                  >
                    {t(`items.${key}.title`)}
                  </Text>
                  <Text
                    component="span"
                    fz={11}
                    className={`${META_CLASS} uppercase tracking-[0.06em] px-2! py-1! rounded border border-(--accent) text-(--accent-light)`}
                  >
                    {t('badges.own')}
                  </Text>
                </Stack>
                <Stack gap={6}>
                  <Text {...META} className={CELL_LABEL_CLASS}>
                    {t('columns.before')}
                  </Text>
                  <Text {...BODY} className={`${BODY_CLASS} text-(--text-tertiary)`}>
                    {t(`items.${key}.problem`)}
                  </Text>
                </Stack>
                <Stack gap={6}>
                  <Text {...META} className={CELL_LABEL_CLASS}>
                    {t('columns.after')}
                  </Text>
                  <Text {...BODY} className={`${BODY_CLASS} text-(--text-primary)`}>
                    {t(`items.${key}.effect`)}
                  </Text>
                  {result ? (
                    <Text {...BODY} fw={500} className={`${BODY_CLASS} text-(--accent-light)`}>
                      {result}
                    </Text>
                  ) : null}
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Section>
  );
}
