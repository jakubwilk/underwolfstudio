import { describe, expect, it } from 'vitest';

import { render } from '@/test/render';

import { StructuredData } from './StructuredData';

describe('StructuredData', () => {
  it('renders the studio JSON-LD as a script tag', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.textContent ?? '{}');
    const types = data['@graph'].map((node: { '@type': string }) => node['@type']);
    expect(types).toEqual(['ProfessionalService', 'Person', 'WebSite']);
  });
});
