'use client';

import { useTranslations } from 'next-intl';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { HiUsers, HiClock, HiAcademicCap, HiHome } from 'react-icons/hi';
import { cn } from '@/lib/utils';

const stats = [
  { key: 'children', value: 180, suffix: '+', icon: HiUsers, color: 'text-accent-400' },
  { key: 'years', value: 22, suffix: '+', icon: HiClock, color: 'text-primary-300' },
  { key: 'programs', value: 14, suffix: '', icon: HiAcademicCap, color: 'text-accent-400' },
  { key: 'families', value: 100, suffix: '+', icon: HiHome, color: 'text-primary-300' },
];

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

export default function ImpactCounters() {
  const t = useTranslations('impact');
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section
      id="impact"
      ref={ref}
      className="relative overflow-hidden bg-primary-800 py-20"
    >
      {/* Parallax-like pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(245,158,11,0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-12 text-center font-heading text-3xl font-bold text-white md:text-4xl">
          {t('title')}
        </h2>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <stat.icon
                className={cn('mx-auto mb-4 h-10 w-10', stat.color)}
              />
              <div className="mb-2 font-heading text-4xl font-bold text-white md:text-5xl">
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  enabled={isInView}
                />
              </div>
              <p className="text-sm text-primary-200 md:text-base">
                {t(stat.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
