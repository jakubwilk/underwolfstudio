import { Box, Stack, Text } from '@mantine/core';

import { BlueprintFrame } from '@/modules/common/components/BlueprintFrame';

const TAG_FZ = 'clamp(1.1rem, 2vw, 1.5rem)';

const SERVICES = [
  {
    title: 'AI Agents',
    description:
      'Autonomous agents that research, decide, and act — handling complex tasks with minimal human oversight.',
    accent: true,
  },
  {
    title: 'AI Workflows',
    description:
      'Automated multi-step pipelines connecting language models, APIs, and data sources into reliable production systems.',
    accent: true,
  },
  {
    title: 'Fullstack Web Application',
    description:
      'End-to-end web applications built for scale — from database schema to polished UI, with long-term maintainability in mind.',
    accent: false,
  },
  {
    title: 'Frontend Application',
    description:
      'Fast, accessible interfaces with attention to detail — React, Next.js, smooth interactions, and pixel-perfect execution.',
    accent: false,
  },
] as const;

export function ServicesStrip() {
  return (
    <BlueprintFrame
      label="services"
      index="01"
      ariaLabel="Services"
      className="w-full py-30 px-12 flex flex-col items-center gap-16 bg-(--bg-alt) bg-dot-grid border-t-0"
    >
      <Box className="inline-flex items-center px-4 py-1.5 border border-(--border-subtle) bg-white/[0.03]">
        <Text
          fz="clamp(0.95rem, 1.5vw, 1.05rem)"
          className="tracking-[0.2em] uppercase text-(--text-tertiary) m-0 font-(family-name:--font-mono)"
        >
          What we build
        </Text>
      </Box>

      {/* Desktop crosshair grid with descriptions — hidden below md */}
      <Box
        visibleFrom="md"
        className="relative grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-x-30 gap-y-16 items-center justify-items-center max-w-215 w-full"
      >
        <Box
          aria-hidden="true"
          className="absolute col-start-2 row-start-1 row-end-4 top-0 bottom-0 w-px bg-(--border-subtle)"
        />
        <Box
          aria-hidden="true"
          className="absolute row-start-2 col-start-1 col-end-4 left-0 right-0 h-px bg-(--border-subtle)"
        />

        {SERVICES.map(({ title, description, accent }, i) => {
          const isLeft = i % 2 === 0;
          const num = String(i + 1).padStart(2, '0');
          return (
            <Stack
              key={title}
              style={{ gridColumnStart: isLeft ? 1 : 3, gridRowStart: i < 2 ? 1 : 3 }}
              className={`gap-1.5 ${isLeft ? 'items-end' : 'items-start'}`}
            >
              <Box className={`flex items-center gap-2 ${isLeft ? 'flex-row-reverse' : ''}`}>
                <Text fz="10px" className="text-(--text-tertiary) font-(family-name:--font-mono)">
                  {num}
                </Text>
                <Text
                  fz={TAG_FZ}
                  fw={500}
                  className={`tracking-[-0.01em] m-0 max-w-50 wrap-break-word font-(family-name:--font-mono) ${isLeft ? 'text-right' : 'text-left'} ${accent ? 'text-(--accent)' : 'text-(--text-secondary)'}`}
                >
                  {title}
                </Text>
              </Box>
              <Text
                fz="15px"
                className={`m-0 leading-relaxed max-w-50 font-(family-name:--font-mono) ${isLeft ? 'text-right' : 'text-left'} ${accent ? 'text-(--text-secondary)' : 'text-(--text-tertiary)'}`}
              >
                {description}
              </Text>
            </Stack>
          );
        })}

        <Box
          aria-hidden="true"
          className="relative z-10 col-start-2 row-start-2 w-5 h-5 border border-(--accent) bg-(--bg) shrink-0"
        />
      </Box>

      {/* Mobile stack — hidden at md and above */}
      <Stack hiddenFrom="md" gap={40} className="w-full max-w-sm">
        {SERVICES.map(({ title, description, accent }, i) => (
          <Box key={title} className="flex items-start gap-3">
            <Box
              aria-hidden="true"
              className="flex items-center justify-center w-6 h-6 border border-(--border-subtle) text-[10px] text-(--text-tertiary) font-(family-name:--font-mono) shrink-0"
            >
              {String(i + 1).padStart(2, '0')}
            </Box>
            <Stack gap={6}>
              <Text
                fz="17px"
                fw={500}
                className={`m-0 tracking-[-0.01em] wrap-break-word font-(family-name:--font-mono) ${accent ? 'text-(--accent)' : 'text-foreground'}`}
              >
                {title}
              </Text>
              <Text
                fz="sm"
                className="m-0 text-(--text-secondary) leading-relaxed font-(family-name:--font-mono)"
              >
                {description}
              </Text>
            </Stack>
          </Box>
        ))}
      </Stack>
    </BlueprintFrame>
  );
}
