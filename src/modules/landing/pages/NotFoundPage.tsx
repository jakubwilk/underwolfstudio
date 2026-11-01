import { Box, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { BrandLogo } from '@/modules/common/components/BrandLogo';
import { LocaleAnchor } from '@/modules/common/components/LocaleAnchor';

import { EYEBROW, EYEBROW_CLASS, LEAD, LEAD_CLASS } from '../utils/typography';

export function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <Box component="main" className="min-h-svh px-6 flex flex-col items-center justify-center">
      <Stack align="center" gap={24} className="text-center max-w-130">
        <BrandLogo className="w-40 h-auto mb-6 text-(--text-primary)" />
        <Text {...EYEBROW} className={EYEBROW_CLASS}>
          404
        </Text>
        <Title
          order={1}
          fz="clamp(2.25rem, 5vw, 3.25rem)"
          fw={600}
          lh={1.08}
          className="m-0 tracking-tight text-(--text-primary)"
        >
          {t('title')}
        </Title>
        <Text {...LEAD} className={LEAD_CLASS}>
          {t('body')}
        </Text>
        <LocaleAnchor
          href="/"
          underline="never"
          className="mt-2 rounded-md px-5.5! py-3.5! bg-(--accent)! text-(--bg)! text-[15px]! font-semibold! hover:bg-(--accent-hover)!"
        >
          {t('back')}
        </LocaleAnchor>
      </Stack>
    </Box>
  );
}
