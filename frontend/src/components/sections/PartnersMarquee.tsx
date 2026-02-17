'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/shared/ScrollReveal';

const partners = [
  'Saint George School',
  'Microsoft',
  'Ecopetrol',
  'Charles Wright',
  'Karelsie Foundation',
  'Aqualogic',
  'Chocolates Bora',
  'Opperar',
  'HomeCenter',
  'Makri',
];

export default function PartnersMarquee() {
  const t = useTranslations('partners');

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              {t('title')}
            </h2>
            <p className="text-gray-600">{t('subtitle')}</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white" />

        <div className="flex animate-marquee">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={`${partner}-${i}`}
              className="mx-8 flex flex-shrink-0 items-center justify-center"
            >
              <div className="flex h-16 items-center rounded-lg bg-gray-50 px-8 grayscale transition-all hover:bg-white hover:shadow-md hover:grayscale-0">
                <span className="whitespace-nowrap font-heading text-lg font-semibold text-gray-400 transition-colors hover:text-primary-600">
                  {partner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
