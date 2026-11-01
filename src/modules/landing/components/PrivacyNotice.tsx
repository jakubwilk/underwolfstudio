'use client';

import { Box, Collapse, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

const ITEM_KEYS = ['controller', 'purpose', 'recipients', 'retention', 'rights'] as const;

const PANEL_ID = 'privacy-notice';

// GDPR information for the contact form (Art. 13), shown where the data is
// collected: one sentence, with the details expandable in place.
export function PrivacyNotice() {
  const t = useTranslations('contact.privacy');
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Stack gap={8} className="text-[13px] leading-[1.55] text-(--text-tertiary)">
      <Text inherit className="m-0">
        {t('note')}{' '}
        <Box
          component="button"
          type="button"
          aria-expanded={opened}
          aria-controls={PANEL_ID}
          onClick={toggle}
          className="inline-flex items-center gap-1 p-0 bg-transparent border-0 cursor-pointer text-(--accent-light) hover:text-(--text-primary) focus-visible:outline focus-visible:outline-(--accent)"
        >
          {t('toggle')}
          <IconChevronDown
            size={12}
            stroke={1.5}
            aria-hidden="true"
            className={`transition-transform ${opened ? 'rotate-180' : ''}`}
          />
        </Box>
      </Text>

      <Collapse expanded={opened}>
        <Box
          component="dl"
          id={PANEL_ID}
          className="m-0 mt-2 grid gap-x-4 gap-y-2 p-4 rounded-md border border-(--border) bg-(--bg) sm:grid-cols-[auto_1fr]"
        >
          {ITEM_KEYS.map((key) => (
            <Box key={key} className="contents">
              <Box component="dt" className="font-medium text-(--text-secondary)">
                {t(`items.${key}.term`)}
              </Box>
              <Box component="dd" className="m-0">
                {t(`items.${key}.description`)}
              </Box>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Stack>
  );
}
