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
  HiMusicNote, HiPencil, HiBookOpen, HiSparkles,
  HiCube, HiLightBulb, HiGlobe, HiHeart,
  HiCamera, HiStar, HiAcademicCap,
  HiColorSwatch, HiDesktopComputer, HiChevronLeft, HiChevronRight,
} from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';

const allPrograms = [
  { name: 'Música', slug: 'musica', icon: HiMusicNote, color: '#E74C3C' },
  { name: 'Artes Plásticas', slug: 'artes-plasticas', icon: HiPencil, color: '#3498DB' },
  { name: 'Refuerzo Escolar', slug: 'refuerzo-escolar', icon: HiBookOpen, color: '#2ECC71' },
  { name: 'Danza', slug: 'danza', icon: HiSparkles, color: '#F39C12' },
  { name: 'Teatro', slug: 'teatro', icon: HiCube, color: '#9B59B6' },
  { name: 'Emprendimiento', slug: 'emprendimiento', icon: HiLightBulb, color: '#1ABC9C' },
  { name: 'Inglés', slug: 'ingles', icon: HiGlobe, color: '#E67E22' },
  { name: 'Valores y Liderazgo', slug: 'valores-y-liderazgo', icon: HiHeart, color: '#E91E63' },
  { name: 'Fotografía', slug: 'fotografia', icon: HiCamera, color: '#00BCD4' },
  { name: 'Recreación', slug: 'recreacion', icon: HiStar, color: '#FF5722' },
  { name: 'Escuela de Padres', slug: 'escuela-de-padres', icon: HiUsers, color: '#4CAF50' },
  { name: 'Pre-ICFES', slug: 'pre-icfes', icon: HiAcademicCap, color: '#673AB7' },
  { name: 'Manualidades', slug: 'manualidades', icon: HiColorSwatch, color: '#FF9800' },
  { name: 'Sistemas', slug: 'sistemas', icon: HiDesktopComputer, color: '#2196F3' },
];

const programImageMap: Record<string, string> = {
  'musica': '/images/programs/musica.jpg',
  'artes-plasticas': '/images/programs/artes-plasticas.jpg',
  'refuerzo-escolar': '/images/programs/refuerzo-escolar.jpg',
  'danza': '/images/programs/danza.jpg',
  'teatro': '/images/programs/teatro.jpg',
  'emprendimiento': '/images/programs/emprendimiento.jpg',
  'ingles': '/images/programs/ingles.jpg',
  'valores-y-liderazgo': '/images/programs/valores-liderazgo.jpg',
  'fotografia': '/images/programs/fotografia.jpg',
  'recreacion': '/images/programs/recreacion.jpg',
  'escuela-de-padres': '/images/programs/escuela-padres.jpg',
  'pre-icfes': '/images/programs/pre-icfes.jpg',
  'manualidades': '/images/programs/manualidades.jpg',
  'sistemas': '/images/programs/sistemas.jpg',
};

const programData: Record<string, {
  name: string;
  description: string;
  ageRange: string;
  schedule: string;
  color: string;
  fullDescription: string;
}> = {
  'musica': {
    name: 'Música',
    description: 'Formación musical integral',
    ageRange: '6-17 años',
    schedule: 'Lunes a Viernes, 2:00 PM - 5:00 PM',
    color: '#E74C3C',
    fullDescription: 'Nuestro programa de música ofrece formación integral en instrumentos de cuerda, viento y percusión. Los estudiantes desarrollan habilidades musicales, disciplina y trabajo en equipo a través de la práctica individual y grupal. Contamos con un ensamble musical que se presenta en eventos comunitarios y festivales.',
  },
  'artes-plasticas': {
    name: 'Artes Plásticas',
    description: 'Expresión a través del arte visual',
    ageRange: '5-17 años',
    schedule: 'Martes y Jueves, 2:00 PM - 5:00 PM',
    color: '#3498DB',
    fullDescription: 'El programa de artes plásticas permite a los niños y jóvenes explorar diversas técnicas de pintura, dibujo, escultura y grabado. A través del arte visual, los participantes desarrollan su creatividad, habilidades motoras y capacidad de expresión emocional.',
  },
  'refuerzo-escolar': {
    name: 'Refuerzo Escolar',
    description: 'Apoyo académico integral',
    ageRange: '6-17 años',
    schedule: 'Lunes a Viernes, 2:00 PM - 4:00 PM',
    color: '#2ECC71',
    fullDescription: 'Brindamos apoyo académico personalizado en matemáticas, español, ciencias y otras áreas. Nuestros tutores ayudan a los estudiantes a mejorar su rendimiento escolar, desarrollar hábitos de estudio y fortalecer competencias básicas.',
  },
};

