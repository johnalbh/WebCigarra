'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import { HiChevronDown } from 'react-icons/hi';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />

      {/* Decorative floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-float"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${6 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Diagonal overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(22,123,174,0.9) 0%, rgba(22,123,174,0.6) 50%, rgba(245,158,11,0.3) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-accent-400"
        >
          {t('tagline')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 max-w-4xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          Transformamos vidas a través del{' '}
          <span className="text-accent-400">arte</span>,{' '}
          <span className="text-accent-400">la educación</span> y{' '}
          <span className="text-accent-400">la cultura</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-10 max-w-2xl text-lg text-primary-100/90 md:text-xl"
        >
          Más de 180 niños y jóvenes en Ciudad Bolívar, Bogotá, encuentran en
          nuestros 14 programas un camino hacia un futuro mejor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/como-ayudar"
            className="rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-accent-600 hover:shadow-accent-500/25 hover:-translate-y-0.5"
          >
            {t('cta_donate')}
          </Link>
          <Link
            href="/programas"
            className="rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
          >
            {t('cta_programs')}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#impact"
          className="flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-white/80"
        >
          <span className="text-xs uppercase tracking-widest">{t('scroll')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <HiChevronDown className="h-5 w-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
