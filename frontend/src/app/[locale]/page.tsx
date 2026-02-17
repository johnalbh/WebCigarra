import HeroSection from '@/components/sections/HeroSection';
import ImpactCounters from '@/components/sections/ImpactCounters';
import ProgramsGrid from '@/components/sections/ProgramsGrid';
import StoriesCarousel from '@/components/sections/StoriesCarousel';
import DonationCTA from '@/components/sections/DonationCTA';
import NewsPreview from '@/components/sections/NewsPreview';
import PartnersMarquee from '@/components/sections/PartnersMarquee';

export default function HomePage() {
  return (
    <>
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
