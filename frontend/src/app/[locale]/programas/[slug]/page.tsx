'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useState, useRef, useEffect } from 'react';
import {
  HiArrowLeft, HiClock, HiUsers, HiArrowRight,
  HiMusicNote, HiBookOpen, HiSparkles,
  HiCube, HiGlobe, HiHeart,
  HiStar, HiAcademicCap, HiHome, HiSun,
  HiDesktopComputer, HiChevronLeft, HiChevronRight,
  HiUserGroup, HiShoppingBag,
} from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';
import { IconType } from 'react-icons';

interface ProgramConfig {
  slug: string;
  icon: IconType;
  color: string;
}

const allPrograms: ProgramConfig[] = [
  { slug: 'refuerzo-escolar', icon: HiAcademicCap, color: '#2ECC71' },
  { slug: 'biblioteca', icon: HiBookOpen, color: '#3498DB' },
  { slug: 'centro-comunitario', icon: HiHome, color: '#1ABC9C' },
  { slug: 'danza', icon: HiSparkles, color: '#F39C12' },
  { slug: 'grupo-adultos-mayores', icon: HiUsers, color: '#E91E63' },
  { slug: 'ingles', icon: HiGlobe, color: '#E67E22' },
  { slug: 'musica', icon: HiMusicNote, color: '#E74C3C' },
  { slug: 'primera-infancia', icon: HiSun, color: '#FF9800' },
  { slug: 'psicologia', icon: HiHeart, color: '#673AB7' },
  { slug: 'recreacion-y-deportes', icon: HiStar, color: '#FF5722' },
  { slug: 'ropero', icon: HiShoppingBag, color: '#00BCD4' },
  { slug: 'escuela-de-padres', icon: HiUserGroup, color: '#4CAF50' },
  { slug: 'teatro', icon: HiCube, color: '#9B59B6' },
  { slug: 'tecnologia', icon: HiDesktopComputer, color: '#2196F3' },
];

const programImageMap: Record<string, string> = {
  'refuerzo-escolar': '/images/programs/refuerzo-escolar.webp',
  'biblioteca': '/images/programs/biblioteca.webp',
  'centro-comunitario': '/images/programs/centro-comunitario.webp',
  'danza': '/images/programs/danza.webp',
  'grupo-adultos-mayores': '/images/programs/grupo-adultos-mayores.webp',
  'ingles': '/images/programs/ingles.webp',
  'musica': '/images/programs/musica.webp',
  'primera-infancia': '/images/programs/primera-infancia.webp',
  'psicologia': '/images/programs/psicologia.webp',
  'recreacion-y-deportes': '/images/programs/recreacion-y-deportes.webp',
  'ropero': '/images/programs/ropero.webp',
  'escuela-de-padres': '/images/programs/escuela-padres.webp',
  'teatro': '/images/programs/teatro.webp',
  'tecnologia': '/images/programs/tecnologia.webp',
};

// Slugs that have detailed translations
const slugsWithDetails = [
  'musica', 'refuerzo-escolar', 'biblioteca', 'centro-comunitario',
  'danza', 'grupo-adultos-mayores', 'ingles', 'primera-infancia',
  'psicologia', 'recreacion-y-deportes', 'ropero', 'escuela-de-padres',
  'teatro', 'tecnologia',
];

