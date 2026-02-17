'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiArrowLeft, HiCalendar, HiShare } from 'react-icons/hi';

const articlesData: Record<string, { title: string; date: string; content: string; author: string }> = {
  'celebramos-22-anos': {
    title: 'Celebramos 23 años transformando vidas en Ciudad Bolívar',
    date: '2024-06-15',
    author: 'Fundación Cigarra',
    content: 'Este año marca un hito especial para nuestra fundación: 23 años de labor ininterrumpida al servicio de los niños y jóvenes de Ciudad Bolívar en Bogotá.\n\nDesde nuestros humildes comienzos en 2002, hemos crecido hasta ayudar a más de 1.877 niños y jóvenes a través de 14 programas de educación, arte y cultura, generando más de 100 empleos y beneficiando a más de 190 familias.\n\nNuestro compromiso sigue siendo el mismo: brindar oportunidades de desarrollo integral a quienes más lo necesitan, creando un espacio seguro donde los sueños de nuestros niños puedan florecer.\n\nAgradecemos a todos nuestros donantes, voluntarios y aliados que hacen posible esta labor. Juntos, seguiremos transformando vidas.',
  },
  'nuevos-talleres-musica': {
    title: 'Nuevos talleres de música abiertos para la comunidad',
    date: '2024-05-20',
    author: 'Fundación Cigarra',
    content: 'Nos complace anunciar la apertura de nuevos talleres de música para nuestra comunidad.\n\nGracias al apoyo de nuestros donantes, hemos adquirido nuevos instrumentos musicales y contamos con profesores calificados para ofrecer formación en guitarra, flauta, percusión y canto.\n\nLos talleres están abiertos para niños y jóvenes entre 6 y 17 años y se realizan de lunes a viernes en horario de la tarde.',
  },
};

export default function ArticleDetailPage() {
  const t = useTranslations('news');
  const params = useParams();
  const slug = params.slug as string;

  const article = articlesData[slug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    date: '2024-01-01',
    author: 'Fundación Cigarra',
    content: 'Contenido del artículo próximamente disponible. Estamos trabajando para traerte la información más actualizada sobre nuestras actividades y logros.',
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 to-primary-900 pt-20">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex items-center gap-4 text-sm text-primary-200"
          >
            <div className="flex items-center gap-2">
              <HiCalendar className="h-4 w-4" />
              <time>{new Date(article.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
            <span>|</span>
            <span>{article.author}</span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-6 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-12 flex items-center gap-4 border-t pt-8">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <HiShare className="h-4 w-4" />
                {t('share')}:
              </span>
              <div className="flex gap-2">
                <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                  Facebook
                </button>
                <button className="rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-600">
                  Twitter
                </button>
                <button className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-600">
                  WhatsApp
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
