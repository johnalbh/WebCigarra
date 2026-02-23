'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import TextReveal from '@/components/shared/TextReveal';

const partners = [
  { name: 'Saint George School', logo: '/images/partners/san-jorge.webp' },
  { name: 'Microsoft', logo: '/images/partners/microsoft.webp' },
  { name: 'CWA', logo: '/images/partners/cwa.webp' },
  { name: 'Karelsie Foundation', logo: '/images/partners/karelsie.webp' },
  { name: 'Aqualogic', logo: '/images/partners/aqualogic.webp' },
  { name: 'Opperar', logo: '/images/partners/opperar.webp' },
  { name: 'HomeCenter', logo: '/images/partners/homecenter.webp' },
  { name: 'Makri', logo: '/images/partners/makri.webp' },
  { name: 'ABACO - Banco de Alimentos', logo: '/images/partners/abaco.svg', imgClass: 'scale-75' },
] as const;

export default function PartnersMarquee() {
  const t = useTranslations('partners');

  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <TextReveal
              text={t('title')}
              as="h2"
              className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl"
            />
            <p className="mx-auto max-w-xl text-gray-500">{t('subtitle')}</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Double-row marquee — hover to pause */}
      <div className="space-y-6">
        {/* Row 1 - moves left */}
        <div className="group relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white" />
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`row1-${i}`}
                className="mx-4 flex-shrink-0"
              >
                <div className="flex h-24 w-56 items-center justify-center rounded-lg border border-gray-100 bg-white px-4 opacity-70 transition-all duration-300 hover:scale-105 hover:opacity-100 hover:shadow-sm">
                  <div className={`relative h-16 w-full ${'imgClass' in partner ? partner.imgClass : ''}`}>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - moves right */}
        <div className="group relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white" />
          <div className="flex" style={{ animation: 'marquee 35s linear infinite reverse' }}>
            {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, i) => (
              <div
                key={`row2-${i}`}
                className="mx-4 flex-shrink-0"
              >
                <div className="flex h-24 w-56 items-center justify-center rounded-lg border border-gray-100 bg-white px-4 opacity-70 transition-all duration-300 hover:scale-105 hover:opacity-100 hover:shadow-sm">
                  <div className={`relative h-16 w-full ${'imgClass' in partner ? partner.imgClass : ''}`}>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
