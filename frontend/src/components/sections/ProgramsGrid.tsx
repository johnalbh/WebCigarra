'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import {
  HiMusicNote, HiPencil, HiBookOpen, HiSparkles,
  HiCube, HiLightBulb, HiGlobe, HiHeart,
  HiCamera, HiStar, HiUsers, HiAcademicCap,
  HiColorSwatch, HiDesktopComputer,
} from 'react-icons/hi';

const programs = [
  { name: 'Música', slug: 'musica', color: '#E74C3C', Icon: HiMusicNote, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Musica_HED.jpg' },
  { name: 'Artes Plásticas', slug: 'artes-plasticas', color: '#3498DB', Icon: HiPencil, image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_2.jpg' },
  { name: 'Refuerzo Escolar', slug: 'refuerzo-escolar', color: '#2ECC71', Icon: HiBookOpen, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Apoyo_escolar_HED.jpg' },
  { name: 'Danza', slug: 'danza', color: '#F39C12', Icon: HiSparkles, image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Danza_HED.jpg' },
  { name: 'Teatro', slug: 'teatro', color: '#9B59B6', Icon: HiCube, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Teatro_HED.jpg' },
  { name: 'Emprendimiento', slug: 'emprendimiento', color: '#1ABC9C', Icon: HiLightBulb, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Centro_comunitario_HED.jpg' },
  { name: 'Inglés', slug: 'ingles', color: '#E67E22', Icon: HiGlobe, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Ingles_HED.jpg' },
  { name: 'Valores y Liderazgo', slug: 'valores-y-liderazgo', color: '#E91E63', Icon: HiHeart, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Psicologia_HED.jpg' },
  { name: 'Fotografía', slug: 'fotografia', color: '#00BCD4', Icon: HiCamera, image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Tecnologia_GL_1.jpg' },
  { name: 'Recreación', slug: 'recreacion', color: '#FF5722', Icon: HiStar, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Recrecion_y_deporte_HED.jpg' },
  { name: 'Escuela de Padres', slug: 'escuela-de-padres', color: '#4CAF50', Icon: HiUsers, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Taller_Padres_HED.jpg' },
  { name: 'Pre-ICFES', slug: 'pre-icfes', color: '#673AB7', Icon: HiAcademicCap, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Biblioteca_HED.jpg' },
  { name: 'Manualidades', slug: 'manualidades', color: '#FF9800', Icon: HiColorSwatch, image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Ropero_HED.jpg' },
  { name: 'Sistemas', slug: 'sistemas', color: '#2196F3', Icon: HiDesktopComputer, image: 'https://cigarra.org/wp-content/uploads/2022/05/QH_tecnologia_HED.jpg' },
];

function ProgramCard({ program }: { program: typeof programs[number] }) {
  const t = useTranslations('programs');
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <Link href={{ pathname: '/programas/[slug]', params: { slug: program.slug } }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ perspective: 800, transformStyle: 'preserve-3d' }}
        className="group relative h-[320px] cursor-pointer overflow-hidden rounded-2xl shadow-lg"
      >
        {/* Background image */}
        <Image
          src={program.image}
          alt={program.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Default dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Colored overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-85"
          style={{ backgroundColor: program.color }}
        />

        {/* Bottom content - always visible */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundColor: program.color }}
            >
              <program.Icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white drop-shadow-md">
              {program.name}
            </h3>
          </div>

          {/* Description revealed on hover */}
          <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
            <p className="text-sm leading-relaxed text-white/90">
              {t('learnMore')}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-white">
              {t('viewAll')}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Top-right icon badge */}
        <div
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
        >
          <program.Icon className="h-4 w-4 text-white" />
        </div>
      </motion.div>
    </Link>
  );
}

export default function ProgramsGrid() {
  const t = useTranslations('programs');

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header with decorative accent line */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold tracking-wide text-primary-700 uppercase">
              {t('title')}
            </span>
            <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
              {t('title')}
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2">
              <span className="h-1 w-8 rounded-full bg-primary-300" />
              <span className="h-1 w-16 rounded-full bg-primary-600" />
              <span className="h-1 w-8 rounded-full bg-primary-300" />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Programs grid */}
        <StaggerContainer
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          staggerDelay={0.08}
        >
          {programs.map((program) => (
            <StaggerItem key={program.slug}>
              <ProgramCard program={program} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all link */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <Link
              href="/programas"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-primary-600 px-8 py-4 font-heading text-base font-semibold text-primary-600 transition-all duration-300 hover:bg-primary-600 hover:text-white hover:shadow-lg hover:shadow-primary-600/25"
            >
              {t('viewAll')}
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
