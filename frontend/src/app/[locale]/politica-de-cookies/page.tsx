import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  HiShieldCheck,
  HiCog,
  HiGlobe,
  HiClock,
  HiAdjustments,
  HiLockClosed,
  HiRefresh,
  HiMail,
} from 'react-icons/hi';

/* ── Section configuration ── */
const sections = [
  { num: 1, icon: HiShieldCheck },
  { num: 2, icon: HiCog },
  { num: 3, icon: HiGlobe },
  { num: 4, icon: HiClock },
  { num: 5, icon: HiAdjustments },
  { num: 6, icon: HiLockClosed },
  { num: 7, icon: HiRefresh },
  { num: 8, icon: HiMail },
] as const;

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cookiePolicy' });

  return (
    <>
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="relative overflow-hidden bg-primary-900">
        {/* Subtle decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-500/8 blur-[120px]" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-400/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-accent-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center lg:px-8 lg:py-32">
          {/* Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <HiShieldCheck className="h-10 w-10 text-primary-300" />
          </div>

          <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
            {t('heroTitle')}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200/80">
            {t('heroSubtitle')}
          </p>

          <p className="mt-6 text-sm text-primary-300/60">
            {t('lastUpdated')}
          </p>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-white"
            preserveAspectRatio="none"
          >
            <path
              d="M0 48h1440V24C1200 0 960 48 720 24 480 0 240 48 0 24v24z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ================================================================
          CONTENT SECTIONS
          ================================================================ */}
      <div className="relative">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isEven = index % 2 === 0;

          return (
            <section
              key={section.num}
              className={isEven ? 'bg-white' : 'bg-gray-50/70'}
            >
              <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-20">
                {/* Section header */}
                <div className="mb-8 flex items-start gap-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      isEven
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-accent-100 text-accent-600'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                      {locale === 'es' ? `Seccion ${section.num}` : `Section ${section.num}`}
                    </span>
                    <h2 className="mt-1 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                      {t(`s${section.num}Title`)}
                    </h2>
                  </div>
                </div>

                {/* Section content */}
                <div className="ml-0 md:ml-17">
                  <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-2 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mt-6 [&>h3]:mb-3">
                    <ContentRenderer content={t('s' + section.num + 'Content')} />
                  </div>
                </div>

                {/* Separator line */}
                {index < sections.length - 1 && (
                  <div className="mt-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* ================================================================
          CONTACT SECTION
          ================================================================ */}
      <section className="bg-primary-900">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <HiMail className="h-7 w-7 text-primary-300" />
          </div>

          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            {t('contactTitle')}
          </h2>

          <a
            href={`mailto:${t('contactEmail')}`}
            className="mt-4 inline-block text-lg font-medium text-primary-300 transition-colors duration-200 hover:text-accent-400"
          >
            {t('contactEmail')}
          </a>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/privacidad"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
            >
              {locale === 'es' ? 'Politica de Privacidad' : 'Privacy Policy'}
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-all duration-200 hover:bg-gray-100"
            >
              {locale === 'es' ? 'Contacto' : 'Contact'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Helper: render content with line breaks as paragraphs ── */
function ContentRenderer({ content }: { content: string }) {
  // Split content by double newlines to create paragraphs,
  // or render as a single block if no double newlines
  const blocks = content.split('\n\n').filter(Boolean);

  if (blocks.length <= 1) {
    return <p>{content}</p>;
  }

  return (
    <>
      {blocks.map((block, i) => (
        <p key={i}>{block}</p>
      ))}
    </>
  );
}
