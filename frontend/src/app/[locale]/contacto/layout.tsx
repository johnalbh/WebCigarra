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
  const t = await getTranslations({ locale, namespace: 'seo.contact' });
  return buildPageMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/contacto',
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
  const page = locale === 'es' ? 'Contacto' : 'Contact';

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: home, url: `${SITE_URL}/${locale}` },
          { name: page, url: `${SITE_URL}/${locale}/contacto` },
        ])}
      />
      {children}
    </>
  );
}
