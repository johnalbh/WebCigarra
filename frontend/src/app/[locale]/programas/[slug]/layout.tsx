import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildPageMetadata, SITE_URL, SITE_NAME } from '@/lib/seo';
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

async function fetchProgram(slug: string, locale: string): Promise<StrapiProgram | null> {
  try {
    const res = (await getProgramBySlug(slug, locale)) as StrapiResponse;
    return Array.isArray(res?.data) ? res.data[0] || null : res?.data || null;
  } catch {
    return null;
  }
}

function formatSlug(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = await fetchProgram(slug, locale);

  const seo = program?.seo;
  const title = seo?.metaTitle || program?.name || formatSlug(slug);
  const description =
    seo?.metaDescription ||
    program?.shortDescription ||
    `Programa ${formatSlug(slug)} de la ${SITE_NAME}`;
  const ogImage = seo?.metaImage?.url
    ? (getStrapiMedia(seo.metaImage.url) ?? undefined)
    : program?.coverImage?.url
      ? (getStrapiMedia(program.coverImage.url) ?? undefined)
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
  const program = await fetchProgram(slug, locale);

  const home = locale === 'es' ? 'Inicio' : 'Home';
  const programsLabel = locale === 'es' ? 'Programas' : 'Programs';
  const programName = program?.name || formatSlug(slug);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: home, url: `${SITE_URL}/${locale}` },
          { name: programsLabel, url: `${SITE_URL}/${locale}/programas` },
          { name: programName, url: `${SITE_URL}/${locale}/programas/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOccupationalProgram',
          name: programName,
          description: program?.shortDescription || `Programa de la ${SITE_NAME}`,
          provider: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
        }}
      />
      {children}
    </>
  );
}
