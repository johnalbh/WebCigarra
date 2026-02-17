'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiCalendar, HiArrowRight } from 'react-icons/hi';

const articles = [
  { title: 'Celebramos 22 años transformando vidas en Ciudad Bolívar', excerpt: 'Nuestra fundación cumple más de dos décadas de labor ininterrumpida con los niños y jóvenes.', date: '2024-06-15', slug: 'celebramos-22-anos', featured: true },
  { title: 'Nuevos talleres de música abiertos para la comunidad', excerpt: 'Ampliamos nuestra oferta de programas musicales con nuevos instrumentos y profesores calificados.', date: '2024-05-20', slug: 'nuevos-talleres-musica', featured: false },
  { title: 'Alianza con Microsoft para formación en tecnología', excerpt: 'Nuestros jóvenes acceden a programas de formación tecnológica gracias a esta alianza.', date: '2024-04-10', slug: 'alianza-microsoft', featured: false },
  { title: 'Graduación de la primera cohorte de Pre-ICFES', excerpt: 'Celebramos la graduación de 25 jóvenes que completaron nuestro programa de preparación.', date: '2024-03-15', slug: 'graduacion-pre-icfes', featured: false },
  { title: 'Festival de Arte y Cultura Cigarra 2024', excerpt: 'Nuestro festival anual reunió a más de 300 personas de la comunidad.', date: '2024-02-20', slug: 'festival-arte-cultura', featured: false },
  { title: 'Campaña de nutrición: Resultados del primer trimestre', excerpt: 'Compartimos los avances de nuestro programa de alimentación nutritiva.', date: '2024-01-30', slug: 'campana-nutricion', featured: false },
];

export default function NewsPage() {
  const t = useTranslations('news');
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center bg-gradient-to-br from-primary-800 to-primary-900 pt-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white md:text-5xl"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg text-primary-200"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Featured article */}
          {featured && (
            <ScrollReveal>
              <Link href={{ pathname: '/noticias/[slug]', params: { slug: featured.slug } }}>
                <article className="group mb-12 overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl md:flex">
                  <div className="h-64 bg-gradient-to-br from-primary-200 to-primary-300 md:h-auto md:w-1/2" />
                  <div className="flex flex-col justify-center p-8 md:w-1/2">
                    <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                      <HiCalendar className="h-3.5 w-3.5" />
                      <time>{new Date(featured.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    <h2 className="mb-3 font-heading text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mb-4 text-gray-600">{featured.excerpt}</p>
                    <span className="inline-flex items-center gap-1 font-medium text-primary-600">
                      {t('readMore')} <HiArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          )}

          {/* Grid of rest */}
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <StaggerItem key={article.slug}>
                <Link href={{ pathname: '/noticias/[slug]', params: { slug: article.slug } }}>
                  <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200" />
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                        <HiCalendar className="h-3.5 w-3.5" />
                        <time>{new Date(article.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      </div>
                      <h3 className="mb-2 font-heading text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                        {article.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-600">{article.excerpt}</p>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
