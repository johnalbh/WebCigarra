import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Inter, Poppins, Playfair_Display } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import FloatingSocialBar from '@/components/shared/FloatingSocialBar';
import DonationFloatingCTA from '@/components/layout/DonationFloatingCTA';
import AnnouncementPopupServer from '@/components/layout/AnnouncementPopupServer';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics';
import CookieConsent from '@/components/shared/CookieConsent';

import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s | ${SITE_NAME}`,
    },
    description: t('description'),
    keywords:
      locale === 'en'
        ? [
            'Cigarra Foundation',
            '501(c)(3) nonprofit',
            'donate to children Colombia',
            'sponsor a child Bogota',
            'tax-deductible donation',
            'children education Colombia',
            'Ciudad Bolivar',
            'nonprofit organization',
          ]
        : [
            'fundación cigarra',
            'Ciudad Bolívar',
            'Bogotá',
            'educación',
            'arte',
            'cultura',
            'niños',
            'ONG Colombia',
            'donar',
            'plan padrino',
          ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Cigarra Foundation',
    alternateName: 'Fundación Cigarra',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.webp`,
    description:
      locale === 'en'
        ? 'IRS-recognized 501(c)(3) nonprofit serving 1,800+ children in Ciudad Bolívar, Bogotá with education, nutrition, and arts programs since 2002.'
        : 'Fundación sin ánimo de lucro que atiende a más de 1.800 niños en Ciudad Bolívar, Bogotá con programas de educación, nutrición y arte desde 2002.',
    foundingDate: '2002',
    taxID: locale === 'en' ? '68-0505337' : '830.114.318-9',
    nonprofitStatus: '501c3',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle 71 Q sur No. 27-60',
      addressLocality: 'Bogotá',
      addressRegion: 'DC',
      addressCountry: 'CO',
    },
    telephone: '+573212465421',
    email: 'info@cigarra.org',
    sameAs: [
      'https://www.facebook.com/fundacioncigarra',
      'https://www.instagram.com/fundacioncigarra',
      'https://www.youtube.com/@fundacioncigarra',
      'https://www.linkedin.com/company/fundacion-cigarra',
    ],
    ...(locale === 'en' && {
      potentialAction: {
        '@type': 'DonateAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/en/como-ayudar`,
        },
        description: 'Make a tax-deductible donation to the Cigarra Foundation',
      },
    }),
  };

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} font-body antialiased`}
      >
        <GoogleAnalytics />
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
            <FloatingSocialBar />
            <DonationFloatingCTA />
            <CookieConsent />
            <Suspense fallback={null}>
              <AnnouncementPopupServer locale={locale} />
            </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
