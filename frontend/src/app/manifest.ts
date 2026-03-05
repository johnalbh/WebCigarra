import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fundación Cigarra',
    short_name: 'Cigarra',
    description:
      'Desde 2002, transformando vidas a través del arte, la educación y la cultura en Ciudad Bolívar, Bogotá.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#167BAE',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
