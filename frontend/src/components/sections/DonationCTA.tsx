'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { HiHeart } from 'react-icons/hi';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';
const MONTHLY_GOAL = 5000000;
const CURRENT_AMOUNT = 3250000; // Simulated progress

function formatCOP(amount: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonationCTA() {
  const t = useTranslations('donation');
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth((CURRENT_AMOUNT / MONTHLY_GOAL) * 100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(-45deg, #167BAE, #1ABC9C, #F59E0B, #E91E63, #167BAE)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Emotional image */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://cigarra.org/wp-content/uploads/2022/09/Fundacion_ninos.png"
                    alt="Niños de la Fundación Cigarra"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -right-4 -bottom-6 rounded-2xl bg-white p-5 shadow-xl md:-right-8"
              >
                <p className="font-heading text-3xl font-bold text-primary-600">500+</p>
                <p className="text-sm text-gray-600">Vidas transformadas</p>
              </motion.div>

              {/* Decorative blob behind image */}
              <div className="absolute -top-6 -left-6 -z-10 h-full w-full rounded-3xl bg-white/10" />
            </div>
          </ScrollReveal>

          {/* Right side - Content */}
          <ScrollReveal direction="right">
            <div className="text-white">
              {/* Pulsing heart */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1, 1.15, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
              >
                <HiHeart className="h-8 w-8 text-white drop-shadow-lg" />
              </motion.div>

              <h2 className="mb-4 font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
                {t('title')}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/90 md:text-xl">
                {t('subtitle')}
              </p>

              {/* Progress bar section */}
              <div className="mb-10 rounded-2xl bg-white/15 p-6 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-semibold text-white">Meta mensual</span>
                  <span className="font-bold text-white">
                    {formatCOP(MONTHLY_GOAL)}
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="relative h-4 overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-400 to-accent-300"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                  />
                  {/* Shimmer effect on progress bar */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-white/80">
                    {formatCOP(CURRENT_AMOUNT)} recaudados
                  </span>
                  <span className="font-semibold text-accent-300">
                    {Math.round((CURRENT_AMOUNT / MONTHLY_GOAL) * 100)}%
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* COP Button with glow */}
                <a
                  href={DONATION_LINK_COP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full overflow-hidden rounded-full sm:w-auto"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 rounded-full bg-white opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-40" />
                  <div className="relative flex items-center justify-center gap-2 rounded-full bg-white px-10 py-4 font-heading font-bold text-primary-700 shadow-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-2xl">
                    <HiHeart className="h-5 w-5 text-red-500 transition-transform group-hover:scale-125" />
                    {t('donateCOP')}
                  </div>
                </a>

                {/* USD Button with glow */}
                <a
                  href={DONATION_LINK_USD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full overflow-hidden rounded-full sm:w-auto"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 rounded-full bg-accent-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-30" />
                  <div className="relative flex items-center justify-center gap-2 rounded-full border-2 border-white/60 px-10 py-4 font-heading font-bold text-white backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white group-hover:bg-white/10">
                    {t('donateUSD')}
                  </div>
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex items-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% seguro</span>
                </div>
                <div className="h-4 w-px bg-white/30" />
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Deducible de impuestos</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
