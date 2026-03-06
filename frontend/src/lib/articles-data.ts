import { SITE_URL } from './seo';

export interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: string;
  featured?: boolean;
}

export const articleImages: Record<string, string> = {
  'bingo-virtual-marzo-2026': '/images/bingo-marzo-2026.webp',
  'celebramos-22-anos': '/images/news/celebramos-22-anos.webp',
  'nuevos-talleres-musica': '/images/news/talleres-musica.webp',
  'alianza-microsoft': '/images/news/alianza-microsoft.webp',
  'jornada-recreacion-deportes': '/images/programs/recreacion-y-deportes.webp',
  'festival-arte-cultura': '/images/news/festival-arte.webp',
  'campana-nutricion': '/images/news/campana-nutricion.webp',
};

export const articles: ArticleData[] = [
  {
    slug: 'bingo-virtual-marzo-2026',
    title: 'Bingo Virtual Marzo 2026',
    excerpt: 'Participa en nuestro Bingo Virtual a beneficio de la Fundación Cigarra. Premios increíbles, mucha diversión y toda la recaudación va directamente a nuestros programas para los niños de Ciudad Bolívar.',
    date: '2026-03-15',
    author: 'Fundación Cigarra',
    image: '/images/bingo-marzo-2026.webp',
    featured: true,
    content: '¡Participa en nuestro gran Bingo Virtual a beneficio de la Fundación Cigarra!\n\nEste evento especial se realizará en marzo de 2026 y contará con premios increíbles para todos los participantes. Toda la recaudación irá directamente a nuestros programas de educación, arte y cultura para los niños y jóvenes de Ciudad Bolívar.\n\nEl bingo se jugará de forma virtual, así que puedes participar desde cualquier lugar. Solo necesitas conexión a internet y muchas ganas de divertirte mientras apoyas una gran causa.\n\nNo te pierdas esta oportunidad de pasar un rato increíble y contribuir al futuro de cientos de niños. ¡Te esperamos!\n\nPara más información sobre cómo participar, contáctanos a través de nuestras redes sociales o escríbenos directamente.',
  },
  {
    slug: 'celebramos-22-anos',
    title: 'Celebramos 24 años transformando vidas en Ciudad Bolívar',
    excerpt: 'Nuestra fundación cumple más de dos décadas de labor ininterrumpida con los niños y jóvenes de la localidad, brindando esperanza y oportunidades a cientos de familias.',
    date: '2024-06-15',
    author: 'Fundación Cigarra',
    image: '/images/news/celebramos-22-anos.webp',
    content: 'Este año marca un hito especial para nuestra fundación: 24 años de labor ininterrumpida al servicio de los niños y jóvenes de Ciudad Bolívar en Bogotá.\n\nDesde nuestros humildes comienzos en 2002, hemos crecido hasta ayudar a más de 1.877 niños y jóvenes a través de 13 programas de educación, arte y cultura, generando más de 100 empleos y beneficiando a más de 1.800 familias.\n\nNuestro compromiso sigue siendo el mismo: brindar oportunidades de desarrollo integral a quienes más lo necesitan, creando un espacio seguro donde los sueños de nuestros niños puedan florecer.\n\nAgradecemos a todos nuestros donantes, voluntarios y aliados que hacen posible esta labor. Juntos, seguiremos transformando vidas.',
  },
  {
    slug: 'nuevos-talleres-musica',
    title: 'Nuevos talleres de música abiertos para la comunidad',
    excerpt: 'Ampliamos nuestra oferta de programas musicales con nuevos instrumentos y profesores calificados.',
    date: '2024-05-20',
    author: 'Fundación Cigarra',
    image: '/images/news/talleres-musica.webp',
    content: 'Nos complace anunciar la apertura de nuevos talleres de música para nuestra comunidad.\n\nGracias al apoyo de nuestros donantes, hemos adquirido nuevos instrumentos musicales y contamos con profesores calificados para ofrecer formación en guitarra, flauta, percusión y canto.\n\nLos talleres están abiertos para niños y jóvenes entre 6 y 17 años y se realizan de lunes a viernes en horario de la tarde.\n\nLa música es una herramienta poderosa para el desarrollo integral de los niños. Les enseña disciplina, trabajo en equipo y les abre puertas a nuevas oportunidades.',
  },
  {
    slug: 'alianza-microsoft',
    title: 'Alianza con Microsoft para formación en tecnología',
    excerpt: 'Nuestros jóvenes acceden a programas de formación tecnológica gracias a esta alianza.',
    date: '2024-04-10',
    author: 'Fundación Cigarra',
    image: '/images/news/alianza-microsoft.webp',
    content: 'Estamos orgullosos de anunciar nuestra alianza con Microsoft para ofrecer programas de formación en tecnología a nuestros jóvenes beneficiarios.\n\nA través de esta alianza, los participantes tendrán acceso a cursos de programación, diseño digital y herramientas ofimáticas que les permitirán desarrollar habilidades para el siglo XXI.\n\nEsta alianza refuerza nuestro compromiso de brindar oportunidades de formación integral y preparar a nuestros jóvenes para un futuro con mayores oportunidades laborales y profesionales.',
  },
  {
    slug: 'jornada-recreacion-deportes',
    title: 'Jornada de recreación y deportes para toda la comunidad',
    excerpt: 'Más de 120 niños y jóvenes participaron en nuestra jornada deportiva con actividades al aire libre.',
    date: '2024-03-15',
    author: 'Fundación Cigarra',
    image: '/images/programs/recreacion-y-deportes.webp',
    content: 'Con gran entusiasmo realizamos una jornada de recreación y deportes que reunió a más de 120 niños y jóvenes de Ciudad Bolívar.\n\nLa jornada incluyó torneos de fútbol, baloncesto, juegos cooperativos y actividades de desarrollo motriz, todo en un ambiente de sana convivencia y diversión.\n\nNuestro programa de Recreación y Deportes busca promover el bienestar físico y emocional de los participantes, fortaleciendo valores como el trabajo en equipo, el respeto y la disciplina deportiva.',
  },
  {
    slug: 'festival-arte-cultura',
    title: 'Festival de Arte y Cultura Cigarra 2024',
    excerpt: 'Nuestro festival anual reunió a más de 300 personas de la comunidad.',
    date: '2024-02-20',
    author: 'Fundación Cigarra',
    image: '/images/news/festival-arte.webp',
    content: 'El Festival de Arte y Cultura Cigarra 2024 fue un éxito rotundo, reuniendo a más de 300 personas de la comunidad en una jornada llena de arte, música, danza y cultura.\n\nLos niños y jóvenes de todos nuestros programas presentaron sus trabajos artísticos, interpretaciones musicales, coreografías de danza y obras de teatro que dejaron asombrados a los asistentes.\n\nEl festival también contó con la participación de nuestros aliados y padrinos, quienes pudieron ver de primera mano el impacto de su apoyo en la vida de los beneficiarios.\n\nEste evento anual es una muestra del talento, la dedicación y el espíritu transformador que caracteriza a la Fundación Cigarra.',
  },
  {
    slug: 'campana-nutricion',
    title: 'Campaña de nutrición: Resultados del primer trimestre',
    excerpt: 'Compartimos los avances de nuestro programa de alimentación nutritiva.',
    date: '2024-01-30',
    author: 'Fundación Cigarra',
    image: '/images/news/campana-nutricion.webp',
    content: 'Compartimos con alegría los resultados del primer trimestre de nuestra campaña de nutrición, un programa que busca garantizar una alimentación saludable para los niños y jóvenes que asisten a nuestros programas.\n\nDurante estos tres meses, hemos proporcionado más de 2.000 refrigerios nutritivos y meriendas equilibradas a los participantes de nuestros programas diarios.\n\nGracias al apoyo de donantes y aliados, hemos logrado mejorar los indicadores nutricionales de los beneficiarios, contribuyendo a su bienestar físico y rendimiento académico.\n\nLa buena alimentación es fundamental para que nuestros niños puedan aprender, crear y soñar con un futuro mejor.',
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getArticleImageUrl(slug: string) {
  return articleImages[slug] || '/images/news/celebramos-22-anos.webp';
}

export function getFullImageUrl(imagePath: string) {
  return `${SITE_URL}${imagePath}`;
}
