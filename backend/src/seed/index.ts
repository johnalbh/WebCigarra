import type { Core } from '@strapi/strapi';

export default async function seed(strapi: Core.Strapi) {
  strapi.log.info('🌱 Seed script started...');

  await seedPrograms(strapi);
  await seedSuccessStories(strapi);
  await seedPartners(strapi);
  await seedArticles(strapi);
  await seedHero(strapi);
  await seedImpactStatistics(strapi);
  await seedGlobalSettings(strapi);
  await seedWaysToHelp(strapi);
  await seedAboutPage(strapi);

  strapi.log.info('🌱 Seed script completed successfully.');
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
      name: 'Música',
      slug: 'musica',
      shortDescription:
        'Enseñamos instrumentos musicales, canto y teoría musical para desarrollar el talento artístico de los niños.',
      icon: 'HiMusicNote',
      color: '#E74C3C',
      order: 1,
      featured: true,
    },
    {
      name: 'Artes Plásticas',
      slug: 'artes-plasticas',
      shortDescription:
        'Fomentamos la creatividad a través de la pintura, el dibujo y la escultura.',
      icon: 'HiPaintBrush',
      color: '#3498DB',
      order: 2,
      featured: true,
    },
    {
      name: 'Refuerzo Escolar',
      slug: 'refuerzo-escolar',
      shortDescription:
        'Acompañamiento académico para fortalecer las competencias escolares de los estudiantes.',
      icon: 'HiAcademicCap',
      color: '#2ECC71',
      order: 3,
      featured: true,
    },
    {
      name: 'Danza',
      slug: 'danza',
      shortDescription:
        'Expresión corporal y ritmo a través de danzas folclóricas y contemporáneas.',
      icon: 'HiSparkles',
      color: '#F39C12',
      order: 4,
      featured: true,
    },
    {
      name: 'Teatro',
      slug: 'teatro',
      shortDescription:
        'Desarrollamos habilidades comunicativas y de expresión a través de las artes escénicas.',
      icon: 'HiStar',
      color: '#9B59B6',
      order: 5,
      featured: false,
    },
    {
      name: 'Emprendimiento',
      slug: 'emprendimiento',
      shortDescription:
        'Formamos jóvenes emprendedores con herramientas para crear sus propios proyectos productivos.',
      icon: 'HiLightBulb',
      color: '#1ABC9C',
      order: 6,
      featured: false,
    },
    {
      name: 'Inglés',
      slug: 'ingles',
      shortDescription:
        'Enseñanza del idioma inglés como segunda lengua para ampliar las oportunidades de los jóvenes.',
      icon: 'HiGlobeAlt',
      color: '#E67E22',
      order: 7,
      featured: true,
    },
    {
      name: 'Valores y Liderazgo',
      slug: 'valores-y-liderazgo',
      shortDescription:
        'Formación en valores, convivencia y habilidades de liderazgo para la vida.',
      icon: 'HiHeart',
      color: '#E91E63',
      order: 8,
      featured: false,
    },
    {
      name: 'Fotografía',
      slug: 'fotografia',
      shortDescription:
        'Aprendemos técnicas fotográficas para capturar la realidad y contar historias a través de la imagen.',
      icon: 'HiCamera',
      color: '#00BCD4',
      order: 9,
      featured: false,
    },
    {
      name: 'Recreación',
      slug: 'recreacion',
      shortDescription:
        'Actividades lúdicas y deportivas que promueven el bienestar físico y emocional.',
      icon: 'HiPuzzlePiece',
      color: '#FF5722',
      order: 10,
      featured: false,
    },
    {
      name: 'Escuela de Padres',
      slug: 'escuela-de-padres',
      shortDescription:
        'Talleres para padres de familia enfocados en crianza positiva y acompañamiento familiar.',
      icon: 'HiUserGroup',
      color: '#4CAF50',
      order: 11,
      featured: false,
    },
    {
      name: 'Pre-ICFES',
      slug: 'pre-icfes',
      shortDescription:
        'Preparación para las pruebas de estado ICFES con simulacros y refuerzo en áreas clave.',
      icon: 'HiClipboardDocumentList',
      color: '#673AB7',
      order: 12,
      featured: false,
    },
    {
      name: 'Manualidades',
      slug: 'manualidades',
      shortDescription:
        'Creación artesanal que estimula la motricidad fina y la expresión creativa.',
      icon: 'HiScissors',
      color: '#FF9800',
      order: 13,
      featured: false,
    },
    {
      name: 'Sistemas',
      slug: 'sistemas',
      shortDescription:
        'Formación en informática y tecnología para preparar a los jóvenes para el mundo digital.',
      icon: 'HiComputerDesktop',
      color: '#2196F3',
      order: 14,
      featured: true,
    },
  ];

  for (const program of programs) {
    await strapi.documents('api::program.program').create({
      data: program as any,
      status: 'published',
    });
  }

  strapi.log.info(`Seeded ${programs.length} programs.`);
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
    },
    {
      name: 'Leider Quiñones',
      slug: 'leider-quinones',
      currentRole: 'Instructor de danza folclórica',
      quote:
        'Gracias a la Cigarra descubrí mi pasión por la danza y hoy puedo enseñarle a otros niños lo que a mí me enseñaron.',
      achievement: 'Fundó su propia escuela de danza en Ciudad Bolívar',
      featured: true,
    },
    {
      name: 'Juan David Hernández',
      slug: 'juan-david-hernandez',
      currentRole: 'Ingeniero de Sistemas',
      quote:
        'En la Cigarra aprendí que la tecnología puede transformar comunidades. Hoy trabajo para hacer eso realidad.',
      achievement: 'Graduado como Ingeniero de Sistemas con beca completa',
      featured: true,
    },
    {
      name: 'Andrey Ruíz',
      slug: 'andrey-ruiz',
      currentRole: 'Emprendedor social',
      quote:
        'El programa de emprendimiento me enseñó a soñar en grande y a trabajar con disciplina para lograrlo.',
      achievement: 'Creó una empresa de servicios tecnológicos que emplea a jóvenes de la comunidad',
      featured: false,
    },
    {
      name: 'Yuri Karina Poveda',
      slug: 'yuri-karina-poveda',
      currentRole: 'Docente de artes plásticas',
      quote:
        'Cada trazo que les enseño a mis estudiantes lleva un poco de lo que la Cigarra sembró en mí.',
      achievement: 'Licenciada en Artes Visuales y docente en colegio público de Bogotá',
      featured: true,
    },
    {
      name: 'Angie Tatiana Poveda',
      slug: 'angie-tatiana-poveda',
      currentRole: 'Fotógrafa profesional',
      quote:
        'La fotografía me abrió los ojos a una nueva forma de ver mi barrio y mi gente. Todo empezó en la Cigarra.',
      achievement: 'Expuso su trabajo fotográfico en la Galería Santa Fe de Bogotá',
      featured: false,
    },
  ];

  for (const story of stories) {
    await strapi.documents('api::success-story.success-story').create({
      data: story as any,
      status: 'published',
    });
  }

  strapi.log.info(`Seeded ${stories.length} success stories.`);
}

