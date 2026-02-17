'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import {
  HiMusicNote, HiPencil, HiBookOpen, HiSparkles,
  HiCube, HiLightBulb, HiGlobe, HiHeart,
  HiCamera, HiStar, HiUsers, HiAcademicCap,
  HiColorSwatch, HiDesktopComputer,
  HiArrowRight,
} from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';

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

const programImageMap: Record<string, string> = {
  'musica': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Musica_HED.jpg',
  'artes-plasticas': 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_2.jpg',
  'refuerzo-escolar': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Apoyo_escolar_HED.jpg',
  'danza': 'https://cigarra.org/wp-content/uploads/2022/06/QH_Danza_HED.jpg',
  'teatro': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Teatro_HED.jpg',
  'emprendimiento': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Centro_comunitario_HED.jpg',
  'ingles': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Ingles_HED.jpg',
  'valores-y-liderazgo': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Psicologia_HED.jpg',
  'fotografia': 'https://cigarra.org/wp-content/uploads/2022/06/QH_Tecnologia_GL_1.jpg',
  'recreacion': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Recrecion_y_deporte_HED.jpg',
  'escuela-de-padres': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Taller_Padres_HED.jpg',
  'pre-icfes': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Biblioteca_HED.jpg',
  'manualidades': 'https://cigarra.org/wp-content/uploads/2022/09/QH_Ropero_HED.jpg',
  'sistemas': 'https://cigarra.org/wp-content/uploads/2022/05/QH_tecnologia_HED.jpg',
};

const stats = [
  { value: '14', label: 'Programas' },
  { value: '180+', label: 'Niños' },
  { value: '7', label: 'Categorías' },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function ProgramsPage() {
  const t = useTranslations('programs');

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
              Fundacion Cigarra
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
                src="https://cigarra.org/wp-content/uploads/2022/06/QH_Danza_GL_1.jpg"
                alt="Ninos en programas de la Fundacion Cigarra"
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
                Explora
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Nuestros <span className="text-primary-600">Programas</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                Cada programa es una puerta abierta al conocimiento, la creatividad y el desarrollo integral de nuestros beneficiarios.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.06} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programs.map((program) => (
              <StaggerItem key={program.slug}>
                <Link href={{ pathname: '/programas/[slug]', params: { slug: program.slug } }}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="group relative h-full overflow-hidden rounded-xl border border-gray-100 bg-white transition-colors duration-300 hover:border-gray-200"
                  >
                    {/* Image container */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={`${programImageMap[program.slug]}`}
                        alt={program.name}
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
                          {program.name}
                        </h2>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {program.description}
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
            <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-5 py-1.5 text-sm font-semibold text-white">
              Haz parte del cambio
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              Cada aporte construye un futuro mejor
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Tu apoyo permite que mas ninos y jovenes de Ciudad Bolivar accedan a
              educacion de calidad, arte y cultura. Juntos podemos transformar vidas.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/como-ayudar"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-heading text-sm font-bold tracking-wide text-primary-600 uppercase transition-colors duration-300 hover:bg-gray-50"
              >
                Quiero Ayudar
                <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-heading text-sm font-bold tracking-wide text-white uppercase transition-colors duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Contáctanos
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
