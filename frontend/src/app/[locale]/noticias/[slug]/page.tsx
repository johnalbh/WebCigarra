import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { getArticleBySlug, getFullImageUrl } from '@/lib/articles-data';
import JsonLd from '@/components/seo/JsonLd';
import ArticleDetailClient from '@/components/news/ArticleDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
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
    ogImage: getFullImageUrl(article.image),
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
  const article = getArticleBySlug(slug);
  const t = await getTranslations({ locale, namespace: 'news' });

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Inicio', url: `${SITE_URL}/${locale}` },
    { name: t('title'), url: `${SITE_URL}/${locale}/noticias` },
    { name: article?.title || slug, url: `${SITE_URL}/${locale}/noticias/${slug}` },
  ]);

  const articleJsonLd = article
    ? getArticleSchema({
        title: article.title,
        description: article.excerpt,
        url: `${SITE_URL}/${locale}/noticias/${slug}`,
        image: getFullImageUrl(article.image),
        publishDate: article.date,
        author: article.author,
      })
    : null;

  return (
    <>
      <JsonLd data={breadcrumbData} />
      {articleJsonLd && <JsonLd data={articleJsonLd} />}
      <ArticleDetailClient />
    </>
  );
}
