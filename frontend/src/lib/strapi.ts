import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchAPIOptions {
  path: string;
  query?: Record<string, unknown>;
  locale?: string;
  revalidate?: number;
}

export async function fetchAPI<T>({
  path,
  query = {},
  locale,
  revalidate = 60,
}: FetchAPIOptions): Promise<T> {
  const mergedQuery = {
    ...query,
    ...(locale ? { locale } : {}),
  };

  const queryString = qs.stringify(mergedQuery, { encodeValuesOnly: true });
  const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate },
  });

  if (!res.ok) {
    console.error(`Strapi API error: ${res.status} ${res.statusText} - ${url}`);
    throw new Error(`Failed to fetch from Strapi: ${res.status}`);
  }

  const json = await res.json();
  return json;
}

export async function postAPI<T>(
  path: string,
  data: Record<string, unknown>
): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    throw new Error(`Failed to post to Strapi: ${res.status}`);
  }

  return res.json();
}

export function getStrapiMedia(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${STRAPI_URL}${url}`;
}
