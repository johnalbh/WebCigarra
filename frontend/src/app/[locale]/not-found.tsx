'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('notFound');

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        {/* Decorative background glow */}
        <div className="absolute -inset-20 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative">
          <h1 className="text-[10rem] leading-none font-extrabold tracking-tighter text-primary/20 sm:text-[14rem]">
            {t('heading')}
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
              {t('title')}
            </h2>
            <p className="mb-8 max-w-md text-muted-foreground">
              {t('message')}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
