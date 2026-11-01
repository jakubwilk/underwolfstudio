import { Anchor, Box, Text, VisuallyHidden } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { BrandLogo } from '@/modules/common/components/BrandLogo';
import { LINKEDIN_URL } from '@/modules/common/utils/site';

export function SiteFooter() {
  const t = useTranslations('footer');

  return (
    <Box component="footer" className="bg-(--bg-footer)">
      <Box className="max-w-300 mx-auto px-6 md:px-8 py-10 flex flex-wrap items-center justify-between gap-6">
        <BrandLogo className="w-32 h-auto text-(--text-primary)" />
        <Box className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px]">
          <Anchor
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            inherit
            underline="never"
            className="inline-flex! items-center gap-1.5 text-(--accent-light)! hover:text-(--text-primary)!"
          >
            <IconBrandLinkedin size={16} stroke={1.5} aria-hidden="true" />
            {t('linkedin')} <VisuallyHidden>{t('newTab')}</VisuallyHidden>
          </Anchor>
          <Text component="p" inherit className="m-0 text-(--text-muted)">
            {t('copyright', { year: new Date().getFullYear() })}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
