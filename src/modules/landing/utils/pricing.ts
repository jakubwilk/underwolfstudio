// Starting price for an automation, in PLN net.
export const PRICE_FROM_PLN = 3000;

// "3 000 zł" / "PLN 3,000"; grouping is forced since Polish skips it below 10 000.
export const PRICE_FORMAT = {
  style: 'currency',
  currency: 'PLN',
  maximumFractionDigits: 0,
  useGrouping: 'always',
} as const satisfies Intl.NumberFormatOptions;
