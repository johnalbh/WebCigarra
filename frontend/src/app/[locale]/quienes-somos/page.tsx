import { getAboutPage } from '@/lib/queries';
import { getTranslations } from 'next-intl/server';
import AboutPageClient from './AboutPageClient';
import type { StrapiTimelineItem } from './AboutPageClient';

/* ---------- fallback timeline from translations ---------- */
const timelineKeys = [
  { key: '2026', itemCount: 1 },
  { key: '2025', itemCount: 3 },
  { key: '2023', itemCount: 1 },
  { key: '2022', itemCount: 3 },
  { key: '2020', itemCount: 1 },
  { key: '2019', itemCount: 2 },
  { key: '2017-2019', itemCount: 2 },
  { key: '2015', itemCount: 1 },
  { key: '2014', itemCount: 2 },
  { key: '2013', itemCount: 1 },
  { key: '2011', itemCount: 3 },
  { key: '2010', itemCount: 2 },
  { key: '2009', itemCount: 1 },
  { key: '2003', itemCount: 1 },
  { key: '2002-2003', itemCount: 4 },
  { key: '2002', itemCount: 6 },
];

const fallbackIcons: Record<string, string> = {
  '2026': 'HiSparkles', '2025': 'HiHeart', '2023': 'HiMusicNote', '2022': 'HiFlag',
  '2020': 'HiStar', '2019': 'HiLightBulb', '2017-2019': 'HiMusicNote', '2015': 'HiOfficeBuilding',
  '2014': 'HiUserGroup', '2013': 'HiAcademicCap', '2011': 'HiHome', '2010': 'HiDesktopComputer',
  '2009': 'HiStar', '2003': 'HiGlobeAlt', '2002-2003': 'HiHeart', '2002': 'HiSparkles',
};

const fallbackColors: Record<string, string> = {
  '2026': 'from-accent-500 to-accent-700', '2025': 'from-primary-600 to-primary-800',
  '2023': 'from-violet-500 to-violet-700', '2022': 'from-sky-500 to-sky-700',
  '2020': 'from-accent-400 to-accent-600', '2019': 'from-primary-500 to-primary-700',
  '2017-2019': 'from-rose-500 to-rose-700', '2015': 'from-emerald-500 to-emerald-700',
  '2014': 'from-accent-500 to-accent-700', '2013': 'from-violet-400 to-violet-600',
  '2011': 'from-primary-400 to-primary-600', '2010': 'from-sky-400 to-sky-600',
  '2009': 'from-emerald-400 to-emerald-600', '2003': 'from-accent-400 to-accent-600',
  '2002-2003': 'from-rose-400 to-rose-600', '2002': 'from-primary-500 to-primary-700',
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let timeline: StrapiTimelineItem[] = [];

  try {
    const res = await getAboutPage(locale) as { data?: { timeline?: StrapiTimelineItem[] } };
    if (res?.data?.timeline && res.data.timeline.length > 0) {
      timeline = res.data.timeline;
    }
  } catch {
    // Strapi unavailable — fall through to translation fallback
  }

  // Fallback: build timeline from translation files when Strapi is unavailable
  if (timeline.length === 0) {
    const t = await getTranslations({ locale, namespace: 'about' });
    timeline = timelineKeys.map((entry, idx) => ({
      id: idx + 1,
      year: entry.key.replace('-', '–'),
      title: t(`timeline.${entry.key}.title`),
      items: Array.from({ length: entry.itemCount }, (_, j) =>
        t(`timeline.${entry.key}.item${j + 1}`)
      ),
      icon: fallbackIcons[entry.key],
      color: fallbackColors[entry.key],
    }));
  }

  return <AboutPageClient timeline={timeline} />;
}
