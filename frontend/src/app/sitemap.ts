import type { MetadataRoute } from 'next';
import { getPrograms, getArticles, getSuccessStories } from '@/lib/queries';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cigarra.org';
const locales = ['es', 'en'];

const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/quienes-somos', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/programas', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/como-ayudar', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/noticias', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/historias-de-exito', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contacto', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/himno', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/equipo', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/plan-padrino', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/voluntariado', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/impacto-empresarial', priority: 0.8, changeFrequency: 'monthly' },
];

interface StrapiItem {
  slug?: string;
  publishDate?: string;
  updatedAt?: string;
}

interface StrapiListResponse {
  data?: StrapiItem[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Fetch dynamic data in parallel
  const [programsRes, articlesRes, storiesRes] = await Promise.all([
    getPrograms('es').catch(() => ({ data: [] })) as Promise<StrapiListResponse>,
    getArticles('es', 1, 100).catch(() => ({ data: [] })) as Promise<StrapiListResponse>,
    getSuccessStories('es').catch(() => ({ data: [] })) as Promise<StrapiListResponse>,
  ]);

  const programs = programsRes?.data || [];
  const articles = articlesRes?.data || [];
  const stories = storiesRes?.data || [];

  // Static pages x 2 locales
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            es: `${BASE_URL}/es${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
          },
        },
      });
    }
  }

  // Dynamic programs
  for (const program of programs) {
    if (!program.slug) continue;
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/programas/${program.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            es: `${BASE_URL}/es/programas/${program.slug}`,
            en: `${BASE_URL}/en/programas/${program.slug}`,
          },
        },
      });
    }
  }

  // Dynamic articles
  for (const article of articles) {
    if (!article.slug) continue;
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/noticias/${article.slug}`,
        lastModified: article.publishDate ? new Date(article.publishDate) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            es: `${BASE_URL}/es/noticias/${article.slug}`,
            en: `${BASE_URL}/en/noticias/${article.slug}`,
          },
        },
      });
    }
  }

  // Dynamic success stories
  for (const story of stories) {
    if (!story.slug) continue;
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/historias-de-exito/${story.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
        alternates: {
          languages: {
            es: `${BASE_URL}/es/historias-de-exito/${story.slug}`,
            en: `${BASE_URL}/en/historias-de-exito/${story.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
