'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiCalendar, HiArrowRight } from 'react-icons/hi';

const defaultArticles = [
  {
    title: 'Celebramos 22 años transformando vidas en Ciudad Bolívar',
    excerpt: 'Nuestra fundación cumple más de dos décadas de labor ininterrumpida con los niños y jóvenes de la comunidad.',
    date: '2024-06-15',
    slug: 'celebramos-22-anos',
    image: 'https://cigarra.org/wp-content/uploads/2025/11/2.-Presentacion-en-Quiba_1-1024x683.jpg',
  },
  {
    title: 'Nuevos talleres de música abiertos para la comunidad',
    excerpt: 'Ampliamos nuestra oferta de programas musicales con nuevos instrumentos y profesores calificados.',
    date: '2024-05-20',
    slug: 'nuevos-talleres-musica',
    image: 'https://cigarra.org/wp-content/uploads/2025/04/Sinfonica1-1024x768.jpg',
  },
  {
    title: 'Alianza con Microsoft para formación en tecnología',
    excerpt: 'Gracias a la alianza con Microsoft, nuestros jóvenes acceden a programas de formación tecnológica de vanguardia.',
    date: '2024-04-10',
    slug: 'alianza-microsoft',
    image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Tecnologia_GL_3.jpg',
  },
];

export default function NewsPreview() {
  const t = useTranslations('news');

  return (
    <section className="section-padding relative overflow-hidden bg-gray-50">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-100/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent-100/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-600">
              Blog
            </span>
            <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
              {t('latest')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent-400" />
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {defaultArticles.map((article) => (
            <StaggerItem key={article.slug}>
              <Link href={{ pathname: '/noticias/[slug]', params: { slug: article.slug } }}>
                <motion.article
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-gray-400">
                      <HiCalendar className="h-3.5 w-3.5" />
                      <time>{new Date(article.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>

                    <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-600">
                      {article.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
                      {article.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
                      {t('readMore')}
                      <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
