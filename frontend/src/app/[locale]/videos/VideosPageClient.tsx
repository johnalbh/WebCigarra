'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { HiPlay, HiArrowRight } from 'react-icons/hi';
import ScrollReveal from '@/components/shared/ScrollReveal';
import YouTubeCard from '@/components/shared/YouTubeCard';
import { youtubeVideos, YOUTUBE_CHANNEL_URL } from '@/lib/youtube-data';
import {
  EASE_APPLE,
  STAGGER,
  DURATION_REVEAL,
  SCALE_INITIAL,
} from '@/lib/animation-config';

const easeApple = EASE_APPLE;

type Category = 'all' | 'highlight' | 'program' | 'event' | 'story';

const categoryKeys: Category[] = ['all', 'highlight', 'program', 'event', 'story'];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER.normal },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: SCALE_INITIAL, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL, ease: easeApple },
  },
};

export default function VideosPageClient() {
  const t = useTranslations('videos');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered =
    activeCategory === 'all'
      ? youtubeVideos
      : youtubeVideos.filter((v) => v.category === activeCategory);

  return (
    <>
      {/* Hero header */}
      <section className="relative overflow-hidden bg-gray-900 pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <p className="mb-4 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-red-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 14.5v-5l5.5 2.5-5.5 2.5z" />
                </svg>
                YouTube · {t('channelHandle')}
              </p>
              <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
                {t('pageTitle')}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
                {t('pageSubtitle')}
              </p>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow transition-all hover:bg-red-500"
              >
                <HiPlay className="h-4 w-4" />
                {t('channelLink')}
                <HiArrowRight className="h-4 w-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video gallery */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Category filter */}
          <ScrollReveal>
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {categoryKeys.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((video) => (
              <motion.div key={video.id} variants={cardVariants}>
                <YouTubeCard
                  video={video}
                  showMeta
                  className="h-full"
                />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-gray-400">{t('noVideos')}</p>
          )}
        </div>
      </section>
    </>
  );
}
