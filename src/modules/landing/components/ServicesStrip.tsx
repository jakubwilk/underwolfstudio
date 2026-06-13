import { Box, Group, Stack, Text } from '@mantine/core';

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

      <Text fz={10} className="tracking-[0.2em] uppercase text-(--text-tertiary) m-0">
        What we build
      </Text>

      {/* Desktop orbit — hidden below md */}
      <Box
        aria-hidden="true"
        className="hidden md:grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-x-30 gap-y-16 items-center justify-items-center max-w-215 w-full"
      >
        <Text
          fz={TAG_FZ}
          className="col-start-1 row-start-1 tracking-[-0.01em] text-(--accent) font-medium text-right justify-self-end m-0"
        >
          AI Agents
        </Text>
        <Text
          fz={TAG_FZ}
          className="col-start-3 row-start-1 tracking-[-0.01em] text-(--accent) font-medium text-left justify-self-start m-0"
        >
          AI Workflows
        </Text>
        <Box
          className="col-start-2 row-start-2 w-5.5 h-5.5 rounded-full bg-(--accent) shrink-0"
          style={{ boxShadow: DOT_GLOW }}
        />
        <Text
          fz={TAG_FZ}
          className="col-start-1 row-start-3 tracking-[-0.01em] text-(--text-secondary) text-right justify-self-end m-0"
        >
          Fullstack Web Application
        </Text>
        <Text
          fz={TAG_FZ}
          className="col-start-3 row-start-3 tracking-[-0.01em] text-(--text-secondary) text-left justify-self-start m-0"
        >
          Frontend Application
        </Text>
      </Box>

      {/* Mobile stack — hidden at md and above */}
      <Stack className="md:hidden w-full max-w-sm gap-10">
        {SERVICES.map(({ title, description, accent }) => (
          <Group key={title} align="flex-start" className="gap-4 flex-nowrap">
            <Box
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-(--accent) shrink-0 mt-1.5"
              style={{ boxShadow: DOT_GLOW }}
            />
            <Stack className="gap-1.5">
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
          </Group>
        ))}
      </Stack>
    </Box>
  );
}
