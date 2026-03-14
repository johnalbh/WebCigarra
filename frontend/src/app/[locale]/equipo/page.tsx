import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { getTeamMembers } from '@/lib/queries';
import TeamPageContent from './TeamPageContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'team' });
  return buildPageMetadata({
    locale,
    title: t('title'),
    description: t('subtitle'),
    path: '/equipo',
  });
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'team' });

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Inicio', url: `${SITE_URL}/${locale}` },
    { name: t('title'), url: `${SITE_URL}/${locale}/equipo` },
  ]);

  let members: any[] = [];
  try {
    const data = await getTeamMembers(locale) as any;
    if (Array.isArray(data?.data) && data.data.length > 0) {
      members = data.data;
    }
  } catch {
    // TeamPageContent renders with empty list
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <TeamPageContent members={members} />
    </>
  );
}
