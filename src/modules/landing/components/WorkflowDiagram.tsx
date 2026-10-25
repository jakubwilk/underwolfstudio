import {
  IconApi,
  IconBolt,
  IconBrain,
  IconBrandDiscord,
  IconBrandGoogle,
  IconBrandGoogleDrive,
  IconBrandSlack,
  IconBuildingFactory2,
  IconDatabase,
  IconMail,
  IconPlugConnected,
  IconPlus,
  IconRobot,
  IconRocket,
  IconServerBolt,
  IconTool,
  IconTransform,
  IconWebhook,
  type TablerIcon,
} from '@tabler/icons-react';
import type { CSSProperties } from 'react';

import { PanCanvas } from './PanCanvas';

// Decorative n8n-style workflow on a draggable canvas: a linear chain from a
// new process to production, with the integrations we work with hanging off
// one step. A CSS "execution" lights the steps up in order; see `animate-flow-*`.

interface ChainNode {
  label: string;
  icon: TablerIcon;
  trigger?: boolean;
}

interface Integration {
  label: string;
  icon: TablerIcon;
  more?: boolean;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Point {
  x: number;
  y: number;
}

interface Layout {
  width: number;
  height: number;
  chain: Rect[];
  integrations: Rect[];
}

const CHAIN: ChainNode[] = [
  { label: 'New process', icon: IconBolt, trigger: true },
  { label: 'Prepare data', icon: IconTransform },
  { label: 'Integrations', icon: IconPlugConnected },
  { label: 'Tools', icon: IconTool },
  { label: 'AI agent', icon: IconRobot },
  { label: 'LLM', icon: IconBrain },
  { label: 'Ship to production', icon: IconRocket },
];

// Index in CHAIN of the step the integrations connect to.
const HUB = 2;

const INTEGRATIONS: Integration[] = [
  { label: 'Google', icon: IconBrandGoogle },
  { label: 'Drive', icon: IconBrandGoogleDrive },
  { label: 'REST API', icon: IconApi },
  { label: 'Webhooks', icon: IconWebhook },
  { label: 'SMTP', icon: IconMail },
  { label: 'Slack', icon: IconBrandSlack },
  { label: 'Discord', icon: IconBrandDiscord },
  { label: 'SAP / ERP', icon: IconBuildingFactory2 },
  { label: 'PostgreSQL', icon: IconDatabase },
  { label: 'Redis', icon: IconServerBolt },
  { label: 'and more', icon: IconPlus, more: true },
];

const ARIA_LABEL = `Workflow: ${CHAIN.map(({ label }) => label).join(', then ')}. Integrations include ${INTEGRATIONS.filter(
  ({ more }) => !more,
)
  .map(({ label }) => label)
  .join(', ')} and more.`;

const FONT_SIZE = 12;

// Animation timeline, in steps: chain node i lights at 2i, the edge after it
// at 2i + 1, and the integrations fan out one by one after the hub.
const STEP_MS = 300;
const FAN_STEP = 0.25;
const chainStep = (i: number) => 2 * i;
const integrationEdgeStep = (i: number) => chainStep(HUB) + 1 + i * FAN_STEP;

const center = (r: Rect): Point => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

// Integrations are spread evenly between two coordinates.
const spread = (from: number, to: number, i: number) =>
  from + ((to - from) * i) / (INTEGRATIONS.length - 1);

function createLayout(): Layout {
  const pad = 40;
  const gap = 76;
  const size = 64;
  const hubWidth = 184;
  const top = 48;
  const r = 22;
  const integrationsY = 270;

  let x = pad;
  const chain = CHAIN.map((_, i) => {
    const w = i === HUB ? hubWidth : size;
    const rect = { x, y: top, w, h: size };
    x += w + gap;
    return rect;
  });
  const first = center(chain[0]).x;
  const last = center(chain[chain.length - 1]).x;

  return {
    width: x - gap + pad,
    height: integrationsY + r + 40,
    chain,
    integrations: INTEGRATIONS.map((_, i) => ({
      x: spread(first, last, i) - r,
      y: integrationsY - r,
      w: 2 * r,
      h: 2 * r,
    })),
  };
}

const LAYOUT = createLayout();

function curve(a: Point, b: Point, axis: 'x' | 'y') {
  if (axis === 'x') {
    const d = (b.x - a.x) / 2;
    return `M${a.x} ${a.y} C${a.x + d} ${a.y} ${b.x - d} ${b.y} ${b.x} ${b.y}`;
  }
  const d = (b.y - a.y) / 2;
  return `M${a.x} ${a.y} C${a.x} ${a.y + d} ${b.x} ${b.y - d} ${b.x} ${b.y}`;
}

// Chain ports sit on the right (out) and left (in) edges; the hub has one
// port per integration, spread along its bottom edge.
const outPort = (r: Rect): Point => ({ x: r.x + r.w, y: r.y + r.h / 2 });
const inPort = (r: Rect): Point => ({ x: r.x, y: r.y + r.h / 2 });
const hubPort = (r: Rect, i: number): Point => ({
  x: spread(r.x + 16, r.x + r.w - 16, i),
  y: r.y + r.h,
});
const integrationPort = (r: Rect): Point => ({ x: r.x + r.w / 2, y: r.y });

// Trigger nodes have a rounded "back" on the left, like n8n.
function triggerPath({ x, y, w, h }: Rect) {
  const r = 10;
  const R = h * 0.4;
  return [
    `M${x + R} ${y}`,
    `H${x + w - r}`,
    `A${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V${y + h - r}`,
    `A${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H${x + R}`,
    `A${R} ${R} 0 0 1 ${x} ${y + h - R}`,
    `V${y + R}`,
    `A${R} ${R} 0 0 1 ${x + R} ${y}`,
    'Z',
  ].join(' ');
}

const delay = (step: number) => ({ animationDelay: `${Math.round(step * STEP_MS)}ms` });

type Shape = 'trigger' | 'node' | 'circle';

function NodeShape({ shape, rect }: { shape: Shape; rect: Rect }) {
  const { x, y, w, h } = rect;
  if (shape === 'trigger') return <path d={triggerPath(rect)} />;
  if (shape === 'circle') return <circle cx={x + w / 2} cy={y + h / 2} r={w / 2} />;
  return <rect x={x} y={y} width={w} height={h} rx={10} />;
}

interface DiagramNodeProps {
  rect: Rect;
  label: string;
  icon: TablerIcon;
  shape: Shape;
  step: number;
  fontSize: number;
  dashed?: boolean;
}

// Wide nodes carry their label inside, the rest below.
function DiagramNode({ rect, label, icon: Icon, shape, step, fontSize, dashed }: DiagramNodeProps) {
  const { x, y, w, h } = rect;
  const inside = w > h * 1.5;
  const iconSize = inside ? h * 0.42 : shape === 'circle' ? w * 0.5 : w * 0.42;
  const icon: Point = inside
    ? { x: x + h * 0.3, y: y + (h - iconSize) / 2 }
    : { x: x + (w - iconSize) / 2, y: y + (h - iconSize) / 2 };
  const dash = dashed ? '4 4' : undefined;

  return (
    <g>
      <g className="fill-(--bg-alt) stroke-(--border-strong)" strokeDasharray={dash}>
        <NodeShape shape={shape} rect={rect} />
      </g>
      <g
        className="fill-(--accent)/8 stroke-(--accent) animate-flow-fade"
        strokeDasharray={dash}
        style={delay(step)}
      >
        <NodeShape shape={shape} rect={rect} />
      </g>

      <Icon
        x={icon.x}
        y={icon.y}
        size={iconSize}
        stroke={1.5}
        className="text-(--text-secondary)"
      />
      <Icon
        x={icon.x}
        y={icon.y}
        size={iconSize}
        stroke={1.5}
        className="text-(--accent) animate-flow-fade"
        style={delay(step)}
      />

      {inside ? (
        <text
          x={icon.x + iconSize + h * 0.2}
          y={y + h / 2}
          dominantBaseline="central"
          fontSize={fontSize + 2}
          className="fill-(--text-primary)"
        >
          {label}
        </text>
      ) : (
        <text
          x={x + w / 2}
          y={y + h + fontSize + 10}
          textAnchor="middle"
          fontSize={fontSize}
          className="fill-(--text-secondary)"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function Diagram() {
  const { chain, integrations } = LAYOUT;

  const chainEdges = chain.slice(1).map((rect, i) => ({
    a: outPort(chain[i]),
    b: inPort(rect),
    step: chainStep(i) + 1,
  }));
  const fanEdges = integrations.map((rect, i) => ({
    a: hubPort(chain[HUB], i),
    b: integrationPort(rect),
    step: integrationEdgeStep(i),
  }));

  return (
    <svg
      viewBox={`0 0 ${LAYOUT.width} ${LAYOUT.height}`}
      role="img"
      aria-label={ARIA_LABEL}
      style={{ '--diagram-width': `${LAYOUT.width}px` } as CSSProperties}
      className="block h-auto font-mono overflow-visible w-(--diagram-width) lg:w-[calc(var(--diagram-width)*1.15)] 2xl:w-[calc(var(--diagram-width)*1.3)]"
    >
      <g fill="none" strokeWidth={1.5}>
        {chainEdges.map(({ a, b, step }) => (
          <g key={step}>
            <path d={curve(a, b, 'x')} className="stroke-(--border-strong)" />
            <path
              d={curve(a, b, 'x')}
              pathLength={1}
              strokeDasharray="1"
              className="stroke-(--accent) animate-flow-draw"
              style={delay(step)}
            />
          </g>
        ))}
        {fanEdges.map(({ a, b, step }) => (
          <g key={step} strokeDasharray="5 5">
            <path d={curve(a, b, 'y')} className="stroke-(--border-strong)" />
            <path
              d={curve(a, b, 'y')}
              className="stroke-(--accent) animate-flow-fade"
              style={delay(step)}
            />
          </g>
        ))}
      </g>

      {CHAIN.map((node, i) => (
        <DiagramNode
          key={node.label}
          rect={chain[i]}
          label={node.label}
          icon={node.icon}
          shape={node.trigger ? 'trigger' : 'node'}
          step={chainStep(i)}
          fontSize={FONT_SIZE}
        />
      ))}
      {INTEGRATIONS.map((integration, i) => (
        <DiagramNode
          key={integration.label}
          rect={integrations[i]}
          label={integration.label}
          icon={integration.icon}
          shape="circle"
          step={integrationEdgeStep(i) + 1}
          fontSize={FONT_SIZE - 1}
          dashed={integration.more}
        />
      ))}

      {/* Connection handles: dots on chain ports, diamonds on the hub's integration ports. */}
      <g className="fill-(--text-tertiary)">
        {chainEdges.flatMap(({ a, b, step }) => [
          <circle key={`${step}-out`} cx={a.x} cy={a.y} r={4} />,
          <circle key={`${step}-in`} cx={b.x} cy={b.y} r={4} />,
        ])}
        {fanEdges.map(({ a, step }) => (
          <rect
            key={step}
            x={a.x - 2.5}
            y={a.y - 2.5}
            width={5}
            height={5}
            transform={`rotate(45 ${a.x} ${a.y})`}
          />
        ))}
      </g>
    </svg>
  );
}

export function WorkflowDiagram() {
  return (
    <PanCanvas label="Workflow canvas" className="w-full h-110 lg:h-125 2xl:h-140 bg-(--bg-canvas)">
      <Diagram />
    </PanCanvas>
  );
}
