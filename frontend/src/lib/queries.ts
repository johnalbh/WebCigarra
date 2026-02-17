import { fetchAPI, postAPI } from './strapi';

// ─── Single Types ────────────────────────────────────────

export async function getHero(locale: string) {
  return fetchAPI({
    path: '/hero',
    locale,
    query: {
      populate: {
        backgroundImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
        ctas: { populate: '*' },
      },
    },
  });
}

export async function getImpactStatistics(locale: string) {
  return fetchAPI({
    path: '/impact-statistic',
    locale,
    query: {
      populate: {
        stats: { populate: '*' },
        backgroundImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
      },
    },
  });
}

export async function getGlobalSettings(locale: string) {
  return fetchAPI({
    path: '/global-setting',
    locale,
    query: {
      populate: {
        logo: { fields: ['url', 'alternativeText', 'width', 'height'] },
        contact: { populate: '*' },
        socialLinks: { populate: '*' },
        navLinks: { populate: '*' },
      },
    },
  });
}

export async function getWaysToHelp(locale: string) {
  return fetchAPI({
    path: '/ways-to-help',
    locale,
    query: {
      populate: {
        donationTiers: { populate: '*' },
        faq: { populate: '*' },
      },
    },
  });
}

export async function getAboutPage(locale: string) {
  return fetchAPI({
    path: '/about-page',
    locale,
    query: {
      populate: {
        timeline: { populate: '*' },
        gallery: { fields: ['url', 'alternativeText', 'width', 'height'] },
        seo: { populate: '*' },
      },
    },
  });
}

// ─── Collection Types ────────────────────────────────────

export async function getPrograms(locale: string) {
  return fetchAPI({
    path: '/programs',
    locale,
    query: {
      populate: {
        coverImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
      },
      sort: ['order:asc'],
      pagination: { pageSize: 100 },
    },
  });
}

export async function getProgramBySlug(slug: string, locale: string) {
  return fetchAPI({
    path: '/programs',
    locale,
    query: {
      filters: { slug: { $eq: slug } },
      populate: {
        coverImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
        gallery: { fields: ['url', 'alternativeText', 'width', 'height'] },
        seo: { populate: '*' },
      },
    },
  });
}

export async function getArticles(locale: string, page = 1, pageSize = 9) {
  return fetchAPI({
    path: '/articles',
    locale,
    query: {
      populate: {
        coverImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
        seo: { populate: '*' },
      },
      sort: ['publishDate:desc'],
      pagination: { page, pageSize },
    },
  });
}

export async function getArticleBySlug(slug: string, locale: string) {
  return fetchAPI({
    path: '/articles',
    locale,
    query: {
      filters: { slug: { $eq: slug } },
      populate: {
        coverImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
        seo: { populate: '*' },
      },
    },
  });
}

export async function getFeaturedArticles(locale: string, limit = 6) {
  return fetchAPI({
    path: '/articles',
    locale,
    query: {
      populate: {
        coverImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
      },
      sort: ['publishDate:desc'],
      pagination: { pageSize: limit },
    },
  });
}

export async function getSuccessStories(locale: string) {
  return fetchAPI({
    path: '/success-stories',
    locale,
    query: {
      populate: {
        photo: { fields: ['url', 'alternativeText', 'width', 'height'] },
      },
    },
  });
}

export async function getPartners() {
  return fetchAPI({
    path: '/partners',
    query: {
      populate: {
        logo: { fields: ['url', 'alternativeText', 'width', 'height'] },
      },
      filters: { active: { $eq: true } },
      sort: ['order:asc'],
      pagination: { pageSize: 100 },
    },
  });
}

export async function getTeamMembers(locale: string) {
  return fetchAPI({
    path: '/team-members',
    locale,
    query: {
      populate: {
        photo: { fields: ['url', 'alternativeText', 'width', 'height'] },
      },
      sort: ['order:asc'],
    },
  });
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return postAPI('/contact-messages', data);
}
