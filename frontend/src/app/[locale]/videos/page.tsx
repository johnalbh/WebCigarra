import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import VideosPageClient from './VideosPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'videos' });
  return buildPageMetadata({
    locale,
    title: t('seo.title'),
    description: t('seo.description'),
    path: '/videos',
  });
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'videos' });

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Inicio', url: `${SITE_URL}/${locale}` },
    { name: t('sectionTitle'), url: `${SITE_URL}/${locale}/videos` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <VideosPageClient />
    </>
  );
}
