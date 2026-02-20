'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import HeroWaves from '@/components/shared/HeroWaves';
import {
  HiHeart,
  HiAcademicCap,
  HiCheckCircle,
  HiArrowRight,
  HiUserGroup,
  HiLightBulb,
  HiShieldCheck,
  HiClipboardCheck,
  HiPhone,
  HiStar,
} from 'react-icons/hi';
import { FaWhatsapp, FaPaintBrush, FaRunning, FaBriefcase } from 'react-icons/fa';

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ── Why volunteer benefits (config only) ── */
const benefitConfig = [
  { key: 'impact', icon: HiHeart, color: 'bg-green-50 border-green-200', iconBg: 'bg-green-100 text-green-600' },
  { key: 'skills', icon: HiLightBulb, color: 'bg-primary-50 border-primary-200', iconBg: 'bg-primary-100 text-primary-600' },
  { key: 'network', icon: HiUserGroup, color: 'bg-accent-50 border-accent-200', iconBg: 'bg-accent-100 text-accent-600' },
];

/* ── Volunteer areas (config only) ── */
const areaConfig = [
  { key: 'education', icon: HiAcademicCap, color: 'border-primary-200 hover:border-primary-400', iconBg: 'bg-primary-100 text-primary-600', image: '/images/engagement/apoyo-escolar.jpg' },
  { key: 'arts', icon: FaPaintBrush, color: 'border-accent-200 hover:border-accent-400', iconBg: 'bg-accent-100 text-accent-600', image: '/images/engagement/musica.jpg' },
  { key: 'sports', icon: FaRunning, color: 'border-green-200 hover:border-green-400', iconBg: 'bg-green-100 text-green-600', image: '/images/engagement/recreacion.jpg' },
  { key: 'management', icon: FaBriefcase, color: 'border-purple-200 hover:border-purple-400', iconBg: 'bg-purple-100 text-purple-600', image: null },
];

/* ── Requirements (config only) ── */
const requirementConfig = [
  { key: 'age', icon: HiShieldCheck },
  { key: 'availability', icon: HiClipboardCheck },
  { key: 'passion', icon: HiHeart },
  { key: 'background', icon: HiCheckCircle },
];

/* ── Volunteer testimonials (config only) ── */
const testimonialConfig = [
  { key: 'andrea' },
  { key: 'carlos' },
  { key: 'laura' },
];

