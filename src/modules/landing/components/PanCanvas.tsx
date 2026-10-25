'use client';

import { Box } from '@mantine/core';
import { useEffect, useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';

// How far (px) the content can be dragged past the point where it fits.
const SLACK = 120;
const KEY_STEP = 40;

const KEY_DIRECTIONS: Record<string, [number, number]> = {
  ArrowLeft: [1, 0],
  ArrowRight: [-1, 0],
  ArrowUp: [0, 1],
  ArrowDown: [0, -1],
};

const clamp = (value: number, limit: number) => Math.min(limit, Math.max(-limit, value));

interface Offset {
  x: number;
  y: number;
}

// Clamps the offset to the viewport and writes it straight to the DOM, so
// dragging doesn't re-render React. Returns the applied offset.
function applyOffset(viewport: HTMLElement, content: HTMLElement, { x, y }: Offset): Offset {
  const maxX = Math.max(0, (content.offsetWidth - viewport.clientWidth) / 2) + SLACK;
  const maxY = Math.max(0, (content.offsetHeight - viewport.clientHeight) / 2) + SLACK;
  const applied = { x: clamp(x, maxX), y: clamp(y, maxY) };
  content.style.transform = `translate(${applied.x}px, ${applied.y}px)`;
  viewport.style.backgroundPosition = `${applied.x}px ${applied.y}px`;
  return applied;
}

interface PanCanvasProps {
  children: ReactNode;
  label: string;
  className?: string;
}

// n8n-style canvas: the content can be dragged around (or moved with the
// arrow keys) instead of scrolled, and the dot grid moves with it. It starts
// centred, or at its left edge when wider than the canvas. Vertical touch
// swipes still scroll the page.
export function PanCanvas({ children, label, className = '' }: PanCanvasProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const offset = useRef<Offset>({ x: 0, y: 0 });
  const drag = useRef<{ pointerId: number; x: number; y: number } | null>(null);

  const moveTo = (x: number, y: number) => {
    if (viewportRef.current && contentRef.current) {
      offset.current = applyOffset(viewportRef.current, contentRef.current, { x, y });
    }
  };

  // Show the start of overflowing content, then keep it in bounds when the
  // window (and so the canvas) resizes.
  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (viewport && content) {
      const overflow = Math.max(0, (content.offsetWidth - viewport.clientWidth) / 2);
      offset.current = applyOffset(viewport, content, { x: overflow, y: 0 });
    }

    const onResize = () => {
      if (viewportRef.current && contentRef.current) {
        offset.current = applyOffset(viewportRef.current, contentRef.current, offset.current);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = {
      pointerId: e.pointerId,
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== e.pointerId) return;
    moveTo(e.clientX - drag.current.x, e.clientY - drag.current.y);
  };

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId === e.pointerId) drag.current = null;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const direction = KEY_DIRECTIONS[e.key];
    if (!direction) return;
    e.preventDefault();
    moveTo(offset.current.x + direction[0] * KEY_STEP, offset.current.y + direction[1] * KEY_STEP);
  };

  return (
    <Box
      ref={viewportRef}
      role="group"
      aria-label={label}
      aria-roledescription="draggable canvas"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
      className={`relative flex items-center justify-center overflow-hidden bg-dot-grid cursor-grab active:cursor-grabbing select-none touch-pan-y focus-visible:outline focus-visible:outline-(--accent) focus-visible:-outline-offset-1 ${className}`}
    >
      <Box ref={contentRef} className="shrink-0 will-change-transform">
        {children}
      </Box>
      <Box
        component="span"
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-8 text-[10px] tracking-[0.14em] uppercase text-(--text-tertiary) font-mono"
      >
        Drag to explore
      </Box>
    </Box>
  );
}
