'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiArrowRight } from 'react-icons/hi';
import type { IconType } from 'react-icons';
import {
  HiGlobeAlt,
  HiHeart,
  HiHome,
  HiPuzzle,
  HiShoppingBag,
  HiSun,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi';
import { HiComputerDesktop } from 'react-icons/hi2';
import { EASE_APPLE, SCALE_HOVER, DURATION_HOVER } from '@/lib/animation-config';

/* ── 5 featured programs shown as image cards ── */
const featuredPrograms = [
  { slug: 'musica', image: '/images/programs/musica.webp' },
  { slug: 'danza', image: '/images/programs/danza.webp' },
  { slug: 'refuerzo-escolar', image: '/images/programs/refuerzo-escolar.webp' },
  { slug: 'biblioteca', image: '/images/programs/biblioteca.webp' },
  { slug: 'teatro', image: '/images/programs/teatro.webp' },
];

/* ── Remaining programs shown in the marquee ── */
const marqueePrograms: { slug: string; icon: IconType; color: string }[] = [
  { slug: 'tecnologia', icon: HiComputerDesktop, color: '#2196F3' },
  { slug: 'ingles', icon: HiGlobeAlt, color: '#E67E22' },
  { slug: 'centro-comunitario', icon: HiHome, color: '#1ABC9C' },
  { slug: 'grupo-adultos-mayores', icon: HiUsers, color: '#E91E63' },
  { slug: 'primera-infancia', icon: HiSun, color: '#FF9800' },
  { slug: 'psicologia', icon: HiHeart, color: '#673AB7' },
  { slug: 'recreacion-y-deportes', icon: HiPuzzle, color: '#FF5722' },
  { slug: 'ropero', icon: HiShoppingBag, color: '#00BCD4' },
  { slug: 'escuela-de-padres', icon: HiUserGroup, color: '#4CAF50' },
];

const easeApple = EASE_APPLE;

export default function ProgramsGrid() {
  const t = useTranslations('programs');

  const doubledMarquee = [...marqueePrograms, ...marqueePrograms];

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-500">
              {t('activeCount')}
            </p>
            <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Bento grid: 1 large featured + 4 smaller — scale-up reveal */}
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Featured program - spans 2 rows */}
          <ScrollReveal mode="scroll" scaleFrom={0.92} className="md:col-span-1 md:row-span-2">
            <Link href={{ pathname: '/programas/[slug]', params: { slug: featuredPrograms[0].slug } }}>
              <motion.div
                whileHover={{ scale: SCALE_HOVER, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                transition={{ duration: DURATION_HOVER, ease: easeApple }}
                className="group relative h-full min-h-[400px] overflow-hidden rounded-xl md:min-h-0"
              >
                <Image
                  src={featuredPrograms[0].image}
                  alt={t(`names.${featuredPrograms[0].slug}`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="mb-2 inline-block rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white">
                    {t('featured')}
                  </span>
                  <h3 className="mb-1 font-heading text-2xl font-bold text-white">
                    {t(`names.${featuredPrograms[0].slug}`)}
                  </h3>
                  <p className="text-sm text-white/80">{t(`descriptions.${featuredPrograms[0].slug}`)}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-400 transition-all group-hover:gap-2">
                    {t('learnMore')} <HiArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollReveal>

          {/* Remaining 4 programs — scale-up reveal */}
          {featuredPrograms.slice(1).map((program) => (
            <ScrollReveal key={program.slug} mode="scroll" scaleFrom={0.92}>
              <Link href={{ pathname: '/programas/[slug]', params: { slug: program.slug } }}>
                <motion.div
                  whileHover={{ scale: SCALE_HOVER, boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}
                  transition={{ duration: DURATION_HOVER, ease: easeApple }}
                  className="group relative h-[200px] overflow-hidden rounded-xl"
                >
                  <Image
                    src={program.image}
                    alt={t(`names.${program.slug}`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-heading text-base font-bold text-white">
                      {t(`names.${program.slug}`)}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/70">{t(`descriptions.${program.slug}`)}</p>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Auto-scrolling marquee — with hover-pause */}
        <ScrollReveal>
          <div className="group mt-8 overflow-hidden rounded-xl border border-gray-100 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <p className="text-sm font-semibold text-gray-900">
                {t('andMore', { count: marqueePrograms.length })}
              </p>
              <Link
                href="/programas"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2 font-heading text-sm font-semibold text-white transition-colors hover:bg-primary-600"
              >
                {t('viewAll')}
                <HiArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </div>

            {/* Marquee track */}
            <div className="relative py-5">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

              <div className="flex animate-marquee">
                {doubledMarquee.map((program, i) => {
                  const Icon = program.icon;
                  return (
                    <Link
                      key={`${program.slug}-${i}`}
                      href={{ pathname: '/programas/[slug]', params: { slug: program.slug } }}
                      className="mx-2 flex-shrink-0"
                    >
                      <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-3 opacity-80 transition-all duration-300 hover:border-gray-200 hover:bg-white hover:opacity-100 hover:shadow-sm">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${program.color}15` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: program.color }} />
                        </div>
                        <div>
                          <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                            {t(`names.${program.slug}`)}
                          </p>
                          <p className="whitespace-nowrap text-xs text-gray-500">
                            {t(`descriptions.${program.slug}`)}
                          </p>
                        </div>
                        <HiArrowRight className="ml-2 h-4 w-4 flex-shrink-0 text-gray-300 transition-colors hover:text-primary-500" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
