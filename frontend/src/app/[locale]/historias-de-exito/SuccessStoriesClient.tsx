'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiUserGroup, HiHeart, HiArrowRight } from 'react-icons/hi';
import { Link } from '@/i18n/routing';
import HeroWaves from '@/components/shared/HeroWaves';
import { getIcon, DEFAULT_COLOR } from '@/lib/icon-registry';
import { getStrapiMedia } from '@/lib/strapi';

interface StrapiStory {
  slug: string;
  name: string;
  currentRole: string;
  quote: string;
  achievement: string;
  accentColor: string | null;
  icon: string | null;
  photo: { url: string; alternativeText?: string } | null;
}

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';

const COLLAGE_SLUGS = ['juan-david-hernandez', 'anyie-tatiana-poveda', 'andrey-ruiz', 'yuri-karina-poveda'];

function StoryCard({ story }: { story: StrapiStory }) {
  const t = useTranslations('stories');
  const Icon = getIcon(story.icon);
  const accentColor = story.accentColor ?? DEFAULT_COLOR;
  const [imgError, setImgError] = useState(false);
  const initials = story.name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  const imgSrc = getStrapiMedia(story.photo?.url ?? null);

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-colors duration-300 hover:border-gray-200"
    >
      <div className="relative h-64 overflow-hidden">
        {!imgSrc || imgError ? (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: `${accentColor}22` }}
          >
            <span className="font-heading text-5xl font-bold" style={{ color: accentColor }}>
              {initials}
            </span>
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={story.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
        {imgSrc && !imgError && <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />}
        <div className={`absolute bottom-4 left-5 right-5 ${(!imgSrc || imgError) ? 'bottom-0 left-0 right-0 bg-white/90 px-5 py-3' : ''}`}>
          <h3 className={`font-heading text-lg font-bold ${(!imgSrc || imgError) ? 'text-gray-900' : 'text-white'}`}>{story.name}</h3>
          <p className={`text-sm ${(!imgSrc || imgError) ? 'text-gray-500' : 'text-white/80'}`}>{story.currentRole}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <blockquote className="mb-5 flex-1">
          <p className="font-accent text-base italic leading-relaxed text-gray-600">
            &ldquo;{story.quote}&rdquo;
          </p>
        </blockquote>

        <div
          className="flex items-center gap-2.5 rounded-xl px-4 py-3"
          style={{ backgroundColor: `${accentColor}0D` }}
        >
          <Icon className="h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{t('achievement')}:</span> {story.achievement}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function SuccessStoriesClient({ stories }: { stories: StrapiStory[] }) {
  const t = useTranslations('stories');

  const collageStories = COLLAGE_SLUGS.map((slug) => stories.find((s) => s.slug === slug)).filter(Boolean) as StrapiStory[];
  const displayCollage = collageStories.length >= 2 ? collageStories : stories.slice(0, 4);

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
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 py-28 lg:grid-cols-2 lg:gap-20 lg:py-36">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.p variants={itemVariants} className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-accent-400">
                {t('heroTagline')}
              </motion.p>
              <motion.h1 variants={itemVariants} className="mb-6 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t('title')}
              </motion.h1>
              <motion.p variants={itemVariants} className="max-w-lg text-lg leading-relaxed text-primary-200/70">
                {t('subtitle')}
              </motion.p>

              <motion.div variants={itemVariants} className="mt-12 flex gap-10">
                {[
                  { n: '24', l: t('statsYears') },
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

            {displayCollage.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {displayCollage[0] && (
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                        <Image src={getStrapiMedia(displayCollage[0].photo?.url ?? null) ?? '/images/stories/juan-david.webp'} alt={displayCollage[0].name} fill sizes="25vw" className="object-cover" />
                      </div>
                    )}
                    {displayCollage[1] && (
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        <Image src={getStrapiMedia(displayCollage[1].photo?.url ?? null) ?? '/images/stories/anyie.webp'} alt={displayCollage[1].name} fill sizes="25vw" className="object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="mt-8 space-y-4">
                    {displayCollage[2] && (
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        <Image src={getStrapiMedia(displayCollage[2].photo?.url ?? null) ?? '/images/stories/andrey-ruiz.webp'} alt={displayCollage[2].name} fill sizes="25vw" className="object-cover" />
                      </div>
                    )}
                    {displayCollage[3] && (
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                        <Image src={getStrapiMedia(displayCollage[3].photo?.url ?? null) ?? '/images/stories/yuri-karina.webp'} alt={displayCollage[3].name} fill sizes="25vw" className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
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

          <StaggerContainer scaleUp className="grid gap-8 md:grid-cols-2" staggerDelay={0.1}>
            {stories.map((story) => (
              <StaggerItem scaleUp key={story.slug}>
                <StoryCard story={story} />
              </StaggerItem>
            ))}
          </StaggerContainer>

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

      {/* CTA */}
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
