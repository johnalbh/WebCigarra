'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { Link } from '@/i18n/routing';
import { HiArrowRight } from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';

const stats = [
  { key: 'children', value: 180, suffix: '+', label: 'Niños Atendidos' },
  { key: 'years', value: 22, suffix: '+', label: 'Años de Servicio' },
  { key: 'programs', value: 14, suffix: '', label: 'Programas Activos' },
  { key: 'families', value: 100, suffix: '+', label: 'Familias Beneficiadas' },
];

function Counter({ end, suffix, enabled }: { end: number; suffix: string; enabled: boolean }) {
  const count = useCountUp({ end, duration: 2500, enabled });
  return <span>{count}{suffix}</span>;
}

export default function ImpactCounters() {
  const t = useTranslations('impact');
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="impact" className="relative overflow-hidden bg-primary-900 py-20 md:py-28">
      <HeroWaves />
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-300">
            Nuestro impacto
          </p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-4xl font-bold text-white md:text-5xl">
                <Counter end={stat.value} suffix={stat.suffix} enabled={isInView} />
              </p>
              <p className="mt-2 text-sm font-medium text-primary-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Subtle donation nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-primary-300/70">
            Tu aporte hace esto posible.{' '}
            <Link
              href="/como-ayudar"
              className="inline-flex items-center gap-1 font-medium text-accent-400 transition-colors hover:text-accent-300"
            >
              Dona ahora
              <HiArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