function BottomProgramsBar({ currentSlug }: { currentSlug: string }) {
  const t = useTranslations('programs');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    // Scroll to active program
    const activeEl = el.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [currentSlug]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="relative mx-auto max-w-7xl">
        {/* Scroll buttons */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 z-10 flex h-full w-10 items-center justify-center bg-gradient-to-r from-white via-white/90 to-transparent"
            >
              <HiChevronLeft className="h-5 w-5 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 z-10 flex h-full w-10 items-center justify-center bg-gradient-to-l from-white via-white/90 to-transparent"
            >
              <HiChevronRight className="h-5 w-5 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-1 overflow-x-auto px-4 py-2.5 scrollbar-hide"
        >
          {allPrograms.map((p) => {
            const Icon = p.icon;
            const isActive = p.slug === currentSlug;
            return (
              <Link
                key={p.slug}
                href={{ pathname: '/programas/[slug]', params: { slug: p.slug } }}
                data-active={isActive}
                className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-gray-700 hover:shadow-sm'
                }`}
                style={
                  isActive
                    ? { backgroundColor: p.color }
                    : { backgroundColor: `${p.color}15` }
                }
              >
                <Icon
                  className="h-3.5 w-3.5"
                  style={isActive ? undefined : { color: p.color }}
                />
                {t(`names.${p.slug}`)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ProgramDetailPage() {
  const t = useTranslations('programs');
  const params = useParams();
  const slug = params.slug as string;

  const currentConfig = allPrograms.find((p) => p.slug === slug);
  const color = currentConfig?.color || '#167BAE';

  const hasDetails = slugsWithDetails.includes(slug);

  const programName = t(`names.${slug}`);
  const programDescription = hasDetails
    ? t(`descriptions.${slug}`)
    : t('defaultDescription');
  const programAgeRange = hasDetails
    ? t(`details.${slug}.ageRange`)
    : t('defaultAgeRange');
  const programSchedule = hasDetails
    ? t(`details.${slug}.schedule`)
    : t('defaultSchedule');
  const programFullDescription = hasDetails
    ? t(`details.${slug}.longDescription`)
    : t('defaultFullDescription');

  const currentIndex = allPrograms.findIndex((p) => p.slug === slug);
  const otherPrograms = allPrograms.filter((p) => p.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20" style={{ background: `linear-gradient(135deg, ${color}dd 0%, ${color}88 100%)` }}>
        <HeroWaves />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 lg:px-8">
          <Link
            href="/programas"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <HiArrowLeft className="h-4 w-4" />
            {t('title')}
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white md:text-5xl"
          >
            {programName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-xl text-lg text-white/80"
          >
            {programDescription}
          </motion.p>

          {/* Prev / Next navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex gap-3"
          >
            {currentIndex > 0 && (
              <Link
                href={{ pathname: '/programas/[slug]', params: { slug: allPrograms[currentIndex - 1].slug } }}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <HiChevronLeft className="h-4 w-4" />
                {t(`names.${allPrograms[currentIndex - 1].slug}`)}
              </Link>
            )}
            {currentIndex < allPrograms.length - 1 && currentIndex >= 0 && (
              <Link
                href={{ pathname: '/programas/[slug]', params: { slug: allPrograms[currentIndex + 1].slug } }}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                {t(`names.${allPrograms[currentIndex + 1].slug}`)}
                <HiChevronRight className="h-4 w-4" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding pb-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Program image */}
              {programImageMap[slug] && (
                <ScrollReveal>
                  <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
                    <Image
                      src={programImageMap[slug]}
                      alt={programName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                    />
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal>
                <div className="prose prose-lg max-w-none">
                  <p className="leading-relaxed text-gray-700">{programFullDescription}</p>
                </div>
              </ScrollReveal>

              {/* Info cards on mobile (hidden on desktop where sidebar shows them) */}
              <ScrollReveal>
                <div className="mt-8 grid grid-cols-2 gap-4 lg:hidden">
                  <div className="rounded-xl bg-gray-50 p-5">
                    <HiUsers className="mb-2 h-5 w-5 text-primary-600" />
                    <p className="text-xs font-medium text-gray-500">{t('ageRange')}</p>
                    <p className="text-sm font-semibold text-gray-900">{programAgeRange}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-5">
                    <HiClock className="mb-2 h-5 w-5 text-primary-600" />
                    <p className="text-xs font-medium text-gray-500">{t('schedule')}</p>
                    <p className="text-sm font-semibold text-gray-900">{programSchedule}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar - Desktop only */}
            <div className="hidden lg:block">
              <ScrollReveal direction="right">
                <div className="sticky top-24 space-y-6">
                  {/* Info */}
                  <div className="rounded-xl bg-gray-50 p-6">
                    <h3 className="mb-4 font-heading text-lg font-semibold text-gray-900">
                      {t('information')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <HiUsers className="mt-0.5 h-5 w-5 text-primary-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{t('ageRange')}</p>
                          <p className="text-sm text-gray-600">{programAgeRange}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <HiClock className="mt-0.5 h-5 w-5 text-primary-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{t('schedule')}</p>
                          <p className="text-sm text-gray-600">{programSchedule}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Donate CTA */}
                  <div className="rounded-xl bg-accent-50 p-6 text-center">
                    <p className="mb-3 text-sm text-gray-700">
                      {t('supportProgram')}
                    </p>
                    <Link
                      href="/como-ayudar"
                      className="inline-block rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                    >
                      {t('donateNow')}
                    </Link>
                  </div>

                  {/* Other programs list */}
                  <div className="rounded-xl border border-gray-100 bg-white p-6">
                    <h3 className="mb-4 font-heading text-base font-semibold text-gray-900">
                      {t('otherPrograms')}
                    </h3>
                    <nav className="space-y-1">
                      {otherPrograms.map((p) => {
                        const Icon = p.icon;
                        return (
                          <Link
                            key={p.slug}
                            href={{ pathname: '/programas/[slug]', params: { slug: p.slug } }}
                            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-gray-50"
                          >
                            <span
                              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${p.color}15` }}
                            >
                              <Icon className="h-3.5 w-3.5" style={{ color: p.color }} />
                            </span>
                            <span className="font-medium text-gray-700 transition-colors group-hover:text-primary-600">
                              {t(`names.${p.slug}`)}
                            </span>
                            <HiArrowRight className="ml-auto h-3.5 w-3.5 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary-500" />
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky bottom bar - all screen sizes */}
      <BottomProgramsBar currentSlug={slug} />
    </>
  );
}
