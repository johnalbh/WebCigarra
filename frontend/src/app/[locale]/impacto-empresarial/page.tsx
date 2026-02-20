'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import HeroWaves from '@/components/shared/HeroWaves';
import {
  HiShieldCheck,
  HiCurrencyDollar,
  HiDocumentReport,
  HiCheckCircle,
  HiArrowRight,
  HiUserGroup,
  HiHeart,
  HiStar,
  HiGlobeAlt,
  HiClipboardCheck,
  HiAcademicCap,
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiBriefcase,
  HiTruck,
  HiSpeakerphone,
  HiSparkles,
} from 'react-icons/hi';
import { FaWhatsapp, FaHandshake, FaBuilding, FaBalanceScale } from 'react-icons/fa';

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ── Benefit config (keys only) ── */
const benefitConfig = [
  { key: 'csr', icon: HiGlobeAlt, color: 'bg-primary-50 text-primary-600 border-primary-200', iconBg: 'bg-primary-100' },
  { key: 'tax', icon: HiCurrencyDollar, color: 'bg-accent-50 text-accent-600 border-accent-200', iconBg: 'bg-accent-100' },
  { key: 'measurable', icon: HiDocumentReport, color: 'bg-green-50 text-green-600 border-green-200', iconBg: 'bg-green-100' },
  { key: 'brand', icon: HiStar, color: 'bg-purple-50 text-purple-600 border-purple-200', iconBg: 'bg-purple-100' },
];

/* ── Partnership model config (keys only) ── */
const modelConfig = [
  { key: 'donation', icon: HiCurrencyDollar, accent: 'from-primary-500 to-primary-700', border: 'border-primary-200 hover:border-primary-400' },
  { key: 'volunteering', icon: HiUserGroup, accent: 'from-green-500 to-green-700', border: 'border-green-200 hover:border-green-400' },
  { key: 'sponsorship', icon: HiAcademicCap, accent: 'from-accent-500 to-accent-700', border: 'border-accent-200 hover:border-accent-400' },
  { key: 'inKind', icon: HiTruck, accent: 'from-rose-500 to-rose-700', border: 'border-rose-200 hover:border-rose-400' },
  { key: 'cobranding', icon: HiSpeakerphone, accent: 'from-violet-500 to-violet-700', border: 'border-violet-200 hover:border-violet-400' },
];

/* ── ESAL trust badge config (keys only) ── */
const esalBadgeConfig = [
  { key: 'registered', icon: HiShieldCheck },
  { key: 'active', icon: HiClipboardCheck },
  { key: 'transparent', icon: HiDocumentReport },
  { key: 'deductible', icon: HiCurrencyDollar },
];

/* ── Impact number config (keys only) ── */
const impactNumberConfig = [
  { key: 'children', number: '1,877+', icon: HiHeart },
  { key: 'years', number: '23', icon: HiStar },
  { key: 'programs', number: '14', icon: HiAcademicCap },
  { key: 'jobs', number: '100+', icon: HiBriefcase },
  { key: 'families', number: '190+', icon: HiUserGroup },
  { key: 'allies', number: '8+', icon: FaHandshake },
];

/* ── ESAL legal config (keys only) ── */
const esalLegalConfig = [
  { key: 'nit', icon: FaBuilding },
  { key: 'registeredChamber', icon: FaBalanceScale },
  { key: 'activeSince', icon: HiClipboardCheck },
  { key: 'annualAudits', icon: HiDocumentReport },
  { key: 'taxDeductible', icon: HiCurrencyDollar },
  { key: 'compliance', icon: HiShieldCheck },
];

/* ── Alliances list config (keys only) ── */
const alliancesListConfig = ['corporateAllies', 'nationalInternational', 'educationalAgreements', 'governmentCollaboration'];

