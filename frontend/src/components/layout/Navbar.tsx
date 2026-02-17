'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname as useNextPathname } from 'next/navigation';

const navLinks = [
  { href: '/' as const, key: 'home' },
  { href: '/quienes-somos' as const, key: 'about' },
  { href: '/programas' as const, key: 'programs' },
  { href: '/como-ayudar' as const, key: 'howToHelp' },
  { href: '/noticias' as const, key: 'news' },
  { href: '/historias-de-exito' as const, key: 'successStories' },
  { href: '/contacto' as const, key: 'contact' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = useNextPathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Strip locale prefix to get the path for comparison
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const switchLocaleHref = `/${otherLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              'font-heading text-xl font-bold transition-colors',
              scrolled ? 'text-primary-600' : 'text-white'
            )}
          >
            Fundación Cigarra
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathWithoutLocale === link.href
                  ? scrolled
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-white/20 text-white'
                  : scrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Right side: Donate + Language */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={switchLocaleHref}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              scrolled
                ? 'text-gray-600 hover:bg-gray-100'
                : 'text-white/90 hover:bg-white/10'
            )}
          >
            {locale === 'es' ? 'EN' : 'ES'}
          </a>
          <Link
            href="/como-ayudar"
            className="rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent-600 hover:shadow-accent-500/25"
          >
            {t('donate')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <HiX className={cn('h-6 w-6', scrolled ? 'text-gray-800' : 'text-white')} />
          ) : (
            <HiMenu className={cn('h-6 w-6', scrolled ? 'text-gray-800' : 'text-white')} />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    pathWithoutLocale === link.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="flex items-center gap-3 border-t pt-4">
                <a
                  href={switchLocaleHref}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  {locale === 'es' ? 'English' : 'Español'}
                </a>
                <Link
                  href="/como-ayudar"
                  className="flex-1 rounded-full bg-accent-500 py-2.5 text-center text-sm font-semibold text-white"
                >
                  {t('donate')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
