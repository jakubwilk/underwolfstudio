// Keys of `services.pillars` and `services.industries` in the messages, in
// display order. Every industry has the same four problems.
export const PILLAR_KEYS = ['automation', 'agents', 'webApps'] as const;
export const INDUSTRY_KEYS = ['accounting', 'legal', 'services'] as const;
export const PROBLEM_KEYS = ['documents', 'dataEntry', 'followUp', 'questions'] as const;

export type PillarKey = (typeof PILLAR_KEYS)[number];
export type IndustryKey = (typeof INDUSTRY_KEYS)[number];

// Services described in the JSON-LD and llms.txt (`seo.services`).
export const SEO_SERVICE_KEYS = [
  'documents',
  'dataEntry',
  'followUp',
  'agents',
  'webApps',
] as const;
