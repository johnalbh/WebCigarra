'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';
import { EASE_APPLE, SCALE_INITIAL, STAGGER } from '@/lib/animation-config';
import { useIsMobile } from '@/hooks/useMediaQuery';

const heroImages = [
  '/images/hero/fundacion-ninos.webp',
  '/images/hero/hero-2.webp',
  '/images/hero/hero-3.webp',
  '/images/hero/hero-4.webp',
];

const SLIDE_INTERVAL = 5000;

export default function HeroSection() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, advance]);

  // Parallax: text drifts up gently as user scrolls down
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -50]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const easeApple = EASE_APPLE;

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] overflow-hidden bg-primary-900 lg:min-h-screen">
      <HeroWaves />
      <div className="pointer-events-none absolute -top-32 right-0 hidden h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px] md:block" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 lg:min-h-screen lg:px-8">
        <div className="grid w-full items-center gap-8 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Text with parallax */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeApple }}
            style={!isMobile ? { y: textY, opacity: textOpacity } : undefined}
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeApple }}
              className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-300"
            >
              {t('tagline')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: easeApple }}
              className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {t('title')}{' '}
              <span className="text-accent-400">{t('titleHighlight')}</span> {t('titleSuffix')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: easeApple }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-primary-200/80"
            >
              {t('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: easeApple }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/como-ayudar"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-accent-400"
              >
                {t('cta_donate')}
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/programas"
                className="inline-flex items-center rounded-full border border-white/20 px-7 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                {t('cta_programs')}
              </Link>
            </motion.div>

            {/* Stats — staggered scale-up */}
            <div className="mt-14 flex gap-10">
              {[
                { number: '1.877+', label: t('statsChildren') },
                { number: '23', label: t('statsYears') },
                { number: '14', label: t('statsPrograms') },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15, scale: SCALE_INITIAL }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.45 + i * STAGGER.normal,
                    ease: easeApple,
                  }}
                >
                  <p className="font-heading text-2xl font-bold text-white">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary-300/60">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image slideshow with Ken Burns effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: easeApple }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl lg:aspect-[4/5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.8, ease: easeApple },
                    scale: { duration: SLIDE_INTERVAL / 1000, ease: easeApple },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[current]}
                    alt={t('imageAlt')}
                    fill
                    priority={current === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === current
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
