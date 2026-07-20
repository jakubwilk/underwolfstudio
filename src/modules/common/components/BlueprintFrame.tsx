import { Box } from '@mantine/core';
import type { ReactNode } from 'react';

interface BlueprintFrameProps {
  children: ReactNode;
  label?: string;
  index?: string;
  className?: string;
  component?: 'section' | 'div';
  ariaLabel?: string;
}

export function BlueprintFrame({
  children,
  label,
  index,
  className = '',
  component = 'section',
  ariaLabel,
}: BlueprintFrameProps) {
  return (
    <Box
      component={component}
      aria-label={ariaLabel}
      className={`relative border border-(--border-subtle) ${className}`}
    >
      {label ? (
        <Box
          component="span"
          className="absolute -top-[9px] left-6 px-2 bg-(--bg) text-[11px] tracking-[0.14em] text-(--text-tertiary) uppercase font-(family-name:--font-mono)"
        >
          {label}
        </Box>
      ) : null}
      {index ? (
        <Box
          component="span"
          className="absolute -top-[9px] right-6 px-2 bg-(--bg) text-[11px] tracking-[0.14em] text-(--text-tertiary) font-(family-name:--font-mono)"
        >
          [{index}]
        </Box>
      ) : null}
      {children}
    </Box>
  );
}
