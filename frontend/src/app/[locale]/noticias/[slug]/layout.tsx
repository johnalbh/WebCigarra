import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata, SITE_URL, SITE_NAME } from '@/lib/seo';
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

async function fetchArticle(slug: string, locale: string): Promise<StrapiArticle | null> {
  try {
    const res = (await getArticleBySlug(slug, locale)) as StrapiResponse;
    return Array.isArray(res?.data) ? res.data[0] || null : res?.data || null;
  } catch {
    return null;
  }
}

function formatSlug(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await fetchArticle(slug, locale);

  const seo = article?.seo;
  const title = seo?.metaTitle || article?.title || formatSlug(slug);
  const description =
    seo?.metaDescription ||
    article?.excerpt ||
    `Noticia de la ${SITE_NAME}`;
  const ogImage = seo?.metaImage?.url
    ? (getStrapiMedia(seo.metaImage.url) ?? undefined)
    : article?.coverImage?.url
      ? (getStrapiMedia(article.coverImage.url) ?? undefined)
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
  const article = await fetchArticle(slug, locale);

  const home = locale === 'es' ? 'Inicio' : 'Home';
  const newsLabel = locale === 'es' ? 'Noticias' : 'News';
  const articleTitle = article?.title || formatSlug(slug);
  const articleUrl = `${SITE_URL}/${locale}/noticias/${slug}`;
  const coverUrl = article?.coverImage?.url
    ? (getStrapiMedia(article.coverImage.url) ?? undefined)
    : undefined;

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: home, url: `${SITE_URL}/${locale}` },
          { name: newsLabel, url: `${SITE_URL}/${locale}/noticias` },
          { name: articleTitle, url: articleUrl },
        ])}
      />
      <JsonLd
        data={getArticleSchema({
          title: articleTitle,
          description: article?.excerpt || '',
          url: articleUrl,
          image: coverUrl,
          publishDate: article?.publishDate || '',
          author: article?.author,
        })}
      />
      {children}
    </>
  );
}
