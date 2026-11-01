import { colorsTuple, createTheme } from '@mantine/core';

// Indigo scale built around the site accent: shade 4 is `--accent` (#7b7cf6)
// from globals.css, so Mantine components match the logo and favicon.
const accent = colorsTuple([
  '#eeeeff',
  '#dcdcfe',
  '#c4c5fc',
  '#9d9ef9',
  '#7b7cf6',
  '#6667ee',
  '#5354d9',
  '#4445b8',
  '#373894',
  '#2c2d73',
]);

export const theme = createTheme({
  fontFamily: 'var(--font-sans), system-ui, sans-serif',
  fontFamilyMonospace: 'var(--font-mono), ui-monospace, monospace',
  headings: { fontFamily: 'var(--font-sans), system-ui, sans-serif', fontWeight: '600' },
  colors: { accent },
  primaryColor: 'accent',
  primaryShade: 4,
  // Filled buttons get their dark text and lighter hover in globals.css.
  defaultRadius: 6,
});
