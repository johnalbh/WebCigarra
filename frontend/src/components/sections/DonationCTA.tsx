'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import {
  HiHeart,
  HiUserGroup,
  HiHand,
  HiShare,
  HiArrowRight,
} from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';
import ScrollReveal from '@/components/shared/ScrollReveal';
import {
  EASE_APPLE,
  SCALE_HOVER,
  SCALE_INITIAL,
  DURATION_HOVER,
  DURATION_REVEAL,
  DURATION_REVEAL_LONG,
  STAGGER,
} from '@/lib/animation-config';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';
const MONTHLY_GOAL = 5000000;
const CURRENT_AMOUNT = 3250000;
const PROGRESS_PERCENTAGE = (CURRENT_AMOUNT / MONTHLY_GOAL) * 100;

const easeApple = EASE_APPLE;

function formatCOP(amount: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const pathConfigs = [
  {
    icon: HiHeart,
    key: 'donate' as const,
    href: DONATION_LINK_COP,
    external: true,
    color: 'bg-red-500',
    image: '/images/engagement/musica.webp',
  },
  {
    icon: HiUserGroup,
    key: 'sponsor' as const,
    href: '/plan-padrino',
    external: false,
    color: 'bg-primary-500',
    image: '/images/engagement/apoyo-escolar.webp',
  },
  {
    icon: HiHand,
    key: 'volunteer' as const,
    href: '/voluntariado',
    external: false,
    color: 'bg-accent-500',
    image: '/images/engagement/recreacion.webp',
  },
  {
    icon: HiShare,
    key: 'share' as const,
    href: 'https://wa.me/?text=Conoce%20la%20Fundación%20Cigarra%20y%20su%20increíble%20labor%20con%20niños%20en%20Ciudad%20Bolívar%20🦗%20https://cigarra.org',
    external: true,
    color: 'bg-green-500',
    image: '/images/news/festival-arte.webp',
  },
];

export default function DonationCTA() {
  const t = useTranslations('donation');
  const progressRef = useRef<HTMLElement>(null);

  // Progress bar fills as user scrolls through the section
  const { scrollYProgress } = useScroll({
    target: progressRef,
    offset: ['start end', 'center center'],
  });
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 0.8],
    [0, PROGRESS_PERCENTAGE],
  );

  return (
    <>
      {/* Progress + headline section */}
      <section ref={progressRef} className="relative overflow-hidden bg-primary-900 py-20 md:py-28">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          {/* Heart — single elegant scale-up on enter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: DURATION_REVEAL_LONG, ease: easeApple }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/20"
          >
            <HiHeart className="h-7 w-7 text-accent-400" />
          </motion.div>

          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              {t('headlinePrefix')} <span className="text-accent-400">{t('headlineHighlight')}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary-200/80">
              {t('headlineDescription')}
            </p>
          </ScrollReveal>

          {/* Progress bar — scroll-linked */}
          <div className="mx-auto mt-10 max-w-lg">
            <div className="mb-2 flex items-center justify-between text-sm text-primary-200/70">
              <span>{formatCOP(CURRENT_AMOUNT)} {t('raised')}</span>
              <span className="font-semibold text-white">
                {t('goal')}: {formatCOP(MONTHLY_GOAL)}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-500"
                style={{ width: useTransform(progressWidth, (v) => `${v}%`) }}
              />
            </div>
            <p className="mt-2 text-sm text-primary-300/50">
              {Math.round(PROGRESS_PERCENTAGE)}% {t('ofMonthlyGoal')}
            </p>
          </div>
        </div>
      </section>

      {/* 4 engagement paths — scale-up stagger */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pathConfigs.map((path, i) => {
              const Icon = path.icon;
              const title = t(`paths.${path.key}.title`);
              const description = t(`paths.${path.key}.description`);
              const cta = t(`paths.${path.key}.cta`);
              const btnClass = "group/btn inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-600";

              return (
                <ScrollReveal key={path.key} mode="scroll" scaleFrom={SCALE_INITIAL}>
                  <motion.div
                    whileHover={{ scale: SCALE_HOVER }}
                    transition={{ duration: DURATION_HOVER, ease: easeApple }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={path.image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Icon badge */}
                      <div className={`absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl ${path.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
                        {title}
                      </h3>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">
                        {description}
                      </p>

                      {path.external ? (
                        <a
                          href={path.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={btnClass}
                        >
                          {cta}
                          <HiArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                        </a>
                      ) : (
                        <Link
                          href={path.href as '/como-ayudar' | '/contacto' | '/plan-padrino' | '/voluntariado'}
                          className={btnClass}
                        >
                          {cta}
                          <HiArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* USD option */}
          <ScrollReveal>
            <div className="mt-10 text-center">
              <p className="mb-3 text-sm text-gray-400">{t('internationalDonors')}</p>
              <a
                href={DONATION_LINK_USD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-6 py-3 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
              >
                {t('donateUSD')}
                <HiArrowRight className="h-4 w-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              {t('trustSecure')}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              {t('trustTaxDeductible')}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              {t('trustTransparency')}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
