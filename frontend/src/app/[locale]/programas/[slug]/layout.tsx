import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import { getProgramBySlug } from '@/lib/queries';
import { getStrapiMedia } from '@/lib/strapi';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';

interface StrapiSeo {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: { url?: string };
}

interface StrapiProgram {
  name?: string;
  shortDescription?: string;
  slug?: string;
  seo?: StrapiSeo;
  coverImage?: { url?: string };
}

interface StrapiResponse {
  data?: StrapiProgram[] | StrapiProgram;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const res = (await getProgramBySlug(slug, locale)) as StrapiResponse;
  const program = Array.isArray(res?.data) ? res.data[0] : res?.data;

  if (!program) return {};

  const seo = program.seo;
  const title = seo?.metaTitle || program.name || '';
  const description = seo?.metaDescription || program.shortDescription || '';
  const ogImage = seo?.metaImage?.url
    ? getStrapiMedia(seo.metaImage.url) ?? undefined
    : program.coverImage?.url
      ? getStrapiMedia(program.coverImage.url) ?? undefined
      : undefined;

  return buildPageMetadata({
    locale,
    title,
    description,
    path: `/programas/${slug}`,
    ogImage,
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
  const res = (await getProgramBySlug(slug, locale)) as StrapiResponse;
  const program = Array.isArray(res?.data) ? res.data[0] : res?.data;

  if (!program) notFound();

  const home = locale === 'es' ? 'Inicio' : 'Home';
  const programsLabel = locale === 'es' ? 'Programas' : 'Programs';

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: home, url: `${SITE_URL}/${locale}` },
          { name: programsLabel, url: `${SITE_URL}/${locale}/programas` },
          {
            name: program.name || slug,
            url: `${SITE_URL}/${locale}/programas/${slug}`,
          },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOccupationalProgram',
          name: program.name,
          description: program.shortDescription,
          provider: {
            '@type': 'Organization',
            name: 'Fundación Cigarra',
          },
        }}
      />
      {children}
    </>
  );
}
