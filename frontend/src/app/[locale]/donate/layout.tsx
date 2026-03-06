import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_NAME } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const title =
    locale === 'en'
      ? 'Donate Now — Tax-Deductible 501(c)(3) | Cigarra Foundation'
      : 'Donar Ahora — Fundación Cigarra';

  const description =
    locale === 'en'
      ? 'Make a secure, tax-deductible donation to the Cigarra Foundation. 100% of your gift funds education and meals for children in Bogotá. 501(c)(3) EIN: 68-0505337.'
      : 'Haz tu donación segura a la Fundación Cigarra. El 100% de tu aporte va a educación y alimentación para niños en Ciudad Bolívar, Bogotá.';

  return {
    title,
    description,
  };
}

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
