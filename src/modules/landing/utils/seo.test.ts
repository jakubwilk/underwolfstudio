import { describe, expect, it } from 'vitest';

import { buildJsonLd, buildLlmsTxt, serializeJsonLd } from './seo';

describe('buildJsonLd', () => {
  const [organization, person, website] = buildJsonLd('pl')['@graph'];

  it('describes the studio with its services, web applications included', () => {
    expect(organization).toMatchObject({
      '@type': 'ProfessionalService',
      name: 'Underwolf Studio',
      url: 'https://underwolfstudio.com',
      email: 'biznes@underwolfstudio.com',
      address: { addressLocality: 'Warsaw', addressCountry: 'PL' },
    });
    expect(organization.hasOfferCatalog?.itemListElement).toHaveLength(5);
    expect(organization.hasOfferCatalog?.itemListElement?.[0]).toMatchObject({
      itemOffered: { name: 'Automatyzacja obiegu dokumentów' },
    });
    expect(organization.hasOfferCatalog?.itemListElement?.[4]).toMatchObject({
      itemOffered: { name: 'Aplikacje internetowe na zamówienie' },
    });
  });

  it('uses the texts of the requested language', () => {
    const [english] = buildJsonLd('en')['@graph'];
    expect(english.description).toMatch(/^I automate repetitive work in businesses/);
    expect(english.description).toContain('web applications');
    expect(website).toMatchObject({ '@type': 'WebSite', inLanguage: 'pl' });
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
    for (const section of ['## Services', '## Case studies', '## Pricing', '## Contact']) {
      expect(text).toContain(section);
    }
  });

  it('lists the services, the case study, price and contacts', () => {
    expect(text).toContain('**Automated reminders and follow-ups**');
    expect(text).toContain('**Custom web applications**');
    expect(text).toContain('accounting firms, law firms, service businesses');
    expect(text).toContain('**Handling customer inquiries** (in use at Underwolf Studio)');
    expect(text).not.toMatch(/demo/i);
    expect(text).toContain('Every implementation is priced individually.');
    expect(text).toContain('(mailto:biznes@underwolfstudio.com)');
    expect(text).toContain('(https://www.linkedin.com/in/jakub-wilk/)');
  });
});
