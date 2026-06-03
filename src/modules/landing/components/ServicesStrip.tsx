import { Box, Text } from '@mantine/core';

const TAG_FZ = 'clamp(1rem, 1.8vw, 1.35rem)';

export function ServicesStrip() {
  return (
    <Box
      component="section"
      aria-label="Services"
      className="relative w-full py-30 px-12 flex flex-col items-center gap-16 bg-linear-to-b from-[#0d0d18] to-[var(--bg)] border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <Box
        aria-hidden="true"
        className="absolute w-225 h-125 -top-30 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />

      <Text fz={10} className="tracking-[0.2em] uppercase text-[var(--text-tertiary)] m-0">
        What we build
      </Text>

      <Box className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-x-30 gap-y-16 items-center justify-items-center max-w-215 w-full">
        <Text
          fz={TAG_FZ}
          className="col-start-1 row-start-1 tracking-[-0.01em] text-[var(--accent)] font-medium text-right justify-self-end m-0"
        >
          AI Agents
        </Text>
        <Text
          fz={TAG_FZ}
          className="col-start-3 row-start-1 tracking-[-0.01em] text-[var(--accent)] font-medium text-left justify-self-start m-0"
        >
          AI Workflows
        </Text>
        <Box
          aria-hidden="true"
          className="col-start-2 row-start-2 w-5.5 h-5.5 rounded-full bg-[var(--accent)] shrink-0"
          style={{
            boxShadow:
              '0 0 0 1px rgba(129,140,248,0.3), 0 0 16px rgba(129,140,248,0.8), 0 0 48px rgba(129,140,248,0.45), 0 0 96px rgba(129,140,248,0.2)',
          }}
        />
        <Text
          fz={TAG_FZ}
          className="col-start-1 row-start-3 tracking-[-0.01em] text-[var(--text-secondary)] text-right justify-self-end m-0"
        >
          Fullstack Web Application
        </Text>
        <Text
          fz={TAG_FZ}
          className="col-start-3 row-start-3 tracking-[-0.01em] text-[var(--text-secondary)] text-left justify-self-start m-0"
        >
          Frontend Application
        </Text>
      </Box>
    </Box>
  );
}
