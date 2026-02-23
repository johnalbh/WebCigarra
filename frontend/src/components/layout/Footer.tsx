'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { motion } from 'motion/react';

const socialLinks = [
  { icon: FaFacebookF, href: 'https://www.facebook.com/fundacioncigarra', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/fundacioncigarra', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@fundacioncigarra', label: 'YouTube' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/fundacion-cigarra', label: 'LinkedIn' },
];

const navLinks = [
  { href: '/' as const, key: 'home' },
  { href: '/quienes-somos' as const, key: 'about' },
  { href: '/programas' as const, key: 'programs' },
  { href: '/noticias' as const, key: 'news' },
  { href: '/historias-de-exito' as const, key: 'successStories' },
  { href: '/contacto' as const, key: 'contact' },
];

const programSlugs = [
  'primera-infancia',
  'refuerzo-escolar',
  'danza',
  'ingles',
  'musica',
  'artes',
  'escuela-de-artes',
  'tecnologia',
  'biblioteca',
  'psicologia',
  'grupo-mayores',
  'talleres-para-padres',
  'ropero',
];

const helpLinks = [
  { href: '/como-ayudar' as const, key: 'howToHelp' },
  { href: '/plan-padrino' as const, key: 'planPadrino' },
  { href: '/voluntariado' as const, key: 'volunteer' },
  { href: '/impacto-empresarial' as const, key: 'corporateImpact' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tPrograms = useTranslations('programs');

  return (
    <footer className="bg-primary-900 text-white">
      {/* Gradient accent line at top */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500" />

      {/* Upper section — centered logo & info */}
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo with white bg and animated radial glow */}
          <div className="relative mb-8">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-white/12 blur-[100px]"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-52 w-52 rounded-full bg-white/8 blur-[60px]"
            />
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-white shadow-2xl shadow-white/10">
              <Image
                src="/images/logo.webp"
                alt="Fundación Cigarra"
                width={160}
                height={160}
                className="h-36 w-36"
              />
            </div>
          </div>

          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Fundación Cigarra
          </h2>
          <p className="mt-2 font-accent text-xl italic text-accent-400">
            {t('slogan')}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-300">
            {t('description')}
          </p>

          {/* Social icons */}
          <div className="mt-8 flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-500 ease-out hover:border-accent-400/50 hover:bg-accent-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-accent-500/20"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Separator */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent" />

        {/* Bottom grid — 4 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Col 1: Navigation */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
              {t('navigation')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-300 transition-all duration-300 hover:text-white"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Programs (two sub-columns) */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
              {t('programs')}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {programSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={{ pathname: '/programas/[slug]', params: { slug } }}
                    className="text-sm text-primary-300 transition-all duration-300 hover:text-white"
                  >
                    {tPrograms(`names.${slug}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-300">
                <HiLocationMarker className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
                <span>Calle 71 Q sur No. 27-60<br />Barrio Puertas del Paraíso<br />Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-300">
                <HiPhone className="h-4 w-4 flex-shrink-0 text-primary-500" />
                <a href="tel:+573212465421" className="transition-all duration-300 hover:text-white">
                  +57 321 246 5421
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-300">
                <HiMail className="h-4 w-4 flex-shrink-0 text-primary-500" />
                <a href="mailto:info@cigarra.org" className="transition-all duration-300 hover:text-white">
                  info@cigarra.org
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
              {t('support')}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-primary-300">
              {t('supportDescription')}
            </p>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-300 transition-all duration-300 hover:text-white"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-primary-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 lg:px-8">
          <p className="text-xs text-primary-500">
            &copy; {new Date().getFullYear()} Fundación Cigarra. {t('rights')}.
          </p>
          <p className="text-xs text-primary-500">
            NIT: 830.114.318-9
          </p>
        </div>
      </div>
    </footer>
  );
}
