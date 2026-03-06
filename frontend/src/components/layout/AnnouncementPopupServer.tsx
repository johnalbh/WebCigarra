import { getPopupAnnouncement } from '@/lib/queries';
import AnnouncementPopup from './AnnouncementPopup';

interface StrapiResponse {
  data?: {
    title?: string;
    description?: string;
    image?: { url: string; alternativeText?: string; width?: number; height?: number };
    linkUrl?: string;
    linkText?: string;
    isActive?: boolean;
    startDate?: string;
    endDate?: string;
  };
}

/* Dummy data while Strapi is not connected — remove once Strapi is configured */
const DUMMY_DATA = {
  title: 'Bingo Virtual Marzo 2026',
  description: 'Participa en nuestro Bingo Virtual a beneficio de la Fundacion Cigarra. Premios increibles y mucha diversion.',
  image: {
    url: '/images/bingo-marzo-2026.webp',
    alternativeText: 'Bingo Virtual Marzo 2026',
    width: 1080,
    height: 1920,
  },
  slug: 'bingo-virtual-marzo-2026',
  linkText: 'Mas informacion',
  date: '2026-03-15',
};

export default async function AnnouncementPopupServer({ locale }: { locale: string }) {
  // Try fetching from Strapi first
  try {
    const response = await getPopupAnnouncement(locale) as StrapiResponse;
    const d = response?.data;

    if (d?.isActive && d.title && d.image?.url) {
      const now = new Date();
      if (d.startDate && new Date(d.startDate) > now) return null;
      if (d.endDate && new Date(d.endDate) < now) return null;

      return (
        <AnnouncementPopup
          data={{
            title: d.title,
            description: d.description,
            image: d.image,
            linkUrl: d.linkUrl,
            linkText: d.linkText,
            slug: (d as any).slug,
          }}
        />
      );
    }
  } catch {
    // Strapi not available — fall back to dummy data
  }

  // Fallback: show dummy announcement
  return <AnnouncementPopup data={DUMMY_DATA} />;
}
