'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';

const heroImages = [
  '/images/hero/fundacion-ninos.png',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
];

const SLIDE_INTERVAL = 5000;

export default function HeroSection() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, advance]);

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-primary-900 lg:min-h-screen">
      {/* Animated SVG background */}
      <HeroWaves />

      {/* Single subtle glow — hidden on mobile for performance */}
      <div className="pointer-events-none absolute -top-32 right-0 hidden h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px] md:block" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 lg:min-h-screen lg:px-8">
        <div className="grid w-full items-center gap-8 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-300">
              {t('tagline')}
            </p>

            <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {t('title')}{' '}
              <span className="text-accent-400">{t('titleHighlight')}</span> {t('titleSuffix')}
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-200/80">
              {t('description')}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
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
            </div>

            {/* Stats */}
            <div className="mt-14 flex gap-10">
              {[
                { number: '1.877+', label: t('statsChildren') },
                { number: '23', label: t('statsYears') },
                { number: '14', label: t('statsPrograms') },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl font-bold text-white">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary-300/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image slideshow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl lg:aspect-[4/5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
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
