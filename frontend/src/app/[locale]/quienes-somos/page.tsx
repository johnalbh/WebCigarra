'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import {
  HiEye,
  HiLightBulb,
  HiHeart,
  HiAcademicCap,
  HiUserGroup,
  HiSparkles,
  HiGlobeAlt,
  HiStar,
} from 'react-icons/hi';

/* ---------- timeline data ---------- */
const timeline = [
  {
    year: '2002',
    title: 'Fundacion',
    description:
      'Nace la Fundacion Cigarra en Ciudad Bolivar para atender ninos en condicion de vulnerabilidad.',
    icon: HiSparkles,
    color: 'from-primary-500 to-primary-700',
  },
  {
    year: '2005',
    title: 'Primeros Programas',
    description:
      'Se consolidan los programas de refuerzo escolar y artes plasticas.',
    icon: HiAcademicCap,
    color: 'from-accent-400 to-accent-600',
  },
  {
    year: '2008',
    title: 'Crecimiento',
    description:
      'Ampliacion a 8 programas incluyendo musica, danza y teatro.',
    icon: HiStar,
    color: 'from-primary-400 to-primary-600',
  },
  {
    year: '2012',
    title: 'Una Decada',
    description:
      'Celebramos 10 anos con mas de 100 ninos beneficiados anualmente.',
    icon: HiHeart,
    color: 'from-rose-400 to-rose-600',
  },
  {
    year: '2015',
    title: 'Alianzas Estrategicas',
    description:
      'Establecemos alianzas con organizaciones nacionales e internacionales.',
    icon: HiGlobeAlt,
    color: 'from-accent-500 to-accent-700',
  },
  {
    year: '2018',
    title: 'Innovacion',
    description:
      'Incorporamos programas de tecnologia y emprendimiento.',
    icon: HiSparkles,
    color: 'from-primary-500 to-primary-700',
  },
  {
    year: '2020',
    title: 'Resiliencia',
    description:
      'Adaptacion durante la pandemia con programas virtuales.',
    icon: HiUserGroup,
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    year: '2024',
    title: 'Actualidad',
    description:
      '14 programas activos atendiendo a mas de 180 ninos y jovenes.',
    icon: HiAcademicCap,
    color: 'from-accent-400 to-accent-600',
  },
];

/* ---------- values data ---------- */
const values = [
  {
    icon: HiHeart,
    title: 'Amor',
    description:
      'El amor como motor fundamental de nuestra labor. Cada accion nace del compromiso genuino con nuestros ninos.',
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
  },
  {
    icon: HiAcademicCap,
    title: 'Educacion',
    description:
      'Creemos que la educacion es la herramienta mas poderosa para transformar realidades y construir futuros.',
    gradient: 'from-primary-500 to-primary-700',
    bg: 'bg-primary-50',
  },
  {
    icon: HiUserGroup,
    title: 'Comunidad',
    description:
      'Trabajamos de la mano con las familias y la comunidad para generar un impacto verdadero y duradero.',
    gradient: 'from-accent-500 to-amber-600',
    bg: 'bg-accent-50',
  },
  {
    icon: HiSparkles,
    title: 'Creatividad',
    description:
      'El arte y la cultura son vehiculos de expresion, sanacion y empoderamiento para nuestros jovenes.',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
  },
  {
    icon: HiGlobeAlt,
    title: 'Transparencia',
    description:
      'Gestionamos los recursos con responsabilidad, rindiendo cuentas a nuestros aliados y benefactores.',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: HiEye,
    title: 'Inclusion',
    description:
      'Abrimos las puertas a todos sin distincion, garantizando igualdad de oportunidades para cada nino y joven.',
    gradient: 'from-sky-500 to-cyan-600',
    bg: 'bg-sky-50',
  },
];

