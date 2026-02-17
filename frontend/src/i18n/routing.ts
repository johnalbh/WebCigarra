import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pathnames: {
    '/': '/',
    '/quienes-somos': {
      es: '/quienes-somos',
      en: '/about-us',
    },
    '/programas': {
      es: '/programas',
      en: '/programs',
    },
    '/programas/[slug]': {
      es: '/programas/[slug]',
      en: '/programs/[slug]',
    },
    '/como-ayudar': {
      es: '/como-ayudar',
      en: '/how-to-help',
    },
    '/noticias': {
      es: '/noticias',
      en: '/news',
    },
    '/noticias/[slug]': {
      es: '/noticias/[slug]',
      en: '/news/[slug]',
    },
    '/historias-de-exito': {
      es: '/historias-de-exito',
      en: '/success-stories',
    },
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
    '/himno': {
      es: '/himno',
      en: '/anthem',
    },
    '/equipo': {
      es: '/equipo',
      en: '/team',
    },
    '/plan-padrino': {
      es: '/plan-padrino',
      en: '/sponsor-a-child',
    },
    '/voluntariado': {
      es: '/voluntariado',
      en: '/volunteer',
    },
    '/impacto-empresarial': {
      es: '/impacto-empresarial',
      en: '/corporate-impact',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
