import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.successStories' });
  return buildPageMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/historias-de-exito',
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
  const page = locale === 'es' ? 'Historias de Éxito' : 'Success Stories';

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: home, url: `${SITE_URL}/${locale}` },
          { name: page, url: `${SITE_URL}/${locale}/historias-de-exito` },
        ])}
      />
      {children}
    </>
  );
}
