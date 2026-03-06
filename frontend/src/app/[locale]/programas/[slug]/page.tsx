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
  HiStar, HiAcademicCap, HiSun,
  HiDesktopComputer, HiChevronLeft, HiChevronRight,
  HiUserGroup, HiShoppingBag, HiCalendar,
  HiLocationMarker,
} from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';
import { IconType } from 'react-icons';

interface ProgramConfig {
  slug: string;
  icon: IconType;
  color: string;
}

const allPrograms: ProgramConfig[] = [
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

const slugsWithDetails = [
  'primera-infancia', 'refuerzo-escolar', 'danza', 'ingles',
  'musica', 'artes', 'escuela-de-artes', 'tecnologia',
  'biblioteca', 'psicologia', 'grupo-mayores', 'talleres-para-padres',
  'ropero',
];

/* ── Bottom sticky bar ── */
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
                href={`/programas/${p.slug}`}
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

/* ── Info pill ── */
function InfoPill({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: IconType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function ProgramDetailPage() {
  const t = useTranslations('programs');
  const params = useParams();
  const slug = params.slug as string;

  const currentConfig = allPrograms.find((p) => p.slug === slug);
  const color = currentConfig?.color || '#167BAE';
  const ProgramIcon = currentConfig?.icon || HiStar;

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
      {/* ══════════════════════════════════════════════
          HERO — Full-width image with overlay
          ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        {programImageMap[slug] && (
          <div className="absolute inset-0">
            <Image
              src={programImageMap[slug]}
              alt={programName}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${color}e6 0%, ${color}99 40%, ${color}40 100%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </div>
        )}
        {!programImageMap[slug] && (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${color}dd 0%, ${color}88 100%)` }}
          />
        )}

        <HeroWaves />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/programas"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/25"
            >
              <HiArrowLeft className="h-4 w-4" />
              {t('title')}
            </Link>
          </motion.div>

          {/* Title area */}
          <div className="mt-8 flex items-start gap-5">
            {/* Program icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden sm:flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg shadow-black/10"
            >
              <ProgramIcon className="h-10 w-10 text-white" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              >
                {programName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85"
              >
                {programDescription}
              </motion.p>
            </div>
          </div>

          {/* Prev / Next */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex gap-3"
          >
            {currentIndex > 0 && (
              <Link
                href={`/programas/${allPrograms[currentIndex - 1].slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/25"
              >
                <HiChevronLeft className="h-4 w-4" />
                {t(`names.${allPrograms[currentIndex - 1].slug}`)}
              </Link>
            )}
            {currentIndex < allPrograms.length - 1 && currentIndex >= 0 && (
              <Link
                href={`/programas/${allPrograms[currentIndex + 1].slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/25"
              >
                {t(`names.${allPrograms[currentIndex + 1].slug}`)}
                <HiChevronRight className="h-4 w-4" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INFO PILLS — Age, Schedule, Location
          ══════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-8 pb-4">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            <InfoPill
              icon={HiUsers}
              label={t('ageRange')}
              value={programAgeRange}
              color={color}
            />
            <InfoPill
              icon={HiCalendar}
              label={t('schedule')}
              value={programSchedule}
              color={color}
            />
            <InfoPill
              icon={HiLocationMarker}
              label={t('locationLabel')}
              value={t('locationValue')}
              color={color}
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTENT — Description + Sidebar
          ══════════════════════════════════════════════ */}
      <section className="py-16 pb-28 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <ScrollReveal mode="scroll" scaleFrom={0.98}>
                <div
                  className="rounded-2xl border-l-4 bg-gray-50/70 p-8 md:p-10"
                  style={{ borderLeftColor: color }}
                >
                  <h2 className="mb-6 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                    {t('aboutProgram')}
                  </h2>
                  <p className="text-base leading-[1.85] text-gray-700 md:text-lg">
                    {programFullDescription}
                  </p>
                </div>
              </ScrollReveal>

              {/* Program image below text on desktop too */}
              {programImageMap[slug] && (
                <ScrollReveal mode="scroll" scaleFrom={0.95}>
                  <div className="mt-10 overflow-hidden rounded-2xl shadow-lg">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={programImageMap[slug]}
                        alt={programName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <ScrollReveal direction="right">
                <div className="sticky top-24 space-y-6">
                  {/* Donate CTA */}
                  <div
                    className="overflow-hidden rounded-2xl p-6 text-center text-white"
                    style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                      <ProgramIcon className="h-7 w-7 text-white" />
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-white/90">
                      {t('supportProgram')}
                    </p>
                    <Link
                      href="/como-ayudar"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold transition-all hover:shadow-lg hover:scale-105"
                      style={{ color }}
                    >
                      {t('donateNow')}
                      <HiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Other programs */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6">
                    <h3 className="mb-5 font-heading text-base font-bold text-gray-900">
                      {t('otherPrograms')}
                    </h3>
                    <nav className="space-y-1">
                      {otherPrograms.map((p) => {
                        const Icon = p.icon;
                        return (
                          <Link
                            key={p.slug}
                            href={`/programas/${p.slug}`}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-gray-50"
                          >
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                              style={{ backgroundColor: `${p.color}15` }}
                            >
                              <Icon className="h-4 w-4" style={{ color: p.color }} />
                            </span>
                            <span className="font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                              {t(`names.${p.slug}`)}
                            </span>
                            <HiArrowRight className="ml-auto h-3.5 w-3.5 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-gray-500" />
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

      {/* Sticky bottom bar */}
      <BottomProgramsBar currentSlug={slug} />
    </>
  );
}
