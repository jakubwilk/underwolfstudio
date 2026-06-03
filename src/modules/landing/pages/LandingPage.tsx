import { Box, Group, Stack, Text, Title } from '@mantine/core';

import { ServicesStrip } from '../components/ServicesStrip';

export function LandingPage() {
  return (
    <Box className="min-h-full">
      <Box
        component="section"
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[var(--bg)]"
      >
        <Box
          aria-hidden="true"
          className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] rounded-full blur-[48px] animate-orb-breathe"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)',
          }}
        />
        <Box
          aria-hidden="true"
          className="absolute w-[500px] h-[500px] top-[62%] left-[58%] rounded-full blur-[64px] animate-orb-breathe-2"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)',
          }}
        />

        <Stack
          component="main"
          align="center"
          className="relative z-10 text-center px-6 max-w-[860px] gap-7"
        >
          <Box className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-white/[0.03] text-[11px] tracking-[0.12em] text-[var(--text-secondary)] uppercase animate-fade-up-1">
            <Box
              aria-hidden="true"
              className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] opacity-90 shrink-0"
            />
            Underwolf Studio
          </Box>

          <Title
            order={1}
            fz="clamp(3rem, 7.5vw, 7rem)"
            className="m-0 font-bold tracking-[-0.03em] leading-[1.02] bg-gradient-to-b from-white to-white/60 bg-clip-text animate-fade-up-3"
            style={{ color: 'transparent' }}
          >
            Welcome to
            <br />
            the AI Era
          </Title>

          <Text
            fz="clamp(0.95rem, 1.5vw, 1.05rem)"
            className="text-[var(--text-secondary)] tracking-[0.01em] leading-[1.7] max-w-[420px] m-0 animate-fade-up-5"
          >
            Intelligent solutions built for tomorrow.
          </Text>

          <Box
            aria-hidden="true"
            className="w-px h-11 bg-gradient-to-b from-transparent via-[var(--border-subtle)] to-transparent animate-fade-up-7"
          />
        </Stack>

        <Group
          component="footer"
          gap={16}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.18em] text-[var(--text-tertiary)] uppercase whitespace-nowrap animate-fade-up-9"
        >
          <Text inherit>Est. 2025</Text>
          <Box aria-hidden="true" className="w-[3px] h-[3px] rounded-full bg-current shrink-0" />
          <Text inherit>Warsaw, Poland</Text>
          <Box aria-hidden="true" className="w-[3px] h-[3px] rounded-full bg-current shrink-0" />
          <Text inherit>AI First</Text>
        </Group>
      </Box>

      <ServicesStrip />
    </Box>
  );
}
