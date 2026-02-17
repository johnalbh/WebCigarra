'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import ScrollReveal from '@/components/shared/ScrollReveal';

const defaultStories = [
  {
    name: 'Alison Zapata',
    quote: 'La Fundación Cigarra me dio las herramientas para soñar en grande y trabajar por mis metas.',
    achievement: 'Profesional destacada',
  },
  {
    name: 'Leider Quiñones',
    quote: 'Gracias a la música aprendí disciplina y encontré mi pasión. Hoy la música es mi vida.',
    achievement: 'Músico profesional',
  },
  {
    name: 'Juan David Hernández',
    quote: 'En la Fundación descubrí que el arte puede cambiar comunidades enteras.',
    achievement: 'Líder comunitario',
  },
  {
    name: 'Andrey Ruíz',
    quote: 'Cada día en la Fundación fue una oportunidad para crecer como persona y como profesional.',
    achievement: 'Emprendedor social',
  },
  {
    name: 'Yuri Karina Poveda',
    quote: 'La educación que recibí me abrió puertas que nunca imaginé posibles.',
    achievement: 'Educadora',
  },
  {
    name: 'Angie Tatiana Poveda',
    quote: 'La Fundación me enseñó que con esfuerzo y dedicación todo es posible.',
    achievement: 'Profesional',
  },
];

export default function StoriesCarousel() {
  const t = useTranslations('stories');
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % defaultStories.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + defaultStories.length) % defaultStories.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const story = defaultStories[current];

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-3xl">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-50 md:-left-12"
            aria-label="Previous story"
          >
            <HiChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-50 md:-right-12"
            aria-label="Next story"
          >
            <HiChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Story card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-primary-50 p-8 text-center md:p-12"
            >
              {/* Avatar placeholder */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-200 font-heading text-2xl font-bold text-primary-600">
                {story.name.split(' ').map((n) => n[0]).join('')}
              </div>

              {/* Quote */}
              <blockquote className="mb-6 font-accent text-xl italic leading-relaxed text-gray-700 md:text-2xl">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              {/* Name and achievement */}
              <p className="font-heading text-lg font-semibold text-gray-900">
                {story.name}
              </p>
              <p className="text-sm text-primary-600">{story.achievement}</p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {defaultStories.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === current
                    ? 'w-8 bg-primary-600'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to story ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
