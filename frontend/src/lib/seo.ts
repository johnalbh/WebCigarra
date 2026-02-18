import type { Metadata } from 'next';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://cigarra.org';
export const SITE_NAME = 'Fundación Cigarra';

export function getCanonicalUrl(locale: string, path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

export function getAlternates(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const suffix = cleanPath === '/' ? '' : cleanPath;
  return {
    canonical: `${SITE_URL}/es${suffix}`,
    languages: {
      es: `${SITE_URL}/es${suffix}`,
      en: `${SITE_URL}/en${suffix}`,
    },
  };
}

interface BuildPageMetadataOptions {
  locale: string;
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  keywords?: string[];
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path = '',
  ogImage,
  type = 'website',
  keywords,
}: BuildPageMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(locale, path);
  const alternates = getAlternates(path);
  const image = ogImage || `${SITE_URL}/og-default.png`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
