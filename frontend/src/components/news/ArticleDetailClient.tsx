'use client';

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useState, useRef, useEffect } from 'react';
import {
  HiArrowLeft, HiCalendar, HiShare, HiArrowRight,
  HiHeart, HiUserGroup, HiHand, HiPhone,
  HiChevronLeft, HiChevronRight,
} from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';
import { articles } from '@/lib/articles-data';

const DONATION_LINK = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';

const ctaCardConfig = [
  { key: 'donate' as const, icon: HiHeart, href: DONATION_LINK, external: true, color: 'bg-red-50 text-red-600', iconBg: 'bg-red-100' },
  { key: 'sponsor' as const, icon: HiUserGroup, href: '/plan-padrino', external: false, color: 'bg-primary-50 text-primary-600', iconBg: 'bg-primary-100' },
  { key: 'volunteer' as const, icon: HiHand, href: '/voluntariado', external: false, color: 'bg-accent-50 text-accent-600', iconBg: 'bg-accent-100' },
  { key: 'contact' as const, icon: HiPhone, href: '/contacto', external: false, color: 'bg-green-50 text-green-600', iconBg: 'bg-green-100' },
] as const;

function BottomArticlesBar({ currentSlug, readingLabel }: { currentSlug: string; readingLabel: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    const activeEl = el.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [currentSlug]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' });
  };

  const otherArticles = articles.filter((a) => a.slug !== currentSlug);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="relative mx-auto max-w-7xl">
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 z-10 flex h-full w-10 items-center justify-center bg-gradient-to-r from-white via-white/90 to-transparent"
            >
              <HiChevronLeft className="h-5 w-5 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 z-10 flex h-full w-10 items-center justify-center bg-gradient-to-l from-white via-white/90 to-transparent"
            >
              <HiChevronRight className="h-5 w-5 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-2 overflow-x-auto px-4 py-2.5 scrollbar-hide"
        >
          <span className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-primary-500 px-4 py-2 text-xs font-medium text-white">
            <HiCalendar className="h-3.5 w-3.5" />
            {readingLabel}
          </span>

          {otherArticles.map((a) => (
            <Link
              key={a.slug}
              href={`/noticias/${a.slug}`}
              data-active={a.slug === currentSlug}
              className="flex flex-shrink-0 items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              <span className="max-w-[180px] truncate">{a.title}</span>
              <HiArrowRight className="h-3 w-3 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ArticleDetailClient() {
  const t = useTranslations('news');
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const article = currentIndex >= 0
    ? articles[currentIndex]
    : {
        slug,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        excerpt: '',
        date: '2024-01-01',
        author: 'Fundación Cigarra',
        image: '/images/news/celebramos-22-anos.webp',
        content: t('fallbackContent'),
      };

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 && currentIndex >= 0 ? articles[currentIndex + 1] : null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(article.title);

  return (
    <>
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-primary-900 pt-20">
        <HeroWaves />

        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-primary-900/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 lg:px-8">
          <Link
            href="/noticias"
            className="mb-6 inline-flex items-center gap-2 text-sm text-primary-200 transition-colors hover:text-white"
          >
            <HiArrowLeft className="h-4 w-4" />
            {t('title')}
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl"
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-200"
          >
            <div className="flex items-center gap-2">
              <HiCalendar className="h-4 w-4" />
              <time>{formatDate(article.date)}</time>
            </div>
            <span className="hidden sm:inline">|</span>
            <span>{article.author}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {prevArticle && (
              <Link
                href={`/noticias/${prevArticle.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <HiChevronLeft className="h-4 w-4" />
                <span className="max-w-[200px] truncate">{prevArticle.title}</span>
              </Link>
            )}
            {nextArticle && (
              <Link
                href={`/noticias/${nextArticle.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <span className="max-w-[200px] truncate">{nextArticle.title}</span>
                <HiChevronRight className="h-4 w-4" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="section-padding pb-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ScrollReveal mode="scroll" scaleFrom={0.95}>
                <div className="relative mb-10 aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal mode="scroll" scaleFrom={0.95}>
                <div className="prose prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-6 leading-relaxed text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal mode="scroll" scaleFrom={0.95}>
                <div className="mt-12 flex flex-wrap items-center gap-4 border-t pt-8">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <HiShare className="h-4 w-4" />
                    {t('share')}:
                  </span>
                  <div className="flex gap-2">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">Facebook</a>
                    <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-600">Twitter</a>
                    <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-600">WhatsApp</a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal mode="scroll" scaleFrom={0.95}>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
                  {prevArticle && (
                    <Link href={`/noticias/${prevArticle.slug}`} className="group flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition-colors hover:border-gray-200">
                      <HiChevronLeft className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">{t('previous')}</p>
                        <p className="truncate text-sm font-medium text-gray-900 group-hover:text-primary-600">{prevArticle.title}</p>
                      </div>
                    </Link>
                  )}
                  {nextArticle && (
                    <Link href={`/noticias/${nextArticle.slug}`} className="group flex items-center justify-end gap-3 rounded-xl border border-gray-100 p-4 text-right transition-colors hover:border-gray-200">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">{t('next')}</p>
                        <p className="truncate text-sm font-medium text-gray-900 group-hover:text-primary-600">{nextArticle.title}</p>
                      </div>
                      <HiChevronRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    </Link>
                  )}
                </div>
              </ScrollReveal>

              <div className="mt-10 grid grid-cols-2 gap-3 lg:hidden">
                {ctaCardConfig.map((card) => {
                  const Icon = card.icon;
                  const content = (
                    <div className={`flex flex-col items-center rounded-xl p-4 text-center ${card.color}`}>
                      <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${card.iconBg}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-semibold">{t(`ctaCards.${card.key}.title`)}</p>
                      <p className="mt-1 text-xs opacity-70">{t(`ctaCards.${card.key}.description`)}</p>
                    </div>
                  );
                  return card.external ? (
                    <a key={card.key} href={card.href} target="_blank" rel="noopener noreferrer">{content}</a>
                  ) : (
                    <Link key={card.key} href={card.href}>{content}</Link>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block">
              <ScrollReveal direction="right">
                <div className="sticky top-24 space-y-6">
                  {ctaCardConfig.map((card) => {
                    const Icon = card.icon;
                    const inner = (
                      <div className={`group flex items-center gap-4 rounded-xl p-5 transition-all hover:-translate-y-0.5 ${card.color}`}>
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading text-sm font-bold">{t(`ctaCards.${card.key}.title`)}</p>
                          <p className="mt-0.5 text-xs opacity-70">{t(`ctaCards.${card.key}.description`)}</p>
                          <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold">
                            {t(`ctaCards.${card.key}.cta`)}
                            <HiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    );
                    return card.external ? (
                      <a key={card.key} href={card.href} target="_blank" rel="noopener noreferrer">{inner}</a>
                    ) : (
                      <Link key={card.key} href={card.href}>{inner}</Link>
                    );
                  })}

                  <div className="rounded-xl border border-gray-100 bg-white p-6">
                    <h3 className="mb-4 font-heading text-base font-semibold text-gray-900">{t('moreNews')}</h3>
                    <nav className="space-y-1">
                      {articles
                        .filter((a) => a.slug !== slug)
                        .map((a) => (
                          <Link key={a.slug} href={`/noticias/${a.slug}`} className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-50">
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                              <Image src={a.image} alt={a.title} fill sizes="48px" className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="line-clamp-2 text-sm font-medium text-gray-700 transition-colors group-hover:text-primary-600">{a.title}</p>
                              <p className="mt-1 text-xs text-gray-400">{formatDate(a.date)}</p>
                            </div>
                          </Link>
                        ))}
                    </nav>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <BottomArticlesBar currentSlug={slug} readingLabel={t('reading')} />
    </>
  );
}
