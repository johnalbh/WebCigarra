'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { HiUsers, HiClock, HiAcademicCap, HiHome } from 'react-icons/hi';
import { cn } from '@/lib/utils';

/* ---------- stat definitions ---------- */
const stats = [
  {
    key: 'children',
    value: 180,
    suffix: '+',
    label: 'Niños Atendidos',
    icon: HiUsers,
    gradient: 'from-accent-400 to-accent-500',
    glow: 'shadow-accent-400/30',
    iconBg: 'bg-accent-400/15',
    iconColor: 'text-accent-400',
  },
  {
    key: 'years',
    value: 22,
    suffix: '+',
    label: 'Años de Servicio',
    icon: HiClock,
    gradient: 'from-primary-300 to-primary-400',
    glow: 'shadow-primary-400/30',
    iconBg: 'bg-primary-300/15',
    iconColor: 'text-primary-300',
  },
  {
    key: 'programs',
    value: 14,
    suffix: '',
    label: 'Programas Activos',
    icon: HiAcademicCap,
    gradient: 'from-accent-400 to-accent-500',
    glow: 'shadow-accent-400/30',
    iconBg: 'bg-accent-400/15',
    iconColor: 'text-accent-400',
  },
  {
    key: 'families',
    value: 100,
    suffix: '+',
    label: 'Familias Beneficiadas',
    icon: HiHome,
    gradient: 'from-primary-300 to-primary-400',
    glow: 'shadow-primary-400/30',
    iconBg: 'bg-primary-300/15',
    iconColor: 'text-primary-300',
  },
];

/* ---------- animated counter ---------- */
function Counter({
  end,
  suffix,
  enabled,
}: {
  end: number;
  suffix: string;
  enabled: boolean;
}) {
  const count = useCountUp({ end, duration: 2500, enabled });
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ---------- individual stat card ---------- */
function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: (typeof stats)[number];
  index: number;
  isInView: boolean;
}) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'glass-dark group relative rounded-2xl p-6 text-center transition-all duration-500',
        'hover:shadow-2xl hover:-translate-y-1',
        `hover:${stat.glow}`,
      )}
    >
      {/* subtle top border gradient */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r opacity-60 transition-opacity duration-500 group-hover:opacity-100',
          stat.gradient,
        )}
      />

      {/* pulsing icon */}
      <div className="mb-4 flex justify-center">
        <motion.div
          animate={
            isInView
              ? {
                  scale: [1, 1.15, 1],
                  opacity: [1, 0.85, 1],
                }
              : {}
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-xl',
            stat.iconBg,
          )}
        >
          <Icon className={cn('h-8 w-8', stat.iconColor)} />
        </motion.div>
      </div>

      {/* counter */}
      <div className="mb-2 font-heading text-4xl font-extrabold text-white md:text-5xl">
        <Counter end={stat.value} suffix={stat.suffix} enabled={isInView} />
      </div>

      {/* label */}
      <p className="text-sm font-medium text-primary-200/80 md:text-base">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ---------- main component ---------- */
export default function ImpactCounters() {
  const t = useTranslations('impact');
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const sectionRef = useRef<HTMLDivElement>(null);

  /* parallax on background */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* ---------- parallax background image ---------- */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <img
          src="https://cigarra.org/wp-content/uploads/2025/04/ApoyoEscolar.jpg"
          alt=""
          className="h-[130%] w-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* ---------- dark overlay ---------- */}
      <div className="absolute inset-0 bg-primary-950/80" />

      {/* ---------- radial accents ---------- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-accent-500/15 blur-3xl" />
      </div>

      {/* ---------- content ---------- */}
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
            Nuestro impacto
          </p>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-5xl">
            {t('title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent-400 to-accent-500" />
        </motion.div>

        {/* stat cards */}
        <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.key}
              stat={stat}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
