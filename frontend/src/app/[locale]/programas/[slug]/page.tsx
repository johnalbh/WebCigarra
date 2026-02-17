'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiArrowLeft, HiClock, HiUsers } from 'react-icons/hi';

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

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[45vh] items-end pt-20"
        style={{
          background: `linear-gradient(135deg, ${program.color}dd 0%, ${program.color}88 100%)`,
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 lg:px-8">
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
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">{program.fullDescription}</p>
                </div>
              </ScrollReveal>

              {/* Placeholder for gallery */}
              <ScrollReveal>
                <div className="mt-12">
                  <h2 className="mb-6 font-heading text-2xl font-bold text-gray-900">
                    Galería
                  </h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-xl bg-gray-100"
                        style={{
                          background: `linear-gradient(135deg, ${program.color}15 0%, ${program.color}05 100%)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div>
              <ScrollReveal direction="right">
                <div className="sticky top-24 space-y-6">
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
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
