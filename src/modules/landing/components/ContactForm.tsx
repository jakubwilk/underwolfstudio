'use client';

import { Box, Button, Stack, Text, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { IconAlertTriangle, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { trackEvent } from '@/modules/common/utils/analytics';
import { CONTACT_EMAIL } from '@/modules/common/utils/site';

import { PrivacyNotice } from './PrivacyNotice';
import { sendContact } from '../api/sendContact';
import {
  MESSAGE_MAX,
  NAME_MAX,
  validateEmail,
  validateMessage,
  validateName,
  type ContactFields,
} from '../utils/contact';
import { BUTTON_FZ, SMALL, SMALL_CLASS } from '../utils/typography';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unverified';

// `!` because Mantine's own input colours outrank Tailwind's layered utilities.
const INPUT_CLASS_NAMES = {
  label: 'mb-2 text-(--text-label)',
  input:
    'bg-(--bg)! border-(--border-strong)! focus:border-(--accent)! text-(--text-primary)! placeholder:text-(--text-muted)!',
};

const INPUT_STYLES = {
  label: { fontSize: 13, fontWeight: 500 },
  input: { fontSize: 15 },
};

const NOTICE_CLASS = 'flex items-start gap-3 p-4 rounded-md border';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [startedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstile = useRef<TurnstileInstance>(undefined);
  // Turnstile is optional: without a site key (local development) the form
  // relies on the honeypot and the fill-time check alone.
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const form = useForm<ContactFields>({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', message: '' },
    validate: {
      name: (value) => {
        const error = validateName(value);
        return error && t(`errors.${error}`);
      },
      email: (value) => {
        const error = validateEmail(value);
        return error && t(`errors.${error}`);
      },
      message: (value) => {
        const error = validateMessage(value);
        return error && t(`errors.${error}`);
      },
    },
  });

  const submit = async (values: ContactFields) => {
    if (turnstileSiteKey && !turnstileToken) {
      setStatus('unverified');
      return;
    }
    setStatus('sending');
    const ok = await sendContact({ ...values, locale, website, startedAt, turnstileToken });
    setStatus(ok ? 'sent' : 'error');
    if (ok) {
      trackEvent('contact_submit', { locale });
    } else {
      // Turnstile tokens are single-use, so a retry needs a fresh one.
      setTurnstileToken('');
      turnstile.current?.reset();
    }
  };

  if (status === 'sent') {
    return (
      <Box role="status" className={`${NOTICE_CLASS} border-(--accent) text-(--text-secondary)`}>
        <IconCheck
          size={18}
          stroke={1.5}
          aria-hidden="true"
          className="shrink-0 mt-0.5 text-(--accent)"
        />
        <Stack gap={4}>
          <Text fz={20} fw={600} className="m-0 text-(--text-primary)">
            {t('success.title')}
          </Text>
          <Text {...SMALL} className={SMALL_CLASS}>
            {t('success.body')}
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={(event) => form.onSubmit(submit)(event)}
      className="relative w-full"
    >
      <Stack gap={20}>
        <Box className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))]">
          <TextInput
            label={t('form.name')}
            placeholder={t('form.namePlaceholder')}
            autoComplete="name"
            maxLength={NAME_MAX}
            size="md"
            classNames={INPUT_CLASS_NAMES}
            styles={INPUT_STYLES}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            type="email"
            label={t('form.email')}
            placeholder={t('form.emailPlaceholder')}
            autoComplete="email"
            size="md"
            classNames={INPUT_CLASS_NAMES}
            styles={INPUT_STYLES}
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
        </Box>
        <Textarea
          label={t('form.message')}
          placeholder={t('form.messagePlaceholder')}
          autosize
          minRows={5}
          maxLength={MESSAGE_MAX}
          size="md"
          classNames={INPUT_CLASS_NAMES}
          styles={INPUT_STYLES}
          key={form.key('message')}
          {...form.getInputProps('message')}
        />

        {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
        <Box aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
          <label>
            {t('form.honeypot')}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.currentTarget.value)}
            />
          </label>
        </Box>

        {turnstileSiteKey ? (
          <Turnstile
            ref={turnstile}
            siteKey={turnstileSiteKey}
            options={{ theme: 'dark', size: 'flexible', language: locale }}
            onSuccess={(token) => {
              setTurnstileToken(token);
              if (status === 'unverified') setStatus('idle');
            }}
            onExpire={() => setTurnstileToken('')}
            onError={() => setTurnstileToken('')}
          />
        ) : null}

        {status === 'error' || status === 'unverified' ? (
          <Box role="alert" className={`${NOTICE_CLASS} border-red-400/40 text-red-300`}>
            <IconAlertTriangle
              size={18}
              stroke={1.5}
              aria-hidden="true"
              className="shrink-0 mt-0.5"
            />
            <Text {...SMALL} className={SMALL_CLASS}>
              {status === 'error'
                ? t('failure', { email: CONTACT_EMAIL })
                : t('errors.verification')}
            </Text>
          </Box>
        ) : null}

        <Button
          type="submit"
          size="lg"
          fullWidth
          fz={BUTTON_FZ}
          loading={status === 'sending'}
          rightSection={<IconArrowRight size={16} stroke={2} aria-hidden="true" />}
        >
          {t('form.submit')}
        </Button>

        <PrivacyNotice />
      </Stack>
    </Box>
  );
}
