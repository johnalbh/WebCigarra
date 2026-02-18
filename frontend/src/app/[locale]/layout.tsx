import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Inter, Poppins, Playfair_Display } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import FloatingSocialBar from '@/components/shared/FloatingSocialBar';
import DonationFloatingCTA from '@/components/layout/DonationFloatingCTA';
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
    keywords: [
      'fundación cigarra',
      'Ciudad Bolívar',
      'Bogotá',
      'educación',
      'arte',
      'cultura',
      'niños',
      'ONG Colombia',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      siteName: SITE_NAME,
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
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
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} font-body antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <FloatingSocialBar />
          <DonationFloatingCTA />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
