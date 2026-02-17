'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import {
  HiMusicNote, HiPencil, HiBookOpen, HiSparkles,
  HiCube, HiLightBulb, HiGlobe, HiHeart,
  HiCamera, HiStar, HiUsers, HiAcademicCap,
  HiColorSwatch, HiDesktopComputer,
} from 'react-icons/hi';

const programs = [
  { name: 'Música', slug: 'musica', icon: HiMusicNote, color: '#E74C3C', description: 'Formación musical con instrumentos de cuerda, viento y percusión. Desarrollo del talento artístico y la disciplina.' },
  { name: 'Artes Plásticas', slug: 'artes-plasticas', icon: HiPencil, color: '#3498DB', description: 'Pintura, dibujo y escultura como herramientas de expresión creativa y desarrollo de habilidades motoras.' },
  { name: 'Refuerzo Escolar', slug: 'refuerzo-escolar', icon: HiBookOpen, color: '#2ECC71', description: 'Apoyo académico en matemáticas, español y ciencias para mejorar el rendimiento escolar.' },
  { name: 'Danza', slug: 'danza', icon: HiSparkles, color: '#F39C12', description: 'Danza folclórica y contemporánea. Expresión corporal, coordinación y valoración cultural.' },
  { name: 'Teatro', slug: 'teatro', icon: HiCube, color: '#9B59B6', description: 'Artes escénicas como medio de expresión, comunicación y desarrollo de la confianza.' },
  { name: 'Emprendimiento', slug: 'emprendimiento', icon: HiLightBulb, color: '#1ABC9C', description: 'Formación en habilidades empresariales y proyectos productivos para jóvenes.' },
  { name: 'Inglés', slug: 'ingles', icon: HiGlobe, color: '#E67E22', description: 'Aprendizaje del idioma inglés como herramienta de acceso a oportunidades globales.' },
  { name: 'Valores y Liderazgo', slug: 'valores-y-liderazgo', icon: HiHeart, color: '#E91E63', description: 'Formación en valores éticos, liderazgo juvenil y resolución de conflictos.' },
  { name: 'Fotografía', slug: 'fotografia', icon: HiCamera, color: '#00BCD4', description: 'Captura de imágenes como forma de documentar la realidad y expresar la creatividad.' },
  { name: 'Recreación', slug: 'recreacion', icon: HiStar, color: '#FF5722', description: 'Actividades lúdicas y deportivas para el desarrollo físico y la sana convivencia.' },
  { name: 'Escuela de Padres', slug: 'escuela-de-padres', icon: HiUsers, color: '#4CAF50', description: 'Talleres para padres y cuidadores sobre crianza, comunicación y acompañamiento escolar.' },
  { name: 'Pre-ICFES', slug: 'pre-icfes', icon: HiAcademicCap, color: '#673AB7', description: 'Preparación para las pruebas Saber 11 con simulacros y refuerzo en áreas clave.' },
  { name: 'Manualidades', slug: 'manualidades', icon: HiColorSwatch, color: '#FF9800', description: 'Creación de objetos artísticos y funcionales desarrollando creatividad y motricidad fina.' },
  { name: 'Sistemas', slug: 'sistemas', icon: HiDesktopComputer, color: '#2196F3', description: 'Formación en herramientas informáticas y habilidades digitales para el siglo XXI.' },
];

export default function ProgramsPage() {
  const t = useTranslations('programs');

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-gradient-to-br from-primary-800 to-primary-900 pt-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white md:text-5xl"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg text-primary-200"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <StaggerItem key={program.slug}>
                <Link href={{ pathname: '/programas/[slug]', params: { slug: program.slug } }}>
                  <motion.article
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <div
                      className="absolute top-0 left-0 h-1.5 w-full"
                      style={{ backgroundColor: program.color }}
                    />
                    <div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${program.color}15` }}
                    >
                      <program.icon className="h-7 w-7" style={{ color: program.color }} />
                    </div>
                    <h2 className="mb-3 font-heading text-xl font-bold text-gray-900">
                      {program.name}
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {program.description}
                    </p>
                    <div className="mt-4 text-sm font-medium text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                      {t('learnMore')} →
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
