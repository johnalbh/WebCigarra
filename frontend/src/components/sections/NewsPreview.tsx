'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiCalendar, HiArrowRight } from 'react-icons/hi';

const defaultArticles = [
  {
    title: 'Celebramos 23 años transformando vidas en Ciudad Bolívar',
    excerpt: 'Nuestra fundación cumple más de dos décadas de labor ininterrumpida con los niños y jóvenes de la comunidad, brindando esperanza y oportunidades a cientos de familias.',
    date: '2024-06-15',
    slug: 'celebramos-22-anos',
    image: '/images/news/celebramos-22-anos.jpg',
  },
  {
    title: 'Nuevos talleres de música abiertos para la comunidad',
    excerpt: 'Ampliamos nuestra oferta de programas musicales con nuevos instrumentos y profesores calificados.',
    date: '2024-05-20',
    slug: 'nuevos-talleres-musica',
    image: '/images/news/talleres-musica.jpg',
  },
  {
    title: 'Alianza con Microsoft para formación en tecnología',
    excerpt: 'Gracias a la alianza con Microsoft, nuestros jóvenes acceden a programas de formación tecnológica de vanguardia.',
    date: '2024-04-10',
    slug: 'alianza-microsoft',
    image: '/images/news/alianza-microsoft.jpg',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function NewsPreview() {
  const t = useTranslations('news');
  const featured = defaultArticles[0];
  const rest = defaultArticles.slice(1);

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary-500">
                Blog & Noticias
              </p>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {t('latest')}
              </h2>
            </div>
            <Link
              href="/noticias"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-primary-300 hover:text-primary-600"
            >
              Ver todas
              <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured + side articles layout */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Featured article - large */}
          <ScrollReveal className="lg:col-span-3">
            <Link href={{ pathname: '/noticias/[slug]', params: { slug: featured.slug } }}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative h-full min-h-[420px] overflow-hidden rounded-xl"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Destacado
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
                    <HiCalendar className="h-4 w-4" />
                    <time>{formatDate(featured.date)}</time>
                  </div>
                  <h3 className="mb-3 font-heading text-2xl font-bold leading-snug text-white transition-colors group-hover:text-accent-300 md:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mb-4 max-w-lg text-sm leading-relaxed text-white/80">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-accent-500">
                    {t('readMore')}
                    <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.article>
            </Link>
          </ScrollReveal>

          {/* Side articles - stacked */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {rest.map((article, i) => (
              <ScrollReveal key={article.slug} delay={(i + 1) * 0.12}>
                <Link href={{ pathname: '/noticias/[slug]', params: { slug: article.slug } }}>
                  <motion.article
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="group flex h-full overflow-hidden rounded-xl border border-gray-100 bg-white transition-colors hover:border-gray-200"
                  >
                    {/* Image */}
                    <div className="relative h-auto w-32 flex-shrink-0 overflow-hidden sm:w-40">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
                        <HiCalendar className="h-3 w-3" />
                        <time>{formatDate(article.date)}</time>
                      </div>
                      <h3 className="mb-2 font-heading text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-600">
                        {article.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-all group-hover:gap-2">
                        {t('readMore')}
                        <HiArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
