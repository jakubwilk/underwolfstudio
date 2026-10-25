import { describe, expect, it } from 'vitest';

import { buildJsonLd, buildLlmsTxt, serializeJsonLd } from './seo';
import { SERVICES } from './services';

describe('buildJsonLd', () => {
  const [organization, person] = buildJsonLd()['@graph'];

  it('describes the studio with every service', () => {
    expect(organization).toMatchObject({
      '@type': 'ProfessionalService',
      name: 'Underwolf Studio',
      url: 'https://underwolfstudio.com',
      address: { addressLocality: 'Warsaw', addressCountry: 'PL' },
    });
    expect(organization.hasOfferCatalog?.itemListElement).toHaveLength(SERVICES.length);
  });

  it('links the founder to LinkedIn', () => {
    expect(person).toMatchObject({
      '@type': 'Person',
      name: 'Jakub Wilk',
      sameAs: ['https://www.linkedin.com/in/jakub-wilk/'],
    });
  });
});

describe('serializeJsonLd', () => {
  it('escapes "<" so the payload cannot close its script tag', () => {
    const json = serializeJsonLd({ text: '</script>' });
    expect(json).not.toContain('<');
    expect(JSON.parse(json)).toEqual({ text: '</script>' });
  });
});

describe('buildLlmsTxt', () => {
  const text = buildLlmsTxt();

  it('follows the llms.txt layout: title, summary, then sections', () => {
    expect(text.startsWith('# Underwolf Studio\n\n> ')).toBe(true);
    expect(text).toContain('## Services');
    expect(text).toContain('## Contact');
  });

  it('lists every service and the LinkedIn contact', () => {
    for (const { title } of SERVICES) expect(text).toContain(`**${title}**`);
    expect(text).toContain('(https://www.linkedin.com/in/jakub-wilk/)');
  });
});
