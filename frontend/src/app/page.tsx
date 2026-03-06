import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  const acceptLanguage = (await headers()).get('accept-language') || '';
  const preferredLocale = acceptLanguage.toLowerCase().startsWith('en') ? 'en' : 'es';
  redirect(`/${preferredLocale}`);
}
