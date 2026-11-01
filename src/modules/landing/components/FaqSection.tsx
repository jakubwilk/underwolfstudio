import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Anchor,
  Box,
} from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import { BODY, BODY_CLASS } from '../utils/typography';

const QUESTION_KEYS = [
  'gdpr',
  'security',
  'integrations',
  'webApps',
  'failure',
  'duration',
  'technical',
] as const;

// `!` where Mantine's own accordion styles outrank Tailwind's layered utilities.
// The control is a `group`, so the +/− icons follow its open state.
const CLASS_NAMES = {
  item: 'border-(--border)!',
  control: 'group px-0! bg-transparent! hover:text-(--accent-light)',
  label: 'py-5.5! text-(--text-primary)',
  chevron: 'text-(--accent-light) w-5! ml-6!',
  content: `${BODY_CLASS} px-0! pb-6 pr-10! text-(--text-secondary)`,
};

const STYLES = {
  label: { fontSize: 17, fontWeight: 500, lineHeight: 1.4 },
  content: { fontSize: BODY.fz, lineHeight: 1.65 },
};

const ICON = (
  <>
    <IconPlus size={18} stroke={1.5} aria-hidden="true" className="group-data-active:hidden" />
    <IconMinus
      size={18}
      stroke={1.5}
      aria-hidden="true"
      className="hidden group-data-active:block"
    />
  </>
);

export function FaqSection() {
  const t = useTranslations('faq');

  return (
    <Section
      id="faq"
      ariaLabel={t('ariaLabel')}
      alt
      className="grid gap-16 grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))]"
    >
      <Box className="max-w-95">
        <SectionHeader
          index="04"
          label={t('label')}
          title={t('title')}
          description={t.rich('intro', {
            link: (chunks) => (
              <Anchor href="#contact" inherit className="text-(--accent-light)!">
                {chunks}
              </Anchor>
            ),
          })}
        />
      </Box>

      <Accordion
        order={3}
        defaultValue={QUESTION_KEYS[0]}
        chevron={ICON}
        disableChevronRotation
        className="border-t border-(--border)"
        classNames={CLASS_NAMES}
        styles={STYLES}
      >
        {QUESTION_KEYS.map((key) => (
          <AccordionItem key={key} value={key}>
            <AccordionControl>{t(`items.${key}.question`)}</AccordionControl>
            <AccordionPanel>{t(`items.${key}.answer`)}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
