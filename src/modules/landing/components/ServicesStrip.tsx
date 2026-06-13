import { Box, Stack, Text } from '@mantine/core';

const TAG_FZ = 'clamp(1rem, 1.8vw, 1.35rem)';

const DOT_GLOW =
  '0 0 0 1px rgba(129,140,248,0.3), 0 0 16px rgba(129,140,248,0.8), 0 0 48px rgba(129,140,248,0.45), 0 0 96px rgba(129,140,248,0.2)';

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
    <Box
      component="section"
      aria-label="Services"
      className="relative w-full py-30 px-12 flex flex-col items-center gap-16 bg-linear-to-b from-[#0d0d18] to-background border-t border-(--border-subtle) overflow-hidden"
    >
      <Box
        aria-hidden="true"
        className="absolute w-225 h-125 -top-30 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />

      <Text
        fz="clamp(0.95rem, 1.5vw, 1.05rem)"
        className="tracking-[0.2em] uppercase text-(--text-tertiary) m-0"
      >
        What we build
      </Text>

      {/* Desktop orbit with descriptions — hidden below md */}
      <Box
        visibleFrom="md"
        className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-x-30 gap-y-16 items-center justify-items-center max-w-215 w-full"
      >
        {SERVICES.map(({ title, description, accent }, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Stack
              key={title}
              style={{ gridColumnStart: isLeft ? 1 : 3, gridRowStart: i < 2 ? 1 : 3 }}
              className={`gap-1.5 ${isLeft ? 'items-end' : 'items-start'}`}
            >
              <Text
                fz={TAG_FZ}
                className={`tracking-[-0.01em] font-medium m-0 ${isLeft ? 'text-right' : 'text-left'} ${accent ? 'text-(--accent)' : 'text-(--text-secondary)'}`}
              >
                {title}
              </Text>
              <Text
                fz="md"
                className={`m-0 leading-relaxed max-w-50 ${isLeft ? 'text-right' : 'text-left'} ${accent ? 'text-(--text-secondary)' : 'text-(--text-tertiary)'}`}
              >
                {description}
              </Text>
            </Stack>
          );
        })}

        <Box
          aria-hidden="true"
          className="col-start-2 row-start-2 w-5.5 h-5.5 rounded-full bg-(--accent) shrink-0"
          style={{ boxShadow: DOT_GLOW }}
        />
      </Box>

      {/* Mobile stack — hidden at md and above */}
      <Stack hiddenFrom="md" gap={40} className="w-full max-w-sm">
        {SERVICES.map(({ title, description, accent }) => (
          <Box key={title} className="flex items-start gap-3">
            <Box
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-(--accent) shrink-0 mt-1.75"
              style={{ boxShadow: DOT_GLOW }}
            />
            <Stack gap={6}>
              <Text
                fz="md"
                fw={500}
                className={`m-0 tracking-[-0.01em] ${accent ? 'text-(--accent)' : 'text-foreground'}`}
              >
                {title}
              </Text>
              <Text fz="sm" className="m-0 text-(--text-secondary) leading-relaxed">
                {description}
              </Text>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
