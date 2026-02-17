'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiCalendar, HiArrowRight } from 'react-icons/hi';

const defaultArticles = [
  {
    title: 'Celebramos 22 años transformando vidas en Ciudad Bolívar',
    excerpt: 'Nuestra fundación cumple más de dos décadas de labor ininterrumpida con los niños y jóvenes de la comunidad.',
    date: '2024-06-15',
    slug: 'celebramos-22-anos',
  },
  {
    title: 'Nuevos talleres de música abiertos para la comunidad',
    excerpt: 'Ampliamos nuestra oferta de programas musicales con nuevos instrumentos y profesores calificados.',
    date: '2024-05-20',
    slug: 'nuevos-talleres-musica',
  },
  {
    title: 'Alianza con Microsoft para formación en tecnología',
    excerpt: 'Gracias a la alianza con Microsoft, nuestros jóvenes acceden a programas de formación tecnológica.',
    date: '2024-04-10',
    slug: 'alianza-microsoft',
  },
];

export default function NewsPreview() {
  const t = useTranslations('news');

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              {t('latest')}
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {defaultArticles.map((article) => (
            <StaggerItem key={article.slug}>
              <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
                {/* Placeholder image */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200" />

                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                    <HiCalendar className="h-3.5 w-3.5" />
                    <time>{new Date(article.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>

                  <h3 className="mb-2 font-heading text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                    {article.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                    {article.excerpt}
                  </p>

                  <Link
                    href={{ pathname: '/noticias/[slug]', params: { slug: article.slug } }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
                  >
                    {t('readMore')}
                    <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
