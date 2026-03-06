'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion } from 'motion/react';
import {
  HiHeart,
  HiShieldCheck,
  HiDocumentReport,
  HiCheckCircle,
  HiUserGroup,
  HiAcademicCap,
} from 'react-icons/hi';
import DonationCheckout from '@/components/sections/DonationCheckout';

const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

export default function DonatePage() {
  const t = useTranslations('donateLanding');
  const tDonation = useTranslations('donation');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_APPLE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-500/20 px-5 py-2 text-sm font-semibold text-accent-400"
          >
            <HiShieldCheck className="h-4 w-4" />
            {t('badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_APPLE }}
            className="mx-auto max-w-3xl font-heading text-4xl font-bold leading-tight text-white md:text-6xl md:leading-tight"
          >
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_APPLE }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-200/80 md:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* Trust badges row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_APPLE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-sm text-primary-300/80">
              <HiShieldCheck className="h-4 w-4 text-accent-400" />
              <span>{tDonation('trustSecure')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-300/80">
              <HiDocumentReport className="h-4 w-4 text-accent-400" />
              <span>{tDonation('trustTaxDeductible')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-300/80">
              <HiCheckCircle className="h-4 w-4 text-accent-400" />
              <span>{tDonation('trustTransparency')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content: Checkout + Social proof */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_420px]">
          {/* Left: Why donate + impact */}
          <div>
            {/* Impact stats */}
            <div className="mb-10 grid grid-cols-3 gap-4">
              {[
                { value: '1,877', label: t('statsChildren'), icon: HiUserGroup },
                { value: '23+', label: t('statsYears'), icon: HiHeart },
                { value: '13', label: t('statsPrograms'), icon: HiAcademicCap },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm"
                >
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary-500" />
                  <p className="font-heading text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* What your donation funds */}
            <h2 className="mb-6 font-heading text-2xl font-bold text-gray-900">
              {t('whatFundsTitle')}
            </h2>
            <div className="space-y-4">
              {(['education', 'nutrition', 'arts', 'psychology'] as const).map((key) => (
                <div key={key} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <HiCheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-gray-900">
                      {t(`funds.${key}.title`)}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {t(`funds.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo */}
            <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl">
              <Image
                src="/images/engagement/musica.webp"
                alt="Children at the Cigarra Foundation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-medium text-white/90">
                  {t('photoCaption')}
                </p>
              </div>
            </div>

            {/* Legal info */}
            <div className="mt-8 rounded-xl border border-primary-100 bg-primary-50 p-6">
              <div className="flex items-start gap-3">
                <HiShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <div>
                  <p className="text-sm font-semibold text-primary-800">
                    {t('legalTitle')}
                  </p>
                  <p className="mt-1 text-sm text-primary-700/80">
                    {t('legalDescription')}
                  </p>
                </div>
              </div>
            </div>

            {/* Link to full page */}
            <div className="mt-6 text-center">
              <Link
                href="/como-ayudar"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                {t('seeAllWays')}
              </Link>
            </div>
          </div>

          {/* Right: Checkout widget (sticky) */}
          <div className="lg:sticky lg:top-24">
            <DonationCheckout />
          </div>
        </div>
      </section>
    </div>
  );
}
