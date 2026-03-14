import { getPopupAnnouncement } from '@/lib/queries';
import AnnouncementPopup from './AnnouncementPopup';

interface PopupData {
  title: string;
  description?: string;
  image: { url: string; alternativeText?: string; width?: number; height?: number };
  linkUrl?: string;
  linkText?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

interface StrapiResponse {
  data?: PopupData;
}

export default async function AnnouncementPopupServer({ locale }: { locale: string }) {
  try {
    const response = await getPopupAnnouncement(locale) as StrapiResponse;
    const d = response?.data;

    if (!d || !d.isActive || !d.title || !d.image?.url) return null;

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
  } catch {
    return null;
  }
}
