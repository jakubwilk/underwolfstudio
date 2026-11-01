import { Box } from '@mantine/core';
import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  ariaLabel: string;
  // Anchor target for the header navigation, e.g. "#services".
  id?: string;
  // Alternating sections get the slightly lighter background.
  alt?: boolean;
  className?: string;
}

// Full-width landing section with the content held to the page column.
// `scroll-mt-17` keeps anchored headings clear of the sticky header.
export function Section({ children, ariaLabel, id, alt = false, className = '' }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      aria-label={ariaLabel}
      className={`scroll-mt-17 border-b border-(--border-subtle) ${alt ? 'bg-(--bg-alt)' : ''}`}
    >
      <Box className={`max-w-300 mx-auto px-6 md:px-8 py-20 md:py-26 ${className}`}>{children}</Box>
    </Box>
  );
}
