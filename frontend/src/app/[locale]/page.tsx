import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/sections/HeroSection';
import ImpactCounters from '@/components/sections/ImpactCounters';
import ProgramsGrid from '@/components/sections/ProgramsGrid';
import StoriesCarousel from '@/components/sections/StoriesCarousel';
import DonationCTA from '@/components/sections/DonationCTA';
import NewsPreview from '@/components/sections/NewsPreview';
import PartnersMarquee from '@/components/sections/PartnersMarquee';
import { buildPageMetadata } from '@/lib/seo';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { getHero } from '@/lib/queries';
import { getStrapiMedia } from '@/lib/strapi';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  return buildPageMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let heroImages: string[] | undefined;
  try {
    const heroData = await getHero(locale) as any;
    const images = heroData?.data?.backgroundImage;
    if (Array.isArray(images) && images.length > 0) {
      heroImages = images
        .map((img: any) => getStrapiMedia(img.url))
        .filter(Boolean) as string[];
    }
  } catch {
    // Fallback to local images if Strapi is unavailable
  }

  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />
      <HeroSection images={heroImages} />
      <ImpactCounters />
      <ProgramsGrid />
      <StoriesCarousel />
      <DonationCTA />
      <NewsPreview />
      <PartnersMarquee />
    </>
  );
}
