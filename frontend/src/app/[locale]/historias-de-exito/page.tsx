import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { getSuccessStories } from '@/lib/queries';
import SuccessStoriesClient from './SuccessStoriesClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'stories' });
  return buildPageMetadata({
    locale,
    title: t('title'),
    description: t('subtitle'),
    path: '/historias-de-exito',
  });
}

export default async function SuccessStoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'stories' });

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Inicio', url: `${SITE_URL}/${locale}` },
    { name: t('title'), url: `${SITE_URL}/${locale}/historias-de-exito` },
  ]);

  let stories: any[] = [];
  try {
    const data = await getSuccessStories(locale) as any;
    if (Array.isArray(data?.data) && data.data.length > 0) {
      stories = data.data;
    }
  } catch {
    // Client renders with empty list
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <SuccessStoriesClient stories={stories} />
    </>
  );
}
