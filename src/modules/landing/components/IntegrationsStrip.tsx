import { Box, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { INTEGRATIONS } from '../utils/integrations';

const CHIP_CLASS =
  'font-mono text-[12px] text-(--text-nav) border border-(--border) rounded px-3 py-1.75';

// Strip of tool names under the hero.
export function IntegrationsStrip() {
  const t = useTranslations('integrations');

  return (
    <Box
      component="section"
      aria-label={t('ariaLabel')}
      className="border-b border-(--border-subtle) bg-(--bg-alt)"
    >
      <Box className="max-w-300 mx-auto px-6 md:px-8 py-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Text fz={13} lh={1.5} className="m-0 max-w-50 text-(--text-tertiary)">
          {t('label')}
        </Text>
        <Box component="ul" className="list-none m-0 p-0 flex flex-1 flex-wrap gap-2.5">
          {INTEGRATIONS.map((name) => (
            <Box component="li" key={name} className={CHIP_CLASS}>
              {name}
            </Box>
          ))}
          <Box component="li" className={CHIP_CLASS}>
            {t('more')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
