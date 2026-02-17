'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen overflow-hidden bg-primary-900">
      {/* Animated SVG background */}
      <HeroWaves />

      {/* Single subtle glow */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-8">
        <div className="grid w-full items-center gap-16 py-24 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-300">
              Desde 2002 transformando vidas
            </p>

            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Transformamos vidas a través del{' '}
              <span className="text-accent-400">arte, la educación</span> y la
              cultura
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-200/80">
              Más de 180 niños y jóvenes en Ciudad Bolívar encuentran en
              nuestros 14 programas un camino hacia un futuro mejor.
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
                { number: '180+', label: 'Niños' },
                { number: '22', label: 'Años' },
                { number: '14', label: 'Programas' },
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

          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="/images/hero/fundacion-ninos.png"
                alt="Niños de la Fundación Cigarra"
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