/* ---------- animated timeline line ---------- */
function TimelineLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start center', 'end center'],
  });

  return (
    <div ref={lineRef} className="absolute top-0 bottom-0 left-8 w-1 md:left-1/2 md:-translate-x-px">
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-primary-100" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top rounded-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-600"
        style={{ scaleY: scrollYProgress }}
      />
    </div>
  );
}

/* ---------- timeline node ---------- */
function TimelineNode({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const Icon = item.icon;

  return (
    <div className="relative mb-12 last:mb-0">
      <div
        className={`flex items-start gap-6 md:gap-0 ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {/* Pulsing dot */}
        <div className="absolute left-8 z-10 -translate-x-1/2 md:left-1/2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${item.color} shadow-lg`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} opacity-40`}
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Card */}
        <div
          className={`ml-16 md:ml-0 md:w-1/2 ${
            isEven ? 'md:pr-16' : 'md:pl-16'
          }`}
        >
          <ScrollReveal direction={isEven ? 'left' : 'right'}>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Decorative top gradient bar */}
              <div
                className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${item.color}`}
              />

              {/* Year badge */}
              <span
                className={`mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${item.color} px-4 py-1.5 text-sm font-bold text-white shadow-sm`}
              >
                {item.year}
              </span>

              <h3 className="mb-2 font-heading text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>

              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-primary-500/5 transition-transform duration-500 group-hover:scale-[3]" />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ---------- main page component ---------- */
export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-primary-950">
        {/* Subtle accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-28 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-36">
          {/* Text side */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400"
            >
              {t('foundedIn')} 2002 &mdash; Ciudad Bolivar, Bogota
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
              className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-primary-200/80"
            >
              Mas de dos decadas dedicadas a transformar vidas a traves del arte,
              la educacion y la cultura en una de las comunidades mas necesitadas
              de Bogota.
            </motion.p>
          </div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://cigarra.org/wp-content/uploads/2022/09/QH_Equipo_DEC_1.jpg"
                alt="Equipo Fundacion Cigarra"
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[600px] items-center md:grid-cols-2">
            {/* Image side */}
            <ScrollReveal direction="left" className="relative h-full min-h-[400px] md:min-h-[600px]">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="https://cigarra.org/wp-content/uploads/2022/06/QS_Mision_DEC_1-1024x682.jpg"
                  alt="Misión Fundación Cigarra"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80 md:to-white" />
                <div className="absolute inset-0 bg-primary-900/20" />
              </div>
            </ScrollReveal>

            {/* Content side */}
            <div className="relative z-10 px-6 py-16 md:-ml-20 md:py-20 lg:px-16">
              <ScrollReveal direction="right">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="glass-dark rounded-3xl p-8 shadow-2xl md:bg-white/95 md:p-10 md:shadow-xl md:backdrop-blur-xl md:border md:border-gray-100"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Icon badge */}
                  <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 shadow-lg shadow-primary-500/25">
                    <HiLightBulb className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="mb-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                    {t('mission')}
                  </h2>

                  <div className="mb-6 flex items-center gap-2">
                    <span className="h-1 w-12 rounded-full bg-primary-500" />
                    <span className="h-1 w-6 rounded-full bg-primary-300" />
                  </div>

                  <p className="text-lg leading-relaxed text-gray-700">
                    Brindar atencion integral a ninos, ninas y jovenes en
                    condicion de vulnerabilidad de Ciudad Bolivar, a traves de
                    programas de educacion, arte, cultura y recreacion,
                    promoviendo su desarrollo personal y social como agentes de
                    cambio en su comunidad.
                  </p>

                  {/* Decorative accent */}
                  <div className="mt-8 flex items-center gap-3 rounded-xl bg-primary-50 px-5 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                      <HiHeart className="h-5 w-5 text-primary-600" />
                    </div>
                    <p className="text-sm font-medium text-primary-700">
                      Mas de 180 ninos atendidos actualmente
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VISION SECTION ========== */}
      <section className="relative overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[600px] items-center md:grid-cols-2">
            {/* Content side (reversed) */}
            <div className="relative z-10 order-2 px-6 py-16 md:order-1 md:-mr-20 md:py-20 lg:px-16">
              <ScrollReveal direction="left">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="rounded-3xl p-8 shadow-xl md:p-10"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Icon badge */}
                  <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 p-4 shadow-lg shadow-accent-500/25">
                    <HiEye className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="mb-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                    {t('vision')}
                  </h2>

                  <div className="mb-6 flex items-center gap-2">
                    <span className="h-1 w-12 rounded-full bg-accent-500" />
                    <span className="h-1 w-6 rounded-full bg-accent-300" />
                  </div>

                  <p className="text-lg leading-relaxed text-gray-700">
                    Ser una organizacion referente en la transformacion social de
                    comunidades vulnerables en Colombia, reconocida por la
                    calidad e impacto de sus programas educativos, artisticos y
                    culturales, y por la formacion de ciudadanos comprometidos
                    con el cambio social.
                  </p>

                  {/* Decorative accent */}
                  <div className="mt-8 flex items-center gap-3 rounded-xl bg-accent-50 px-5 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100">
                      <HiGlobeAlt className="h-5 w-5 text-accent-600" />
                    </div>
                    <p className="text-sm font-medium text-accent-700">
                      14 programas transformando comunidades
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Image side */}
            <ScrollReveal
              direction="right"
              className="relative order-1 h-full min-h-[400px] md:order-2 md:min-h-[600px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="https://cigarra.org/wp-content/uploads/2022/06/QS_Vision_DEC_1-1024x682.jpg"
                  alt="Visión Fundación Cigarra"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-50/80 md:to-gray-50" />
                <div className="absolute inset-0 bg-accent-900/10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== TIMELINE SECTION ========== */}
      <section className="section-padding relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-primary-50 opacity-50 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-accent-50 opacity-40 blur-3xl" />
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #167BAE 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-700">
                Nuestra Trayectoria
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-5xl">
                {t('history')}
              </h2>
              <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                <span className="h-1 w-8 rounded-full bg-primary-300" />
                <span className="h-1 w-16 rounded-full bg-primary-500" />
                <span className="h-1 w-8 rounded-full bg-primary-300" />
              </div>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                Mas de dos decadas de historia construyendo suenos y
                transformando realidades en Ciudad Bolivar.
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            <TimelineLine />

            {timeline.map((item, i) => (
              <TimelineNode key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== VALUES SECTION ========== */}
      <section className="section-padding relative overflow-hidden bg-gray-50">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-accent-100 opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary-100 opacity-40 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-accent-700">
                Lo que nos define
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-5xl">
                Nuestros Valores
              </h2>
              <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                <span className="h-1 w-8 rounded-full bg-accent-300" />
                <span className="h-1 w-16 rounded-full bg-accent-500" />
                <span className="h-1 w-8 rounded-full bg-accent-300" />
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-xl hover:ring-transparent"
                  >
                    {/* Top gradient accent on hover */}
                    <div
                      className={`absolute top-0 left-0 h-1 w-0 bg-gradient-to-r ${value.gradient} transition-all duration-500 group-hover:w-full`}
                    />

                    {/* Icon */}
                    <div
                      className={`mb-5 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} p-3.5 shadow-md transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                      {value.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-600">
                      {value.description}
                    </p>

                    {/* Hover glow */}
                    <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary-500/5 transition-transform duration-500 group-hover:scale-[4]" />
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-primary-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <ScrollReveal>
            <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">
              Se parte de esta historia
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-200">
              Cada nino que pasa por nuestras puertas lleva consigo la semilla
              del cambio. Unete a nosotros y ayuda a escribir el proximo
              capitulo de esta historia de transformacion.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.donaronline.org/fundacion-cigarra/dona-ahora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 font-bold text-white shadow-lg shadow-accent-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-400/40"
              >
                <HiHeart className="h-5 w-5" />
                Dona Ahora
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
