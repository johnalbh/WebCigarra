'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiArrowRight } from 'react-icons/hi';

const programs = [
  { name: 'Música', slug: 'musica', image: '/images/programs/musica.jpg', description: 'Formación en instrumentos de cuerda, viento y percusión' },
  { name: 'Danza', slug: 'danza', image: '/images/programs/danza.jpg', description: 'Danza folclórica y contemporánea' },
  { name: 'Artes Plásticas', slug: 'artes-plasticas', image: '/images/programs/artes-plasticas.jpg', description: 'Pintura, dibujo y escultura' },
  { name: 'Refuerzo Escolar', slug: 'refuerzo-escolar', image: '/images/programs/refuerzo-escolar.jpg', description: 'Apoyo en matemáticas, español y ciencias' },
  { name: 'Teatro', slug: 'teatro', image: '/images/programs/teatro.jpg', description: 'Artes escénicas y expresión' },
  { name: 'Emprendimiento', slug: 'emprendimiento', image: '/images/programs/emprendimiento.jpg', description: 'Habilidades empresariales para jóvenes' },
];

const morePrograms = [
  { name: 'Inglés', slug: 'ingles' },
  { name: 'Valores y Liderazgo', slug: 'valores-y-liderazgo' },
  { name: 'Fotografía', slug: 'fotografia' },
  { name: 'Recreación', slug: 'recreacion' },
  { name: 'Escuela de Padres', slug: 'escuela-de-padres' },
  { name: 'Pre-ICFES', slug: 'pre-icfes' },
  { name: 'Manualidades', slug: 'manualidades' },
  { name: 'Sistemas', slug: 'sistemas' },
];

export default function ProgramsGrid() {
  const t = useTranslations('programs');

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-500">
              14 programas activos
            </p>
            <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Bento grid: 1 large featured + 5 smaller */}
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Featured program - spans 2 rows */}
          <ScrollReveal className="md:col-span-1 md:row-span-2">
            <Link href={{ pathname: '/programas/[slug]', params: { slug: programs[0].slug } }}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative h-full min-h-[400px] overflow-hidden rounded-xl md:min-h-0"
              >
                <Image
                  src={programs[0].image}
                  alt={programs[0].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="mb-2 inline-block rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white">
                    Destacado
                  </span>
                  <h3 className="mb-1 font-heading text-2xl font-bold text-white">
                    {programs[0].name}
                  </h3>
                  <p className="text-sm text-white/80">{programs[0].description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-400 transition-all group-hover:gap-2">
                    Conocer más <HiArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollReveal>

          {/* Remaining 5 programs in a 2x2 + 1 layout */}
          {programs.slice(1).map((program, i) => (
            <ScrollReveal key={program.slug} delay={(i + 1) * 0.08}>
              <Link href={{ pathname: '/programas/[slug]', params: { slug: program.slug } }}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group relative h-[200px] overflow-hidden rounded-xl"
                >
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-heading text-base font-bold text-white">
                      {program.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/70">{program.description}</p>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* More programs bar */}
        <ScrollReveal>
          <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Y {morePrograms.length} programas más:
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {morePrograms.map((p) => p.name).join(' · ')}
                </p>
              </div>
              <Link
                href="/programas"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-primary-600"
              >
                {t('viewAll')}
                <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
