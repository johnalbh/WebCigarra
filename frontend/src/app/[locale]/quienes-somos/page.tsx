'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiEye, HiLightBulb } from 'react-icons/hi';

const timeline = [
  { year: '2002', title: 'Fundación', description: 'Nace la Fundación Cigarra en Ciudad Bolívar para atender niños en condición de vulnerabilidad.' },
  { year: '2005', title: 'Primeros Programas', description: 'Se consolidan los programas de refuerzo escolar y artes plásticas.' },
  { year: '2008', title: 'Crecimiento', description: 'Ampliación a 8 programas incluyendo música, danza y teatro.' },
  { year: '2012', title: 'Una Década', description: 'Celebramos 10 años con más de 100 niños beneficiados anualmente.' },
  { year: '2015', title: 'Alianzas Estratégicas', description: 'Establecemos alianzas con organizaciones nacionales e internacionales.' },
  { year: '2018', title: 'Innovación', description: 'Incorporamos programas de tecnología y emprendimiento.' },
  { year: '2020', title: 'Resiliencia', description: 'Adaptación durante la pandemia con programas virtuales.' },
  { year: '2024', title: 'Actualidad', description: '14 programas activos atendiendo a más de 180 niños y jóvenes.' },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-gradient-to-br from-primary-800 to-primary-900 pt-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white md:text-5xl"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg text-primary-200"
          >
            {t('foundedIn')} 2002 - Ciudad Bolívar, Bogotá
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="rounded-2xl border-l-4 border-primary-600 bg-primary-50 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <HiLightBulb className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900">
                    {t('mission')}
                  </h2>
                </div>
                <p className="leading-relaxed text-gray-700">
                  Brindar atención integral a niños, niñas y jóvenes en condición de
                  vulnerabilidad de Ciudad Bolívar, a través de programas de educación,
                  arte, cultura y recreación, promoviendo su desarrollo personal y social
                  como agentes de cambio en su comunidad.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rounded-2xl border-l-4 border-accent-500 bg-accent-50 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500">
                    <HiEye className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900">
                    {t('vision')}
                  </h2>
                </div>
                <p className="leading-relaxed text-gray-700">
                  Ser una organización referente en la transformación social de
                  comunidades vulnerables en Colombia, reconocida por la calidad e
                  impacto de sus programas educativos, artísticos y culturales, y por la
                  formación de ciudadanos comprometidos con el cambio social.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              {t('history')}
            </h2>
          </ScrollReveal>

          <StaggerContainer className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-primary-200 md:left-1/2 md:-translate-x-px" />

            {timeline.map((item, i) => (
              <StaggerItem key={item.year}>
                <div
                  className={`relative mb-8 flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 z-10 -translate-x-1/2 md:left-1/2">
                    <div className="h-4 w-4 rounded-full border-4 border-primary-600 bg-white" />
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                      <span className="mb-2 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-bold text-primary-600">
                        {item.year}
                      </span>
                      <h3 className="mb-2 font-heading text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
