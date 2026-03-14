import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { articles as fallbackArticles, articleImages } from '@/lib/articles-data';
import type { ArticleData } from '@/lib/articles-data';
import JsonLd from '@/components/seo/JsonLd';
import ArticleDetailClient from '@/components/news/ArticleDetailClient';
import { getArticleBySlug, getArticles } from '@/lib/queries';
import { getStrapiMedia } from '@/lib/strapi';

function normalizeArticle(raw: any): ArticleData {
  const imageUrl = raw.coverImage?.url
    ? (getStrapiMedia(raw.coverImage.url) ?? articleImages[raw.slug] ?? '/images/news/celebramos-22-anos.webp')
    : (articleImages[raw.slug] ?? '/images/news/celebramos-22-anos.webp');

  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt ?? '',
    date: raw.publishDate ?? raw.createdAt ?? '2024-01-01',
    author: raw.author ?? 'Fundación Cigarra',
    image: imageUrl,
    content: raw.content ?? '',
    featured: raw.featured ?? false,
  };
}

async function fetchArticle(slug: string, locale: string): Promise<ArticleData | null> {
  try {
    const res = await getArticleBySlug(slug, locale) as any;
    const raw = res?.data?.[0];
    if (raw) return normalizeArticle(raw);
  } catch {}
  return fallbackArticles.find((a) => a.slug === slug) ?? null;
}

async function fetchAllArticles(locale: string): Promise<ArticleData[]> {
  try {
    const res = await getArticles(locale, 1, 50) as any;
    if (Array.isArray(res?.data) && res.data.length > 0) {
      return res.data.map(normalizeArticle);
    }
  } catch {}
  return fallbackArticles;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await fetchArticle(slug, locale);
  const t = await getTranslations({ locale, namespace: 'news' });

  if (!article) {
    return buildPageMetadata({
      locale,
      title: `${t('title')} | Fundación Cigarra`,
      description: t('subtitle'),
      path: `/noticias/${slug}`,
    });
  }

  return buildPageMetadata({
    locale,
    title: `${article.title} | Fundación Cigarra`,
    description: article.excerpt,
    path: `/noticias/${slug}`,
    ogImage: article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`,
    type: 'article',
    keywords: [
      article.title,
      'fundación cigarra',
      'ciudad bolívar',
      'noticias ONG Colombia',
      'fundación cigarra bogotá',
    ],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });

  const [article, allArticles] = await Promise.all([
    fetchArticle(slug, locale),
    fetchAllArticles(locale),
  ]);

  const resolvedArticle: ArticleData = article ?? {
    slug,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    excerpt: '',
    date: '2024-01-01',
    author: 'Fundación Cigarra',
    image: '/images/news/celebramos-22-anos.webp',
    content: t('fallbackContent'),
  };

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Inicio', url: `${SITE_URL}/${locale}` },
    { name: t('title'), url: `${SITE_URL}/${locale}/noticias` },
    { name: resolvedArticle.title, url: `${SITE_URL}/${locale}/noticias/${slug}` },
  ]);

  const articleJsonLd = article
    ? getArticleSchema({
        title: resolvedArticle.title,
        description: resolvedArticle.excerpt,
        url: `${SITE_URL}/${locale}/noticias/${slug}`,
        image: resolvedArticle.image.startsWith('http') ? resolvedArticle.image : `${SITE_URL}${resolvedArticle.image}`,
        publishDate: resolvedArticle.date,
        author: resolvedArticle.author,
      })
    : null;

  return (
    <>
      <JsonLd data={breadcrumbData} />
      {articleJsonLd && <JsonLd data={articleJsonLd} />}
      <ArticleDetailClient article={resolvedArticle} allArticles={allArticles} />
    </>
  );
}