function BottomProgramsBar({ currentSlug }: { currentSlug: string }) {
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
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {p.name}
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

  const program = programData[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: 'Programa de la Fundación Cigarra',
    ageRange: '6-17 años',
    schedule: 'Lunes a Viernes',
    color: '#167BAE',
    fullDescription: 'Este programa hace parte de los 14 programas que ofrece la Fundación Cigarra a los niños y jóvenes de Ciudad Bolívar, Bogotá. A través de actividades formativas y recreativas, buscamos contribuir al desarrollo integral de los participantes.',
  };

  const currentIndex = allPrograms.findIndex((p) => p.slug === slug);
  const otherPrograms = allPrograms.filter((p) => p.slug !== slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20" style={{ background: `linear-gradient(135deg, ${program.color}dd 0%, ${program.color}88 100%)` }}>
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
            {program.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-xl text-lg text-white/80"
          >
            {program.description}
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
                {allPrograms[currentIndex - 1].name}
              </Link>
            )}
            {currentIndex < allPrograms.length - 1 && currentIndex >= 0 && (
              <Link
                href={{ pathname: '/programas/[slug]', params: { slug: allPrograms[currentIndex + 1].slug } }}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                {allPrograms[currentIndex + 1].name}
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
                      alt={program.name}
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
                  <p className="leading-relaxed text-gray-700">{program.fullDescription}</p>
                </div>
              </ScrollReveal>

              {/* Info cards on mobile (hidden on desktop where sidebar shows them) */}
              <ScrollReveal>
                <div className="mt-8 grid grid-cols-2 gap-4 lg:hidden">
                  <div className="rounded-xl bg-gray-50 p-5">
                    <HiUsers className="mb-2 h-5 w-5 text-primary-600" />
                    <p className="text-xs font-medium text-gray-500">{t('ageRange')}</p>
                    <p className="text-sm font-semibold text-gray-900">{program.ageRange}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-5">
                    <HiClock className="mb-2 h-5 w-5 text-primary-600" />
                    <p className="text-xs font-medium text-gray-500">{t('schedule')}</p>
                    <p className="text-sm font-semibold text-gray-900">{program.schedule}</p>
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
                      Información
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <HiUsers className="mt-0.5 h-5 w-5 text-primary-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{t('ageRange')}</p>
                          <p className="text-sm text-gray-600">{program.ageRange}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <HiClock className="mt-0.5 h-5 w-5 text-primary-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{t('schedule')}</p>
                          <p className="text-sm text-gray-600">{program.schedule}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Donate CTA */}
                  <div className="rounded-xl bg-accent-50 p-6 text-center">
                    <p className="mb-3 text-sm text-gray-700">
                      Apoya este programa con tu donación
                    </p>
                    <Link
                      href="/como-ayudar"
                      className="inline-block rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                    >
                      Donar Ahora
                    </Link>
                  </div>

                  {/* Other programs list */}
                  <div className="rounded-xl border border-gray-100 bg-white p-6">
                    <h3 className="mb-4 font-heading text-base font-semibold text-gray-900">
                      Otros Programas
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
                              {p.name}
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
