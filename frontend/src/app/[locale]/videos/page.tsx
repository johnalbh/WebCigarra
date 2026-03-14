import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/seo/JsonLd';
import { getVideos } from '@/lib/queries';
import { youtubeVideos } from '@/lib/youtube-data';
import type { VideoCardItem } from '@/components/shared/YouTubeCard';
import VideosPageClient from './VideosPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'videos' });
  return buildPageMetadata({
    locale,
    title: t('seo.title'),
    description: t('seo.description'),
    path: '/videos',
  });
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'videos' });

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Inicio', url: `${SITE_URL}/${locale}` },
    { name: t('sectionTitle'), url: `${SITE_URL}/${locale}/videos` },
  ]);

  let videos: VideoCardItem[] = [];
  try {
    const data = await getVideos(locale) as any;
    if (Array.isArray(data?.data) && data.data.length > 0) {
      videos = data.data.map((v: any) => ({
        youtubeId: v.youtubeId,
        title: v.title,
        description: v.description,
        category: v.category,
        featured: v.featured,
      }));
    }
  } catch {
    // Fall through to hardcoded fallback
  }

  // Fallback to hardcoded youtube-data if Strapi unavailable
  if (videos.length === 0) {
    videos = youtubeVideos.map((v) => ({
      youtubeId: v.id,
      title: locale === 'en' ? v.titleEn : v.titleEs,
      description: locale === 'en' ? v.descriptionEn : v.descriptionEs,
      category: v.category,
      featured: v.featured,
    }));
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <VideosPageClient videos={videos} />
    </>
  );
}
