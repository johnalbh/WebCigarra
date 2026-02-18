import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import { getArticleBySlug } from '@/lib/queries';
import { getStrapiMedia } from '@/lib/strapi';
import { getBreadcrumbSchema, getArticleSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

interface StrapiSeo {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: { url?: string };
}

interface StrapiArticle {
  title?: string;
  excerpt?: string;
  slug?: string;
  publishDate?: string;
  author?: string;
  seo?: StrapiSeo;
  coverImage?: { url?: string };
}

interface StrapiResponse {
  data?: StrapiArticle[] | StrapiArticle;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const res = (await getArticleBySlug(slug, locale)) as StrapiResponse;
  const article = Array.isArray(res?.data) ? res.data[0] : res?.data;

  if (!article) return {};

  const seo = article.seo;
  const title = seo?.metaTitle || article.title || '';
  const description = seo?.metaDescription || article.excerpt || '';
  const ogImage = seo?.metaImage?.url
    ? getStrapiMedia(seo.metaImage.url) ?? undefined
    : article.coverImage?.url
      ? getStrapiMedia(article.coverImage.url) ?? undefined
      : undefined;

  return buildPageMetadata({
    locale,
    title,
    description,
    path: `/noticias/${slug}`,
    ogImage,
    type: 'article',
  });
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const res = (await getArticleBySlug(slug, locale)) as StrapiResponse;
  const article = Array.isArray(res?.data) ? res.data[0] : res?.data;

  if (!article) notFound();

  const home = locale === 'es' ? 'Inicio' : 'Home';
  const newsLabel = locale === 'es' ? 'Noticias' : 'News';
  const articleUrl = `${SITE_URL}/${locale}/noticias/${slug}`;
  const coverUrl = article.coverImage?.url
    ? getStrapiMedia(article.coverImage.url) ?? undefined
    : undefined;

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: home, url: `${SITE_URL}/${locale}` },
          { name: newsLabel, url: `${SITE_URL}/${locale}/noticias` },
          { name: article.title || slug, url: articleUrl },
        ])}
      />
      <JsonLd
        data={getArticleSchema({
          title: article.title || '',
          description: article.excerpt || '',
          url: articleUrl,
          image: coverUrl,
          publishDate: article.publishDate || '',
          author: article.author,
        })}
      />
      {children}
    </>
  );
}
