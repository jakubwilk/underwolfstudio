import { Box } from '@mantine/core';

import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { ContactSection } from '../components/ContactSection';
import { FaqSection } from '../components/FaqSection';
import { HeroSection } from '../components/HeroSection';
import { IntegrationsStrip } from '../components/IntegrationsStrip';
import { ProcessSection } from '../components/ProcessSection';
import { ServicesSection } from '../components/ServicesSection';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { StructuredData } from '../components/StructuredData';

export function LandingPage() {
  return (
    <>
      <StructuredData />

      <SiteHeader />

      <Box component="main">
        <HeroSection />
        <IntegrationsStrip />
        <ServicesSection />
        <CaseStudiesSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </Box>

      <SiteFooter />
    </>
  );
}
