'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname as useNextPathname } from 'next/navigation';

/* ── Social links ── */
const socialLinks = [
  { icon: FaFacebookF, href: 'https://www.facebook.com/fundacioncigarra', label: 'Facebook', color: 'hover:bg-blue-600 hover:text-white' },
  { icon: FaInstagram, href: 'https://www.instagram.com/fundacioncigarra', label: 'Instagram', color: 'hover:bg-pink-600 hover:text-white' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@fundacioncigarra', label: 'YouTube', color: 'hover:bg-red-600 hover:text-white' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/fundacion-cigarra', label: 'LinkedIn', color: 'hover:bg-blue-700 hover:text-white' },
];

/* ── Nav structure with dropdowns ── */
type NavItem = {
  href?: string;
  key: string;
  children?: { href: string; key: string }[];
};

const navItems: NavItem[] = [
  { href: '/', key: 'home' },
  {
    key: 'aboutUs',
    children: [
      { href: '/quienes-somos', key: 'about' },
      { href: '/equipo', key: 'team' },
      { href: '/himno', key: 'anthem' },
    ],
  },
  { href: '/programas', key: 'programs' },
  {
    key: 'getInvolved',
    children: [
      { href: '/como-ayudar', key: 'howToHelp' },
      { href: '/plan-padrino', key: 'planPadrino' },
      { href: '/voluntariado', key: 'volunteer' },
      { href: '/impacto-empresarial', key: 'corporateImpact' },
    ],
  },
  { href: '/noticias', key: 'news' },
  { href: '/historias-de-exito', key: 'successStories' },
  { href: '/contacto', key: 'contact' },
];

/* ── Dropdown component ── */
function DesktopDropdown({
  label,
  children,
  scrolled,
  pathWithoutLocale,
  t,
}: {
  label: string;
  children: { href: string; key: string }[];
  scrolled: boolean;
  pathWithoutLocale: string;
  t: (key: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isActive = children.some((c) => pathWithoutLocale === c.href || pathWithoutLocale.startsWith(c.href + '/'));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? scrolled
              ? 'bg-primary-50 text-primary-600'
              : 'bg-white/20 text-white'
            : scrolled
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-white/90 hover:bg-white/10 hover:text-white'
        )}
      >
        {label}
        <HiChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-1 z-50 min-w-[200px] overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl"
          >
            {children.map((child) => (
              <Link
                key={child.key}
                href={child.href as '/'}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-4 py-2.5 text-sm font-medium transition-colors',
                  pathWithoutLocale === child.href
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                )}
              >
                {t(child.key)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = useNextPathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  const otherLocale = locale === 'es' ? 'en' : 'es';
  const switchLocaleHref = `/${otherLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Fundación Cigarra"
            width={36}
            height={36}
            className="h-9 w-9"
          />
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
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown
                key={item.key}
                label={t(item.key)}
                children={item.children}
                scrolled={scrolled}
                pathWithoutLocale={pathWithoutLocale}
                t={t}
              />
            ) : (
              <Link
                key={item.key}
                href={item.href as '/'}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathWithoutLocale === item.href
                    ? scrolled
                      ? 'bg-primary-50 text-primary-600'
                      : 'bg-white/20 text-white'
                    : scrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                )}
              >
                {t(item.key)}
              </Link>
            )
          )}
        </div>

        {/* Right side: Social + Language + Donate */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Social icons */}
          <div className="flex items-center gap-1 mr-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300',
                  scrolled
                    ? `bg-gray-100 text-gray-500 ${social.color}`
                    : `bg-white/10 text-white/80 ${social.color}`
                )}
              >
                <social.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>

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
            className="rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
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
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.key}>
                    <button
                      onClick={() =>
                        setMobileSubmenu(mobileSubmenu === item.key ? null : item.key)
                      }
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                        item.children.some((c) => pathWithoutLocale === c.href)
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      {t(item.key)}
                      <HiChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          mobileSubmenu === item.key && 'rotate-180'
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileSubmenu === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 space-y-1 border-l-2 border-primary-100 py-1 pl-4">
                            {item.children.map((child) => (
                              <Link
                                key={child.key}
                                href={child.href as '/'}
                                className={cn(
                                  'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                                  pathWithoutLocale === child.href
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                                )}
                              >
                                {t(child.key)}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    href={item.href as '/'}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      pathWithoutLocale === item.href
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {t(item.key)}
                  </Link>
                )
              )}

              {/* Social icons in mobile */}
              <div className="border-t pt-4 mt-2">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-3">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
