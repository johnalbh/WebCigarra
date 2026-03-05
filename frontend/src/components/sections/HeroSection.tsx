'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';
import HeroSlideshow from './HeroSlideshow';

const fallbackImages = [
  '/images/hero/fundacion-ninos.webp',
  '/images/hero/hero-2.webp',
  '/images/hero/hero-3.webp',
  '/images/hero/hero-4.webp',
];

interface HeroSectionProps {
  images?: string[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  const heroImages = images && images.length > 0 ? images : fallbackImages;
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-primary-900 lg:min-h-screen">
      <HeroWaves />
      <div className="pointer-events-none absolute -top-32 right-0 hidden h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px] md:block" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 lg:min-h-screen lg:px-8">
        <div className="grid w-full items-center gap-8 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Text */}
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-300">
              {t('tagline')}
            </p>

            <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {t('title')}{' '}
              <span className="text-accent-400">{t('titleHighlight')}</span> {t('titleSuffix')}
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-200/80">
              {t('description')}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/como-ayudar"
                className="inline-flex items-center gap-2 rounded-full bg-accent-700 px-7 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-accent-600"
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
          </div>

          {/* Image: SSR first image immediately, hydrate slideshow */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl lg:aspect-[4/5]">
            {/* First image renders server-side for fast LCP */}
            <Image
              src={heroImages[0]}
              alt={t('imageAlt')}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Client slideshow overlays after hydration */}
            <HeroSlideshow images={heroImages} alt={t('imageAlt')} />
          </div>
        </div>
      </div>
    </section>
  );
}
