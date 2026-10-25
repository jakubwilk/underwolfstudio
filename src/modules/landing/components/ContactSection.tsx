import { Button, Text, Title, VisuallyHidden } from '@mantine/core';
import { IconArrowUpRight, IconBrandLinkedin } from '@tabler/icons-react';

import { BlueprintFrame } from '@/modules/common/components/BlueprintFrame';
import { LINKEDIN_URL } from '@/modules/common/utils/site';

export function ContactSection() {
  return (
    <BlueprintFrame
      label="contact"
      index="03"
      ariaLabel="Contact"
      className="w-full px-6 py-24 flex flex-col items-center gap-6 text-center bg-(--bg-canvas) bg-dot-grid border-t-0"
    >
      <Title
        order={2}
        fz="clamp(2rem, 4.5vw, 3.25rem)"
        className="m-0 font-bold tracking-[-0.03em] leading-[1.05] text-(--text-primary)"
      >
        Let&apos;s work together
      </Title>

      <Text
        fz="clamp(0.95rem, 1.5vw, 1.05rem)"
        className="m-0 max-w-[460px] leading-[1.7] text-(--text-secondary)"
      >
        Visit my LinkedIn profile to start a collaboration.
      </Text>

      <Button
        component="a"
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        radius={0}
        size="md"
        fw={500}
        leftSection={<IconBrandLinkedin size={18} stroke={1.5} />}
        rightSection={<IconArrowUpRight size={16} stroke={1.5} />}
        className="mt-2 font-mono uppercase tracking-[0.14em] text-[13px]"
      >
        Connect on LinkedIn <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
      </Button>
    </BlueprintFrame>
  );
}
