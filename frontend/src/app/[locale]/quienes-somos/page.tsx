'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import {
  HiEye,
  HiLightBulb,
  HiHeart,
  HiAcademicCap,
  HiUserGroup,
  HiSparkles,
  HiGlobeAlt,
  HiStar,
} from 'react-icons/hi';
import { Link } from '@/i18n/routing';
import HeroWaves from '@/components/shared/HeroWaves';
import type { IconType } from 'react-icons';

/* ---------- timeline config (non-translatable parts) ---------- */
const timelineConfig: {
  year: string;
  icon: IconType;
  color: string;
}[] = [
  { year: '2024', icon: HiAcademicCap, color: 'from-accent-400 to-accent-600' },
  { year: '2020', icon: HiUserGroup, color: 'from-emerald-400 to-emerald-600' },
  { year: '2018', icon: HiSparkles, color: 'from-primary-500 to-primary-700' },
  { year: '2015', icon: HiGlobeAlt, color: 'from-accent-500 to-accent-700' },
  { year: '2012', icon: HiHeart, color: 'from-rose-400 to-rose-600' },
  { year: '2008', icon: HiStar, color: 'from-primary-400 to-primary-600' },
  { year: '2005', icon: HiAcademicCap, color: 'from-accent-400 to-accent-600' },
  { year: '2002', icon: HiSparkles, color: 'from-primary-500 to-primary-700' },
];

/* ---------- values config (non-translatable parts) ---------- */
const valuesConfig: {
  key: string;
  icon: IconType;
  gradient: string;
}[] = [
  { key: 'love', icon: HiHeart, gradient: 'from-rose-500 to-pink-600' },
  { key: 'education', icon: HiAcademicCap, gradient: 'from-primary-500 to-primary-700' },
  { key: 'community', icon: HiUserGroup, gradient: 'from-accent-500 to-amber-600' },
  { key: 'creativity', icon: HiSparkles, gradient: 'from-violet-500 to-purple-600' },
  { key: 'transparency', icon: HiGlobeAlt, gradient: 'from-emerald-500 to-teal-600' },
  { key: 'inclusion', icon: HiEye, gradient: 'from-sky-500 to-cyan-600' },
];

/* ---------- animated timeline line ---------- */
function TimelineLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start center', 'end center'],
  });

  return (
    <div ref={lineRef} className="absolute top-0 bottom-0 left-8 w-1 md:left-1/2 md:-translate-x-px">
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-primary-100" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top rounded-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-600"
        style={{ scaleY: scrollYProgress }}
      />
    </div>
  );
}

