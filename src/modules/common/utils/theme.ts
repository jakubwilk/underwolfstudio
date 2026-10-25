import { colorsTuple, createTheme } from '@mantine/core';

// Indigo scale built around the site accent: shade 4 is `--accent` (#818cf8)
// from globals.css, so Mantine components match the logo and favicon.
const accent = colorsTuple([
  '#eef2ff',
  '#e0e7ff',
  '#c7d2fe',
  '#a5b4fc',
  '#818cf8',
  '#6366f1',
  '#4f46e5',
  '#4338ca',
  '#3730a3',
  '#312e81',
]);

export const theme = createTheme({
  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
  fontFamilyMonospace: 'var(--font-mono), ui-monospace, monospace',
  colors: { accent },
  primaryColor: 'accent',
  // In dark mode Mantine fills with the primary shade and draws outline,
  // light and text variants with shade (primary - 4) — so 8 here makes
  // those use the accent itself, while filled components get a deeper indigo.
  primaryShade: { light: 4, dark: 8 },
  // Shade 4 is light, so filled components in light mode get dark text.
  autoContrast: true,
});
