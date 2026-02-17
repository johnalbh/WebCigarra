'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';

const programs = [
  { name: 'Música', slug: 'musica', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Musica_HED.jpg' },
  { name: 'Artes Plásticas', slug: 'artes-plasticas', image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_2.jpg' },
  { name: 'Refuerzo Escolar', slug: 'refuerzo-escolar', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Apoyo_escolar_HED.jpg' },
  { name: 'Danza', slug: 'danza', image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Danza_HED.jpg' },
  { name: 'Teatro', slug: 'teatro', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Teatro_HED.jpg' },
  { name: 'Emprendimiento', slug: 'emprendimiento', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Centro_comunitario_HED.jpg' },
  { name: 'Inglés', slug: 'ingles', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Ingles_HED.jpg' },
  { name: 'Valores y Liderazgo', slug: 'valores-y-liderazgo', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Psicologia_HED.jpg' },
  { name: 'Fotografía', slug: 'fotografia', image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Tecnologia_GL_1.jpg' },
  { name: 'Recreación', slug: 'recreacion', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Recrecion_y_deporte_HED.jpg' },
  { name: 'Escuela de Padres', slug: 'escuela-de-padres', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Taller_Padres_HED.jpg' },
  { name: 'Pre-ICFES', slug: 'pre-icfes', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Biblioteca_HED.jpg' },
  { name: 'Manualidades', slug: 'manualidades', image: 'https://cigarra.org/wp-content/uploads/2022/09/QH_Ropero_HED.jpg' },
  { name: 'Sistemas', slug: 'sistemas', image: 'https://cigarra.org/wp-content/uploads/2022/05/QH_tecnologia_HED.jpg' },
];

function ProgramCard({ program }: { program: typeof programs[number] }) {
  return (
    <Link href={{ pathname: '/programas/[slug]', params: { slug: program.slug } }}>
      <div className="group relative h-[280px] cursor-pointer overflow-hidden rounded-xl">
        <Image
          src={program.image}
          alt={program.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-heading text-lg font-bold text-white">
            {program.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function ProgramsGrid() {
  const t = useTranslations('programs');

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Programs grid */}
        <StaggerContainer
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          staggerDelay={0.06}
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
              className="group inline-flex items-center gap-2 font-heading text-base font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              {t('viewAll')}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
