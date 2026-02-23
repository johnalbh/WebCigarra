'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import {
  HiMusicNote, HiBookOpen, HiSparkles,
  HiCube, HiGlobe, HiHeart,
  HiStar, HiUsers, HiAcademicCap,
  HiDesktopComputer, HiHome, HiSun,
  HiArrowRight, HiUserGroup, HiShoppingBag,
} from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';
import { IconType } from 'react-icons';

interface ProgramConfig {
  slug: string;
  icon: IconType;
  color: string;
}

const programs: ProgramConfig[] = [
  { slug: 'primera-infancia', icon: HiSun, color: '#FF9800' },
  { slug: 'refuerzo-escolar', icon: HiAcademicCap, color: '#2ECC71' },
  { slug: 'danza', icon: HiSparkles, color: '#F39C12' },
  { slug: 'ingles', icon: HiGlobe, color: '#E67E22' },
  { slug: 'musica', icon: HiMusicNote, color: '#E74C3C' },
  { slug: 'artes', icon: HiCube, color: '#9B59B6' },
  { slug: 'escuela-de-artes', icon: HiStar, color: '#FF5722' },
  { slug: 'tecnologia', icon: HiDesktopComputer, color: '#2196F3' },
  { slug: 'biblioteca', icon: HiBookOpen, color: '#3498DB' },
  { slug: 'psicologia', icon: HiHeart, color: '#673AB7' },
  { slug: 'grupo-mayores', icon: HiUsers, color: '#E91E63' },
  { slug: 'talleres-para-padres', icon: HiUserGroup, color: '#4CAF50' },
  { slug: 'ropero', icon: HiShoppingBag, color: '#00BCD4' },
];

const programImageMap: Record<string, string> = {
  'primera-infancia': '/images/programs/primera-infancia.webp',
  'refuerzo-escolar': '/images/programs/refuerzo-escolar.webp',
  'danza': '/images/programs/danza.webp',
  'ingles': '/images/programs/ingles.webp',
  'musica': '/images/programs/musica.webp',
  'artes': '/images/programs/teatro.webp',
  'escuela-de-artes': '/images/programs/recreacion-y-deportes.webp',
  'tecnologia': '/images/programs/tecnologia.webp',
  'biblioteca': '/images/programs/biblioteca.webp',
  'psicologia': '/images/programs/psicologia.webp',
  'grupo-mayores': '/images/programs/grupo-adultos-mayores.webp',
  'talleres-para-padres': '/images/programs/escuela-padres.webp',
  'ropero': '/images/programs/ropero.webp',
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function ProgramsPage() {
  const t = useTranslations('programs');

  const stats = [
    { value: '13', label: t('stats.programs') },
    { value: '1.877+', label: t('stats.children') },
    { value: '23', label: t('stats.years') },
  ];

  return (
    <>
      {/* Hero Section */}
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
              {t('orgName')}
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
              {t('subtitle')}
            </motion.p>

            {/* Stats inline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
              className="mt-10 flex gap-10"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-heading text-3xl font-bold text-white">{stat.value}</span>
                  <span className="mt-1 text-sm font-medium tracking-wide text-primary-300/70 uppercase">{stat.label}</span>
                </div>
              ))}
            </motion.div>
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
                src="/images/news/festival-arte.webp"
                alt={t('heroImageAlt')}
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
                {t('explore')}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                {t('gridTitle')} <span className="text-primary-600">{t('gridTitleHighlight')}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                {t('gridSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer scaleUp staggerDelay={0.06} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programs.map((program) => (
              <StaggerItem scaleUp key={program.slug}>
                <Link href={{ pathname: '/programas/[slug]', params: { slug: program.slug } }}>
                  <motion.article
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group relative h-full overflow-hidden rounded-xl border border-gray-100 bg-white transition-colors duration-300 hover:border-gray-200"
                  >
                    {/* Image container */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={`${programImageMap[program.slug]}`}
                        alt={t(`names.${program.slug}`)}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Floating icon badge */}
                      <div
                        className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-xl shadow-sm"
                        style={{ backgroundColor: `${program.color}dd` }}
                      >
                        <program.icon className="h-5 w-5 text-white" />
                      </div>

                      {/* Program name overlay on image */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <h2 className="font-heading text-lg font-bold text-white drop-shadow-md">
                          {t(`names.${program.slug}`)}
                        </h2>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {t(`descriptions.${program.slug}`)}
                      </p>

                      {/* Learn more link */}
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                        style={{ color: program.color }}
                      >
                        {t('learnMore')}
                        <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary-500 py-24">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <HiUserGroup className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-5 font-heading text-3xl font-bold text-white md:text-5xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
              {t('ctaDescription')}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-heading text-sm font-bold tracking-wide text-primary-600 uppercase transition-colors duration-300 hover:bg-gray-50"
              >
                <HiUserGroup className="h-4 w-4" />
                {t('beVolunteer')}
                <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/como-ayudar"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors duration-300 hover:bg-white/10 hover:border-white/50"
              >
                {t('howToHelpLink')}
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
