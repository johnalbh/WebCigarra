import type { Core } from '@strapi/strapi';

export default async function seed(strapi: Core.Strapi) {
  strapi.log.info('🌱 Seed script started...');

  await seedPrograms(strapi);
  await seedSuccessStories(strapi);
  await seedPartners(strapi);
  await seedArticles(strapi);
  await seedTeamMembers(strapi);
  await seedHero(strapi);
  await seedImpactStatistics(strapi);
  await seedGlobalSettings(strapi);
  await seedWaysToHelp(strapi);
  await seedAboutPage(strapi);

  strapi.log.info('🌱 Seed script completed successfully.');
}

// ---------------------------------------------------------------------------
// Helper: add English locale to a document
// ---------------------------------------------------------------------------
async function addEnglishLocale(
  strapi: Core.Strapi,
  uid: string,
  documentId: string,
  data: Record<string, any>,
  publish = true
) {
  await (strapi.documents(uid as any) as any).update({
    documentId,
    locale: 'en',
    data,
    ...(publish ? { status: 'published' } : {}),
  });
}

// ---------------------------------------------------------------------------
// Programs
// ---------------------------------------------------------------------------
async function seedPrograms(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::program.program').findMany();
  if (existing.length > 0) {
    strapi.log.info('Programs already seeded, skipping.');
    return;
  }

  const programs = [
    {
      name: 'Primera Infancia',
      slug: 'primera-infancia',
      shortDescription:
        'Atención integral para niños de 0 a 5 años a través de estimulación temprana, juego y acompañamiento familiar.',
      icon: 'HiSun',
      color: '#FF9800',
      order: 1,
      featured: false,
      seo: { metaTitle: 'Primera Infancia | Fundación Cigarra', metaDescription: 'Estimulación temprana y atención integral para niños de 0 a 5 años en Ciudad Bolívar.' },
    },
    {
      name: 'Refuerzo Escolar',
      slug: 'refuerzo-escolar',
      shortDescription:
        'Acompañamiento académico para fortalecer las competencias escolares de los estudiantes.',
      icon: 'HiAcademicCap',
      color: '#2ECC71',
      order: 2,
      featured: true,
      seo: { metaTitle: 'Refuerzo Escolar | Fundación Cigarra', metaDescription: 'Acompañamiento académico para fortalecer competencias escolares de niños en Ciudad Bolívar.' },
    },
    {
      name: 'Danza',
      slug: 'danza',
      shortDescription:
        'Expresión corporal y ritmo a través de danzas folclóricas y contemporáneas.',
      icon: 'HiSparkles',
      color: '#F39C12',
      order: 3,
      featured: true,
      seo: { metaTitle: 'Programa de Danza | Fundación Cigarra', metaDescription: 'Danzas folclóricas y contemporáneas para niños. Expresión corporal y ritmo en Ciudad Bolívar.' },
    },
    {
      name: 'Inglés',
      slug: 'ingles',
      shortDescription:
        'Enseñanza del idioma inglés como segunda lengua para ampliar las oportunidades de los jóvenes.',
      icon: 'HiGlobeAlt',
      color: '#E67E22',
      order: 4,
      featured: true,
      seo: { metaTitle: 'Programa de Inglés | Fundación Cigarra', metaDescription: 'Enseñanza de inglés como segunda lengua para ampliar oportunidades de jóvenes en Ciudad Bolívar.' },
    },
    {
      name: 'Música',
      slug: 'musica',
      shortDescription:
        'Enseñamos instrumentos musicales, canto y teoría musical para desarrollar el talento artístico de los niños.',
      icon: 'HiMusicNote',
      color: '#E74C3C',
      order: 5,
      featured: true,
      seo: { metaTitle: 'Programa de Música | Fundación Cigarra', metaDescription: 'Clases de instrumentos, canto y teoría musical para niños en Ciudad Bolívar.' },
    },
    {
      name: 'Artes',
      slug: 'artes',
      shortDescription:
        'Formación artística integral que desarrolla la creatividad, la expresión y la sensibilidad estética.',
      icon: 'HiCube',
      color: '#9B59B6',
      order: 6,
      featured: false,
      seo: { metaTitle: 'Programa de Artes | Fundación Cigarra', metaDescription: 'Formación artística integral para desarrollar la creatividad de niños en Ciudad Bolívar.' },
    },
    {
      name: 'Escuela de Artes',
      slug: 'escuela-de-artes',
      shortDescription:
        'Espacio de formación artística con talleres especializados en diferentes disciplinas creativas.',
      icon: 'HiStar',
      color: '#FF5722',
      order: 7,
      featured: false,
      seo: { metaTitle: 'Escuela de Artes | Fundación Cigarra', metaDescription: 'Talleres especializados en disciplinas creativas para niños y jóvenes en Ciudad Bolívar.' },
    },
    {
      name: 'Tecnología',
      slug: 'tecnologia',
      shortDescription:
        'Formación en informática y tecnología para preparar a los jóvenes para el mundo digital.',
      icon: 'HiComputerDesktop',
      color: '#2196F3',
      order: 8,
      featured: true,
      seo: { metaTitle: 'Tecnología e Informática | Fundación Cigarra', metaDescription: 'Formación en informática y tecnología para preparar jóvenes de Ciudad Bolívar para el mundo digital.' },
    },
    {
      name: 'Biblioteca',
      slug: 'biblioteca',
      shortDescription:
        'Espacio de lectura y préstamo de libros para fomentar el hábito lector y el acceso a la cultura escrita.',
      icon: 'HiBookOpen',
      color: '#3498DB',
      order: 9,
      featured: true,
      seo: { metaTitle: 'Biblioteca | Fundación Cigarra', metaDescription: 'Espacio de lectura y préstamo de libros para niños y jóvenes en Ciudad Bolívar, Bogotá.' },
    },
    {
      name: 'Psicología',
      slug: 'psicologia',
      shortDescription:
        'Acompañamiento psicosocial para niños, jóvenes y familias, fortaleciendo el bienestar emocional.',
      icon: 'HiHeart',
      color: '#673AB7',
      order: 10,
      featured: false,
      seo: { metaTitle: 'Psicología | Fundación Cigarra', metaDescription: 'Acompañamiento psicosocial para niños, jóvenes y familias en Ciudad Bolívar, Bogotá.' },
    },
    {
      name: 'Grupo Mayores',
      slug: 'grupo-mayores',
      shortDescription:
        'Actividades recreativas, culturales y de bienestar dirigidas a los adultos mayores de la comunidad.',
      icon: 'HiUsers',
      color: '#E91E63',
      order: 11,
      featured: false,
      seo: { metaTitle: 'Grupo Mayores | Fundación Cigarra', metaDescription: 'Actividades recreativas y de bienestar para adultos mayores en Ciudad Bolívar, Bogotá.' },
    },
    {
      name: 'Talleres para Padres',
      slug: 'talleres-para-padres',
      shortDescription:
        'Talleres para padres de familia enfocados en crianza positiva y acompañamiento familiar.',
      icon: 'HiUserGroup',
      color: '#4CAF50',
      order: 12,
      featured: false,
      seo: { metaTitle: 'Talleres para Padres | Fundación Cigarra', metaDescription: 'Talleres de crianza positiva y acompañamiento familiar para padres en Ciudad Bolívar, Bogotá.' },
    },
    {
      name: 'Ropero',
      slug: 'ropero',
      shortDescription:
        'Programa de donación y distribución de ropa y calzado para las familias de la comunidad.',
      icon: 'HiShoppingBag',
      color: '#00BCD4',
      order: 13,
      featured: false,
      seo: { metaTitle: 'Ropero | Fundación Cigarra', metaDescription: 'Donación y distribución de ropa y calzado para familias en Ciudad Bolívar, Bogotá.' },
    },
  ];

  // English translations keyed by slug (only localized fields)
  const programsEN: Record<string, { slug: string; name: string; shortDescription: string; seo: { metaTitle: string; metaDescription: string } }> = {
    'primera-infancia': {
      slug: 'primera-infancia',
      name: 'Early Childhood',
      shortDescription: 'Comprehensive care for children aged 0 to 5 through early stimulation, play, and family support.',
      seo: { metaTitle: 'Early Childhood | Fundación Cigarra', metaDescription: 'Early stimulation and comprehensive care for children aged 0 to 5 in Ciudad Bolívar.' },
    },
    'refuerzo-escolar': {
      slug: 'refuerzo-escolar',
      name: 'Academic Tutoring',
      shortDescription: 'Academic support to strengthen students\' school competencies.',
      seo: { metaTitle: 'Academic Tutoring | Fundación Cigarra', metaDescription: 'Academic support to strengthen school competencies of children in Ciudad Bolívar.' },
    },
    'danza': {
      slug: 'danza',
      name: 'Dance',
      shortDescription: 'Body expression and rhythm through folk and contemporary dances.',
      seo: { metaTitle: 'Dance Program | Fundación Cigarra', metaDescription: 'Folk and contemporary dance for children. Body expression and rhythm in Ciudad Bolívar.' },
    },
    'ingles': {
      slug: 'ingles',
      name: 'English',
      shortDescription: 'Teaching English as a second language to broaden opportunities for young people.',
      seo: { metaTitle: 'English Program | Fundación Cigarra', metaDescription: 'Teaching English as a second language to broaden opportunities for youth in Ciudad Bolívar.' },
    },
    'musica': {
      slug: 'musica',
      name: 'Music',
      shortDescription: 'We teach musical instruments, singing, and music theory to develop children\'s artistic talent.',
      seo: { metaTitle: 'Music Program | Fundación Cigarra', metaDescription: 'Instrument lessons, singing, and music theory for children in Ciudad Bolívar.' },
    },
    'artes': {
      slug: 'artes',
      name: 'Arts',
      shortDescription: 'Comprehensive artistic training that develops creativity, expression, and aesthetic sensitivity.',
      seo: { metaTitle: 'Arts Program | Fundación Cigarra', metaDescription: 'Comprehensive artistic training to develop creativity in children in Ciudad Bolívar.' },
    },
    'escuela-de-artes': {
      slug: 'escuela-de-artes',
      name: 'School of Arts',
      shortDescription: 'Artistic training space with specialized workshops in different creative disciplines.',
      seo: { metaTitle: 'School of Arts | Fundación Cigarra', metaDescription: 'Specialized creative discipline workshops for children and youth in Ciudad Bolívar.' },
    },
    'tecnologia': {
      slug: 'tecnologia',
      name: 'Technology',
      shortDescription: 'Computer science and technology training to prepare young people for the digital world.',
      seo: { metaTitle: 'Technology & IT | Fundación Cigarra', metaDescription: 'Computer science and technology training to prepare youth in Ciudad Bolívar for the digital world.' },
    },
    'biblioteca': {
      slug: 'biblioteca',
      name: 'Library',
      shortDescription: 'A reading and book-lending space to foster reading habits and access to written culture.',
      seo: { metaTitle: 'Library | Fundación Cigarra', metaDescription: 'Reading and book-lending space for children and youth in Ciudad Bolívar, Bogotá.' },
    },
    'psicologia': {
      slug: 'psicologia',
      name: 'Psychology',
      shortDescription: 'Psychosocial support for children, youth, and families, strengthening emotional well-being.',
      seo: { metaTitle: 'Psychology | Fundación Cigarra', metaDescription: 'Psychosocial support for children, youth, and families in Ciudad Bolívar, Bogotá.' },
    },
    'grupo-mayores': {
      slug: 'grupo-mayores',
      name: 'Senior Citizens',
      shortDescription: 'Recreational, cultural, and wellness activities for the community\'s senior citizens.',
      seo: { metaTitle: 'Senior Citizens | Fundación Cigarra', metaDescription: 'Recreational and wellness activities for senior citizens in Ciudad Bolívar, Bogotá.' },
    },
    'talleres-para-padres': {
      slug: 'talleres-para-padres',
      name: 'Parent Workshops',
      shortDescription: 'Workshops for parents focused on positive parenting and family support.',
      seo: { metaTitle: 'Parent Workshops | Fundación Cigarra', metaDescription: 'Positive parenting and family support workshops for parents in Ciudad Bolívar, Bogotá.' },
    },
    'ropero': {
      slug: 'ropero',
      name: 'Clothing Bank',
      shortDescription: 'A clothing and footwear donation and distribution program for community families.',
      seo: { metaTitle: 'Clothing Bank | Fundación Cigarra', metaDescription: 'Clothing and footwear donation and distribution for families in Ciudad Bolívar, Bogotá.' },
    },
  };

  for (const program of programs) {
    const doc = await strapi.documents('api::program.program').create({
      data: program as any,
      locale: 'es',
      status: 'published',
    });

    const en = programsEN[program.slug];
    if (en) {
      await addEnglishLocale(strapi, 'api::program.program', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${programs.length} programs (ES + EN).`);
}

// ---------------------------------------------------------------------------
// Success Stories
// ---------------------------------------------------------------------------
async function seedSuccessStories(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::success-story.success-story')
    .findMany();
  if (existing.length > 0) {
    strapi.log.info('Success stories already seeded, skipping.');
    return;
  }

  const stories = [
    {
      name: 'Alison Zapata',
      slug: 'alison-zapata',
      currentRole: 'Estudiante de Licenciatura en Música',
      quote:
        'La Fundación Cigarra me dio las bases musicales que hoy me permiten estudiar lo que amo en la universidad.',
      achievement: 'Admitida en la Universidad Pedagógica Nacional en el programa de Licenciatura en Música',
      featured: true,
      seo: { metaTitle: 'Alison Zapata | Historias de Éxito', metaDescription: 'Alison Zapata, egresada de la Fundación Cigarra, hoy estudia Licenciatura en Música en la Universidad Pedagógica.' },
    },
    {
      name: 'Leider Quiñones',
      slug: 'leider-quinones',
      currentRole: 'Instructor de danza folclórica',
      quote:
        'Gracias a la Cigarra descubrí mi pasión por la danza y hoy puedo enseñarle a otros niños lo que a mí me enseñaron.',
      achievement: 'Fundó su propia escuela de danza en Ciudad Bolívar',
      featured: true,
      seo: { metaTitle: 'Leider Quiñones | Historias de Éxito', metaDescription: 'Leider Quiñones fundó su propia escuela de danza en Ciudad Bolívar gracias a la Fundación Cigarra.' },
    },
    {
      name: 'Juan David Hernández',
      slug: 'juan-david-hernandez',
      currentRole: 'Ingeniero de Sistemas',
      quote:
        'En la Cigarra aprendí que la tecnología puede transformar comunidades. Hoy trabajo para hacer eso realidad.',
      achievement: 'Graduado como Ingeniero de Sistemas con beca completa',
      featured: true,
      seo: { metaTitle: 'Juan David Hernández | Historias de Éxito', metaDescription: 'Juan David Hernández, egresado de la Cigarra, se graduó como Ingeniero de Sistemas con beca completa.' },
    },
    {
      name: 'Andrey Ruíz',
      slug: 'andrey-ruiz',
      currentRole: 'Líder comunitario',
      quote:
        'La Fundación Cigarra me enseñó a soñar en grande y a trabajar con disciplina para lograr mis metas.',
      achievement: 'Creó una empresa de servicios tecnológicos que emplea a jóvenes de la comunidad',
      featured: false,
      seo: { metaTitle: 'Andrey Ruíz | Historias de Éxito', metaDescription: 'Andrey Ruíz creó una empresa de servicios tecnológicos que emplea a jóvenes de Ciudad Bolívar.' },
    },
    {
      name: 'Yuri Karina Poveda',
      slug: 'yuri-karina-poveda',
      currentRole: 'Educadora',
      quote:
        'Cada enseñanza que comparto con mis estudiantes lleva un poco de lo que la Cigarra sembró en mí.',
      achievement: 'Licenciada en Educación y docente en colegio público de Bogotá',
      featured: true,
      seo: { metaTitle: 'Yuri Karina Poveda | Historias de Éxito', metaDescription: 'Yuri Karina Poveda es Licenciada en Educación y docente en colegio público de Bogotá.' },
    },
    {
      name: 'Angie Tatiana Poveda',
      slug: 'angie-tatiana-poveda',
      currentRole: 'Profesional en administración',
      quote:
        'Con esfuerzo y dedicación todo es posible. La Fundación Cigarra me lo demostró.',
      achievement: 'Profesional en administración y mentora de jóvenes en la comunidad',
      featured: false,
      seo: { metaTitle: 'Angie Tatiana Poveda | Historias de Éxito', metaDescription: 'Angie Tatiana Poveda es profesional en administración y mentora de jóvenes en Ciudad Bolívar.' },
    },
  ];

  // English translations keyed by slug (localized fields + slug for uid)
  const storiesEN: Record<string, { slug: string; currentRole: string; quote: string; achievement: string; seo: { metaTitle: string; metaDescription: string } }> = {
    'alison-zapata': {
      slug: 'alison-zapata',
      currentRole: 'Music Education Student',
      quote: 'Fundación Cigarra gave me the musical foundations that today allow me to study what I love at university.',
      achievement: 'Admitted to the National Pedagogical University in the Music Education program',
      seo: { metaTitle: 'Alison Zapata | Success Stories', metaDescription: 'Alison Zapata, a Fundación Cigarra graduate, now studies Music Education at the National Pedagogical University.' },
    },
    'leider-quinones': {
      slug: 'leider-quinones',
      currentRole: 'Folk Dance Instructor',
      quote: 'Thanks to La Cigarra I discovered my passion for dance and today I can teach other children what I was taught.',
      achievement: 'Founded his own dance school in Ciudad Bolívar',
      seo: { metaTitle: 'Leider Quiñones | Success Stories', metaDescription: 'Leider Quiñones founded his own dance school in Ciudad Bolívar thanks to Fundación Cigarra.' },
    },
    'juan-david-hernandez': {
      slug: 'juan-david-hernandez',
      currentRole: 'Systems Engineer',
      quote: 'At La Cigarra I learned that technology can transform communities. Today I work to make that a reality.',
      achievement: 'Graduated as a Systems Engineer with a full scholarship',
      seo: { metaTitle: 'Juan David Hernández | Success Stories', metaDescription: 'Juan David Hernández, a La Cigarra graduate, earned a Systems Engineering degree with a full scholarship.' },
    },
    'andrey-ruiz': {
      slug: 'andrey-ruiz',
      currentRole: 'Community Leader',
      quote: 'Fundación Cigarra taught me to dream big and work with discipline to achieve my goals.',
      achievement: 'Created a technology services company that employs young people from the community',
      seo: { metaTitle: 'Andrey Ruíz | Success Stories', metaDescription: 'Andrey Ruíz created a technology services company that employs young people from Ciudad Bolívar.' },
    },
    'yuri-karina-poveda': {
      slug: 'yuri-karina-poveda',
      currentRole: 'Educator',
      quote: 'Every lesson I share with my students carries a little of what La Cigarra planted in me.',
      achievement: 'Education graduate and public school teacher in Bogotá',
      seo: { metaTitle: 'Yuri Karina Poveda | Success Stories', metaDescription: 'Yuri Karina Poveda is an Education graduate and public school teacher in Bogotá.' },
    },
    'angie-tatiana-poveda': {
      slug: 'angie-tatiana-poveda',
      currentRole: 'Business Administration Professional',
      quote: 'With effort and dedication, everything is possible. Fundación Cigarra proved it to me.',
      achievement: 'Business administration professional and youth mentor in the community',
      seo: { metaTitle: 'Angie Tatiana Poveda | Success Stories', metaDescription: 'Angie Tatiana Poveda is a business administration professional and youth mentor in Ciudad Bolívar.' },
    },
  };

  for (const story of stories) {
    const doc = await strapi.documents('api::success-story.success-story').create({
      data: story as any,
      locale: 'es',
      status: 'published',
    });

    const en = storiesEN[story.slug];
    if (en) {
      await addEnglishLocale(strapi, 'api::success-story.success-story', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${stories.length} success stories (ES + EN).`);
}

// ---------------------------------------------------------------------------
// Partners (no i18n)
// ---------------------------------------------------------------------------
async function seedPartners(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::partner.partner')
    .findMany();
  if (existing.length > 0) {
    strapi.log.info('Partners already seeded, skipping.');
    return;
  }

  const partners = [
    { name: 'Saint George School', tier: 'platinum', order: 1, active: true },
    { name: 'Karelsie Foundation', tier: 'platinum', order: 2, active: true },
    { name: 'Microsoft', tier: 'gold', order: 3, active: true },
    { name: 'Permoda', tier: 'gold', order: 4, active: true },
    { name: 'Almacenes Éxito', tier: 'gold', order: 5, active: true },
    { name: 'HomeCenter', tier: 'silver', order: 6, active: true },
    { name: 'Aqualogic', tier: 'silver', order: 7, active: true },
    { name: 'Opperar', tier: 'silver', order: 8, active: true },
    { name: 'Makri', tier: 'silver', order: 9, active: true },
    { name: 'ABACO - Banco de Alimentos', tier: 'silver', order: 10, active: true },
  ];

  for (const partner of partners) {
    await strapi.documents('api::partner.partner').create({
      data: partner as any,
      status: 'published',
    });
  }

  strapi.log.info(`Seeded ${partners.length} partners.`);
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------
async function seedArticles(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::article.article')
    .findMany();
  if (existing.length > 0) {
    strapi.log.info('Articles already seeded, skipping.');
    return;
  }

  const articles = [
    {
      title: 'Inauguramos nueva aula de música',
      slug: 'inauguramos-nueva-aula-de-musica',
      excerpt:
        'Gracias a la alianza con Microsoft y Saint George School, contamos con un espacio renovado para nuestras clases de música.',
      content:
        'La Fundación Cigarra inauguró su nueva aula de música, un espacio completamente renovado que cuenta con instrumentos nuevos y equipos de sonido de alta calidad. Este logro fue posible gracias a la generosa donación de Microsoft y el apoyo constante de Saint George School.\n\nEl aula beneficiará a más de 60 niños y jóvenes que participan en nuestro programa de música, ofreciéndoles un ambiente óptimo para desarrollar sus habilidades musicales.\n\n"Este espacio representa una nueva oportunidad para que nuestros estudiantes sueñen más grande", expresó la directora de la fundación durante la ceremonia de inauguración.',
      publishDate: '2025-11-15',
      author: 'Fundación Cigarra',
      tags: ['música', 'infraestructura', 'alianzas'],
      featured: true,
      seo: { metaTitle: 'Nueva Aula de Música | Fundación Cigarra', metaDescription: 'Gracias a Microsoft y Saint George School, la Fundación Cigarra inaugura un espacio renovado para clases de música.' },
    },
    {
      title: 'Biblioteca Cigarra: más de 500 libros disponibles',
      slug: 'biblioteca-cigarra-500-libros',
      excerpt:
        'Nuestra biblioteca comunitaria alcanza los 500 libros gracias a donaciones de aliados y la comunidad.',
      content:
        'La Biblioteca de la Fundación Cigarra ha alcanzado un hito importante: más de 500 libros disponibles para préstamo y consulta por parte de los niños, jóvenes y familias de Ciudad Bolívar.\n\nEste logro es posible gracias a las generosas donaciones de nuestros aliados corporativos y de la comunidad. La biblioteca es un espacio seguro donde los beneficiarios pueden explorar el mundo a través de la lectura.\n\nEl programa de biblioteca incluye talleres de lectura, clubes de libro y actividades de fomento lector que han impactado positivamente en el rendimiento escolar de los participantes.',
      publishDate: '2025-10-20',
      author: 'Equipo Académico',
      tags: ['biblioteca', 'lectura', 'educación'],
      featured: false,
      seo: { metaTitle: 'Biblioteca Cigarra | Fundación Cigarra', metaDescription: 'La biblioteca comunitaria de la Fundación Cigarra alcanza los 500 libros para niños y jóvenes de Ciudad Bolívar.' },
    },
    {
      title: 'Festival de Danza Folclórica 2025',
      slug: 'festival-danza-folclorica-2025',
      excerpt:
        'Más de 80 niños participaron en nuestro festival anual de danza, celebrando la riqueza cultural colombiana.',
      content:
        'El pasado sábado se llevó a cabo el Festival de Danza Folclórica 2025 en las instalaciones de la Fundación Cigarra. Más de 80 niños y jóvenes de nuestro programa de danza presentaron coreografías de cumbia, bambuco, currulao y salsa.\n\nEl evento contó con la asistencia de más de 200 familiares y miembros de la comunidad, quienes disfrutaron de una jornada llena de color, música y alegría.\n\n"La danza es un vehículo para que nuestros niños se conecten con sus raíces y fortalezcan su identidad cultural", comentó el coordinador del programa.',
      publishDate: '2025-09-10',
      author: 'Fundación Cigarra',
      tags: ['danza', 'cultura', 'eventos'],
      featured: true,
      seo: { metaTitle: 'Festival de Danza 2025 | Fundación Cigarra', metaDescription: '80 niños celebran la cultura colombiana en el Festival de Danza Folclórica 2025 de la Fundación Cigarra.' },
    },
    {
      title: 'Nuevo programa de psicología para familias',
      slug: 'nuevo-programa-psicologia-familias',
      excerpt:
        'Lanzamos nuestro programa de acompañamiento psicosocial para fortalecer el bienestar emocional de niños y familias.',
      content:
        'La Fundación Cigarra lanzó su programa de Psicología, un servicio de acompañamiento psicosocial dirigido a los niños, jóvenes y familias de Ciudad Bolívar.\n\nEl programa ofrece atención individual, talleres grupales y orientación familiar para fortalecer las habilidades socioemocionales de los beneficiarios.\n\n"El bienestar emocional es la base para que nuestros niños puedan aprender y crecer", expresó la psicóloga coordinadora del programa.\n\nActualmente, más de 40 familias ya se han beneficiado de este importante servicio.',
      publishDate: '2025-08-05',
      author: 'Dirección',
      tags: ['psicología', 'bienestar', 'familias'],
      featured: false,
      seo: { metaTitle: 'Programa de Psicología | Fundación Cigarra', metaDescription: 'Acompañamiento psicosocial para fortalecer el bienestar emocional de niños y familias en Ciudad Bolívar.' },
    },
    {
      title: 'Ropero Comunitario: campaña de donación de ropa',
      slug: 'ropero-comunitario-campana-donacion',
      excerpt:
        'Nuestro programa Ropero realizó una exitosa campaña de recolección de ropa y calzado para más de 100 familias.',
      content:
        'El programa Ropero de la Fundación Cigarra realizó una exitosa campaña de recolección y distribución de ropa y calzado para las familias más vulnerables de Ciudad Bolívar.\n\nGracias a la generosidad de donantes individuales y aliados corporativos, se recolectaron más de 500 prendas en buen estado que fueron clasificadas y entregadas a más de 100 familias.\n\nEl Ropero es un programa permanente que opera durante todo el año, recibiendo donaciones y distribuyéndolas a quienes más lo necesitan.',
      publishDate: '2025-07-18',
      author: 'Fundación Cigarra',
      tags: ['ropero', 'donaciones', 'comunidad'],
      featured: true,
      seo: { metaTitle: 'Ropero Comunitario | Fundación Cigarra', metaDescription: 'Campaña de donación de ropa y calzado para familias vulnerables de Ciudad Bolívar.' },
    },
    {
      title: 'Escuela de Padres: crianza positiva en tiempos digitales',
      slug: 'escuela-de-padres-crianza-positiva-digital',
      excerpt:
        'Nuestro taller abordó los retos de la crianza en la era digital y cómo acompañar a los hijos en el uso responsable de la tecnología.',
      content:
        'La Escuela de Padres de la Fundación Cigarra realizó el taller "Crianza positiva en tiempos digitales", que contó con la participación de 45 padres y madres de familia.\n\nDurante la sesión, los asistentes aprendieron sobre los riesgos y oportunidades del mundo digital para los niños y adolescentes, así como estrategias para establecer límites saludables y fomentar el uso responsable de la tecnología.\n\nEl taller fue facilitado por una psicóloga especialista en desarrollo infantil y contó con actividades prácticas que permitieron a los padres reflexionar sobre sus propios hábitos digitales.',
      publishDate: '2025-06-22',
      author: 'Programa Escuela de Padres',
      tags: ['padres', 'tecnología', 'crianza'],
      featured: false,
      seo: { metaTitle: 'Crianza Positiva Digital | Fundación Cigarra', metaDescription: 'Taller sobre retos de crianza en la era digital y uso responsable de tecnología para familias.' },
    },
  ];

  // English translations keyed by slug (localized: slug, title, excerpt, content, tags, seo)
  const articlesEN: Record<string, { slug: string; title: string; excerpt: string; content: string; tags: string[]; seo: { metaTitle: string; metaDescription: string } }> = {
    'inauguramos-nueva-aula-de-musica': {
      slug: 'inauguramos-nueva-aula-de-musica',
      title: 'We Inaugurate a New Music Classroom',
      excerpt: 'Thanks to the partnership with Microsoft and Saint George School, we have a renovated space for our music classes.',
      content: 'Fundación Cigarra inaugurated its new music classroom, a fully renovated space featuring new instruments and high-quality sound equipment. This achievement was made possible by the generous donation from Microsoft and the constant support of Saint George School.\n\nThe classroom will benefit more than 60 children and young people who participate in our music program, providing them with an optimal environment to develop their musical skills.\n\n"This space represents a new opportunity for our students to dream bigger," said the foundation\'s director during the inauguration ceremony.',
      tags: ['music', 'infrastructure', 'partnerships'],
      seo: { metaTitle: 'New Music Classroom | Fundación Cigarra', metaDescription: 'Thanks to Microsoft and Saint George School, Fundación Cigarra inaugurates a renovated space for music classes.' },
    },
    'biblioteca-cigarra-500-libros': {
      slug: 'biblioteca-cigarra-500-libros',
      title: 'Cigarra Library: Over 500 Books Available',
      excerpt: 'Our community library reaches 500 books thanks to donations from partners and the community.',
      content: 'The Fundación Cigarra Library has reached an important milestone: more than 500 books available for lending and consultation by children, youth, and families in Ciudad Bolívar.\n\nThis achievement is possible thanks to the generous donations from our corporate partners and the community. The library is a safe space where beneficiaries can explore the world through reading.\n\nThe library program includes reading workshops, book clubs, and reading promotion activities that have positively impacted the academic performance of participants.',
      tags: ['library', 'reading', 'education'],
      seo: { metaTitle: 'Cigarra Library | Fundación Cigarra', metaDescription: 'The Fundación Cigarra community library reaches 500 books for children and youth in Ciudad Bolívar.' },
    },
    'festival-danza-folclorica-2025': {
      slug: 'festival-danza-folclorica-2025',
      title: 'Folk Dance Festival 2025',
      excerpt: 'More than 80 children participated in our annual dance festival, celebrating Colombia\'s cultural richness.',
      content: 'Last Saturday, the 2025 Folk Dance Festival took place at the Fundación Cigarra facilities. More than 80 children and young people from our dance program performed choreographies of cumbia, bambuco, currulao, and salsa.\n\nThe event was attended by more than 200 family members and community members, who enjoyed a day full of color, music, and joy.\n\n"Dance is a vehicle for our children to connect with their roots and strengthen their cultural identity," commented the program coordinator.',
      tags: ['dance', 'culture', 'events'],
      seo: { metaTitle: 'Dance Festival 2025 | Fundación Cigarra', metaDescription: '80 children celebrate Colombian culture at the 2025 Folk Dance Festival by Fundación Cigarra.' },
    },
    'nuevo-programa-psicologia-familias': {
      slug: 'nuevo-programa-psicologia-familias',
      title: 'New Psychology Program for Families',
      excerpt: 'We launched our psychosocial support program to strengthen the emotional well-being of children and families.',
      content: 'Fundación Cigarra launched its Psychology program, a psychosocial support service aimed at children, youth, and families in Ciudad Bolívar.\n\nThe program offers individual care, group workshops, and family counseling to strengthen the socio-emotional skills of beneficiaries.\n\n"Emotional well-being is the foundation for our children to learn and grow," said the program\'s coordinating psychologist.\n\nCurrently, more than 40 families have already benefited from this important service.',
      tags: ['psychology', 'well-being', 'families'],
      seo: { metaTitle: 'Psychology Program | Fundación Cigarra', metaDescription: 'Psychosocial support to strengthen emotional well-being of children and families in Ciudad Bolívar.' },
    },
    'ropero-comunitario-campana-donacion': {
      slug: 'ropero-comunitario-campana-donacion',
      title: 'Community Clothing Bank: Clothing Donation Drive',
      excerpt: 'Our Clothing Bank program held a successful clothing and footwear collection drive for over 100 families.',
      content: 'The Fundación Cigarra Clothing Bank program held a successful collection and distribution drive of clothing and footwear for the most vulnerable families in Ciudad Bolívar.\n\nThanks to the generosity of individual donors and corporate partners, more than 500 items in good condition were collected, sorted, and delivered to over 100 families.\n\nThe Clothing Bank is a permanent program that operates year-round, receiving donations and distributing them to those who need them most.',
      tags: ['clothing bank', 'donations', 'community'],
      seo: { metaTitle: 'Community Clothing Bank | Fundación Cigarra', metaDescription: 'Clothing and footwear donation drive for vulnerable families in Ciudad Bolívar.' },
    },
    'escuela-de-padres-crianza-positiva-digital': {
      slug: 'escuela-de-padres-crianza-positiva-digital',
      title: 'Parent School: Positive Parenting in the Digital Age',
      excerpt: 'Our workshop addressed the challenges of parenting in the digital era and how to guide children in responsible technology use.',
      content: 'The Fundación Cigarra Parent School held the workshop "Positive Parenting in the Digital Age," attended by 45 mothers and fathers.\n\nDuring the session, attendees learned about the risks and opportunities of the digital world for children and adolescents, as well as strategies for setting healthy boundaries and encouraging responsible technology use.\n\nThe workshop was facilitated by a psychologist specializing in child development and included practical activities that allowed parents to reflect on their own digital habits.',
      tags: ['parents', 'technology', 'parenting'],
      seo: { metaTitle: 'Positive Digital Parenting | Fundación Cigarra', metaDescription: 'Workshop on parenting challenges in the digital age and responsible technology use for families.' },
    },
  };

  for (const article of articles) {
    const doc = await strapi.documents('api::article.article').create({
      data: article as any,
      locale: 'es',
      status: 'published',
    });

    const en = articlesEN[article.slug];
    if (en) {
      await addEnglishLocale(strapi, 'api::article.article', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${articles.length} articles (ES + EN).`);
}

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------
async function seedTeamMembers(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::team-member.team-member')
    .findMany();
  if (existing.length > 0) {
    strapi.log.info('Team members already seeded, skipping.');
    return;
  }

  const members = [
    {
      name: 'Martha Lucía Gómez',
      role: 'Directora General',
      bio: 'Fundadora de la Cigarra con más de 23 años dedicados a la transformación social en Ciudad Bolívar.',
      department: 'direction',
      order: 1,
    },
    {
      name: 'Carlos Andrés Ruiz',
      role: 'Coordinador de Programas',
      bio: 'Licenciado en educación con experiencia en gestión de proyectos sociales y comunitarios.',
      department: 'direction',
      order: 2,
    },
    {
      name: 'Ana María Torres',
      role: 'Coordinadora Académica',
      bio: 'Pedagoga especialista en innovación educativa y desarrollo infantil.',
      department: 'education',
      order: 3,
    },
    {
      name: 'Diego Alejandro Vargas',
      role: 'Director de Música',
      bio: 'Músico profesional egresado de la Universidad Nacional. Dirige el programa de música desde 2010.',
      department: 'arts',
      order: 4,
    },
    {
      name: 'Paola Andrea Méndez',
      role: 'Trabajadora Social',
      bio: 'Acompaña a las familias beneficiarias y gestiona la red de apoyo comunitario.',
      department: 'administration',
      order: 5,
    },
    {
      name: 'Julián Esteban Peña',
      role: 'Instructor de Teatro',
      bio: 'Artista escénico con énfasis en pedagogía del arte para comunidades vulnerables.',
      department: 'arts',
      order: 6,
    },
    {
      name: 'Sandra Milena Castillo',
      role: 'Psicóloga',
      bio: 'Brinda acompañamiento psicosocial a los niños, jóvenes y sus familias.',
      department: 'administration',
      order: 7,
    },
    {
      name: 'Roberto Carlos Díaz',
      role: 'Instructor de Danza',
      bio: 'Bailarín profesional especializado en danzas folclóricas colombianas.',
      department: 'arts',
      order: 8,
    },
    {
      name: 'Luisa Fernanda Ospina',
      role: 'Coordinadora de Voluntariado',
      bio: 'Gestiona la red de más de 50 voluntarios que apoyan los programas de la fundación.',
      department: 'volunteers',
      order: 9,
    },
    {
      name: 'Andrés Felipe Moreno',
      role: 'Instructor de Tecnología',
      bio: 'Ingeniero de sistemas que lidera los programas de tecnología y alfabetización digital.',
      department: 'education',
      order: 10,
    },
  ];

  // English translations keyed by name (localized: role, bio)
  const membersEN: Record<string, { role: string; bio: string }> = {
    'Martha Lucía Gómez': {
      role: 'Executive Director',
      bio: 'Founder of La Cigarra with over 23 years dedicated to social transformation in Ciudad Bolívar.',
    },
    'Carlos Andrés Ruiz': {
      role: 'Programs Coordinator',
      bio: 'Education graduate with experience in social and community project management.',
    },
    'Ana María Torres': {
      role: 'Academic Coordinator',
      bio: 'Pedagogue specializing in educational innovation and child development.',
    },
    'Diego Alejandro Vargas': {
      role: 'Music Director',
      bio: 'Professional musician and National University graduate. Has led the music program since 2010.',
    },
    'Paola Andrea Méndez': {
      role: 'Social Worker',
      bio: 'Supports beneficiary families and manages the community support network.',
    },
    'Julián Esteban Peña': {
      role: 'Theater Instructor',
      bio: 'Performing artist with a focus on art pedagogy for vulnerable communities.',
    },
    'Sandra Milena Castillo': {
      role: 'Psychologist',
      bio: 'Provides psychosocial support to children, youth, and their families.',
    },
    'Roberto Carlos Díaz': {
      role: 'Dance Instructor',
      bio: 'Professional dancer specializing in Colombian folk dances.',
    },
    'Luisa Fernanda Ospina': {
      role: 'Volunteer Coordinator',
      bio: 'Manages the network of over 50 volunteers who support the foundation\'s programs.',
    },
    'Andrés Felipe Moreno': {
      role: 'Technology Instructor',
      bio: 'Systems engineer who leads the technology and digital literacy programs.',
    },
  };

  for (const member of members) {
    const doc = await strapi.documents('api::team-member.team-member').create({
      data: member as any,
      locale: 'es',
      status: 'published',
    });

    const en = membersEN[member.name];
    if (en) {
      await addEnglishLocale(strapi, 'api::team-member.team-member', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${members.length} team members (ES + EN).`);
}

// ---------------------------------------------------------------------------
// Hero (single type)
// ---------------------------------------------------------------------------
async function seedHero(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::hero.hero').findMany();
  if (existing.length > 0) {
    strapi.log.info('Hero already seeded, skipping.');
    return;
  }

  const doc = await strapi.documents('api::hero.hero').create({
    data: {
      title: 'Fundación Cigarra',
      subtitle:
        'Transformamos vidas a través del arte, la educación y el amor en Ciudad Bolívar, Bogotá.',
      tagline: 'Sembrando esperanza desde 2002',
    } as any,
    locale: 'es',
    status: 'published',
  });

  await addEnglishLocale(strapi, 'api::hero.hero', doc.documentId, {
    title: 'Fundación Cigarra',
    subtitle: 'We transform lives through art, education, and love in Ciudad Bolívar, Bogotá.',
    tagline: 'Sowing hope since 2002',
  });

  strapi.log.info('Seeded hero section (ES + EN).');
}

// ---------------------------------------------------------------------------
// Impact Statistics (single type)
// ---------------------------------------------------------------------------
async function seedImpactStatistics(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::impact-statistic.impact-statistic')
    .findMany();
  if (existing.length > 0) {
    strapi.log.info('Impact statistics already seeded, skipping.');
    return;
  }

  const doc = await strapi.documents('api::impact-statistic.impact-statistic').create({
    data: {
      sectionTitle: 'Nuestro Impacto',
      stats: [
        { label: 'Niños ayudados', value: 1877, suffix: '+', icon: 'HiUserGroup', order: 1 },
        { label: 'Años de servicio', value: 23, suffix: '', icon: 'HiCalendar', order: 2 },
        { label: 'Empleos generados', value: 100, suffix: '+', icon: 'HiBookOpen', order: 3 },
        { label: 'Familias beneficiadas', value: 190, suffix: '+', icon: 'HiHome', order: 4 },
      ],
    } as any,
    locale: 'es',
    status: 'published',
  });

  await addEnglishLocale(strapi, 'api::impact-statistic.impact-statistic', doc.documentId, {
    sectionTitle: 'Our Impact',
    stats: [
      { label: 'Children helped', value: 1877, suffix: '+', icon: 'HiUserGroup', order: 1 },
      { label: 'Years of service', value: 23, suffix: '', icon: 'HiCalendar', order: 2 },
      { label: 'Jobs created', value: 100, suffix: '+', icon: 'HiBookOpen', order: 3 },
      { label: 'Families benefited', value: 190, suffix: '+', icon: 'HiHome', order: 4 },
    ],
  });

  strapi.log.info('Seeded impact statistics (ES + EN).');
}

// ---------------------------------------------------------------------------
// Global Settings (single type, draftAndPublish: false)
// ---------------------------------------------------------------------------
async function seedGlobalSettings(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::global-setting.global-setting')
    .findMany();
  if (existing.length > 0) {
    strapi.log.info('Global settings already seeded, skipping.');
    return;
  }

  const doc = await strapi.documents('api::global-setting.global-setting').create({
    data: {
      siteName: 'Fundación Cigarra',
      nit: '830.114.318-9',
      operatingHours: 'Lunes a Viernes: 8:00 AM - 5:00 PM\nSábados: 8:00 AM - 12:00 PM',
      contact: {
        phone: '+573212465421',
        whatsapp: '+573212465421',
        email: 'info@cigarra.org',
        address: 'Calle 71 Q sur No. 27-60, Ciudad Bolívar',
        city: 'Bogotá, Colombia',
      },
      socialLinks: [
        { platform: 'facebook', url: 'https://www.facebook.com/fundacioncigarra' },
        { platform: 'instagram', url: 'https://www.instagram.com/fundacioncigarra' },
        { platform: 'youtube', url: 'https://www.youtube.com/@fundacioncigarra' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/fundacion-cigarra' },
      ],
      navLinks: [
        { label: 'Inicio', url: '/', order: 1 },
        { label: 'Quiénes Somos', url: '/quienes-somos', order: 2 },
        { label: 'Equipo', url: '/equipo', order: 3 },
        { label: 'Himno', url: '/himno', order: 4 },
        { label: 'Programas', url: '/programas', order: 5 },
        { label: 'Historias de Éxito', url: '/historias-de-exito', order: 6 },
        { label: 'Noticias', url: '/noticias', order: 7 },
        { label: 'Cómo Ayudar', url: '/como-ayudar', order: 8 },
        { label: 'Plan Padrino', url: '/plan-padrino', order: 9 },
        { label: 'Voluntariado', url: '/voluntariado', order: 10 },
        { label: 'Impacto Empresarial', url: '/impacto-empresarial', order: 11 },
        { label: 'Contacto', url: '/contacto', order: 12 },
      ],
    } as any,
  });

  await addEnglishLocale(strapi, 'api::global-setting.global-setting', doc.documentId, {
    siteName: 'Fundación Cigarra',
    operatingHours: 'Monday to Friday: 8:00 AM - 5:00 PM\nSaturdays: 8:00 AM - 12:00 PM',
    navLinks: [
      { label: 'Home', url: '/', order: 1 },
      { label: 'About Us', url: '/quienes-somos', order: 2 },
      { label: 'Team', url: '/equipo', order: 3 },
      { label: 'Anthem', url: '/himno', order: 4 },
      { label: 'Programs', url: '/programas', order: 5 },
      { label: 'Success Stories', url: '/historias-de-exito', order: 6 },
      { label: 'News', url: '/noticias', order: 7 },
      { label: 'How to Help', url: '/como-ayudar', order: 8 },
      { label: 'Sponsor a Child', url: '/plan-padrino', order: 9 },
      { label: 'Volunteering', url: '/voluntariado', order: 10 },
      { label: 'Corporate Impact', url: '/impacto-empresarial', order: 11 },
      { label: 'Contact', url: '/contacto', order: 12 },
    ],
  }, false);

  strapi.log.info('Seeded global settings (ES + EN).');
}

// ---------------------------------------------------------------------------
// Ways to Help (single type)
// ---------------------------------------------------------------------------
async function seedWaysToHelp(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::ways-to-help.ways-to-help')
    .findMany();
  if (existing.length > 0) {
    strapi.log.info('Ways to Help already seeded, skipping.');
    return;
  }

  const doc = await strapi.documents('api::ways-to-help.ways-to-help').create({
    data: {
      heroTitle: 'Cómo Puedes Ayudar',
      heroSubtitle:
        'Tu aporte transforma la vida de niños y jóvenes en Ciudad Bolívar. Cada donación, por pequeña que sea, genera un impacto enorme.',
      donationLinkCOP: 'https://www.donaronline.org/fundacion-cigarra/dona-ahora',
      donationLinkUSD: 'https://www.donaronline.org/fundacion-cigarra/donate-now',
      nutritionCostCOP: 150000,
      sponsorChildTitle: 'Apadrina un Niño',
      sponsorChildDescription:
        'Con tu apadrinamiento mensual, un niño puede acceder a todos nuestros programas, recibir alimentación nutritiva y acompañamiento integral. Tu apoyo cambia una vida para siempre.',
      volunteerTitle: 'Sé Voluntario',
      volunteerDescription:
        'Comparte tu talento y tu tiempo con nuestros niños. Necesitamos voluntarios en áreas como música, artes, inglés, tecnología y refuerzo escolar. Tu experiencia puede inspirar a una nueva generación.',
      donationTiers: [
        {
          name: 'Plan Mensual',
          amountCOP: 65000,
          period: 'mes',
          description: 'Apadrina a un niño con educación, alimentación y acceso a todos los programas durante un mes.',
          impact: '1 niño / 1 mes',
          highlighted: false,
        },
        {
          name: 'Plan Semestral',
          amountCOP: 330000,
          period: 'semestre',
          description: 'Seis meses de apadrinamiento integral para un niño.',
          impact: '1 niño / 6 meses',
          highlighted: false,
        },
        {
          name: 'Plan Anual',
          amountCOP: 650000,
          period: 'año',
          description: 'Un año completo de apadrinamiento integral: educación, alimentación y todos los programas.',
          impact: '1 niño / 1 año',
          highlighted: true,
        },
        {
          name: 'Plan Dorado',
          amountCOP: 1200000,
          period: 'año',
          description: 'Apadrina a dos niños durante un año completo con cobertura integral.',
          impact: '2 niños / 1 año',
          highlighted: false,
        },
        {
          name: 'Plan Platino',
          amountCOP: 1650000,
          period: 'año',
          description: 'Apadrina a tres niños durante un año completo con cobertura integral.',
          impact: '3 niños / 1 año',
          highlighted: false,
        },
        {
          name: 'Plan Ultra',
          amountCOP: 2100000,
          period: 'año',
          description: 'Apadrina a cuatro niños durante un año con el máximo nivel de cobertura.',
          impact: '4 niños / 1 año',
          highlighted: false,
        },
      ],
    } as any,
    locale: 'es',
    status: 'published',
  });

  await addEnglishLocale(strapi, 'api::ways-to-help.ways-to-help', doc.documentId, {
    heroTitle: 'How You Can Help',
    heroSubtitle:
      'Your contribution transforms the lives of children and youth in Ciudad Bolívar. Every donation, no matter how small, creates an enormous impact.',
    sponsorChildTitle: 'Sponsor a Child',
    sponsorChildDescription:
      'With your monthly sponsorship, a child can access all our programs, receive nutritious meals, and comprehensive support. Your help changes a life forever.',
    volunteerTitle: 'Become a Volunteer',
    volunteerDescription:
      'Share your talent and time with our children. We need volunteers in areas like music, arts, English, technology, and academic tutoring. Your experience can inspire a new generation.',
    donationTiers: [
      {
        name: 'Monthly Plan',
        amountCOP: 65000,
        period: 'month',
        description: 'Sponsor a child with education, meals, and access to all programs for one month.',
        impact: '1 child / 1 month',
        highlighted: false,
      },
      {
        name: 'Semester Plan',
        amountCOP: 330000,
        period: 'semester',
        description: 'Six months of comprehensive sponsorship for a child.',
        impact: '1 child / 6 months',
        highlighted: false,
      },
      {
        name: 'Annual Plan',
        amountCOP: 650000,
        period: 'year',
        description: 'A full year of comprehensive sponsorship: education, meals, and all programs.',
        impact: '1 child / 1 year',
        highlighted: true,
      },
      {
        name: 'Gold Plan',
        amountCOP: 1200000,
        period: 'year',
        description: 'Sponsor two children for a full year with comprehensive coverage.',
        impact: '2 children / 1 year',
        highlighted: false,
      },
      {
        name: 'Platinum Plan',
        amountCOP: 1650000,
        period: 'year',
        description: 'Sponsor three children for a full year with comprehensive coverage.',
        impact: '3 children / 1 year',
        highlighted: false,
      },
      {
        name: 'Ultra Plan',
        amountCOP: 2100000,
        period: 'year',
        description: 'Sponsor four children for a year with the highest level of coverage.',
        impact: '4 children / 1 year',
        highlighted: false,
      },
    ],
  });

  strapi.log.info('Seeded ways to help (ES + EN).');
}

// ---------------------------------------------------------------------------
// About Page (single type)
// ---------------------------------------------------------------------------
async function seedAboutPage(strapi: Core.Strapi) {
  const existing = await strapi
    .documents('api::about-page.about-page')
    .findMany();
  if (existing.length > 0) {
    strapi.log.info('About page already seeded, skipping.');
    return;
  }

  // Spanish timeline (reverse chronological: 2026 → 2002)
  const timelineES = [
    {
      year: '2026', title: 'Ampliación Salón San Jorge', icon: 'HiSparkles', color: 'from-accent-500 to-accent-700',
      items: ['Está proyectada la ampliación del cupo del Salón San Jorge, creando el Salón San Jorgito para niños de 6 a 12 años.'],
    },
    {
      year: '2025', title: '23 años de impacto', icon: 'HiHeart', color: 'from-primary-600 to-primary-800',
      items: [
        'La Fundación reporta más de 23 años de servicio.',
        'Ha beneficiado a 1.090 familias y 1.877 niños, niñas y adolescentes.',
        'Se consolida como referente de cuidado integral, educación, arte, deporte, tecnología y acompañamiento psicosocial.',
      ],
    },
    {
      year: '2023', title: 'Primer concierto de la orquesta', icon: 'HiMusicNote', color: 'from-violet-500 to-violet-700',
      items: ['Se realiza el primer concierto de la orquesta (junio de 2023), un hito institucional.'],
    },
    {
      year: '2022', title: 'Competencia de casas e impulso musical', icon: 'HiFlag', color: 'from-sky-500 to-sky-700',
      items: [
        'Inicia la competencia de casas (Jaguar, Tiburón, Caimán y Cóndor), inspirada en el modelo inglés.',
        'Se fortalece el sueño de la orquesta gracias a donación de una importante ONG colombiana.',
        'Se graba el himno de la Fundación (en diciembre de 2022, con Claraluna y profesores de música).',
      ],
    },
    {
      year: '2020', title: 'Mascota Racamandaca', icon: 'HiStar', color: 'from-accent-400 to-accent-600',
      items: ['La Fundación adopta su mascota Racamandaca, inspirada en "las cigarritas".'],
    },
    {
      year: '2019', title: 'Edificio Greta Thunberg', icon: 'HiLightBulb', color: 'from-primary-500 to-primary-700',
      items: [
        'Se adquieren contenedores reciclados y se construye el Edificio Greta Thunberg (2 pisos).',
        'Allí funcionan el Salón San Jorge y el salón de gimnasia.',
      ],
    },
    {
      year: '2017–2019', title: 'Nuevo edificio para ropero y música', icon: 'HiMusicNote', color: 'from-rose-500 to-rose-700',
      items: [
        'Se construye un edificio de tres pisos para el ropero y salones de música.',
        'Se fortalece la visión de impulsar el programa musical y una futura orquesta.',
      ],
    },
    {
      year: '2015', title: 'Nuevo comedor e infraestructura', icon: 'HiOfficeBuilding', color: 'from-emerald-500 to-emerald-700',
      items: ['Se inaugura un nuevo comedor, más dos salones, baños y oficina administrativa.'],
    },
    {
      year: '2014', title: 'Adultos mayores y obra comunitaria', icon: 'HiUserGroup', color: 'from-accent-500 to-accent-700',
      items: [
        'Se incorpora un grupo de adultos mayores, fortaleciendo el intercambio intergeneracional.',
        'Con la comunidad y Fundación Techo, se adoquina la vía de acceso principal hacia la Fundación.',
      ],
    },
    {
      year: '2013', title: 'Nace el Salón Malala', icon: 'HiAcademicCap', color: 'from-violet-400 to-violet-600',
      items: ['Se crea el Salón Malala, un espacio para adolescentes (12+ años) en jornada alterna.'],
    },
    {
      year: '2011', title: 'Casa Na', icon: 'HiHome', color: 'from-primary-400 to-primary-600',
      items: [
        'La Fundación compra la Casa Na.',
        'Allí se instala de forma permanente la panadería y una enfermería.',
        'En el local arrendado anteriormente se abre un ropero comunitario (fuente alterna de ingresos).',
      ],
    },
    {
      year: '2010', title: 'Tecnología y formación para emprendimiento', icon: 'HiDesktopComputer', color: 'from-sky-400 to-sky-600',
      items: [
        'Se remodela y dota el salón de informática "Cigarrita" (donación del IRT del Reino Unido).',
        'Se arrienda un local para panadería, con cursos de panadería y repostería (con mediación de FUMDIR).',
      ],
    },
    {
      year: '2009', title: 'Parque infantil', icon: 'HiStar', color: 'from-emerald-400 to-emerald-600',
      items: ['Se construye el parque infantil junto con la comunidad.'],
    },
    {
      year: '2003', title: 'Primera gran donación internacional', icon: 'HiGlobeAlt', color: 'from-accent-400 to-accent-600',
      items: ['En mayo de 2003 llega la primera gran donación internacional (benefactor anónimo), un apoyo que continúa en el tiempo.'],
    },
    {
      year: '2002–2003', title: 'Primeros apoyos y expansión social', icon: 'HiHeart', color: 'from-rose-400 to-rose-600',
      items: [
        'Se realizan jornadas de vacunación y brigadas de salud.',
        'Durante un año, Médicos Sin Fronteras brinda atención primaria.',
        'Se ofrecen servicios de odontología con voluntarias.',
        'El Programa Mundial de Alimentos apoya con alimentos y suplementos en los primeros años.',
      ],
    },
    {
      year: '2002', title: 'Nace Fundación Cigarra', icon: 'HiSparkles', color: 'from-primary-500 to-primary-700',
      items: [
        'La Dra. Carolyn Acosta Allen funda la Fundación Cigarra en respuesta a la situación de desplazamiento en Colombia.',
        'Se identifica una necesidad urgente en Puertas del Paraíso (Ciudad Bolívar): un lugar seguro para que niños y niñas permanezcan mientras sus padres trabajan.',
        'Con apoyo de la comunidad y Servivienda, se inicia la construcción en mayo; en agosto ya estaba terminada y en septiembre abre sus puertas.',
        'Inicia atención a aproximadamente 120 niños y niñas (de 3 meses a 9 años).',
        'También se impulsan cursos de tejido para madres.',
        'La Fundación gestiona la llegada de servicios básicos (agua, luz, alcantarillado) y, junto con la comunidad, construye dos escaleras de acceso.',
      ],
    },
  ];

  // English timeline (same order)
  const timelineEN = [
    {
      year: '2026', title: 'San Jorge Room Expansion', icon: 'HiSparkles', color: 'from-accent-500 to-accent-700',
      items: ['The expansion of the San Jorge Room capacity is projected, creating the San Jorgito Room for children ages 6 to 12.'],
    },
    {
      year: '2025', title: '23 Years of Impact', icon: 'HiHeart', color: 'from-primary-600 to-primary-800',
      items: [
        'The Foundation reports over 23 years of service.',
        'It has benefited 1,090 families and 1,877 children and adolescents.',
        'It is consolidated as a benchmark for comprehensive care, education, art, sports, technology, and psychosocial support.',
      ],
    },
    {
      year: '2023', title: 'First Orchestra Concert', icon: 'HiMusicNote', color: 'from-violet-500 to-violet-700',
      items: ['The first orchestra concert takes place (June 2023), an institutional milestone.'],
    },
    {
      year: '2022', title: 'House Competition and Musical Momentum', icon: 'HiFlag', color: 'from-sky-500 to-sky-700',
      items: [
        'The house competition begins (Jaguar, Shark, Caiman, and Condor), inspired by the English model.',
        'The orchestra dream is strengthened thanks to a donation from a major Colombian NGO.',
        "The Foundation's anthem is recorded (December 2022, with Claraluna and music teachers).",
      ],
    },
    {
      year: '2020', title: 'Racamandaca Mascot', icon: 'HiStar', color: 'from-accent-400 to-accent-600',
      items: ['The Foundation adopts its mascot Racamandaca, inspired by "las cigarritas".'],
    },
    {
      year: '2019', title: 'Greta Thunberg Building', icon: 'HiLightBulb', color: 'from-primary-500 to-primary-700',
      items: [
        'Recycled containers are acquired and the Greta Thunberg Building (2 floors) is constructed.',
        'The San Jorge Room and the gymnastics room operate there.',
      ],
    },
    {
      year: '2017–2019', title: 'New Building for Clothing Closet and Music', icon: 'HiMusicNote', color: 'from-rose-500 to-rose-700',
      items: [
        'A three-story building is constructed for the clothing closet and music rooms.',
        'The vision of promoting the music program and a future orchestra is strengthened.',
      ],
    },
    {
      year: '2015', title: 'New Dining Hall and Infrastructure', icon: 'HiOfficeBuilding', color: 'from-emerald-500 to-emerald-700',
      items: ['A new dining hall is inaugurated, plus two classrooms, bathrooms, and an administrative office.'],
    },
    {
      year: '2014', title: 'Senior Citizens and Community Works', icon: 'HiUserGroup', color: 'from-accent-500 to-accent-700',
      items: [
        'A senior citizens group is incorporated, strengthening intergenerational exchange.',
        'With the community and Fundación Techo, the main access road to the Foundation is paved.',
      ],
    },
    {
      year: '2013', title: 'The Malala Room is Born', icon: 'HiAcademicCap', color: 'from-violet-400 to-violet-600',
      items: ['The Malala Room is created, a space for teenagers (12+ years) during alternate hours.'],
    },
    {
      year: '2011', title: 'Casa Na', icon: 'HiHome', color: 'from-primary-400 to-primary-600',
      items: [
        'The Foundation purchases Casa Na.',
        'The bakery and a nursing station are permanently installed there.',
        'In the previously rented space, a community clothing closet opens (alternative income source).',
      ],
    },
    {
      year: '2010', title: 'Technology and Entrepreneurship Training', icon: 'HiDesktopComputer', color: 'from-sky-400 to-sky-600',
      items: [
        'The "Cigarrita" computer room is remodeled and equipped (donation from IRT, United Kingdom).',
        'A bakery space is rented, with baking and pastry courses (mediated by FUMDIR).',
      ],
    },
    {
      year: '2009', title: "Children's Playground", icon: 'HiStar', color: 'from-emerald-400 to-emerald-600',
      items: ["The children's playground is built together with the community."],
    },
    {
      year: '2003', title: 'First Major International Donation', icon: 'HiGlobeAlt', color: 'from-accent-400 to-accent-600',
      items: ['In May 2003, the first major international donation arrives (anonymous benefactor), a support that continues over time.'],
    },
    {
      year: '2002–2003', title: 'First Support and Social Expansion', icon: 'HiHeart', color: 'from-rose-400 to-rose-600',
      items: [
        'Vaccination drives and health brigades are carried out.',
        'For one year, Médecins Sans Frontières provides primary care.',
        'Dental services are offered with volunteers.',
        'The World Food Programme supports with food and supplements in the early years.',
      ],
    },
    {
      year: '2002', title: 'Cigarra Foundation is Born', icon: 'HiSparkles', color: 'from-primary-500 to-primary-700',
      items: [
        'Dr. Carolyn Acosta Allen founds the Cigarra Foundation in response to the displacement crisis in Colombia.',
        'An urgent need is identified in Puertas del Paraíso (Ciudad Bolívar): a safe place for children while their parents work.',
        'With community support and Servivienda, construction begins in May; by August it was finished and in September it opens its doors.',
        'Begins serving approximately 120 children (ages 3 months to 9 years).',
        'Knitting courses for mothers are also launched.',
        'The Foundation secures basic services (water, electricity, sewage) and, together with the community, builds two access staircases.',
      ],
    },
  ];

  const doc = await strapi.documents('api::about-page.about-page').create({
    data: {
      mission:
        'Nuestra misión es transformar la vida de niños, niñas y jóvenes en situación de vulnerabilidad en Ciudad Bolívar, Bogotá, a través de programas educativos, artísticos y de desarrollo humano que les permitan descubrir su potencial, fortalecer sus valores y construir un futuro digno para ellos y sus familias.',
      vision:
        'Ser la fundación referente en transformación social a través del arte y la educación en las comunidades más vulnerables de Colombia, reconocida por el impacto sostenible en la vida de las familias y por formar ciudadanos íntegros, creativos y comprometidos con su comunidad.',
      history:
        'La Fundación Cigarra nació en 2002 en el barrio Lucero Alto de Ciudad Bolívar, Bogotá, cuando un grupo de vecinos decidió abrir un espacio seguro donde los niños del sector pudieran aprender, crear y soñar. Lo que empezó como clases de música en un pequeño salón comunal se convirtió en una organización que hoy ofrece 13 programas, ha ayudado a más de 1.877 niños, generado más de 100 empleos y beneficiado a más de 190 familias.\n\nA lo largo de 23 años, la Cigarra ha sobrevivido gracias al compromiso de su comunidad, el trabajo de voluntarios apasionados y el apoyo de aliados nacionales e internacionales que creen en el poder transformador de la educación y el arte.',
      foundedYear: 2002,
      seo: { metaTitle: 'Quiénes Somos | Fundación Cigarra', metaDescription: 'Desde 2002, la Fundación Cigarra transforma vidas de niños en Ciudad Bolívar a través del arte y la educación.' },
      timeline: timelineES,
    } as any,
    locale: 'es',
    status: 'published',
  });

  await addEnglishLocale(strapi, 'api::about-page.about-page', doc.documentId, {
    mission:
      'Our mission is to transform the lives of vulnerable children and youth in Ciudad Bolívar, Bogotá, through educational, artistic, and human development programs that allow them to discover their potential, strengthen their values, and build a dignified future for themselves and their families.',
    vision:
      'To be the leading foundation in social transformation through art and education in Colombia\'s most vulnerable communities, recognized for the sustainable impact on families\' lives and for developing well-rounded, creative citizens committed to their community.',
    history:
      'Fundación Cigarra was born in 2002 in the Lucero Alto neighborhood of Ciudad Bolívar, Bogotá, when a group of neighbors decided to open a safe space where local children could learn, create, and dream. What started as music classes in a small community hall became an organization that today offers 13 programs, has helped more than 1,877 children, created over 100 jobs, and benefited more than 190 families.\n\nOver 23 years, La Cigarra has survived thanks to the commitment of its community, the work of passionate volunteers, and the support of national and international partners who believe in the transformative power of education and art.',
    seo: { metaTitle: 'About Us | Fundación Cigarra', metaDescription: 'Since 2002, Fundación Cigarra transforms children\'s lives in Ciudad Bolívar through art and education.' },
    timeline: timelineEN,
  });

  strapi.log.info('Seeded about page with 16 timeline entries (ES + EN).');
}
