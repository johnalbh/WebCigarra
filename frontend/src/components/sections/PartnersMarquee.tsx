'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';

const partners = [
  { name: 'Saint George School', color: '#1a5276', logo: 'https://cigarra.org/wp-content/uploads/2022/06/San-Jorge-de-Inglaterra-150x150.png' },
  { name: 'Microsoft', color: '#00a4ef', logo: 'https://cigarra.org/wp-content/uploads/2022/06/Microsoft-150x150.png' },
  { name: 'Ecopetrol', color: '#ffd700', logo: 'https://cigarra.org/wp-content/uploads/2022/06/Ecopetrol-150x150.png' },
  { name: 'CWA', color: '#2c3e50', logo: 'https://cigarra.org/wp-content/uploads/2022/06/CWA-150x150.png' },
  { name: 'Karelsie Foundation', color: '#e74c3c', logo: 'https://cigarra.org/wp-content/uploads/2022/10/The-Karelsie-Foundation-150x150.png' },
  { name: 'Aqualogic', color: '#3498db', logo: 'https://cigarra.org/wp-content/uploads/2022/06/Aqualogic_logo-150x150.png' },
  { name: 'Chocolates Bora', color: '#8b4513', logo: 'https://cigarra.org/wp-content/uploads/2025/02/Chocolates-Bora-150x150.png' },
  { name: 'Opperar', color: '#27ae60', logo: 'https://cigarra.org/wp-content/uploads/2025/03/Opperar.png' },
  { name: 'HomeCenter', color: '#ff6600', logo: 'https://cigarra.org/wp-content/uploads/2025/11/HomeCENTER.jpg' },
  { name: 'Makri', color: '#9b59b6', logo: 'https://cigarra.org/wp-content/uploads/2025/11/makri.jpg' },
];

export default function PartnersMarquee() {
  const t = useTranslations('partners');

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #167BAE 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-600">
              Aliados
            </span>
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
              <motion.div
                key={`row1-${i}`}
                whileHover={{ scale: 1.08, y: -4 }}
                className="mx-4 flex-shrink-0"
              >
                <div className="flex h-20 w-48 items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-lg">
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2 - moves right */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white" />
          <div className="flex" style={{ animation: 'marquee 35s linear infinite reverse' }}>
            {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, i) => (
              <motion.div
                key={`row2-${i}`}
                whileHover={{ scale: 1.08, y: -4 }}
                className="mx-4 flex-shrink-0"
              >
                <div className="flex h-20 w-48 items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-lg">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
