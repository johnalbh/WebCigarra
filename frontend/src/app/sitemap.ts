import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cigarra.org';

const staticPages = [
  '',
  '/quienes-somos',
  '/programas',
  '/como-ayudar',
  '/noticias',
  '/historias-de-exito',
  '/contacto',
];

const programSlugs = [
  'musica', 'artes-plasticas', 'refuerzo-escolar', 'danza',
  'teatro', 'emprendimiento', 'ingles', 'valores-y-liderazgo',
  'fotografia', 'recreacion', 'escuela-de-padres', 'pre-icfes',
  'manualidades', 'sistemas',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['es', 'en'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            es: `${BASE_URL}/es${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    }

    for (const slug of programSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/programas/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            es: `${BASE_URL}/es/programas/${slug}`,
            en: `${BASE_URL}/en/programas/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
