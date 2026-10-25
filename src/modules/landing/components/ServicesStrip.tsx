import { Box, Stack, Text, Title } from '@mantine/core';

import { BlueprintFrame } from '@/modules/common/components/BlueprintFrame';

import { SERVICES } from '../utils/services';

const TAG_FZ = 'clamp(1.1rem, 2vw, 1.5rem)';

export function ServicesStrip() {
  return (
    <BlueprintFrame
      label="services"
      index="02"
      ariaLabel="Services"
      className="w-full py-30 px-12 flex flex-col items-center gap-16 bg-(--bg-alt) bg-dot-grid border-t-0"
    >
      <Box className="inline-flex items-center px-4 py-1.5 border border-(--border-subtle) bg-white/3">
        <Title
          order={2}
          fz="clamp(0.95rem, 1.5vw, 1.05rem)"
          fw={400}
          className="tracking-[0.2em] uppercase text-(--text-tertiary) m-0 font-mono"
        >
          What we build
        </Title>
      </Box>

      {/* Desktop crosshair grid with descriptions — hidden below md */}
      <Box
        visibleFrom="md"
        role="list"
        className="relative grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-x-30 gap-y-16 items-center justify-items-center max-w-215 w-full"
      >
        <Box
          aria-hidden="true"
          className="col-start-2 row-start-1 row-end-4 self-stretch w-px bg-(--border-subtle)"
        />
        <Box
          aria-hidden="true"
          className="row-start-2 col-start-1 col-end-4 justify-self-stretch h-px bg-(--border-subtle)"
        />

        {SERVICES.map(({ title, description, accent }, i) => {
          const isLeft = i % 2 === 0;
          const num = String(i + 1).padStart(2, '0');
          return (
            <Stack
              key={title}
              role="listitem"
              style={{ gridColumnStart: isLeft ? 1 : 3, gridRowStart: i < 2 ? 1 : 3 }}
              className={`gap-1.5 ${isLeft ? 'items-end' : 'items-start'}`}
            >
              <Box className={`flex items-center gap-2 ${isLeft ? 'flex-row-reverse' : ''}`}>
                <Text aria-hidden="true" fz="10px" className="text-(--text-tertiary) font-mono">
                  {num}
                </Text>
                <Text
                  component="h3"
                  fz={TAG_FZ}
                  fw={500}
                  className={`tracking-[-0.01em] m-0 max-w-50 wrap-break-word font-mono ${isLeft ? 'text-right' : 'text-left'} ${accent ? 'text-(--accent)' : 'text-(--text-secondary)'}`}
                >
                  {title}
                </Text>
              </Box>
              <Text
                fz="15px"
                className={`m-0 leading-relaxed max-w-50 font-mono ${isLeft ? 'text-right' : 'text-left'} ${accent ? 'text-(--text-secondary)' : 'text-(--text-tertiary)'}`}
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
      <Stack component="ul" hiddenFrom="md" gap={40} className="w-full max-w-sm list-none m-0 p-0">
        {SERVICES.map(({ title, description, accent }, i) => (
          <Box component="li" key={title} className="flex items-start gap-3">
            <Box
              aria-hidden="true"
              className="flex items-center justify-center w-6 h-6 border border-(--border-subtle) text-[10px] text-(--text-tertiary) font-mono shrink-0"
            >
              {String(i + 1).padStart(2, '0')}
            </Box>
            <Stack gap={6}>
              <Text
                component="h3"
                fz="17px"
                fw={500}
                className={`m-0 tracking-[-0.01em] wrap-break-word font-mono ${accent ? 'text-(--accent)' : 'text-foreground'}`}
              >
                {title}
              </Text>
              <Text fz="sm" className="m-0 text-(--text-secondary) leading-relaxed font-mono">
                {description}
              </Text>
            </Stack>
          </Box>
        ))}
      </Stack>
    </BlueprintFrame>
  );
}
