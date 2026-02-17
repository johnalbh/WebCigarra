'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import {
  HiMusicNote, HiPencil, HiBookOpen, HiSparkles,
  HiCube, HiLightBulb, HiGlobe, HiHeart,
  HiCamera, HiStar, HiUsers, HiAcademicCap,
  HiColorSwatch, HiDesktopComputer,
} from 'react-icons/hi';

const programIcons = [
  HiMusicNote, HiPencil, HiBookOpen, HiSparkles,
  HiCube, HiLightBulb, HiGlobe, HiHeart,
  HiCamera, HiStar, HiUsers, HiAcademicCap,
  HiColorSwatch, HiDesktopComputer,
];

const programColors = [
  '#E74C3C', '#3498DB', '#2ECC71', '#F39C12',
  '#9B59B6', '#1ABC9C', '#E67E22', '#E91E63',
  '#00BCD4', '#FF5722', '#4CAF50', '#673AB7',
  '#FF9800', '#2196F3',
];

const defaultPrograms = [
  'Música', 'Artes Plásticas', 'Refuerzo Escolar', 'Danza',
  'Teatro', 'Emprendimiento', 'Inglés', 'Valores y Liderazgo',
  'Fotografía', 'Recreación', 'Escuela de Padres', 'Pre-ICFES',
  'Manualidades', 'Sistemas',
];

export default function ProgramsGrid() {
  const t = useTranslations('programs');

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {defaultPrograms.map((program, i) => {
            const Icon = programIcons[i % programIcons.length];
            const color = programColors[i % programColors.length];

            return (
              <StaggerItem key={program}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ backgroundColor: color }}
                  />
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color }} />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-gray-900">
                    {program}
                  </h3>
                  <div
                    className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <span className="text-sm font-medium text-white">
                      {t('learnMore')} →
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <ScrollReveal>
          <div className="mt-10 text-center">
            <Link
              href="/programas"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
            >
              {t('viewAll')}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
