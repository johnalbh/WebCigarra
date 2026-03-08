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
import { getHero, getHomepageFeaturedArticles } from '@/lib/queries';
import { getStrapiMedia } from '@/lib/strapi';
import FeaturedNewsBanner from '@/components/sections/FeaturedNewsBanner';
import IntroVideoModalLoader from '@/components/IntroVideoModalLoader';

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
  let featuredArticles: { title: string; slug: string; date?: string }[] | undefined;

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

  try {
    const articlesData = await getHomepageFeaturedArticles(locale) as any;
    const items = articlesData?.data;
    if (Array.isArray(items) && items.length > 0) {
      featuredArticles = items.map((a: any) => ({
        title: a.title,
        slug: a.slug,
        date: a.publishDate,
      }));
    }
  } catch {
    // Fallback to dummy data in the component
  }

  return (
    <>
      <IntroVideoModalLoader />
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />
      <HeroSection images={heroImages} />
      <FeaturedNewsBanner articles={featuredArticles} />
      <ImpactCounters />
      <ProgramsGrid />
      <StoriesCarousel />
      <DonationCTA />
      <NewsPreview />
      <PartnersMarquee />
    </>
  );
}
