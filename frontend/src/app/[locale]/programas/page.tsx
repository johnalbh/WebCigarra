import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { getPrograms } from '@/lib/queries';
import ProgramsPageClient from './ProgramsPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'programs' });
  return buildPageMetadata({
    locale,
    title: t('title'),
    description: t('subtitle'),
    path: '/programas',
  });
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'programs' });

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Inicio', url: `${SITE_URL}/${locale}` },
    { name: t('title'), url: `${SITE_URL}/${locale}/programas` },
  ]);

  let programs: any[] = [];
  try {
    const data = await getPrograms(locale) as any;
    if (Array.isArray(data?.data) && data.data.length > 0) {
      programs = data.data;
    }
  } catch {
    // Fallback: client renders with empty array
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <ProgramsPageClient programs={programs} />
    </>
  );
}
