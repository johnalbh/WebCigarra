'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiCalendar, HiArrowRight, HiMail } from 'react-icons/hi';
import HeroWaves from '@/components/shared/HeroWaves';
import { articles, articleImages } from '@/lib/articles-data';

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function NewsListClient() {
  const t = useTranslations('news');
  const locale = useLocale();
  const featured = articles.find((a) => a.featured)!;
  const rest = articles.filter((a) => !a.featured);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-28 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-36">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400"
            >
              {t('heroTagline')}
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
              {t('subtitle')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/news/celebramos-22-anos.webp"
                alt="Fundación Cigarra"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal mode="scroll" scaleFrom={0.95}>
            <Link href={{ pathname: '/noticias/[slug]', params: { slug: featured.slug } }}>
              <motion.article
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-900 md:flex md:min-h-[420px]"
              >
                <div className="relative h-72 overflow-hidden md:h-auto md:w-3/5">
                  <Image
                    src={articleImages[featured.slug]}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/80 max-md:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent md:hidden" />

                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                      {t('featured')}
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-col justify-center p-8 md:w-2/5 md:p-12">
                  <div className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400">
                    <HiCalendar className="h-4 w-4 text-accent-400" />
                    <time className="font-medium">{formatDate(featured.date)}</time>
                  </div>

                  <h2 className="font-heading text-2xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-accent-300 md:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
                    {featured.excerpt}
                  </p>

                  <div className="mt-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-accent-500">
                      {t('readMore')}
                      <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
                {t('stayInformed')}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                {t('more')} <span className="text-primary-600">{t('title')}</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer scaleUp staggerDelay={0.08} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <StaggerItem scaleUp key={article.slug}>
                <Link href={{ pathname: '/noticias/[slug]', params: { slug: article.slug } }}>
                  <motion.article
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group h-full overflow-hidden rounded-lg border border-gray-100 bg-white transition-colors duration-300 hover:border-gray-200"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={articleImages[article.slug]}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
                          <HiCalendar className="h-3.5 w-3.5 text-primary-500" />
                          {formatDate(article.date)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-primary-600">
                        {article.title}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                        {article.excerpt}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all duration-300 group-hover:gap-3">
                        {t('readMore')}
                        <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative overflow-hidden bg-primary-500 py-24">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white/20">
              <HiMail className="h-8 w-8 text-white" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {t('newsletter.title')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              {t('newsletter.description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="relative w-full max-w-md">
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 pr-40 text-sm text-white placeholder-white/50 transition-all duration-300 focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute top-1.5 right-1.5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-primary-600 transition-colors duration-300 hover:bg-gray-50"
                >
                  {t('newsletter.subscribe')}
                  <HiArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/50">
              {t('newsletter.noSpam')}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
