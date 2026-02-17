'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from '@/i18n/routing';
import { HiChevronDown } from 'react-icons/hi';
import { useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-primary-950"
    >
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950" />

      {/* Subtle accent glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary-400/10 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 py-24 lg:grid-cols-2 lg:gap-16">
          {/* Text side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: textY, opacity }}
          >
            <motion.p
              variants={itemVariants}
              className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-accent-400"
            >
              Desde 2002 transformando vidas
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mb-8 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Transformamos vidas a través del{' '}
              <span className="text-gradient">arte, la educación</span> y{' '}
              <span className="text-gradient">la cultura</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-10 max-w-lg text-lg leading-relaxed text-primary-200/80"
            >
              Más de 180 niños y jóvenes en Ciudad Bolívar, Bogotá, encuentran en
              nuestros 14 programas un camino hacia un futuro mejor.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="/como-ayudar"
                className="inline-flex items-center rounded-full bg-accent-500 px-8 py-3.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5"
              >
                {t('cta_donate')}
              </Link>
              <Link
                href="/programas"
                className="inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
              >
                {t('cta_programs')}
              </Link>
            </motion.div>

            {/* Stats - inline, minimal */}
            <motion.div
              variants={itemVariants}
              className="mt-14 flex gap-10"
            >
              {[
                { number: '180+', label: 'Niños' },
                { number: '22', label: 'Años' },
                { number: '14', label: 'Programas' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl font-bold text-white">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-primary-300/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image side - clean floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageY }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <div className="aspect-[4/5] relative">
                <Image
                  src="https://cigarra.org/wp-content/uploads/2022/09/Fundacion_ninos.png"
                  alt="Niños de la Fundación Cigarra"
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              {/* Subtle bottom gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 via-transparent to-transparent" />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -bottom-6 -left-8 rounded-2xl bg-white px-6 py-4 shadow-2xl"
            >
              <p className="font-heading text-2xl font-bold text-primary-600">1,500+</p>
              <p className="text-sm text-gray-500">Vidas transformadas</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <a
          href="#impact"
          className="flex flex-col items-center gap-1.5 text-white/40 transition-colors duration-300 hover:text-white/80"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            {t('scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <HiChevronDown className="h-5 w-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
