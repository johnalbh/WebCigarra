'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { HiHeart } from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';
const MONTHLY_GOAL = 5000000;
const CURRENT_AMOUNT = 3250000;

function formatCOP(amount: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonationCTA() {
  const t = useTranslations('donation');
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth((CURRENT_AMOUNT / MONTHLY_GOAL) * 100);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary-500 py-20 md:py-28">
      <HeroWaves />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        {/* Heart icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/15"
        >
          <HiHeart className="h-7 w-7 text-white" />
        </motion.div>

        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
          {t('subtitle')}
        </p>

        {/* Progress bar */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="mb-2 flex items-center justify-between text-sm text-white/80">
            <span>{formatCOP(CURRENT_AMOUNT)} recaudados</span>
            <span className="font-semibold text-white">
              Meta: {formatCOP(MONTHLY_GOAL)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full rounded-full bg-accent-400"
              initial={{ width: '0%' }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
          <p className="mt-2 text-sm text-white/60">
            {Math.round((CURRENT_AMOUNT / MONTHLY_GOAL) * 100)}% de la meta
            mensual
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={DONATION_LINK_COP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-heading text-sm font-semibold text-primary-700 transition-colors hover:bg-white/90"
          >
            <HiHeart className="h-4 w-4 text-red-500" />
            {t('donateCOP')}
          </a>
          <a
            href={DONATION_LINK_USD}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/30 px-8 py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t('donateUSD')}
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/50">
          <span>100% seguro</span>
          <span className="h-3 w-px bg-white/20" />
          <span>Deducible de impuestos</span>
          <span className="h-3 w-px bg-white/20" />
          <span>Transparencia total</span>
        </div>
      </div>
    </section>
  );
}
