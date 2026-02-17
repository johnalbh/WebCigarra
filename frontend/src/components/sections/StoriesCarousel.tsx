'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronLeft, HiChevronRight, HiHeart, HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';

const AUTOPLAY_DURATION = 7000;

const defaultStories = [
  {
    name: 'Juan David Hernández',
    role: 'Líder Juvenil',
    quote: 'En la Fundación descubrí que el arte puede cambiar comunidades enteras. Me enseñaron a liderar con el ejemplo.',
    achievement: 'Líder comunitario',
    image: 'https://cigarra.org/wp-content/uploads/2025/04/JuanDavidHernandez.jpg',
  },
  {
    name: 'Andrey Ruíz',
    role: 'Emprendedor',
    quote: 'Cada día en la Fundación fue una oportunidad para crecer como persona y como profesional. Hoy tengo mi propio negocio.',
    achievement: 'Emprendedor social',
    image: 'https://cigarra.org/wp-content/uploads/2023/09/AndreyRuiz-1024x1024.jpeg',
  },
  {
    name: 'Yuri Karina Poveda',
    role: 'Docente',
    quote: 'La educación que recibí me abrió puertas que nunca imaginé posibles. Ahora quiero abrir esas puertas para otros.',
    achievement: 'Educadora',
    image: 'https://cigarra.org/wp-content/uploads/2025/02/YuryKarina.png',
  },
  {
    name: 'Anyie Tatiana',
    role: 'Profesional',
    quote: 'La Fundación me enseñó que con esfuerzo y dedicación todo es posible. Soy prueba viviente de que los sueños se cumplen.',
    achievement: 'Profesional',
    image: 'https://cigarra.org/wp-content/uploads/2025/02/Anyie.png',
  },
  {
    name: 'Alison Zapata',
    role: 'Egresada',
    quote: 'La Fundación Cigarra me dio las herramientas para soñar en grande y trabajar por mis metas.',
    achievement: 'Profesional destacada',
    image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_1.jpg',
  },
  {
    name: 'Leider Quiñones',
    role: 'Estudiante de Música',
    quote: 'Gracias a la música aprendí disciplina y encontré mi pasión. Hoy la música es mi vida.',
    achievement: 'Músico profesional',
    image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_3.jpg',
  },
];

export default function StoriesCarousel() {
  const t = useTranslations('stories');
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

    const progressStep = 50 / AUTOPLAY_DURATION;
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 1;
        return prev + progressStep;
      });
    }, 50);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % defaultStories.length);
      setProgress(0);
    }, AUTOPLAY_DURATION);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startAutoplay]);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startAutoplay();
  }, [current, startAutoplay]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % defaultStories.length);
    startAutoplay();
  }, [startAutoplay]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + defaultStories.length) % defaultStories.length);
    startAutoplay();
  }, [startAutoplay]);

  const story = defaultStories[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent-500">
              Vidas transformadas
            </p>
            <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative mx-auto max-w-5xl">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-2 z-20 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50 md:-left-16"
            aria-label="Previous story"
          >
            <HiChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-2 z-20 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50 md:-right-16"
            aria-label="Next story"
          >
            <HiChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Story card */}
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                className="bg-white md:flex md:min-h-[400px]"
              >
                {/* Image side */}
                <div className="relative h-72 md:h-auto md:w-2/5">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  {/* Overlay counter */}
                  <div className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {current + 1} / {defaultStories.length}
                  </div>
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-center px-8 py-10 md:w-3/5 md:px-12 md:py-14">
                  {/* Large quote mark */}
                  <div className="mb-4 font-accent text-6xl leading-none text-primary-200">
                    &ldquo;
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-8 font-accent text-xl leading-relaxed text-gray-800 md:text-2xl">
                    {story.quote}
                  </blockquote>

                  {/* Divider */}
                  <div className="mb-5 flex items-center gap-2">
                    <div className="h-px w-8 bg-primary-500" />
                    <div className="h-px w-4 bg-primary-300" />
                  </div>

                  {/* Name and role */}
                  <p className="font-heading text-lg font-bold text-gray-900">
                    {story.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {story.role} &middot; {story.achievement}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-gray-200">
            <motion.div
              className="h-full rounded-full bg-primary-600"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>

          {/* Navigation dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {defaultStories.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative flex items-center justify-center p-1"
                aria-label={`Go to story ${i + 1}`}
              >
                <motion.span
                  className="block rounded-full"
                  animate={{
                    width: i === current ? 32 : 10,
                    height: 10,
                    backgroundColor: i === current ? '#167BAE' : '#d1d5db',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Sponsorship CTA - emotionally driven */}
        <ScrollReveal>
          <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-primary-900 p-8 md:p-10">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-accent-500/20">
                <HiHeart className="h-8 w-8 text-accent-400" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-heading text-xl font-bold text-white">
                  Tú puedes ser parte de su historia
                </h3>
                <p className="text-sm leading-relaxed text-primary-200/70">
                  Con el Plan Padrino cubres educación y alimentación de un niño durante todo el año.
                  Recibe reportes personalizados de su progreso.
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
                <Link
                  href="/como-ayudar"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-400"
                >
                  Apadrina un niño
                  <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/historias-de-exito"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  Ver más historias
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
