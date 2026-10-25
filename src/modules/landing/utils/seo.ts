import {
  BRAND_LOGO_MARK,
  FOUNDER_NAME,
  LINKEDIN_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/modules/common/utils/site';

import { SERVICES } from './services';

// Plain-language facts shared by the JSON-LD and llms.txt, so search engines
// and LLMs get the same, consistent description of the studio.
const LOCATION = 'Warsaw, Poland';
const FOUNDED = '2026';

const INTEGRATIONS = [
  'Google Workspace',
  'Google Drive',
  'REST APIs',
  'Webhooks',
  'SMTP email',
  'Slack',
  'Discord',
  'SAP and other ERP systems',
  'PostgreSQL',
  'Redis',
] as const;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}${BRAND_LOGO_MARK}`,
        description: SITE_DESCRIPTION,
        foundingDate: FOUNDED,
        founder: { '@id': FOUNDER_ID },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Warsaw',
          addressCountry: 'PL',
        },
        knowsAbout: [...SERVICES.map(({ title }) => title), ...INTEGRATIONS],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: SERVICES.map(({ title, description }) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: title, description },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: FOUNDER_NAME,
        jobTitle: 'Founder',
        worksFor: { '@id': ORGANIZATION_ID },
        sameAs: [LINKEDIN_URL],
      },
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  };
}

// Serialised for a <script> tag; `<` is escaped so the payload can't close it.
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// https://llmstxt.org — a Markdown summary of the site for LLMs.
export function buildLlmsTxt() {
  return [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `${SITE_NAME} is a software studio based in ${LOCATION}, founded in ${FOUNDED} by ${FOUNDER_NAME}. It designs and builds AI-first products: autonomous AI agents, AI workflow automation that connects language models with business systems, and fullstack and frontend web applications.`,
    '',
    '## Services',
    '',
    ...SERVICES.map(({ title, description }) => `- **${title}**: ${description}`),
    '',
    '## Integrations',
    '',
    `Workflows and agents connect to: ${INTEGRATIONS.join(', ')}, and other systems on request.`,
    '',
    '## Contact',
    '',
    `- [${FOUNDER_NAME} on LinkedIn](${LINKEDIN_URL}): the way to start a collaboration`,
    `- [Website](${SITE_URL}/)`,
    '',
  ].join('\n');
}
