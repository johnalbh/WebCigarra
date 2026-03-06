'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';
import { motion } from 'motion/react';
import Image from 'next/image';

interface NewsItem {
  title: string;
  slug: string;
  date?: string;
  image?: string;
}

const articleImages: Record<string, string> = {
  'bingo-virtual-marzo-2026': '/images/bingo-marzo-2026.webp',
  'celebramos-22-anos': '/images/news/celebramos-22-anos.webp',
  'nuevos-talleres-musica': '/images/news/talleres-musica.webp',
  'alianza-microsoft': '/images/news/alianza-microsoft.webp',
  'jornada-recreacion-deportes': '/images/programs/recreacion-y-deportes.webp',
  'festival-arte-cultura': '/images/news/festival-arte.webp',
  'campana-nutricion': '/images/news/campana-nutricion.webp',
};

/* Dummy data — remove once Strapi is connected */
const DUMMY_NEWS: NewsItem[] = [
  { title: 'Bingo Virtual Marzo 2026 - Participa y gana premios increibles', slug: 'bingo-virtual-marzo-2026', date: '2026-03-15' },
  { title: 'Celebramos 23 anos transformando vidas en Ciudad Bolivar', slug: 'celebramos-22-anos', date: '2024-06-15' },
  { title: 'Nuevos talleres de musica abiertos para la comunidad', slug: 'nuevos-talleres-musica', date: '2024-05-20' },
];

export default function FeaturedNewsBanner({ articles }: { articles?: NewsItem[] }) {
  const t = useTranslations('news');
  const items = articles && articles.length > 0 ? articles : DUMMY_NEWS;

  function getImage(item: NewsItem) {
    return item.image || articleImages[item.slug] || '/images/news/celebramos-22-anos.webp';
  }

  return (
    <div className="relative overflow-hidden bg-primary-900">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-2 lg:px-8">
        {/* Badge */}
        <div className="mr-4 hidden shrink-0 items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 sm:flex">
          <HiSparkles className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">{t('latest')}</span>
        </div>

        {/* Scrolling news */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex items-center whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: items.length * 12, ease: 'linear', repeat: Infinity }}
          >
            {[...items, ...items].map((item, i) => {
              const isLatest = item.slug === items[0]?.slug;
              return (
                <Link
                  key={`${item.slug}-${i}`}
                  href={{ pathname: '/noticias/[slug]' as '/noticias/[slug]', params: { slug: item.slug } }}
                  className={`group inline-flex shrink-0 items-center gap-2.5 px-5 ${isLatest ? 'rounded-full bg-white/10 py-1' : ''}`}
                >
                  {/* Thumbnail */}
                  <div className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-md ${isLatest ? 'ring-2 ring-accent-400 animate-[pulse_2s_ease-in-out_infinite]' : 'ring-1 ring-white/15'}`}>
                    <Image
                      src={getImage(item)}
                      alt=""
                      fill
                      sizes="28px"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  {isLatest && (
                    <span className="relative shrink-0 overflow-hidden rounded bg-accent-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      <span className="absolute inset-0 animate-pulse bg-white/20" />
                      <span className="relative">{t('newBadge')}</span>
                    </span>
                  )}
                  <span className={`text-sm transition-colors group-hover:text-accent-300 ${isLatest ? 'font-semibold text-white' : 'text-primary-100'}`}>
                    {item.title}
                  </span>
                  <HiArrowRight className="h-3 w-3 shrink-0 text-primary-400 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-400" />
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* View all link */}
        <Link
          href="/noticias"
          className="ml-4 hidden shrink-0 text-xs font-semibold text-primary-300 transition-colors hover:text-accent-400 sm:block"
        >
          {t('moreNews')}
        </Link>
      </div>
    </div>
  );
}