/* ── Partner logos (static — replace with Strapi fetch later) ── */
const partners = [
  { name: 'Saint George School', logo: '/images/partners/san-jorge.png', tier: 'platinum' as const },
  { name: 'Microsoft', logo: '/images/partners/microsoft.png', tier: 'gold' as const },
  { name: 'Charles Wright Academy', logo: '/images/partners/cwa.png', tier: 'gold' as const },
  { name: 'Karelsie Foundation', logo: '/images/partners/karelsie.png', tier: 'gold' as const },
  { name: 'HomeCenter', logo: '/images/partners/homecenter.jpg', tier: 'gold' as const },
  { name: 'Aqualogic', logo: '/images/partners/aqualogic.png', tier: 'silver' as const },
  { name: 'Opperar', logo: '/images/partners/opperar.png', tier: 'silver' as const },
  { name: 'Makri', logo: '/images/partners/makri.jpg', tier: 'silver' as const },
];

const platinumPartners = partners.filter((p) => p.tier === 'platinum');
const goldPartners = partners.filter((p) => p.tier === 'gold');
const silverPartners = partners.filter((p) => p.tier === 'silver');

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function ImpactoEmpresarialPage() {
  const t = useTranslations('corporate');

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        {/* Accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 text-center lg:px-8 lg:py-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400"
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
            <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
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
              href="#contacto-empresarial"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 font-heading text-lg font-semibold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400 hover:shadow-accent-500/40"
            >
              <FaHandshake className="h-5 w-5" />
              {t('becomeAlly')}
            </a>
            <a
              href="#modelos-alianza"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-heading text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <HiBriefcase className="h-5 w-5" />
              {t('allianceModels')}
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
              { icon: HiShieldCheck, label: t('esalRegistered') },
              { icon: HiDocumentReport, label: t('taxDeductible') },
              { icon: HiCheckCircle, label: 'NIT: 830.114.318-9' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-primary-300/70"
              >
                <badge.icon className="h-4 w-4 text-accent-400" />
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY PARTNER WITH US
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                {t('benefitsTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('whyPartner')} <span className="text-primary-600">{t('ally')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('whyPartnerSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
            {benefitConfig.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.key}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`group flex h-full flex-col items-center rounded-xl border p-8 text-center transition-all duration-300 hover:shadow-md ${benefit.color}`}
                  >
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${benefit.iconBg}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-bold text-gray-900">
                      {t(`benefits.${benefit.key}.title`)}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-gray-600">
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
          3. WAYS COMPANIES CAN HELP
          ═══════════════════════════════════════════════════════ */}
      <section id="modelos-alianza" className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-accent-100 px-5 py-2 font-heading text-sm font-semibold text-accent-700 mb-4">
                {t('modelsTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('waysTo')} <span className="text-primary-600">{t('collaborate')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('modelsSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="space-y-4 md:space-y-5" staggerDelay={0.1}>
            {modelConfig.map((model) => {
              const Icon = model.icon;
              return (
                <StaggerItem key={model.key}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`group relative flex flex-col items-center gap-6 overflow-hidden rounded-xl border-2 bg-white p-6 transition-all duration-300 md:flex-row md:gap-8 md:p-8 ${model.border}`}
                  >
                    {/* Icon */}
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${model.accent}`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Name & description */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-heading text-2xl font-bold text-gray-900">
                        {t(`models.${model.key}.title`)}
                      </h3>
                      <p className="mt-1 text-gray-500">{t(`models.${model.key}.description`)}</p>
                    </div>

                    {/* Arrow */}
                    <a
                      href="#contacto-empresarial"
                      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-heading font-semibold text-white transition-all duration-300 hover:bg-primary-400"
                    >
                      {t('consult')}
                      <HiArrowRight className="h-4 w-4" />
                    </a>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. PERMANENCIA ESAL SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Image */}
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/engagement/apoyo-escolar.jpg"
                  alt="Fundacion Cigarra - Entidad Sin Animo de Lucro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
                      <HiShieldCheck className="h-5 w-5 text-primary-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      <span className="font-bold text-primary-700">{t('esalRegistered')}</span> {t('registeredAtChamber')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Content */}
            <ScrollReveal direction="right">
              <div>
                <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-6">
                  {t('esalTitle')}
                </span>
                <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                  {t('esalHeading')}{' '}
                  <span className="text-primary-600">{t('esalHighlight')}</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  {t('esalDescription')}
                </p>

                {/* Legal details */}
                <div className="mt-8 space-y-4">
                  {esalLegalConfig.map((item) => (
                    <div key={item.key} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100">
                        <item.icon className="h-5 w-5 text-primary-600" />
                      </div>
                      <p className="pt-2 text-gray-700 font-medium">{t(`esalLegal.${item.key}`)}</p>
                    </div>
                  ))}
                </div>

                {/* ESAL explanation box */}
                <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-6">
                  <h4 className="font-heading text-lg font-bold text-primary-800 mb-2">
                    {t('esalLegalTitle')}
                  </h4>
                  <p className="text-sm leading-relaxed text-primary-700/80">
                    {t('esalLegalDescription')}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ESAL Trust Badges */}
          <div className="mt-16">
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
              {esalBadgeConfig.map((badge) => {
                const Icon = badge.icon;
                return (
                  <StaggerItem key={badge.key}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.25, ease: smoothEase }}
                      className="flex items-center gap-4 rounded-xl border border-primary-100 bg-white p-5 transition-all duration-300 hover:border-primary-200 hover:shadow-sm"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-bold text-gray-900">{t(`esalBadges.${badge.key}.label`)}</p>
                        <p className="text-xs text-gray-500">{t(`esalBadges.${badge.key}.description`)}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. IMPACT NUMBERS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900 section-padding">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-white/10 px-5 py-2 font-heading text-sm font-semibold text-accent-400 mb-6">
                {t('impactTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                {t('impactHeading')}{' '}
                <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                  {t('impactHighlight')}
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-200/70">
                {t('impactSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
            {impactNumberConfig.map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.key}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/20">
                      <Icon className="h-7 w-7 text-accent-400" />
                    </div>
                    <p className="font-heading text-4xl font-bold text-white md:text-5xl">{stat.number}</p>
                    <p className="mt-2 text-lg font-medium text-primary-300">{t(`impactNumbers.${stat.key}`)}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. CURRENT PARTNERS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-accent-100 px-5 py-2 font-heading text-sm font-semibold text-accent-700 mb-4">
                {t('partnersTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('companiesTrust')} <span className="text-primary-600">{t('trustHighlight')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('partnersSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* ── Partner logo grid ── */}
          <ScrollReveal>
            <div className="mt-14 space-y-10">
              {/* Platinum */}
              <div>
                <p className="mb-6 text-center font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {t('platinumAllies')}
                </p>
                <StaggerContainer className="flex flex-wrap items-center justify-center gap-10" staggerDelay={0.08}>
                  {platinumPartners.map((p) => (
                    <StaggerItem key={p.name}>
                      <div className="group relative h-16 w-40 md:h-20 md:w-48 grayscale transition-all duration-500 hover:grayscale-0">
                        <Image
                          src={p.logo}
                          alt={p.name}
                          fill
                          className="object-contain"
                          sizes="192px"
                        />
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* Gold */}
              <div>
                <p className="mb-6 text-center font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {t('goldAllies')}
                </p>
                <StaggerContainer className="flex flex-wrap items-center justify-center gap-8" staggerDelay={0.08}>
                  {goldPartners.map((p) => (
                    <StaggerItem key={p.name}>
                      <div className="group relative h-12 w-32 md:h-16 md:w-40 grayscale transition-all duration-500 hover:grayscale-0">
                        <Image
                          src={p.logo}
                          alt={p.name}
                          fill
                          className="object-contain"
                          sizes="160px"
                        />
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* Silver */}
              <div>
                <p className="mb-6 text-center font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {t('silverAllies')}
                </p>
                <StaggerContainer className="flex flex-wrap items-center justify-center gap-8" staggerDelay={0.08}>
                  {silverPartners.map((p) => (
                    <StaggerItem key={p.name}>
                      <div className="group relative h-10 w-28 md:h-12 md:w-32 grayscale transition-all duration-500 hover:grayscale-0">
                        <Image
                          src={p.logo}
                          alt={p.name}
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </ScrollReveal>

          {/* Separator */}
          <div className="mx-auto mt-14 mb-0 h-px w-1/2 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          <ScrollReveal>
            <div className="mt-14 rounded-2xl border border-gray-200 bg-white p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left */}
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                    <FaHandshake className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                    {t('transformingAlliances')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('transformingDescription')}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {alliancesListConfig.map((key) => (
                      <li key={key} className="flex items-start gap-3">
                        <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                        <span className="text-sm text-gray-700">{t(`alliancesList.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right */}
                <div className="flex flex-col items-center justify-center rounded-xl bg-primary-50 p-8">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                    <HiSparkles className="h-10 w-10 text-primary-600" />
                  </div>
                  <p className="text-center font-heading text-xl font-bold text-primary-800 mb-2">
                    {t('nextAlly')}
                  </p>
                  <p className="text-center text-sm text-primary-600/70 mb-6">
                    {t('nextAllySubtitle')}
                  </p>
                  <a
                    href="#contacto-empresarial"
                    className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-3 font-heading font-semibold text-white transition-all duration-300 hover:bg-primary-400"
                  >
                    {t('contactUs')}
                    <HiArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. CONTACT FOR COMPANIES
          ═══════════════════════════════════════════════════════ */}
      <section id="contacto-empresarial" className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                {t('corporateContact')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('letsTalk')} <span className="text-primary-600">{t('yourAlliance')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('contactSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Email */}
            <ScrollReveal delay={0}>
              <motion.a
                href="mailto:info@cigarra.org"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: smoothEase }}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center transition-all duration-300 hover:border-primary-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50">
                  <HiMail className="h-7 w-7 text-accent-600" />
                </div>
                <h3 className="font-heading text-sm font-bold text-gray-900 mb-1">Email</h3>
                <p className="text-sm text-primary-600 hover:underline">info@cigarra.org</p>
              </motion.a>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={0.1}>
              <motion.a
                href="tel:+573212465421"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: smoothEase }}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center transition-all duration-300 hover:border-primary-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                  <HiPhone className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-heading text-sm font-bold text-gray-900 mb-1">{t('phone')}</h3>
                <p className="text-sm text-primary-600">+57 321 246 5421</p>
              </motion.a>
            </ScrollReveal>

            {/* WhatsApp */}
            <ScrollReveal delay={0.2}>
              <motion.a
                href="https://wa.me/573212465421"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: smoothEase }}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center transition-all duration-300 hover:border-green-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50">
                  <FaWhatsapp className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="font-heading text-sm font-bold text-gray-900 mb-1">WhatsApp</h3>
                <p className="text-sm text-green-600">{t('writeNow')}</p>
              </motion.a>
            </ScrollReveal>

            {/* Address */}
            <ScrollReveal delay={0.3}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: smoothEase }}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center transition-all duration-300 hover:border-primary-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50">
                  <HiLocationMarker className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="font-heading text-sm font-bold text-gray-900 mb-1">{t('address')}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Cra 18M #75-25 Sur
                  <br />
                  Ciudad Bolivar, Bogota D.C.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* WhatsApp main CTA */}
          <ScrollReveal>
            <div className="mt-12 text-center">
              <a
                href="https://wa.me/573212465421?text=Hola%2C%20soy%20representante%20de%20una%20empresa%20y%20me%20interesa%20conocer%20los%20modelos%20de%20alianza%20corporativa%20con%20la%20Fundacion%20Cigarra."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-green-500 px-10 py-4 font-heading text-lg font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:bg-green-400"
              >
                <FaWhatsapp className="h-6 w-6" />
                {t('writeWhatsApp')}
              </a>
              <p className="mt-3 text-sm text-gray-400">
                {t('responseGuarantee')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. BOTTOM CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-24">
        <HeroWaves />
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <FaHandshake className="h-8 w-8 text-white" />
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
                href="https://wa.me/573212465421?text=Hola%2C%20me%20interesa%20una%20alianza%20corporativa%20con%20la%20Fundacion%20Cigarra."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-10 py-4 font-heading font-bold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400 hover:shadow-accent-500/40"
              >
                <FaWhatsapp className="h-5 w-5" />
                {t('contactWhatsApp')}
              </a>
              <Link
                href={'/contacto' as '/contacto'}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 font-heading font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                {t('contactForm')}
                <HiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={'/como-ayudar' as '/como-ayudar'}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 font-heading font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                {t('donateAsIndividual')}
                <HiHeart className="h-5 w-5" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: HiShieldCheck, label: t('esalRegistered') },
                { icon: HiDocumentReport, label: t('taxDeductible') },
                { icon: HiCheckCircle, label: 'NIT: 830.114.318-9' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <badge.icon className="h-4 w-4 text-white/90" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
