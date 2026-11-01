import { Box, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

const STEP_KEYS = ['inbox', 'extract', 'assign', 'export', 'notify'] as const;

// Each step glows for about a fifth of the 7.5 s cycle, so the run moves down
// the list once per cycle.
const STEP_DELAY_S = 1.5;

const TITLE_ID = 'hero-workflow-title';

// Example automation in the hero: a card listing the workflow's steps, which
// light up one after another as if the workflow were running.
export function HeroWorkflowCard() {
  const t = useTranslations('hero.card');

  return (
    <Box
      component="figure"
      aria-labelledby={TITLE_ID}
      className="m-0 rounded-xl border border-(--border) bg-(--bg-card) overflow-hidden shadow-[0_30px_80px_rgb(0_0_0/0.45)] animate-fade-up-3"
    >
      <Box
        component="figcaption"
        className="flex items-center justify-between gap-4 px-5 py-4 border-b border-(--border)"
      >
        <Text component="span" id={TITLE_ID} fz={14} fw={500} className="text-(--text-primary)">
          {t('title')}
        </Text>
        <Text
          component="span"
          fz={11}
          className="flex items-center gap-2 font-mono uppercase text-(--accent-light) whitespace-nowrap"
        >
          <Box
            component="span"
            aria-hidden="true"
            className="block w-1.75 h-1.75 rounded-full bg-(--accent) animate-pulse-dot"
          />
          {t('status')}
        </Text>
      </Box>

      <Box component="ol" className="list-none m-0 p-0">
        {STEP_KEYS.map((key, i) => {
          const delay = { animationDelay: `${i * STEP_DELAY_S}s` };
          return (
            <Box
              component="li"
              key={key}
              style={delay}
              className="grid grid-cols-[36px_minmax(0,1fr)] gap-3.5 items-center px-5 py-3.5 border-b border-(--border-subtle) last:border-b-0 animate-step-glow"
            >
              <Box
                aria-hidden="true"
                style={delay}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-(--border-strong) bg-(--bg-raised) font-mono text-[11px] text-(--accent-light) animate-step-mark"
              >
                {String(i + 1).padStart(2, '0')}
              </Box>
              <Box className="flex flex-col gap-0.5 min-w-0">
                <Text component="span" fz={14} fw={500} className="text-(--text-primary)">
                  {t(`steps.${key}.title`)}
                </Text>
                <Text component="span" fz={12} className="text-(--text-tertiary)">
                  {t(`steps.${key}.tool`)}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
