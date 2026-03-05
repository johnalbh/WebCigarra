import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata, SITE_URL, SITE_NAME } from '@/lib/seo';
import { getAnthem } from '@/lib/queries';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

interface StrapiAnthem {
  title?: string;
  subtitle?: string;
  youtubeUrl?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface StrapiResponse {
  data?: StrapiAnthem;
}

async function fetchAnthem(locale: string): Promise<StrapiAnthem | null> {
  try {
    const res = (await getAnthem(locale)) as StrapiResponse;
    return res?.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const anthem = await fetchAnthem(locale);

  const t = await getTranslations({ locale, namespace: 'seo.anthem' });
  const title = anthem?.seo?.metaTitle || t('title');
  const description = anthem?.seo?.metaDescription || t('description');

  return buildPageMetadata({
    locale,
    title,
    description,
    path: '/himno',
  });
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const home = locale === 'es' ? 'Inicio' : 'Home';
  const page = locale === 'es' ? 'Himno' : 'Anthem';

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: home, url: `${SITE_URL}/${locale}` },
          { name: page, url: `${SITE_URL}/${locale}/himno` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'MusicComposition',
          name: `Himno de la ${SITE_NAME}`,
          description: `Himno oficial de la ${SITE_NAME}`,
          creator: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
        }}
      />
      {children}
    </>
  );
}
