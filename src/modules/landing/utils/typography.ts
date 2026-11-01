// Type scale shared by every landing section, so headings and copy stay
// consistent. Sizes go through Mantine props (its styles outrank Tailwind's
// layered utilities); spacing, colour and tracking through the classes.

// Mono section label above a heading, e.g. "01 — USŁUGI".
export const EYEBROW = { fz: '12px' } as const;
export const EYEBROW_CLASS = 'm-0 font-mono uppercase tracking-[0.08em] text-(--accent-light)';

export const H2 = { fz: 'clamp(2rem, 4vw, 2.75rem)', fw: 600, lh: 1.1 } as const;
export const H2_CLASS = 'm-0 tracking-[-0.02em] text-balance text-(--text-primary)';

export const H3 = { fz: '1.25rem', fw: 600, lh: 1.3 } as const;
export const H3_CLASS = 'm-0 text-(--text-primary)';

export const LEAD = { fz: 'clamp(1.0625rem, 1.5vw, 1.125rem)', lh: 1.6 } as const;
export const LEAD_CLASS = 'm-0 text-pretty text-(--text-secondary)';

export const BODY = { fz: '1rem', lh: 1.6 } as const;
export const BODY_CLASS = 'm-0 text-pretty';

export const SMALL = { fz: '14px', lh: 1.55 } as const;
export const SMALL_CLASS = 'm-0';

export const META = { fz: '12px' } as const;
export const META_CLASS = 'm-0 font-mono';

export const BUTTON_FZ = '15px';
