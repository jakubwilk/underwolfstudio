import { Box, Group, Stack, Text, Title } from '@mantine/core';

import { BlueprintFrame } from '@/modules/common/components/BlueprintFrame';

import { ServicesStrip } from '../components/ServicesStrip';

export function LandingPage() {
  return (
    <Box className="min-h-full">
      <BlueprintFrame
        label="underwolf"
        index="00"
        className="w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-dot-grid"
      >
        <Stack component="main" align="center" className="text-center px-6 max-w-[860px] gap-7">
          <Box className="inline-flex items-center gap-2 px-4 py-1.5 border border-(--border-subtle) bg-white/[0.03] text-[11px] tracking-[0.12em] text-(--text-secondary) uppercase font-(family-name:--font-mono) animate-fade-up-1">
            <Box
              aria-hidden="true"
              className="w-[5px] h-[5px] rounded-full bg-(--accent) opacity-90 shrink-0"
            />
            Underwolf Studio
          </Box>

          <Title
            order={1}
            fz="clamp(3rem, 7.5vw, 7rem)"
            className="m-0 font-bold tracking-[-0.03em] leading-[1.02] text-(--text-primary) animate-fade-up-3"
          >
            Welcome to
            <br />
            the AI Era
          </Title>

          <Text
            fz="clamp(0.95rem, 1.5vw, 1.05rem)"
            className="text-(--text-secondary) tracking-[0.01em] leading-[1.7] max-w-[420px] m-0 animate-fade-up-5"
          >
            Intelligent solutions built for tomorrow.
          </Text>

          <Box aria-hidden="true" className="w-px h-11 bg-(--border-subtle) animate-fade-up-7" />
        </Stack>

        <Group
          component="footer"
          gap={10}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.14em] text-(--text-tertiary) uppercase whitespace-nowrap font-(family-name:--font-mono) animate-fade-up-9"
        >
          <Text inherit className="border border-(--border-subtle) px-2.5 py-1">
            Est.2026
          </Text>
          <Text inherit className="border border-(--border-subtle) px-2.5 py-1">
            Warsaw
          </Text>
          <Text inherit className="border border-(--border-subtle) px-2.5 py-1">
            AI-First
          </Text>
        </Group>
      </BlueprintFrame>

      <ServicesStrip />
    </Box>
  );
}