/* ── Application steps (config only) ── */
const stepConfig = [
  { key: 'contact', step: 1, icon: HiPhone },
  { key: 'interview', step: 2, icon: HiUserGroup },
  { key: 'start', step: 3, icon: HiStar },
];

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function VoluntariadoPage() {
  const t = useTranslations('volunteer');
  const locale = useLocale();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        {/* Green accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-green-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 text-center lg:px-8 lg:py-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-green-400"
          >
            {t('heroTagline')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('heroTitle')}{' '}
            <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              {t('heroHighlight')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200/80"
          >
            {t('heroDescription')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/573212465421"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 font-heading text-lg font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:bg-green-400 hover:shadow-green-500/40"
            >
              <FaWhatsapp className="h-5 w-5" />
              {t('wantToVolunteer')}
            </a>
            <a
              href="#como-aplicar"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-heading text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              {t('howToApply')}
              <HiArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { icon: HiUserGroup, label: t('activeVolunteers') },
              { icon: HiHeart, label: t('yearsExperience') },
              { icon: HiAcademicCap, label: t('programsCount') },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-primary-300/70"
              >
                <badge.icon className="h-4 w-4 text-green-400" />
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY VOLUNTEER
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-green-100 px-5 py-2 font-heading text-sm font-semibold text-green-700 mb-4">
                {t('whyVolunteer')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('reasonsToJoin')} <span className="text-green-600">{t('joinHighlight')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('reasonsSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {benefitConfig.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.key}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`group flex h-full flex-col items-center rounded-2xl border p-8 text-center transition-all duration-300 hover:shadow-lg ${benefit.color}`}
                  >
                    <div
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${benefit.iconBg}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                      {t(`benefits.${benefit.key}.title`)}
                    </h3>
                    <p className="flex-1 leading-relaxed text-gray-600">
                      {t(`benefits.${benefit.key}.description`)}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. VOLUNTEER AREAS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                {t('areasTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('findYour')} <span className="text-primary-600">{t('place')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('areasSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {areaConfig.map((area, index) => {
              const Icon = area.icon;
              const isReversed = index % 2 !== 0;
              const areaTitle = t(`areas.${area.key}.title`);
              const activities = t.raw(`areas.${area.key}.activities`) as string[];

              return (
                <ScrollReveal key={area.key} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300 hover:shadow-lg ${area.color}`}
                  >
                    <div
                      className={`grid items-center gap-0 ${
                        area.image ? 'md:grid-cols-2' : 'md:grid-cols-1'
                      } ${isReversed && area.image ? 'md:[direction:rtl]' : ''}`}
                    >
                      {/* Image */}
                      {area.image && (
                        <div className="relative h-64 md:h-full md:min-h-[320px]">
                          <Image
                            src={area.image}
                            alt={areaTitle}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                        </div>
                      )}

                      {/* Content */}
                      <div className={`p-8 md:p-10 ${isReversed && area.image ? 'md:[direction:ltr]' : ''}`}>
                        <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${area.iconBg}`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="mb-3 font-heading text-2xl font-bold text-gray-900">
                          {areaTitle}
                        </h3>
                        <p className="mb-5 leading-relaxed text-gray-600">
                          {t(`areas.${area.key}.description`)}
                        </p>

                        {/* Activity tags */}
                        <div className="flex flex-wrap gap-2">
                          {activities.map((activity) => (
                            <span
                              key={activity}
                              className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. REQUIREMENTS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                {t('requirementsTitle')}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                {t('requirementsHeading')} <span className="text-primary-600">{t('requirementsHighlight')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                {t('requirementsSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                {requirementConfig.map((req) => {
                  const Icon = req.icon;
                  return (
                    <div
                      key={req.key}
                      className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 transition-colors duration-300 hover:bg-primary-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="pt-2 font-medium text-gray-700">{t(`requirements.${req.key}`)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-5">
                <p className="text-sm leading-relaxed text-green-800">
                  <strong>{locale === 'en' ? 'Note: ' : 'Nota: '}</strong>
                  {t('requirementsNote')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. VOLUNTEER TESTIMONIALS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-accent-100 px-5 py-2 font-heading text-sm font-semibold text-accent-700 mb-4">
                {t('testimonialsTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('theyAreAlready')} <span className="text-green-600">{t('volunteers')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('testimonialsSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {testimonialConfig.map((testimonial) => (
              <StaggerItem key={testimonial.key}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: smoothEase }}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-green-200 hover:shadow-lg"
                >
                  {/* Quote icon */}
                  <div className="mb-5 text-4xl font-serif leading-none text-green-300">
                    &ldquo;
                  </div>

                  {/* Quote text */}
                  <p className="flex-1 leading-relaxed text-gray-600 italic">
                    {t(`testimonials.${testimonial.key}.quote`)}
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gray-100" />

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <HiUserGroup className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-gray-900">
                        {t(`testimonials.${testimonial.key}.name`)}
                      </p>
                      <p className="text-sm text-gray-500">{t(`testimonials.${testimonial.key}.role`)}</p>
                      <p className="text-xs font-medium text-green-600">{t(`testimonials.${testimonial.key}.years`)}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. HOW TO APPLY
          ═══════════════════════════════════════════════════════ */}
      <section id="como-aplicar" className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-green-100 px-5 py-2 font-heading text-sm font-semibold text-green-700 mb-4">
                {t('processTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('howTo')} <span className="text-green-600">{t('apply')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('processSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="relative grid gap-8 md:grid-cols-3" staggerDelay={0.2}>
            {/* Connecting line (desktop) */}
            <div className="pointer-events-none absolute top-24 left-[16.67%] right-[16.67%] hidden h-0.5 bg-gradient-to-r from-green-200 via-green-300 to-green-200 md:block" />

            {stepConfig.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.step}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Step number circle */}
                    <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/25">
                      <Icon className="h-9 w-9 text-white" />
                      <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-green-600 shadow-md">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                      {t(`applicationSteps.${step.key}.title`)}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {t(`applicationSteps.${step.key}.description`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. BOTTOM CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-green-600 py-24">
        <HeroWaves />
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <HiHeart className="h-8 w-8 text-white" />
            </div>

            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {t('ctaDescription')}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/573212465421"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 font-heading font-bold text-green-700 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
              >
                <FaWhatsapp className="h-6 w-6" />
                {t('writeWhatsApp')}
              </a>
              <Link
                href={'/contacto' as '/contacto'}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 font-heading font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                {t('goToContact')}
                <HiArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Phone number */}
            <div className="mt-8 flex items-center justify-center gap-2 text-white/70">
              <HiPhone className="h-4 w-4" />
              <span className="text-sm font-medium">+57 321 246 5421</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
