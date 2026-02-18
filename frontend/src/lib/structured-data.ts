import { SITE_URL, SITE_NAME } from './seo';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      'Desde 2002, la Fundación Cigarra atiende a más de 180 niños con programas de educación, arte y cultura en Ciudad Bolívar, Bogotá.',
    foundingDate: '2002',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cra 18M #75-25 Sur',
      addressLocality: 'Bogotá',
      addressRegion: 'Ciudad Bolívar',
      addressCountry: 'CO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+573212465421',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.facebook.com/fundacioncigarra',
      'https://www.instagram.com/fundacioncigarra',
      'https://www.youtube.com/@fundacioncigarra',
      'https://www.linkedin.com/company/fundacion-cigarra',
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishDate: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    ...(article.image ? { image: article.image } : {}),
    datePublished: article.publishDate,
    author: {
      '@type': 'Organization',
      name: article.author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
      },
    },
  };
}

export function getFAQPageSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getPersonSchema(person: {
  name: string;
  role: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    ...(person.image ? { image: person.image } : {}),
  };
}
