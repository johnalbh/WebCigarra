import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import NewsListClient from '@/components/news/NewsListClient';
import { getArticles } from '@/lib/queries';
import { articles as fallbackArticles } from '@/lib/articles-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return buildPageMetadata({
    locale,
    title: t('title'),
    description: t('subtitle'),
    path: '/noticias',
    keywords: [
      'noticias fundación cigarra',
      'noticias ciudad bolívar',
      'fundación cigarra bogotá',
      'eventos fundación cigarra',
      'noticias ONG Colombia',
    ],
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Inicio', url: `${SITE_URL}/${locale}` },
    { name: t('title'), url: `${SITE_URL}/${locale}/noticias` },
  ]);

  let articles: any[] = [];
  try {
    const data = await getArticles(locale, 1, 50) as any;
    if (Array.isArray(data?.data) && data.data.length > 0) {
      articles = data.data;
    }
  } catch {
    // Fallback to hardcoded articles
  }

  if (articles.length === 0) {
    articles = fallbackArticles;
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <NewsListClient articles={articles} />
    </>
  );
}
