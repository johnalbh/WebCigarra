'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import type { YouTubeVideo } from '@/lib/youtube-data';
import { motion, AnimatePresence } from 'motion/react';
import { EASE_APPLE, SCALE_HOVER, DURATION_HOVER } from '@/lib/animation-config';
import VideoModal from '@/components/shared/VideoModal';

interface YouTubeCardProps {
  video: YouTubeVideo;
  className?: string;
  /** Render title and description below the video thumbnail */
  showMeta?: boolean;
  /** Size variant for layout */
  size?: 'sm' | 'md' | 'lg';
}

const easeApple = EASE_APPLE;

export default function YouTubeCard({
  video,
  className = '',
  showMeta = true,
  size = 'md',
}: YouTubeCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const locale = useLocale();

  const title = locale === 'en' ? video.titleEn : video.titleEs;
  const description =
    locale === 'en' ? video.descriptionEn : video.descriptionEs;

  // hqdefault (480×360) always exists for every YouTube video
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  const aspectClass = 'aspect-video';

  return (
    <>
      <div className={`group ${className}`}>
        {/* Thumbnail card — click opens modal */}
        <motion.div
          whileHover={{ scale: SCALE_HOVER }}
          transition={{ duration: DURATION_HOVER, ease: easeApple }}
          className={`relative overflow-hidden rounded-xl bg-gray-900 ${aspectClass}`}
        >
          <button
            onClick={() => setModalOpen(true)}
            className="absolute inset-0 cursor-pointer"
            aria-label={`Reproducir: ${title}`}
          >
            {/* Thumbnail */}
            {!thumbError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnailUrl}
                alt={title}
                onError={() => setThumbError(true)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-accent-500 flex items-center justify-center">
                <svg className="h-12 w-12 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 14.5v-5l5.5 2.5-5.5 2.5z" />
                </svg>
              </div>
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500 group-hover:shadow-xl">
                <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* YouTube badge */}
            <div className="absolute bottom-3 right-3">
              <div className="flex items-center gap-1.5 rounded bg-black/60 px-2 py-1 backdrop-blur-sm">
                <svg className="h-3.5 w-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 14.5v-5l5.5 2.5-5.5 2.5z" />
                </svg>
                <span className="text-xs font-medium text-white">YouTube</span>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Meta below thumbnail */}
        {showMeta && (
          <div className="mt-3 px-0.5">
            <h3 className="font-heading text-base font-semibold leading-snug text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Video modal — renders outside the card via portal */}
      <AnimatePresence>
        {modalOpen && (
          <VideoModal
            videoId={video.id}
            title={title}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
