'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useTransform, useScroll } from 'motion/react';
import { Link } from '@/i18n/routing';
import { HiChevronDown } from 'react-icons/hi';
import { useRef, useMemo } from 'react';

/* ---------- animated floating particles ---------- */
function Particles({ count = 40 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 12 + Math.random() * 20,
        delay: Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            opacity: d.opacity,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [d.opacity, d.opacity * 1.6, d.opacity * 0.6, d.opacity * 1.2, d.opacity],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- animated blob ---------- */
const blobConfigs = [
  {
    className:
      'absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent-500/20 blur-3xl',
    animate: {
      x: [0, 60, -40, 20, 0],
      y: [0, -50, 30, -20, 0],
      scale: [1, 1.15, 0.9, 1.05, 1],
    },
    duration: 18,
  },
  {
    className:
      'absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-primary-400/20 blur-3xl',
    animate: {
      x: [0, -50, 30, -20, 0],
      y: [0, 40, -60, 20, 0],
      scale: [1, 0.9, 1.12, 0.95, 1],
    },
    duration: 22,
  },
  {
    className:
      'absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-accent-400/15 blur-3xl',
    animate: {
      x: [0, 40, -30, 50, 0],
      y: [0, -30, 50, -40, 0],
      scale: [1, 1.1, 0.85, 1.08, 1],
    },
    duration: 20,
  },
  {
    className:
      'absolute top-10 right-1/4 h-[300px] w-[300px] rounded-full bg-primary-300/15 blur-3xl',
    animate: {
      x: [0, -30, 50, -20, 0],
      y: [0, 60, -30, 40, 0],
      scale: [1, 0.92, 1.1, 0.97, 1],
    },
    duration: 25,
  },
];

/* ---------- main component ---------- */
export default function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  /* stagger children variants */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ---------- background image with parallax ---------- */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="https://cigarra.org/wp-content/uploads/2022/09/Fundacion_ninos.png"
          alt=""
          className="h-full w-full object-cover scale-110"
          loading="eager"
        />
      </motion.div>

      {/* ---------- animated gradient overlay ---------- */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            backgroundSize: '200% 200%',
            background:
              'linear-gradient(135deg, rgba(19,45,65,0.92) 0%, rgba(22,123,174,0.80) 35%, rgba(245,158,11,0.45) 70%, rgba(19,45,65,0.90) 100%)',
          }}
        />
      </motion.div>

      {/* ---------- blobs ---------- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {blobConfigs.map((blob, i) => (
          <motion.div
            key={i}
            className={blob.className}
            animate={blob.animate}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ---------- particles ---------- */}
      <Particles count={45} />

      {/* ---------- content ---------- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-4 py-32 lg:px-8"
      >
        {/* tagline */}
        <motion.p
          variants={lineVariants}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-accent-400 drop-shadow-lg"
        >
          Desde 2002 transformando vidas
        </motion.p>

        {/* heading */}
        <motion.h1
          variants={lineVariants}
          className="mb-8 max-w-5xl font-heading text-4xl font-extrabold leading-[1.1] text-white drop-shadow-xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Transformamos vidas a través del{' '}
          <span className="text-gradient">arte</span>,{' '}
          <span className="text-gradient">la educación</span> y{' '}
          <span className="text-gradient">la cultura</span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          variants={lineVariants}
          className="mb-12 max-w-2xl text-lg font-light leading-relaxed text-primary-100/90 md:text-xl"
        >
          Más de 180 niños y jóvenes en Ciudad Bolívar, Bogotá, encuentran en
          nuestros 14 programas un camino hacia un futuro mejor.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={lineVariants} className="flex flex-wrap gap-5">
          <Link
            href="/como-ayudar"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent-500 px-9 py-4 font-bold text-white shadow-lg shadow-accent-500/30 transition-all duration-300 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-400/40 hover:-translate-y-0.5"
          >
            {/* glow ring */}
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-2 ring-accent-300/60 ring-offset-2 ring-offset-transparent" />
            {t('cta_donate')}
          </Link>

          <Link
            href="/programas"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-white/25 px-9 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent" />
            {t('cta_programs')}
          </Link>
        </motion.div>
      </motion.div>

      {/* ---------- glassmorphism stat bar ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-24 left-1/2 z-20 w-[92%] max-w-3xl -translate-x-1/2 sm:bottom-28"
      >
        <div className="glass rounded-2xl px-6 py-5 shadow-2xl sm:px-10 sm:py-6">
          <div className="flex items-center justify-around divide-x divide-white/15 text-center">
            {[
              { number: '180+', label: 'Niños' },
              { number: '22+', label: 'Años' },
              { number: '14', label: 'Programas' },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 px-2 sm:px-4">
                <p className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                  {stat.number}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-primary-200/80 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ---------- scroll indicator ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-10"
      >
        <a
          href="#impact"
          className="flex flex-col items-center gap-1.5 text-white/50 transition-colors duration-300 hover:text-white/90"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            {t('scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <HiChevronDown className="h-6 w-6" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
