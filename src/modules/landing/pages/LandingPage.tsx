import { Box, Group, Stack, Text, Title } from '@mantine/core';

import { BlueprintFrame } from '@/modules/common/components/BlueprintFrame';
import { BrandLogo } from '@/modules/common/components/BrandLogo';

import { ContactSection } from '../components/ContactSection';
import { ServicesStrip } from '../components/ServicesStrip';
import { StructuredData } from '../components/StructuredData';
import { WorkflowDiagram } from '../components/WorkflowDiagram';

const TAGS = ['Est.2026', 'Warsaw', 'AI-First'] as const;

export function LandingPage() {
  return (
    <>
      <StructuredData />

      <Box component="main">
        <BlueprintFrame
          label="underwolf"
          index="00"
          ariaLabel="Introduction"
          className="w-full min-h-svh overflow-hidden flex flex-col items-center bg-dot-grid"
        >
          <Stack
            align="center"
            justify="center"
            className="flex-1 text-center px-6 py-16 max-w-[860px] gap-7"
          >
            <BrandLogo className="w-[clamp(200px,24vw,300px)] h-auto text-(--text-primary) animate-fade-up-1" />

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
            component="ul"
            gap={10}
            justify="center"
            className="list-none m-0 px-6 pb-8 text-[10px] tracking-[0.14em] text-(--text-tertiary) uppercase font-mono animate-fade-up-9"
          >
            {TAGS.map((tag) => (
              <Text
                key={tag}
                component="li"
                inherit
                className="border border-(--border-subtle) px-2.5 py-1 whitespace-nowrap"
              >
                {tag}
              </Text>
            ))}
          </Group>
        </BlueprintFrame>

        <BlueprintFrame
          label="workflow"
          index="01"
          ariaLabel="How we work"
          className="w-full border-t-0"
        >
          <WorkflowDiagram />
        </BlueprintFrame>

        <ServicesStrip />

        <ContactSection />
      </Box>

      <Box
        component="footer"
        className="flex justify-center px-6 py-8 text-[11px] tracking-[0.14em] text-(--text-tertiary) uppercase font-mono"
      >
        © 2026 Underwolf Studio · Warsaw
      </Box>
    </>
  );
}
