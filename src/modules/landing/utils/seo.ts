import { MESSAGES } from '@/modules/common/i18n/messages';
import type { AppLocale } from '@/modules/common/i18n/routing';
import {
  BRAND_LOGO_MARK,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_URL,
} from '@/modules/common/utils/site';

import { CASE_STUDIES } from './caseStudies';
import { INDUSTRY_KEYS, SEO_SERVICE_KEYS } from './services';

// Plain-language facts shared by the JSON-LD and llms.txt, so search engines
// and LLMs get the same, consistent description of the studio. Texts come
// from the page messages, so they never drift from what visitors read.
const LOCATION = 'Warsaw, Poland';
const FOUNDED = '2026';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

// What the studio offers: the automations from the page plus AI agents and
// web applications, described as services.
function services(locale: AppLocale) {
  const { services } = MESSAGES[locale].seo;
  return SEO_SERVICE_KEYS.map((key) => services[key]);
}

export function buildJsonLd(locale: AppLocale) {
  const messages = MESSAGES[locale];
  const offered = services(locale);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}${BRAND_LOGO_MARK}`,
        description: messages.metadata.description,
        email: CONTACT_EMAIL,
        foundingDate: FOUNDED,
        founder: { '@id': FOUNDER_ID },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Warsaw',
          addressCountry: 'PL',
        },
        areaServed: 'PL',
        knowsAbout: [...offered.map(({ name }) => name), 'n8n', 'LangGraph', 'Next.js', 'KSeF'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: messages.seo.servicesTitle,
          itemListElement: offered.map(({ name, description }) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name, description },
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
        inLanguage: locale,
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  };
}

// Serialised for a <script> tag; `<` is escaped so the payload can't close it.
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// https://llmstxt.org — a Markdown summary of the site for LLMs, in English.
export function buildLlmsTxt() {
  const { metadata, services: offer, caseStudies, process } = MESSAGES.en;

  return [
    `# ${SITE_NAME}`,
    '',
    `> ${metadata.description}`,
    '',
    `${SITE_NAME} is a one-person studio based in ${LOCATION}, founded in ${FOUNDED} by ${FOUNDER_NAME}. It automates repetitive work in businesses such as ${INDUSTRY_KEYS.map((key) => offer.industries[key].name.toLowerCase()).join(', ')} with n8n workflows and AI, builds AI agents, and develops custom web applications. The site is in Polish (${SITE_URL}/) with an English version (${SITE_URL}/en).`,
    '',
    '## Services',
    '',
    ...services('en').map(({ name, description }) => `- **${name}**: ${description}`),
    '',
    '## Case studies',
    '',
    ...CASE_STUDIES.map((key) => {
      const study = caseStudies.items[key];
      return `- **${study.title}** (in use at ${SITE_NAME}): ${study.problem} ${study.effect}`;
    }),
    '',
    '## Pricing',
    '',
    `Every implementation is priced individually. ${process.priceNote}`,
    '',
    '## Contact',
    '',
    `- [Email](mailto:${CONTACT_EMAIL}): the way to start a collaboration`,
    `- [Contact form](${SITE_URL}/en#contact)`,
    `- [${FOUNDER_NAME} on LinkedIn](${LINKEDIN_URL})`,
    '',
  ].join('\n');
}
