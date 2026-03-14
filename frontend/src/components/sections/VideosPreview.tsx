'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { HiArrowRight, HiPlay } from 'react-icons/hi';
import ScrollReveal from '@/components/shared/ScrollReveal';
import YouTubeCard, { type VideoCardItem } from '@/components/shared/YouTubeCard';
import { featuredVideos, YOUTUBE_CHANNEL_URL } from '@/lib/youtube-data';

export default function VideosPreview() {
  const t = useTranslations('videos');
  const locale = useLocale();

  const mapped: VideoCardItem[] = featuredVideos.map((v) => ({
    youtubeId: v.id,
    title: locale === 'en' ? v.titleEn : v.titleEs,
    description: locale === 'en' ? v.descriptionEn : v.descriptionEs,
    category: v.category,
    featured: v.featured,
  }));

  const [featured, ...rest] = mapped;
  const sideVideos = rest.slice(0, 2);

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-red-600">
                <HiPlay className="h-4 w-4" />
                YouTube
              </p>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('sectionTitle')}
              </h2>
              <p className="mt-3 max-w-xl text-gray-500">{t('sectionSubtitle')}</p>
            </div>
            <Link
              href="/videos"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-primary-300 hover:text-primary-600"
            >
              {t('watchAll')}
              <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured + side layout */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Featured video — large */}
          {featured && (
            <ScrollReveal mode="scroll" scaleFrom={0.95} className="lg:col-span-3">
              <YouTubeCard video={featured} size="lg" showMeta />
            </ScrollReveal>
          )}

          {/* Side videos */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {sideVideos.map((video) => (
              <ScrollReveal key={video.youtubeId} mode="scroll" scaleFrom={0.95}>
                <YouTubeCard video={video} size="sm" showMeta />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Channel CTA */}
        <ScrollReveal>
          <div className="mt-10 flex justify-center">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-red-500 hover:shadow-md"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 14.5v-5l5.5 2.5-5.5 2.5z" />
              </svg>
              {t('channelLink')}
              <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
