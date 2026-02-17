'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';

const partners = [
  { name: 'Saint George School', logo: '/images/partners/san-jorge.png' },
  { name: 'Microsoft', logo: '/images/partners/microsoft.png' },
  { name: 'Ecopetrol', logo: '/images/partners/ecopetrol.png' },
  { name: 'CWA', logo: '/images/partners/cwa.png' },
  { name: 'Karelsie Foundation', logo: '/images/partners/karelsie.png' },
  { name: 'Aqualogic', logo: '/images/partners/aqualogic.png' },
  { name: 'Chocolates Bora', logo: '/images/partners/chocolates-bora.png' },
  { name: 'Opperar', logo: '/images/partners/opperar.png' },
  { name: 'HomeCenter', logo: '/images/partners/homecenter.jpg' },
  { name: 'Makri', logo: '/images/partners/makri.jpg' },
];

export default function PartnersMarquee() {
  const t = useTranslations('partners');

  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-xl text-gray-500">{t('subtitle')}</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Double-row marquee */}
      <div className="space-y-6">
        {/* Row 1 - moves left */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white" />
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`row1-${i}`}
                className="mx-4 flex-shrink-0"
              >
                <div className="flex h-20 w-48 items-center justify-center rounded-lg border border-gray-100 bg-white px-4">
                  <div className="relative h-12 w-full">
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

        {/* Row 2 - moves right */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white" />
          <div className="flex" style={{ animation: 'marquee 35s linear infinite reverse' }}>
            {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, i) => (
              <div
                key={`row2-${i}`}
                className="mx-4 flex-shrink-0"
              >
                <div className="flex h-20 w-48 items-center justify-center rounded-lg border border-gray-100 bg-white px-4">
                  <div className="relative h-12 w-full">
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