// ---------------------------------------------------------------------------
// Partners
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
    { name: 'Saint George School', tier: 'gold', order: 1, active: true },
    { name: 'Microsoft', tier: 'platinum', order: 2, active: true },
    { name: 'Ecopetrol', tier: 'platinum', order: 3, active: true },
    { name: 'Charles Wright', tier: 'gold', order: 4, active: true },
    { name: 'Karelsie Foundation', tier: 'gold', order: 5, active: true },
    { name: 'Aqualogic', tier: 'silver', order: 6, active: true },
    { name: 'Chocolates Bora', tier: 'silver', order: 7, active: true },
    { name: 'Opperar', tier: 'silver', order: 8, active: true },
    { name: 'HomeCenter', tier: 'gold', order: 9, active: true },
    { name: 'Makri', tier: 'silver', order: 10, active: true },
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
    },
    {
      title: 'Resultados del Pre-ICFES 2025',
      slug: 'resultados-pre-icfes-2025',
      excerpt:
        'Nuestros estudiantes lograron mejorar sus puntajes en un 25% promedio tras el programa de preparación.',
      content:
        'Los resultados del programa Pre-ICFES 2025 demuestran el impacto positivo de nuestra metodología de preparación. Los 35 estudiantes que participaron en el programa lograron una mejora promedio del 25% en sus puntajes de simulacro.\n\nEl programa incluyó sesiones intensivas en matemáticas, lectura crítica, ciencias naturales y sociales, acompañadas de simulacros semanales y retroalimentación personalizada.\n\nDestacamos especialmente los avances en lectura crítica, donde varios estudiantes alcanzaron puntajes superiores a 70 sobre 100.',
      publishDate: '2025-10-20',
      author: 'Equipo Académico',
      tags: ['educación', 'pre-icfes', 'resultados'],
      featured: false,
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
    },
    {
      title: 'Alianza con Ecopetrol para becas educativas',
      slug: 'alianza-ecopetrol-becas-educativas',
      excerpt:
        'Ecopetrol se une como aliado estratégico para financiar becas universitarias para nuestros egresados más destacados.',
      content:
        'La Fundación Cigarra firmó un convenio con Ecopetrol para la creación de un fondo de becas universitarias dirigido a los egresados más destacados de nuestros programas.\n\nEl fondo cubrirá matrículas, materiales y un auxilio de sostenimiento para hasta 10 jóvenes por año que ingresen a programas de educación superior.\n\n"Invertir en la educación de estos jóvenes es invertir en el futuro de Colombia", señaló el representante de Ecopetrol durante la firma del convenio.\n\nLos interesados podrán postularse a partir del próximo mes a través de nuestra página web.',
      publishDate: '2025-08-05',
      author: 'Dirección',
      tags: ['becas', 'alianzas', 'educación superior'],
      featured: false,
    },
    {
      title: 'Taller de fotografía: "Mi barrio en imágenes"',
      slug: 'taller-fotografia-mi-barrio-en-imagenes',
      excerpt:
        'Los participantes del programa de fotografía capturaron la vida cotidiana de Ciudad Bolívar en una exposición abierta al público.',
      content:
        'El programa de fotografía de la Fundación Cigarra presentó la exposición "Mi barrio en imágenes", donde 15 jóvenes fotógrafos mostraron su visión de Ciudad Bolívar a través del lente.\n\nLas fotografías capturaron momentos cotidianos, paisajes urbanos y retratos de los habitantes del barrio, revelando la belleza y la resiliencia de la comunidad.\n\nLa exposición estuvo abierta al público durante dos semanas y recibió más de 300 visitantes, incluyendo representantes de medios de comunicación que destacaron el talento de los jóvenes.',
      publishDate: '2025-07-18',
      author: 'Programa de Fotografía',
      tags: ['fotografía', 'exposición', 'comunidad'],
      featured: true,
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
    },
  ];

  for (const article of articles) {
    await strapi.documents('api::article.article').create({
      data: article as any,
      status: 'published',
    });
  }

  strapi.log.info(`Seeded ${articles.length} articles.`);
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

  await strapi.documents('api::hero.hero').create({
    data: {
      title: 'Fundación Cigarra',
      subtitle:
        'Transformamos vidas a través del arte, la educación y el amor en Ciudad Bolívar, Bogotá.',
      tagline: 'Sembrando esperanza desde 2002',
    } as any,
    status: 'published',
  });

  strapi.log.info('Seeded hero section.');
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

  await strapi.documents('api::impact-statistic.impact-statistic').create({
    data: {
      sectionTitle: 'Nuestro Impacto',
      stats: [
        {
          label: 'Niños ayudados',
          value: 1877,
          suffix: '+',
          icon: 'HiUserGroup',
          order: 1,
        },
        {
          label: 'Años de servicio',
          value: 23,
          suffix: '',
          icon: 'HiCalendar',
          order: 2,
        },
        {
          label: 'Empleos generados',
          value: 100,
          suffix: '+',
          icon: 'HiBookOpen',
          order: 3,
        },
        {
          label: 'Familias beneficiadas',
          value: 190,
          suffix: '+',
          icon: 'HiHome',
          order: 4,
        },
      ],
    } as any,
    status: 'published',
  });

  strapi.log.info('Seeded impact statistics.');
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

  await strapi.documents('api::global-setting.global-setting').create({
    data: {
      siteName: 'Fundación Cigarra',
      nit: '830.123.456-7',
      operatingHours: 'Lunes a Viernes: 8:00 AM - 5:00 PM\nSábados: 8:00 AM - 12:00 PM',
      contact: {
        phone: '+573212465421',
        whatsapp: '+573212465421',
        email: 'info@cigarra.org',
        address: 'Cra 18M #75-25 Sur, Ciudad Bolívar',
        city: 'Bogotá, Colombia',
      },
      socialLinks: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/FundacionCigarra',
        },
        {
          platform: 'instagram',
          url: 'https://www.instagram.com/fundacioncigarra',
        },
        {
          platform: 'youtube',
          url: 'https://www.youtube.com/@FundacionCigarra',
        },
      ],
      navLinks: [
        { label: 'Inicio', url: '/', order: 1 },
        { label: 'Quiénes Somos', url: '/quienes-somos', order: 2 },
        { label: 'Programas', url: '/programas', order: 3 },
        { label: 'Historias de Éxito', url: '/historias-de-exito', order: 4 },
        { label: 'Noticias', url: '/noticias', order: 5 },
        { label: 'Cómo Ayudar', url: '/como-ayudar', order: 6 },
        { label: 'Contacto', url: '/contacto', order: 7 },
      ],
    } as any,
  });

  strapi.log.info('Seeded global settings.');
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

  await strapi.documents('api::ways-to-help.ways-to-help').create({
    data: {
      heroTitle: 'Cómo Puedes Ayudar',
      heroSubtitle:
        'Tu aporte transforma la vida de niños y jóvenes en Ciudad Bolívar. Cada donación, por pequeña que sea, genera un impacto enorme.',
      donationLinkCOP: 'https://donate.cigarra.org/cop',
      donationLinkUSD: 'https://donate.cigarra.org/usd',
      nutritionCostCOP: 150000,
      sponsorChildTitle: 'Apadrina un Niño',
      sponsorChildDescription:
        'Con tu apadrinamiento mensual, un niño puede acceder a todos nuestros programas, recibir alimentación nutritiva y acompañamiento integral. Tu apoyo cambia una vida para siempre.',
      volunteerTitle: 'Sé Voluntario',
      volunteerDescription:
        'Comparte tu talento y tu tiempo con nuestros niños. Necesitamos voluntarios en áreas como música, artes, inglés, tecnología y refuerzo escolar. Tu experiencia puede inspirar a una nueva generación.',
      donationTiers: [
        {
          name: 'Amigo',
          amountCOP: 50000,
          amountUSD: 15,
          description:
            'Cubre materiales escolares para un niño durante un mes.',
          impact: 'Materiales para 1 niño',
          highlighted: false,
        },
        {
          name: 'Colaborador',
          amountCOP: 150000,
          amountUSD: 40,
          description:
            'Financia la alimentación nutritiva de un niño durante un mes completo.',
          impact: 'Alimentación para 1 niño',
          highlighted: true,
        },
        {
          name: 'Padrino',
          amountCOP: 300000,
          amountUSD: 80,
          description:
            'Apadrina integralmente a un niño: educación, alimentación y acceso a todos los programas.',
          impact: 'Apadrinamiento integral',
          highlighted: false,
        },
        {
          name: 'Transformador',
          amountCOP: 500000,
          amountUSD: 130,
          description:
            'Apoya el sostenimiento de un programa completo durante un mes.',
          impact: 'Sostenimiento de 1 programa',
          highlighted: false,
        },
      ],
    } as any,
    status: 'published',
  });

  strapi.log.info('Seeded ways to help.');
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

  await strapi.documents('api::about-page.about-page').create({
    data: {
      mission:
        'Nuestra misión es transformar la vida de niños, niñas y jóvenes en situación de vulnerabilidad en Ciudad Bolívar, Bogotá, a través de programas educativos, artísticos y de desarrollo humano que les permitan descubrir su potencial, fortalecer sus valores y construir un futuro digno para ellos y sus familias.',
      vision:
        'Ser la fundación referente en transformación social a través del arte y la educación en las comunidades más vulnerables de Colombia, reconocida por el impacto sostenible en la vida de las familias y por formar ciudadanos íntegros, creativos y comprometidos con su comunidad.',
      history:
        'La Fundación Cigarra nació en 2002 en el barrio Lucero Alto de Ciudad Bolívar, Bogotá, cuando un grupo de vecinos decidió abrir un espacio seguro donde los niños del sector pudieran aprender, crear y soñar. Lo que empezó como clases de música en un pequeño salón comunal se convirtió en una organización que hoy ofrece 14 programas, ha ayudado a más de 1.877 niños, generado más de 100 empleos y beneficiado a más de 190 familias.\n\nA lo largo de 23 años, la Cigarra ha sobrevivido gracias al compromiso de su comunidad, el trabajo de voluntarios apasionados y el apoyo de aliados nacionales e internacionales que creen en el poder transformador de la educación y el arte.',
      foundedYear: 2002,
      timeline: [
        {
          year: '2002',
          title: 'Fundación',
          description:
            'Nace la Fundación Cigarra en el barrio Lucero Alto de Ciudad Bolívar con clases de música para 15 niños.',
        },
        {
          year: '2005',
          title: 'Primeros programas',
          description:
            'Se amplía la oferta con artes plásticas, danza y refuerzo escolar, atendiendo a 40 niños.',
        },
        {
          year: '2010',
          title: 'Sede propia',
          description:
            'La fundación adquiere su sede propia gracias a donaciones y al trabajo de la comunidad.',
        },
        {
          year: '2015',
          title: 'Alianzas estratégicas',
          description:
            'Se formalizan alianzas con Microsoft, Saint George School y otras organizaciones para ampliar el impacto.',
        },
        {
          year: '2018',
          title: 'Programa de emprendimiento',
          description:
            'Se lanza el programa de emprendimiento juvenil con apoyo de Ecopetrol.',
        },
        {
          year: '2022',
          title: '20 años de servicio',
          description:
            'Celebramos 23 años transformando vidas con 14 programas activos y más de 1.877 niños ayudados.',
        },
        {
          year: '2025',
          title: 'Expansión digital',
          description:
            'Lanzamiento de la plataforma web y programas de formación en tecnología y sistemas.',
        },
      ],
    } as any,
    status: 'published',
  });

  strapi.log.info('Seeded about page.');
}
