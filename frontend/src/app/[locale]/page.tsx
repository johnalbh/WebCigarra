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

export default function HomePage() {
  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />
      <HeroSection />
      <ImpactCounters />
      <ProgramsGrid />
      <StoriesCarousel />
      <DonationCTA />
      <NewsPreview />
      <PartnersMarquee />
    </>
  );
}
