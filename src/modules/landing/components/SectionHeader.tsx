import { Box, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

import { BODY, BODY_CLASS, EYEBROW, EYEBROW_CLASS, H2, H2_CLASS } from '../utils/typography';

interface SectionHeaderProps {
  // Position of the section on the page, e.g. "01".
  index: string;
  label: string;
  title: string;
  description?: ReactNode;
  // Shown to the right of the heading on wide screens, e.g. the price box.
  aside?: ReactNode;
}

// Numbered mono label, section heading and an optional intro.
export function SectionHeader({ index, label, title, description, aside }: SectionHeaderProps) {
  return (
    <Box className="flex flex-wrap items-end justify-between gap-8">
      <Stack gap={14} className="max-w-140">
        <Text {...EYEBROW} className={EYEBROW_CLASS}>
          {index} — {label}
        </Text>
        <Title order={2} {...H2} className={H2_CLASS}>
          {title}
        </Title>
        {description ? (
          <Text {...BODY} className={`${BODY_CLASS} text-(--text-secondary)`}>
            {description}
          </Text>
        ) : null}
      </Stack>
      {aside}
    </Box>
  );
}