/* ---------- timeline node ---------- */
function TimelineNode({
  item,
  index,
  title,
  description,
}: {
  item: (typeof timelineConfig)[number];
  index: number;
  title: string;
  description: string;
}) {
  const isEven = index % 2 === 0;
  const Icon = item.icon;

  return (
    <div className="relative mb-12 last:mb-0">
      <div
        className={`flex items-start gap-6 md:gap-0 ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {/* Pulsing dot */}
        <div className="absolute left-8 z-10 -translate-x-1/2 md:left-1/2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${item.color} shadow-sm`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Card */}
        <div
          className={`ml-16 md:ml-0 md:w-1/2 ${
            isEven ? 'md:pr-16' : 'md:pl-16'
          }`}
        >
          <ScrollReveal direction={isEven ? 'left' : 'right'}>
            <div className="rounded-xl border border-gray-100 bg-white p-6 transition-colors duration-300 hover:border-gray-200">
              {/* Year badge */}
              <span
                className={`mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${item.color} px-4 py-1.5 text-sm font-bold text-white`}
              >
                {item.year}
              </span>

              <h3 className="mb-2 font-heading text-xl font-bold text-gray-900">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ---------- main page component ---------- */
export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        {/* Subtle accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-28 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-36">
          {/* Text side */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400"
            >
              {t('foundedIn')} 2002 &mdash; Ciudad Bolivar, Bogota
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
              className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-primary-200/80"
            >
              {t('heroDescription')}
            </motion.p>
          </div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/about/equipo.webp"
                alt="Equipo Fundacion Cigarra"
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[600px] items-center md:grid-cols-2">
            {/* Image side */}
            <ScrollReveal direction="left" className="relative h-full min-h-[400px] md:min-h-[600px]">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/about/mision.webp"
                  alt="Misión Fundación Cigarra"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80 md:to-white" />
                <div className="absolute inset-0 bg-primary-900/20" />
              </div>
            </ScrollReveal>

            {/* Content side */}
            <div className="relative z-10 px-6 py-16 md:-ml-20 md:py-20 lg:px-16">
              <ScrollReveal direction="right">
                <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
                  {/* Icon badge */}
                  <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-primary-500 p-4">
                    <HiLightBulb className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="mb-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                    {t('mission')}
                  </h2>

                  <div className="mb-6 flex items-center gap-2">
                    <span className="h-1 w-12 rounded-full bg-primary-500" />
                    <span className="h-1 w-6 rounded-full bg-primary-300" />
                  </div>

                  <p className="text-lg leading-relaxed text-gray-700">
                    {t('missionStatement')}
                  </p>

                  {/* Decorative accent */}
                  <div className="mt-8 flex items-center gap-3 rounded-xl bg-primary-50 px-5 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                      <HiHeart className="h-5 w-5 text-primary-600" />
                    </div>
                    <p className="text-sm font-medium text-primary-700">
                      {t('missionBadge')}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VISION SECTION ========== */}
      <section className="relative overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[600px] items-center md:grid-cols-2">
            {/* Content side (reversed) */}
            <div className="relative z-10 order-2 px-6 py-16 md:order-1 md:-mr-20 md:py-20 lg:px-16">
              <ScrollReveal direction="left">
                <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
                  {/* Icon badge */}
                  <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-accent-500 p-4">
                    <HiEye className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="mb-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                    {t('vision')}
                  </h2>

                  <div className="mb-6 flex items-center gap-2">
                    <span className="h-1 w-12 rounded-full bg-accent-500" />
                    <span className="h-1 w-6 rounded-full bg-accent-300" />
                  </div>

                  <p className="text-lg leading-relaxed text-gray-700">
                    {t('visionStatement')}
                  </p>

                  {/* Decorative accent */}
                  <div className="mt-8 flex items-center gap-3 rounded-xl bg-accent-50 px-5 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100">
                      <HiGlobeAlt className="h-5 w-5 text-accent-600" />
                    </div>
                    <p className="text-sm font-medium text-accent-700">
                      {t('visionBadge')}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Image side */}
            <ScrollReveal
              direction="right"
              className="relative order-1 h-full min-h-[400px] md:order-2 md:min-h-[600px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/about/vision.webp"
                  alt="Visión Fundación Cigarra"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-50/80 md:to-gray-50" />
                <div className="absolute inset-0 bg-accent-900/10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== TIMELINE SECTION ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-700">
                {t('timeline.title')}
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-5xl">
                {t('history')}
              </h2>
              <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                <span className="h-1 w-8 rounded-full bg-primary-300" />
                <span className="h-1 w-16 rounded-full bg-primary-500" />
                <span className="h-1 w-8 rounded-full bg-primary-300" />
              </div>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                {t('timeline.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            <TimelineLine />

            {timelineConfig.map((item, i) => (
              <TimelineNode
                key={item.year}
                item={item}
                index={i}
                title={t(`timeline.${item.year}.title`)}
                description={t(`timeline.${item.year}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== VALUES SECTION ========== */}
      <section className="section-padding relative overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-accent-700">
                {t('values.sectionTitle')}
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-5xl">
                {t('values.title')}
              </h2>
              <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                <span className="h-1 w-8 rounded-full bg-accent-300" />
                <span className="h-1 w-16 rounded-full bg-accent-500" />
                <span className="h-1 w-8 rounded-full bg-accent-300" />
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer scaleUp className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valuesConfig.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem scaleUp key={value.key}>
                  <div className="group h-full rounded-xl border border-gray-100 bg-white p-8 transition-colors duration-300 hover:border-gray-200">
                    {/* Icon */}
                    <div
                      className={`mb-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${value.gradient} p-3.5`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                      {t(`values.${value.key}.title`)}
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-600">
                      {t(`values.${value.key}.description`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== NUESTRO EQUIPO PREVIEW ========== */}
      <section className="section-padding relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-700">
                    {t('team')}
                  </span>
                  <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                    {t('teamSection.title')}
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-gray-600">
                    {t('teamSection.description')}
                  </p>
                  <Link
                    href={'/equipo' as '/equipo'}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 font-heading text-sm font-bold text-white transition-colors duration-300 hover:bg-primary-600"
                  >
                    <HiUserGroup className="h-5 w-5" />
                    {t('teamSection.cta')}
                  </Link>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/images/about/equipo.webp"
                    alt="Equipo Fundación Cigarra"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="relative overflow-hidden bg-primary-500">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <HiUserGroup className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.donaronline.org/fundacion-cigarra/dona-ahora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-heading text-sm font-bold text-primary-600 transition-colors duration-300 hover:bg-gray-50"
              >
                <HiHeart className="h-5 w-5" />
                {t('ctaDonate')}
              </a>
              <Link
                href={'/voluntariado' as '/voluntariado'}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-heading text-sm font-bold text-white transition-colors duration-300 hover:bg-white/10 hover:border-white/50"
              >
                <HiUserGroup className="h-5 w-5" />
                {t('ctaVolunteer')}
              </Link>
              <Link
                href={'/equipo' as '/equipo'}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-heading text-sm font-bold text-white transition-colors duration-300 hover:bg-white/10 hover:border-white/50"
              >
                {t('ctaTeam')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
