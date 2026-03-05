'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import HeroWaves from '@/components/shared/HeroWaves';
import { HiMusicNote, HiArrowRight, HiPlay } from 'react-icons/hi';

const smoothEase = [0.22, 1, 0.36, 1] as const;

const YOUTUBE_VIDEO_ID = 'qvVL6m1AOds';

/* ---------- lyrics data ---------- */
const verses = [
  {
    labelKey: 'verse',
    labelSuffix: ' I',
    lines: [
      'Como la semilla que espera bajo la tierra',
      'nace la esperanza y va creciendo de raíz.',
      'Como la flor que se abre buscando la luz,',
      'así la Cigarra abre sus alas con valor.',
    ],
  },
  {
    labelKey: 'chorus',
    isChorus: true,
    lines: [
      'El resurgir de una esperanza',
      'que abre las puertas del paraíso.',
      'La vida y la paz son nuestro centro,',
      'la Cigarra canta, la Cigarra siente.',
    ],
  },
  {
    labelKey: 'verse',
    labelSuffix: ' II',
    lines: [
      'Subiendo la montaña con fuerza y con fe,',
      'cantando a cada rincón, sembrando el saber.',
      'Reunidos en el calor de una misma hoguera,',
      'la Cigarra alumbra como un gran farol.',
    ],
  },
  {
    labelKey: 'chorus',
    isChorus: true,
    lines: [
      'El resurgir de una esperanza',
      'que abre las puertas del paraíso.',
      'La vida y la paz son nuestro centro,',
      'la Cigarra canta, la Cigarra siente.',
    ],
  },
  {
    labelKey: 'verse',
    labelSuffix: ' III',
    lines: [
      'Un jardín de sueños donde todos caben,',
      'donde las raíces nos hacen más fuertes.',
      'La Cigarra vive, la Cigarra crece,',
      'transformando vidas con amor y con paz.',
    ],
  },
  {
    labelKey: 'chorus',
    isChorus: true,
    lines: [
      'El resurgir de una esperanza',
      'que abre las puertas del paraíso.',
      'La vida y la paz son nuestro centro,',
      'la Cigarra canta, la Cigarra siente.',
    ],
  },
];

/* ---------- decorative floating notes ---------- */
function FloatingNotes() {
  const notes = [
    { x: '10%', y: '20%', size: 'text-2xl', delay: 0 },
    { x: '85%', y: '15%', size: 'text-3xl', delay: 0.5 },
    { x: '5%', y: '60%', size: 'text-xl', delay: 1 },
    { x: '90%', y: '55%', size: 'text-2xl', delay: 1.5 },
    { x: '15%', y: '85%', size: 'text-lg', delay: 2 },
    { x: '80%', y: '80%', size: 'text-xl', delay: 0.8 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {notes.map((note, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.06, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 1, delay: note.delay },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: note.delay },
          }}
          className={`absolute ${note.size} text-primary-400`}
          style={{ left: note.x, top: note.y }}
        >
          <HiMusicNote />
        </motion.span>
      ))}
    </div>
  );
}

/* ---------- YouTube embed component ---------- */
function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-black">
      {/* Decorative glow behind the video */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-primary-500/20 blur-2xl" />
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="Himno Fundación Cigarra"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-2xl"
        />
      </div>
    </div>
  );
}

/* ---------- main page component ---------- */
export default function AnthemPage() {
  const t = useTranslations('anthem');

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-28 text-center lg:px-8 lg:py-36">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/10"
          >
            <HiMusicNote className="h-10 w-10 text-accent-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400"
          >
            {t('tagline')}
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
            className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-primary-200/80"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ========== VIDEO SECTION ========== */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
                <HiPlay className="h-4 w-4" />
                {t('watchVideo')}
              </span>
              <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                {t('watchVideoSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <YouTubeEmbed videoId={YOUTUBE_VIDEO_ID} />
          </ScrollReveal>
        </div>
      </section>

      {/* ========== LYRICS SECTION ========== */}
      <section className="relative section-padding bg-white">
        <FloatingNotes />

        <div className="relative z-10 mx-auto max-w-3xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-700">
                {t('lyricsLabel')}
              </span>
              <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                <span className="h-1 w-8 rounded-full bg-primary-300" />
                <HiMusicNote className="h-4 w-4 text-primary-400" />
                <span className="h-1 w-16 rounded-full bg-primary-500" />
                <HiMusicNote className="h-4 w-4 text-primary-400" />
                <span className="h-1 w-8 rounded-full bg-primary-300" />
              </div>
            </div>
          </ScrollReveal>

          {/* Lyrics Card */}
          <ScrollReveal>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
              <div className="mb-8 text-center">
                <span className="font-accent text-6xl leading-none text-primary-200">&ldquo;</span>
              </div>

              <div className="space-y-10">
                {verses.map((verse, index) => (
                  <ScrollReveal key={index} delay={index * 0.05}>
                    <div
                      className={`text-center ${
                        verse.isChorus
                          ? 'rounded-xl bg-primary-50/60 px-6 py-8 border border-primary-100/50'
                          : ''
                      }`}
                    >
                      <p
                        className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${
                          verse.isChorus ? 'text-accent-600' : 'text-primary-500'
                        }`}
                      >
                        {verse.isChorus && (
                          <HiMusicNote className="mr-1 inline-block h-3 w-3" />
                        )}
                        {t(verse.labelKey)}{verse.labelSuffix || ''}
                        {verse.isChorus && (
                          <HiMusicNote className="ml-1 inline-block h-3 w-3" />
                        )}
                      </p>

                      <div className="space-y-2">
                        {verse.lines.map((line, lineIndex) => (
                          <p
                            key={lineIndex}
                            className={`font-accent text-lg leading-relaxed md:text-xl ${
                              verse.isChorus
                                ? 'font-semibold text-primary-800'
                                : 'text-gray-700'
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    {index < verses.length - 1 && !verse.isChorus && (
                      <div className="mt-8 flex items-center justify-center gap-3">
                        <span className="h-px w-12 bg-gray-200" />
                        <HiMusicNote className="h-3 w-3 text-gray-300" />
                        <span className="h-px w-12 bg-gray-200" />
                      </div>
                    )}
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-8 text-center">
                <span className="font-accent text-6xl leading-none text-primary-200">&rdquo;</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-gray-400">
              {t('attribution')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="relative overflow-hidden bg-primary-500">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <HiMusicNote className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
              {t('ctaDescription')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/programas"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-heading text-sm font-bold text-primary-600 transition-colors duration-300 hover:bg-gray-50"
              >
                {t('viewPrograms')}
                <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/quienes-somos"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-heading text-sm font-bold text-white transition-colors duration-300 hover:bg-white/10 hover:border-white/50"
              >
                {t('aboutUs')}
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
