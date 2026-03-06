import { getTranslations } from 'next-intl/server';
import { HiShieldCheck, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

/* ── Section config: number + translation key prefix ── */
const SECTIONS = Array.from({ length: 13 }, (_, i) => i + 1);

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative overflow-hidden bg-primary-900">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-500/8 blur-[120px]" />
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-accent-500/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary-400/5 blur-3xl" />
          {/* Subtle grid pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="privacy-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#privacy-grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center lg:px-8 lg:py-32">
          {/* Shield icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <HiShieldCheck className="h-10 w-10 text-accent-400" />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            {t('heroSubtitle')}
          </p>

          <h1 className="mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {t('heroTitle')}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm text-primary-300/60">
            {t('lastUpdated')}
          </p>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 60L48 54C96 48 192 36 288 30C384 24 480 24 576 28C672 32 768 40 864 42C960 44 1056 40 1152 36C1248 32 1344 28 1392 26L1440 24V60H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ================================================================
          CONTACT INFO BAR
          ================================================================ */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 md:p-8">
            <h2 className="mb-5 font-heading text-lg font-bold text-gray-900">
              {t('contactTitle')}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                  <HiLocationMarker className="h-4 w-4 text-primary-600" />
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {t('contactAddress')}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                  <HiMail className="h-4 w-4 text-primary-600" />
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {t('contactEmail')}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                  <HiPhone className="h-4 w-4 text-primary-600" />
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {t('contactPhone')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          POLICY SECTIONS
          ================================================================ */}
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        {SECTIONS.map((num) => {
          const isEven = num % 2 === 0;

          return (
            <section
              key={num}
              className={`border-b border-gray-100 last:border-b-0 ${
                isEven ? 'bg-gray-50/40' : 'bg-white'
              }`}
              style={{
                marginLeft: '-1rem',
                marginRight: '-1rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}
            >
              <div className="py-10 md:py-14">
                {/* Section header */}
                <div className="mb-6 flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 font-heading text-sm font-bold text-white shadow-sm shadow-primary-600/20">
                    {num}
                  </span>
                  <h2 className="pt-1.5 font-heading text-xl font-bold leading-snug text-gray-900 md:text-2xl">
                    {t(`s${num}Title`)}
                  </h2>
                </div>

                {/* Section content */}
                <div className="ml-14 space-y-4 text-[15px] leading-relaxed text-gray-600 md:text-base">
                  <p className="whitespace-pre-line">{t(`s${num}Content`)}</p>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ================================================================
          FOOTER NOTE
          ================================================================ */}
      <section className="bg-primary-900">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center lg:px-8">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <HiShieldCheck className="h-7 w-7 text-accent-400" />
          </div>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-primary-300/70">
            {t('heroSubtitle')}
          </p>
          <p className="mt-3 text-xs text-primary-400/40">
            {t('lastUpdated')}
          </p>
        </div>
      </section>
    </>
  );
}
