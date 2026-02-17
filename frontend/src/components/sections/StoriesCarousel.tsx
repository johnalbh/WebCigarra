'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
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
    gradient: 'from-[#4facfe] to-[#00f2fe]',
  },
  {
    name: 'Andrey Ruíz',
    role: 'Emprendedor',
    quote: 'Cada día en la Fundación fue una oportunidad para crecer como persona y como profesional. Hoy tengo mi propio negocio.',
    achievement: 'Emprendedor social',
    image: 'https://cigarra.org/wp-content/uploads/2023/09/AndreyRuiz-1024x1024.jpeg',
    gradient: 'from-[#43e97b] to-[#38f9d7]',
  },
  {
    name: 'Yuri Karina Poveda',
    role: 'Docente',
    quote: 'La educación que recibí me abrió puertas que nunca imaginé posibles. Ahora quiero abrir esas puertas para otros.',
    achievement: 'Educadora',
    image: 'https://cigarra.org/wp-content/uploads/2025/02/YuryKarina.png',
    gradient: 'from-[#fa709a] to-[#fee140]',
  },
  {
    name: 'Anyie Tatiana',
    role: 'Profesional',
    quote: 'La Fundación me enseñó que con esfuerzo y dedicación todo es posible. Soy prueba viviente de que los sueños se cumplen.',
    achievement: 'Profesional',
    image: 'https://cigarra.org/wp-content/uploads/2025/02/Anyie.png',
    gradient: 'from-[#a18cd1] to-[#fbc2eb]',
  },
  {
    name: 'Alison Zapata',
    role: 'Egresada',
    quote: 'La Fundación Cigarra me dio las herramientas para soñar en grande y trabajar por mis metas. Cada día fue una oportunidad de crecimiento.',
    achievement: 'Profesional destacada',
    image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_1.jpg',
    gradient: 'from-[#667eea] to-[#764ba2]',
  },
  {
    name: 'Leider Quiñones',
    role: 'Estudiante de Música',
    quote: 'Gracias a la música aprendí disciplina y encontré mi pasión. Hoy la música es mi vida y puedo compartirla con mi comunidad.',
    achievement: 'Músico profesional',
    image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_3.jpg',
    gradient: 'from-[#f093fb] to-[#f5576c]',
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
    // Clear existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

    // Progress bar updates every 50ms
    const progressStep = 50 / AUTOPLAY_DURATION;
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 1;
        return prev + progressStep;
      });
    }, 50);

    // Slide advance
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
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary-600 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-500 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold tracking-wide text-accent-700 uppercase">
              {t('title')}
            </span>
            <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
              {t('title')}
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2">
              <span className="h-1 w-8 rounded-full bg-accent-300" />
              <span className="h-1 w-16 rounded-full bg-accent-500" />
              <span className="h-1 w-8 rounded-full bg-accent-300" />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative mx-auto max-w-5xl">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-2 z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl ring-1 ring-black/5 transition-all hover:scale-110 hover:bg-gray-50 hover:shadow-2xl md:-left-16"
            aria-label="Previous story"
          >
            <HiChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-2 z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl ring-1 ring-black/5 transition-all hover:scale-110 hover:bg-gray-50 hover:shadow-2xl md:-right-16"
            aria-label="Next story"
          >
            <HiChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Story card */}
          <div className="overflow-hidden rounded-3xl">
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
                className="relative rounded-3xl overflow-hidden md:flex md:min-h-[400px]"
              >
                {/* Image side */}
                <div className="relative h-64 md:h-auto md:w-2/5">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${story.gradient} opacity-30`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 max-md:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
                </div>

                {/* Content side */}
                <div className={`relative bg-gradient-to-br ${story.gradient} px-8 py-10 md:w-3/5 md:px-12 md:py-14`}>
                  {/* Decorative large quote mark */}
                  <span className="pointer-events-none absolute top-2 left-6 font-accent text-[100px] leading-none text-white/10 select-none md:text-[140px]">
                    &ldquo;
                  </span>
                  <span className="pointer-events-none absolute right-6 bottom-0 font-accent text-[100px] leading-none text-white/10 select-none md:text-[140px]">
                    &rdquo;
                  </span>

                  <div className="relative z-10 flex flex-col justify-center h-full">
                    {/* Quote */}
                    <blockquote className="mb-8 font-accent text-xl leading-relaxed text-white md:text-2xl lg:text-3xl">
                      {story.quote}
                    </blockquote>

                    {/* Divider */}
                    <div className="mb-6 h-px w-16 bg-white/40" />

                    {/* Name and role */}
                    <p className="font-heading text-xl font-bold text-white">
                      {story.name}
                    </p>
                    <p className="mt-1 text-sm font-medium tracking-wide text-white/80 uppercase">
                      {story.role}
                    </p>
                    <span className="mt-3 inline-block w-fit rounded-full bg-white/20 px-4 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {story.achievement}
                    </span>
                  </div>
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
      </div>
    </section>
  );
}
