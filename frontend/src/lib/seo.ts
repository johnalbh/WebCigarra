import type { Metadata } from 'next';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fundacioncigarra.org';
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
      'x-default': `${SITE_URL}/es${suffix}`,
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

  // When no custom image is provided, omit images so the auto-generated
  // opengraph-image.tsx takes effect via Next.js file convention.
  const imageFields = ogImage
    ? {
        openGraphImages: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        twitterImages: [ogImage],
      }
    : {};

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
      ...(imageFields.openGraphImages ? { images: imageFields.openGraphImages } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageFields.twitterImages ? { images: imageFields.twitterImages } : {}),
    },
  };
}
