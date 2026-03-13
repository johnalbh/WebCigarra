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
    descriptionEs: 'Únete a nuestro Bingo virtual el próximo 14 de marzo.',
    descriptionEn: 'Join our virtual Bingo on March 14th.',
    category: 'event',
    featured: true,
  },

  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    id: 'RE70AtGQ6x4',
    titleEs: 'Emprendimientos Cigarra 2025',
    titleEn: 'Cigarra Entrepreneurship 2025',
    descriptionEs: 'Nuestros emprendimientos Cigarra.',
    descriptionEn: 'Our Cigarra entrepreneurship projects.',
    category: 'program',
    featured: true,
  },
  {
    id: 'b01VrjBE8aA',
    titleEs: 'Filarmónica Cigarra — Cierre de Temporada New Philharmonia',
    titleEn: 'Cigarra Philharmonic — New Philharmonia Season Closing',
    descriptionEs:
      'El 24 de agosto, 10 jóvenes músicos de la Fundación Cigarra participaron en el concierto de cierre de temporada de la New Philharmonia Orchestra, dirigida por Ricardo Jaramillo y nuestro docente Yezid Barbosa.',
    descriptionEn:
      'On August 24, 10 young musicians from the Cigarra Foundation performed at the New Philharmonia Orchestra season closing concert, directed by Ricardo Jaramillo and our teacher Yezid Barbosa.',
    category: 'program',
    featured: true,
  },
  {
    id: 'pm8dm3cF5nA',
    titleEs: 'Concierto Solidario SGS 2025',
    titleEn: 'SGS Solidarity Concert 2025',
    category: 'event',
  },
  {
    id: 'DhJeNisgezA',
    titleEs: 'Bingo Bazar y Presentaciones Infantiles',
    titleEn: 'Bingo Bazaar and Children\'s Performances',
    descriptionEs:
      '¡Gran Evento de Bingo Bazar y Presentaciones Infantiles! ¡No te pierdas nuestro emocionante stream que combina el divertido juego de bingo con el talento de nuestros pequeños artistas!',
    descriptionEn:
      'Great Bingo Bazaar and Children\'s Performances Event! Don\'t miss our exciting stream combining bingo with the talent of our young artists!',
    category: 'event',
  },
  {
    id: 'ie-Z3ibcJwo',
    titleEs: 'Bingo Bazar — En Vivo',
    titleEn: 'Bingo Bazaar — Live',
    descriptionEs:
      '¡No te pierdas el Bingo Bazar de la Fundación Cigarra! Este domingo 15 de septiembre, te invitamos a un evento lleno de diversión y solidaridad.',
    descriptionEn:
      'Don\'t miss the Cigarra Foundation Bingo Bazaar! This Sunday, September 15, join us for an event full of fun and solidarity.',
    category: 'event',
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    id: 'l7RHznZnktg',
    titleEs: 'Mes del Niño y Deporte',
    titleEn: "Children's Month & Sports",
    descriptionEs:
      'Capturamos algunos de los momentos más especiales de nuestro reciente cierre del Mes del Deporte y del Niño.',
    descriptionEn:
      'We captured some of the most special moments from our recent Sports and Children\'s Month closing.',
    category: 'event',
  },
  {
    id: 'srNTa6XSn8k',
    titleEs: 'Fútbol en Casa',
    titleEn: 'Football at Home',
    descriptionEs:
      'En abril, combinamos la alegría del deporte y el Día del Niño en una sola celebración: nuestro primer torneo de fútbol.',
    descriptionEn:
      'In April, we combined the joy of sport and Children\'s Day in one celebration: our first football tournament.',
    category: 'program',
  },

  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    id: '-7dX7oBPyGk',
    titleEs: 'Concierto Solidario 2023',
    titleEn: 'Solidarity Concert 2023',
    category: 'event',
  },
  {
    id: 'BHyuFTQzdTY',
    titleEs: 'Serenata de Amor',
    titleEn: 'Serenade of Love',
    descriptionEs:
      '¡Explora con nosotros una jornada única en Cigarra! En este video especial, llevamos serenatas llenas de amor y gratitud a los comerciantes.',
    descriptionEn:
      'Explore a unique day at Cigarra with us! In this special video, we bring serenades full of love and gratitude to local merchants.',
    category: 'program',
  },
  {
    id: 'qvVL6m1AOds',
    titleEs: 'Himno Fundación Cigarra',
    titleEn: 'Cigarra Foundation Anthem',
    category: 'highlight',
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    id: 'b9oUKjnNvZE',
    titleEs: 'Detrás del Telón — Concierto Solidario SGS 2022',
    titleEn: 'Behind the Curtain — SGS Solidarity Concert 2022',
    descriptionEs:
      'Presentamos un vistazo exclusivo de cómo nuestros talentosos niños se prepararon para el Concierto Solidario 2022.',
    descriptionEn:
      'An exclusive look at how our talented children prepared for the 2022 Solidarity Concert.',
    category: 'story',
  },
  {
    id: '0JbzvLdrxns',
    titleEs: 'Debut Orquesta Sinfónica La Cigarra — Concierto Solidario SGS',
    titleEn: 'La Cigarra Symphony Orchestra Debut — SGS Solidarity Concert',
    descriptionEs:
      'El esperado Concierto Solidario SGS 2023 trae el debut de la Orquesta Sinfónica La Cigarra, un sueño hecho realidad desde 2015.',
    descriptionEn:
      'The long-awaited SGS 2023 Solidarity Concert brings the debut of the La Cigarra Symphony Orchestra — a dream realized since 2015.',
    category: 'event',
  },
  {
    id: '8X7KFvEsPNA',
    titleEs: 'Carolina Gaitán — Pepa Madrigal visita a los niños de Cigarra',
    titleEn: 'Carolina Gaitán — Pepa Madrigal visits Cigarra Foundation children',
    descriptionEs:
      'Este año nuestros niñas y niños recibieron una sorpresa ENCANTADORA. Carolina Gaitán (Pepa Madrigal en "Encanto") les envió un saludo de navidad.',
    descriptionEn:
      'This year our children received an ENCHANTING surprise. Carolina Gaitán (Pepa Madrigal in "Encanto") sent them a Christmas greeting.',
    category: 'highlight',
  },
];

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@fundacioncigarra';

export const featuredVideos = youtubeVideos.filter((v) => v.featured);
