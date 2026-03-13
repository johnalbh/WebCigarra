/**
 * YouTube videos configuration for Fundación Cigarra
 * Channel: https://www.youtube.com/@fundacioncigarra
 * Channel ID: UCs7e5cZDS7pQJTUEl9Su2CQ
 *
 * Ordenados de más reciente a más antiguo (según feed RSS del canal).
 * Para agregar más videos: copia el "v=" de la URL del video → ese es el ID.
 */

export interface YouTubeVideo {
  id: string;
  titleEs: string;
  titleEn: string;
  descriptionEs?: string;
  descriptionEn?: string;
  category?: 'highlight' | 'program' | 'event' | 'story';
  featured?: boolean;
}

export const youtubeVideos: YouTubeVideo[] = [
  // ── 2026 ──────────────────────────────────────────────────────────────────
  {
    id: 'zv2LXjPTUxg',
    titleEs: 'Bingo Solidario 2026',
    titleEn: 'Solidarity Bingo 2026',
    descriptionEs:
      'Participa en nuestro Bingo Solidario 2026. ¡Premios increíbles y toda la recaudación va a los niños de Ciudad Bolívar!',
    descriptionEn:
      'Join our Solidarity Bingo 2026. Amazing prizes — all proceeds go directly to the children of Ciudad Bolívar!',
    category: 'event',
    featured: true,
  },

  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    id: 'RE70AtGQ6x4',
    titleEs: 'Emprendimientos Cigarra 2025',
    titleEn: 'Cigarra Entrepreneurship 2025',
    descriptionEs:
      'Conoce los proyectos de emprendimiento que nuestros jóvenes desarrollaron durante 2025.',
    descriptionEn:
      'Meet the entrepreneurship projects our youth developed throughout 2025.',
    category: 'program',
    featured: true,
  },
  {
    id: 'b01VrjBE8aA',
    titleEs: 'Filarmónica Cigarra — Cierre de Temporada New Philharmonia',
    titleEn: 'Cigarra Philharmonic — New Philharmonia Season Closing',
    descriptionEs:
      'La Filarmónica de la Fundación Cigarra se presentó en el cierre de temporada de la New Philharmonia Orchestra.',
    descriptionEn:
      'The Cigarra Foundation Philharmonic performed at the New Philharmonia Orchestra season closing.',
    category: 'program',
    featured: true,
  },
  {
    id: 'pm8dm3cF5nA',
    titleEs: 'Concierto Solidario SGS 2025',
    titleEn: 'SGS Solidarity Concert 2025',
    descriptionEs:
      'Nuestro concierto solidario 2025 reunió a la comunidad en apoyo de los programas de la Fundación Cigarra.',
    descriptionEn:
      'Our 2025 solidarity concert brought the community together in support of Cigarra Foundation programs.',
    category: 'event',
  },
  {
    id: 'DhJeNisgezA',
    titleEs: 'Bingo Bazar',
    titleEn: 'Bingo Bazaar',
    descriptionEs:
      'Nuestro Bingo Bazar, un evento especial para recaudar fondos y compartir con la comunidad.',
    descriptionEn:
      'Our Bingo Bazaar — a special fundraising event to share with the community.',
    category: 'event',
  },
  {
    id: 'ie-Z3ibcJwo',
    titleEs: 'Bingo Bazar — En Vivo',
    titleEn: 'Bingo Bazaar — Live',
    descriptionEs:
      'Transmisión en vivo de nuestro Bingo Bazar solidario.',
    descriptionEn:
      'Live broadcast of our solidarity Bingo Bazaar.',
    category: 'event',
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    id: 'l7RHznZnktg',
    titleEs: 'Mes del Niño y Deporte',
    titleEn: "Children's Month & Sports",
    descriptionEs:
      'Celebramos el Mes del Niño con actividades deportivas, arte y cultura para los niños de Ciudad Bolívar.',
    descriptionEn:
      "We celebrate Children's Month with sports, art and culture for children from Ciudad Bolívar.",
    category: 'event',
  },
  {
    id: 'srNTa6XSn8k',
    titleEs: 'Fútbol en Casa',
    titleEn: 'Football at Home',
    descriptionEs:
      'Los niños de la Fundación Cigarra disfrutan de una jornada de fútbol en casa.',
    descriptionEn:
      'The children of Cigarra Foundation enjoy a home football day.',
    category: 'program',
  },

  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    id: '-7dX7oBPyGk',
    titleEs: 'Concierto Solidario 2023',
    titleEn: 'Solidarity Concert 2023',
    descriptionEs:
      'Los mejores momentos del Concierto Solidario 2023, donde la música une a la comunidad.',
    descriptionEn:
      'The best moments of the 2023 Solidarity Concert, where music unites the community.',
    category: 'event',
  },
  {
    id: 'BHyuFTQzdTY',
    titleEs: 'Serenata de Amor',
    titleEn: 'Serenade of Love',
    descriptionEs:
      'Una emotiva serenata interpretada por los niños y jóvenes músicos de la Fundación Cigarra.',
    descriptionEn:
      'A moving serenade performed by the young musicians of the Cigarra Foundation.',
    category: 'program',
  },
  {
    id: 'qvVL6m1AOds',
    titleEs: 'Himno Fundación Cigarra',
    titleEn: 'Cigarra Foundation Anthem',
    descriptionEs:
      'El himno que representa los valores y el espíritu de la Fundación Cigarra.',
    descriptionEn:
      'The anthem that represents the values and spirit of the Cigarra Foundation.',
    category: 'highlight',
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    id: 'b9oUKjnNvZE',
    titleEs: 'Detrás del Telón — Concierto Solidario SGS 2022',
    titleEn: 'Behind the Curtain — SGS Solidarity Concert 2022',
    descriptionEs:
      'Un vistazo detrás de escena de la preparación de nuestros niños para el Concierto Solidario 2022.',
    descriptionEn:
      'A behind-the-scenes look at how our children prepared for the 2022 Solidarity Concert.',
    category: 'story',
  },
  {
    id: '0JbzvLdrxns',
    titleEs: 'Debut Orquesta Sinfónica La Cigarra — Concierto Solidario SGS',
    titleEn: 'La Cigarra Symphony Orchestra Debut — SGS Solidarity Concert',
    descriptionEs:
      'El debut histórico de la Orquesta Sinfónica La Cigarra en el Concierto Solidario SGS.',
    descriptionEn:
      'The historic debut of the La Cigarra Symphony Orchestra at the SGS Solidarity Concert.',
    category: 'event',
  },
  {
    id: '8X7KFvEsPNA',
    titleEs: 'Carolina Gaitán — Pepa Madrigal visita a los niños de Cigarra',
    titleEn: 'Carolina Gaitán — Pepa Madrigal visits Cigarra Foundation children',
    descriptionEs:
      'La estrella de Encanto, Carolina Gaitán, sorprendió a los niños de la Fundación Cigarra con una visita especial.',
    descriptionEn:
      'Encanto star Carolina Gaitán surprised the Cigarra Foundation children with a very special visit.',
    category: 'highlight',
  },
];

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@fundacioncigarra';

export const featuredVideos = youtubeVideos.filter((v) => v.featured);
