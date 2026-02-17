import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const socialLinks = [
  { icon: FaFacebookF, href: 'https://www.facebook.com/fundacioncigarra', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/fundacioncigarra', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@fundacioncigarra', label: 'YouTube' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/fundacion-cigarra', label: 'LinkedIn' },
];

const quickLinks = [
  { href: '/quienes-somos' as const, key: 'about' },
  { href: '/programas' as const, key: 'programs' },
  { href: '/como-ayudar' as const, key: 'howToHelp' },
  { href: '/noticias' as const, key: 'news' },
  { href: '/contacto' as const, key: 'contact' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-primary-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1: Info */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Fundación Cigarra"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <h3 className="font-heading text-xl font-bold">
                Fundación Cigarra
              </h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-primary-200">
              Transformando vidas en Ciudad Bolívar desde 2002. Educación, arte
              y cultura para más de 1.877 niños y jóvenes.
            </p>
            <p className="text-sm text-primary-300">
              {t('nit')}: 830.114.318-9
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-200 transition-colors hover:text-accent-400"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">
              {t('contactInfo')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-200">
                <HiLocationMarker className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-400" />
                <span>Cra 18M #75-25 Sur, Ciudad Bolívar, Bogotá D.C.</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-200">
                <HiPhone className="h-4 w-4 flex-shrink-0 text-accent-400" />
                <a href="tel:+573212465421" className="hover:text-accent-400">
                  +57 321 246 5421
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-200">
                <HiMail className="h-4 w-4 flex-shrink-0 text-accent-400" />
                <a href="mailto:info@cigarra.org" className="hover:text-accent-400">
                  info@cigarra.org
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-medium">{t('followUs')}</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-primary-300 transition-colors hover:text-accent-400"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-primary-700 pt-8 text-center text-sm text-primary-300">
          <p>
            &copy; {new Date().getFullYear()} Fundación Cigarra.{' '}
            {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
