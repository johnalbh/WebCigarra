'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiStar } from 'react-icons/hi';

const stories = [
  { name: 'Alison Zapata', role: 'Profesional destacada', quote: 'La Fundación Cigarra me dio las herramientas para soñar en grande y trabajar por mis metas. Hoy soy una profesional orgullosa de mis raíces.', achievement: 'Graduada universitaria, líder comunitaria' },
  { name: 'Leider Quiñones', role: 'Músico profesional', quote: 'Gracias a la música aprendí disciplina y encontré mi pasión. Hoy la música es mi vida y mi forma de inspirar a otros jóvenes.', achievement: 'Músico profesional, docente de música' },
  { name: 'Juan David Hernández', role: 'Líder comunitario', quote: 'En la Fundación descubrí que el arte puede cambiar comunidades enteras. Ahora trabajo para que otros jóvenes tengan las mismas oportunidades.', achievement: 'Gestor cultural, líder de proyectos sociales' },
  { name: 'Andrey Ruíz', role: 'Emprendedor social', quote: 'Cada día en la Fundación fue una oportunidad para crecer como persona y como profesional. Los valores que aprendí guían mi emprendimiento.', achievement: 'Emprendedor, mentoring de jóvenes' },
  { name: 'Yuri Karina Poveda', role: 'Educadora', quote: 'La educación que recibí me abrió puertas que nunca imaginé posibles. Hoy regreso a la comunidad como educadora para hacer lo mismo por otros.', achievement: 'Licenciada en educación, voluntaria activa' },
  { name: 'Angie Tatiana Poveda', role: 'Profesional', quote: 'La Fundación me enseñó que con esfuerzo y dedicación todo es posible. Nunca olvidaré el apoyo y el cariño que recibí.', achievement: 'Profesional en administración, mentora' },
];

export default function SuccessStoriesPage() {
  const t = useTranslations('stories');

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center bg-gradient-to-br from-primary-800 to-primary-900 pt-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-8">
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

      {/* Stories Grid */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StaggerItem key={story.name}>
                <motion.article
                  whileHover={{ y: -5 }}
                  className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
                >
                  {/* Avatar */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 font-heading text-xl font-bold text-primary-600">
                      {story.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-gray-900">
                        {story.name}
                      </h3>
                      <p className="text-sm text-primary-600">{story.role}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-6 flex-1 font-accent text-lg italic leading-relaxed text-gray-600">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>

                  {/* Achievement */}
                  <div className="flex items-start gap-2 rounded-lg bg-accent-50 p-3">
                    <HiStar className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{t('achievement')}:</span>{' '}
                      {story.achievement}
                    </p>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
