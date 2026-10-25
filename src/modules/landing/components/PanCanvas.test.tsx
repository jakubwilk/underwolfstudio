import { afterEach, describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@/test/render';

import { PanCanvas } from './PanCanvas';

function renderCanvas() {
  render(
    <PanCanvas label="Canvas">
      <p>content</p>
    </PanCanvas>,
  );
  const canvas = screen.getByRole('group', { name: 'Canvas' });
  const content = screen.getByText('content').parentElement as HTMLElement;
  return { canvas, content };
}

describe('PanCanvas', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a focusable, labelled canvas with its content', () => {
    const { canvas } = renderCanvas();
    expect(canvas).toHaveAttribute('tabindex', '0');
    expect(canvas).toHaveAttribute('aria-roledescription', 'draggable canvas');
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('pans the content and the dot grid while dragging', () => {
    const { canvas, content } = renderCanvas();
    fireEvent.pointerDown(canvas, { pointerId: 1, button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(canvas, { pointerId: 1, clientX: 60, clientY: 110 });
    expect(content.style.transform).toBe('translate(-40px, 10px)');
    expect(canvas.style.backgroundPosition).toBe('-40px 10px');

    fireEvent.pointerUp(canvas, { pointerId: 1 });
    fireEvent.pointerMove(canvas, { pointerId: 1, clientX: 0, clientY: 0 });
    expect(content.style.transform).toBe('translate(-40px, 10px)');
  });

  it('pans with the arrow keys and stops at the edge', () => {
    const { canvas, content } = renderCanvas();
    fireEvent.keyDown(canvas, { key: 'ArrowRight' });
    expect(content.style.transform).toBe('translate(-40px, 0px)');

    // jsdom reports zero sizes, so only the 120px slack is available.
    for (let i = 0; i < 5; i++) fireEvent.keyDown(canvas, { key: 'ArrowUp' });
    expect(content.style.transform).toBe('translate(-40px, 120px)');
  });

  it('starts at the left edge of content wider than the canvas', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1000);
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400);
    const { content } = renderCanvas();
    expect(content.style.transform).toBe('translate(300px, 0px)');
  });
});
