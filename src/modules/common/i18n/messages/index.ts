import type { AppLocale } from '../routing';
import en from './en.json';
import pl from './pl.json';

export type Messages = typeof pl;

// Both locales are bundled statically: the site is small and this keeps the
// messages usable outside React (JSON-LD, llms.txt, sitemap).
export const MESSAGES: Record<AppLocale, Messages> = { pl, en };
