'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiStar, HiHeart, HiSparkles, HiAcademicCap, HiUserGroup, HiArrowRight } from 'react-icons/hi';
import { Link } from '@/i18n/routing';
import HeroWaves from '@/components/shared/HeroWaves';
import { IconType } from 'react-icons';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';

/* ---------- stories config ---------- */
const storiesConfig = [
  {
    key: 'juanDavid',
    name: 'Juan David Hernández',
    image: '/images/stories/juan-david.jpg',
    accentColor: '#4facfe',
    icon: HiHeart,
  },
  {
    key: 'andrey',
    name: 'Andrey Ruiz',
    image: '/images/stories/andrey-ruiz.jpg',
    accentColor: '#43e97b',
    icon: HiStar,
  },
  {
    key: 'yuri',
    name: 'Yuri Karina Poveda',
    image: '/images/stories/yuri-karina.png',
    accentColor: '#fa709a',
    icon: HiAcademicCap,
  },
  {
    key: 'anyie',
    name: 'Anyie Tatiana',
    image: '/images/stories/anyie.png',
    accentColor: '#a18cd1',
    icon: HiSparkles,
  },
];

/* ---------- impact gallery images ---------- */
const impactImages = [
  '/images/news/festival-arte.jpg',
  '/images/gallery/musica.jpg',
  '/images/gallery/tecnologia.jpg',
  '/images/engagement/apoyo-escolar.jpg',
  '/images/engagement/recreacion.jpg',
  '/images/engagement/musica.jpg',
];

/* ---------- story card ---------- */
function StoryCard({ story }: { story: { key: string; name: string; image: string; accentColor: string; icon: IconType } }) {
  const t = useTranslations('stories');
  const Icon = story.icon;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-colors duration-300 hover:border-gray-200"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={story.image}
          alt={story.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="font-heading text-lg font-bold text-white">{story.name}</h3>
          <p className="text-sm text-white/80">{t(`roles.${story.key}`)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <blockquote className="mb-5 flex-1">
          <p className="font-accent text-base italic leading-relaxed text-gray-600">
            &ldquo;{t(`quotes.${story.key}`)}&rdquo;
          </p>
        </blockquote>

        <div
          className="flex items-center gap-2.5 rounded-xl px-4 py-3"
          style={{ backgroundColor: `${story.accentColor}0D` }}
        >
          <Icon className="h-4 w-4 flex-shrink-0" style={{ color: story.accentColor }} />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{t('achievement')}:</span> {t(`achievements.${story.key}`)}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- main page component ---------- */
export default function SuccessStoriesPage() {
  const t = useTranslations('stories');

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 py-28 lg:grid-cols-2 lg:gap-20 lg:py-36">
            {/* Text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={itemVariants}
                className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-accent-400"
              >
                {t('heroTagline')}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="mb-6 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {t('title')}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="max-w-lg text-lg leading-relaxed text-primary-200/70"
              >
                {t('subtitle')}
              </motion.p>

              {/* Mini stats */}
              <motion.div variants={itemVariants} className="mt-12 flex gap-10">
                {[
                  { n: '23', l: t('statsYears') },
                  { n: '1.877+', l: t('statsChildren') },
                  { n: '100%', l: t('statsCommitment') },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-heading text-2xl font-bold text-white">{s.n}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-primary-300/50">{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image collage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image
                      src="/images/stories/juan-david.jpg"
                      alt="Juan David"
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src="/images/stories/anyie.png"
                      alt="Anyie"
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src="/images/stories/andrey-ruiz.jpg"
                      alt="Andrey"
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image
                      src="/images/stories/yuri-karina.png"
                      alt="Yuri Karina"
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== STORIES GRID ========== */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                {t('gridTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                {t('gridSubtitle')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-2" staggerDelay={0.1}>
            {storiesConfig.map((story) => (
              <StaggerItem key={story.name}>
                <StoryCard story={story} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Subtle donation nudge after stories */}
          <ScrollReveal>
            <div className="mt-16 rounded-xl border border-primary-100 bg-primary-50/50 p-8 text-center">
              <p className="text-gray-700">
                {t('donationNudge')}{' '}
                <a
                  href={DONATION_LINK_COP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-600 underline underline-offset-2 hover:text-primary-700"
                >
                  {t('donateNow')}
                </a>{' '}
                {t('donationNudgeSuffix')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== IMPACT GALLERY ========== */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent-600">
                {t('galleryTagline')}
              </p>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                {t('galleryTitle')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {impactImages.map((img, i) => (
              <ScrollReveal key={img} delay={i * 0.06}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`${t('impactAlt')} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EMOTIONAL CTA ========== */}
      <section className="relative overflow-hidden bg-primary-500">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
          <ScrollReveal>
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <HiUserGroup className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-5 font-heading text-3xl font-bold text-white md:text-5xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/80">
              {t('ctaDescription')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/como-ayudar"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-heading text-sm font-semibold text-primary-600 transition-colors duration-300 hover:bg-gray-50"
              >
                <HiHeart className="h-4 w-4" />
                {t('ctaSponsor')}
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 font-heading text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                <HiUserGroup className="h-4 w-4" />
                {t('ctaVolunteer')}
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/60">
              {(['planPadrino', 'volunteering', 'directImpact'] as const).map((key) => (
                <span key={key} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  {t(`ctaLabels.${key}`)}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
