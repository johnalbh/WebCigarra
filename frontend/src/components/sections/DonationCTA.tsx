'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { HiHeart } from 'react-icons/hi';
import ScrollReveal from '@/components/shared/ScrollReveal';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';

export default function DonationCTA() {
  const t = useTranslations('donation');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent-500 via-accent-400 to-accent-600 py-20">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
        <ScrollReveal>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20"
          >
            <HiHeart className="h-8 w-8 text-white" />
          </motion.div>

          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mb-10 text-lg text-white/90 md:text-xl">
            {t('subtitle')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={DONATION_LINK_COP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-white px-8 py-4 font-semibold text-accent-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl hover:-translate-y-0.5 sm:w-auto"
            >
              {t('donateCOP')}
            </a>
            <a
              href={DONATION_LINK_USD}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              {t('donateUSD')}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
