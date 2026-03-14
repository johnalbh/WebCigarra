import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';
import os from 'os';

// ---------------------------------------------------------------------------
// Image upload helper — downloads from URL and uploads to Strapi Media Library
// ---------------------------------------------------------------------------
async function uploadImage(
  strapi: Core.Strapi,
  imageUrl: string,
  fileName: string,
): Promise<any | null> {
  try {
    const response = await fetch(imageUrl, { redirect: 'follow' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());

    const tmpPath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(tmpPath, buffer);

    const uploadService = strapi.plugin('upload').service('upload');
    // Strapi v5 uses formidable v3 format: filepath, originalFilename, mimetype
    const [uploaded] = await uploadService.upload({
      data: {},
      files: {
        filepath: tmpPath,
        originalFilename: fileName,
        mimetype: 'image/jpeg',
        size: buffer.length,
      },
    });

    fs.unlinkSync(tmpPath);
    return uploaded;
  } catch (err: any) {
    strapi.log.warn(`⚠️ Could not upload image ${fileName}: ${err.message}`);
    return null;
  }
}

async function linkMedia(
  strapi: Core.Strapi,
  uid: string,
  documentId: string,
  field: string,
  fileOrFiles: any,
  locale?: string,
) {
  if (!fileOrFiles) return;
  const ids = Array.isArray(fileOrFiles)
    ? fileOrFiles.filter(Boolean).map((f: any) => f.id)
    : fileOrFiles.id;
  if (Array.isArray(ids) && ids.length === 0) return;

  // Strapi v5 document service update() only writes morph relations to the
  // draft row. We need morphs on ALL internal rows (draft + published) for
  // the API to return media. Insert directly via knex.
  const meta = strapi.db.metadata.get(uid);
  const tableName = (meta as any).tableName;

  // Find ALL internal rows for this document + locale (draft + published)
  const qb = strapi.db.connection(tableName)
    .where({ document_id: documentId })
    .select('id', 'locale', 'published_at');
  if (locale) qb.andWhere({ locale });
  const rows = await qb;

  if (rows.length === 0) {
    strapi.log.warn(`linkMedia: no rows found for ${uid} doc=${documentId} locale=${locale}`);
    return;
  }

  const fileIds = Array.isArray(ids) ? ids : [ids];

  for (const row of rows) {
    for (let i = 0; i < fileIds.length; i++) {
      await strapi.db.connection('files_related_mph').insert({
        file_id: fileIds[i],
        related_id: row.id,
        related_type: uid,
        field,
        order: i + 1,
      });
    }
  }
  strapi.log.debug(`linkMedia: ${uid} doc=${documentId} locale=${locale} → ${rows.length} rows, ${fileIds.length} files`);
}

export default async function seed(strapi: Core.Strapi) {
  strapi.log.info('🌱 Seed script started...');

  // Ensure locales exist before seeding content
  await ensureLocales(strapi);

  // If SEED_FORCE=true, delete all existing content first
  if (process.env.SEED_FORCE === 'true') {
    strapi.log.info('🗑️ SEED_FORCE=true — clearing existing content...');
    await clearAllContent(strapi);
  }

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
  await seedVideos(strapi);

  strapi.log.info('🌱 Seed script completed successfully.');
}

// ---------------------------------------------------------------------------
// Clear all content for re-seeding
// ---------------------------------------------------------------------------
async function clearAllContent(strapi: Core.Strapi) {
  const uids = [
    'api::program.program',
    'api::success-story.success-story',
    'api::partner.partner',
    'api::article.article',
    'api::team-member.team-member',
    'api::hero.hero',
    'api::impact-statistic.impact-statistic',
    'api::global-setting.global-setting',
    'api::ways-to-help.ways-to-help',
    'api::about-page.about-page',
    'api::video.video',
  ];

  for (const uid of uids) {
    const docs = await (strapi.documents(uid as any) as any).findMany({ locale: 'es', pagination: { limit: -1 } });
    for (const doc of docs) {
      await (strapi.documents(uid as any) as any).delete({ documentId: doc.documentId });
    }
    strapi.log.info(`🗑️ Cleared ${docs.length} documents from ${uid}`);
  }

  // Also clear seed-uploaded files from the media library
  try {
    const uploadService = strapi.plugin('upload').service('upload');
    const files = await strapi.db.query('plugin::upload.file').findMany({ limit: 1000 });
    const seedFiles = files.filter((f: any) =>
      f.name.startsWith('program-') || f.name.startsWith('story-') ||
      f.name.startsWith('partner-') || f.name.startsWith('article-') ||
      f.name.startsWith('team-') || f.name.startsWith('hero-') ||
      f.name.startsWith('impact-') || f.name.startsWith('site-logo') ||
      f.name.startsWith('about-gallery')
    );
    for (const file of seedFiles) {
      await uploadService.remove(file);
    }
    strapi.log.info(`🗑️ Cleared ${seedFiles.length} seed images from media library`);
  } catch (err: any) {
    strapi.log.warn(`⚠️ Could not clear media: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Ensure i18n locales exist (es as default, en as secondary)
// ---------------------------------------------------------------------------
async function ensureLocales(strapi: Core.Strapi) {
  const localeService = strapi.plugin('i18n').service('locales');
  const existing = await localeService.find();
  const codes = existing.map((l: any) => l.code);

  if (!codes.includes('es')) {
    await localeService.create({ code: 'es', name: 'Spanish (es)', isDefault: true });
    strapi.log.info('🌍 Created locale: es (default)');
  }

  if (!codes.includes('en')) {
    await localeService.create({ code: 'en', name: 'English (en)', isDefault: false });
    strapi.log.info('🌍 Created locale: en');
  }

  // Ensure 'es' is the default
  const esLocale = (await localeService.find()).find((l: any) => l.code === 'es');
  if (esLocale && !esLocale.isDefault) {
    await localeService.setDefaultLocale({ code: 'es' });
    strapi.log.info('🌍 Set es as default locale');
  }
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
        'Transformamos los primeros cinco años de vida en una base sólida para el futuro a través de la estimulación temprana, el arte y el juego.',
      icon: 'HiSun',
      color: '#FF9800',
      order: 1,
      featured: false,
      seo: { metaTitle: 'Primera Infancia | Fundación Cigarra', metaDescription: 'Estimulación temprana, arte y juego para niños de 1 a 5 años. Desarrollo cognitivo, emocional y motriz en Ciudad Bolívar.' },
    },
    {
      name: 'Refuerzo Escolar',
      slug: 'refuerzo-escolar',
      shortDescription:
        'Jornadas alternas con refuerzo académico, robótica, danza, música, artes, inglés, deportes y emprendimiento.',
      icon: 'HiAcademicCap',
      color: '#2ECC71',
      order: 2,
      featured: true,
      seo: { metaTitle: 'Refuerzo Escolar | Fundación Cigarra', metaDescription: 'Jornadas alternas con refuerzo académico, robótica, artes, deportes y más para niños de 5 a 17 años en Ciudad Bolívar.' },
    },
    {
      name: 'Danza',
      slug: 'danza',
      shortDescription:
        'Coordinación, ritmo y expresión emocional fusionando la riqueza del folclor con la libertad de la danza contemporánea.',
      icon: 'HiSparkles',
      color: '#F39C12',
      order: 3,
      featured: true,
      seo: { metaTitle: 'Programa de Danza | Fundación Cigarra', metaDescription: 'Danza folclórica y contemporánea para niños de 1 a 17 años. Expresión, ritmo y cultura en Ciudad Bolívar.' },
    },
    {
      name: 'Inglés',
      slug: 'ingles',
      shortDescription:
        'Transformamos el aprendizaje de un idioma en una herramienta sin fronteras con metodologías dinámicas y participativas.',
      icon: 'HiGlobeAlt',
      color: '#E67E22',
      order: 4,
      featured: true,
      seo: { metaTitle: 'Programa de Inglés | Fundación Cigarra', metaDescription: 'Inglés para niños de 1 a 17 años con metodologías dinámicas y participativas en Ciudad Bolívar.' },
    },
    {
      name: 'Música',
      slug: 'musica',
      shortDescription:
        'Desde 2015, formación musical integral con instrumentos de cuerda, viento y percusión. Hogar de nuestra Orquesta Sinfónica de 60 jóvenes músicos.',
      icon: 'HiMusicNote',
      color: '#E74C3C',
      order: 5,
      featured: true,
      seo: { metaTitle: 'Programa de Música | Fundación Cigarra', metaDescription: 'Formación musical integral y Orquesta Sinfónica de 60 jóvenes músicos en Ciudad Bolívar.' },
    },
    {
      name: 'Artes',
      slug: 'artes',
      shortDescription:
        'Formación integral en artes plásticas, dibujo y pintura que potencia la creatividad, la expresión y la sensibilidad estética.',
      icon: 'HiCube',
      color: '#9B59B6',
      order: 6,
      featured: false,
      seo: { metaTitle: 'Programa de Artes | Fundación Cigarra', metaDescription: 'Formación integral en artes plásticas, dibujo y pintura para niños de 1 a 17 años en Ciudad Bolívar.' },
    },
    {
      name: 'Escuela de Artes',
      slug: 'escuela-de-artes',
      shortDescription:
        'Espacio abierto a toda la comunidad para explorar artes plásticas, dibujo, pintura y música los sábados.',
      icon: 'HiStar',
      color: '#FF5722',
      order: 7,
      featured: false,
      seo: { metaTitle: 'Escuela de Artes | Fundación Cigarra', metaDescription: 'Formación artística multidisciplinaria los sábados para toda la comunidad en Ciudad Bolívar.' },
    },
    {
      name: 'Tecnología',
      slug: 'tecnologia',
      shortDescription:
        'Reducimos la brecha digital con formación en herramientas informáticas, navegación segura e introducción a la programación.',
      icon: 'HiComputerDesktop',
      color: '#2196F3',
      order: 8,
      featured: true,
      seo: { metaTitle: 'Tecnología e Informática | Fundación Cigarra', metaDescription: 'Formación digital integral para niños de 1 a 17 años: ofimática, internet seguro y programación en Ciudad Bolívar.' },
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
        'Acompañamiento psicosocial integral para niños, jóvenes y familias, fortaleciendo el bienestar emocional y la resiliencia.',
      icon: 'HiHeart',
      color: '#673AB7',
      order: 10,
      featured: false,
      seo: { metaTitle: 'Psicología | Fundación Cigarra', metaDescription: 'Acompañamiento psicosocial integral para niños, jóvenes y familias en Ciudad Bolívar, Bogotá.' },
    },
    {
      name: 'Grupo Mayores',
      slug: 'grupo-mayores',
      shortDescription:
        'Espacio integral de encuentro con actividades recreativas, culturales y de bienestar para adultos mayores.',
      icon: 'HiUsers',
      color: '#E91E63',
      order: 11,
      featured: false,
      seo: { metaTitle: 'Grupo Mayores | Fundación Cigarra', metaDescription: 'Actividades recreativas, culturales y de bienestar para adultos mayores los martes en Ciudad Bolívar.' },
    },
    {
      name: 'Talleres para Padres',
      slug: 'talleres-para-padres',
      shortDescription:
        'Encuentros mensuales para padres y cuidadores sobre crianza positiva, comunicación efectiva y desarrollo infantil.',
      icon: 'HiUserGroup',
      color: '#4CAF50',
      order: 12,
      featured: false,
      seo: { metaTitle: 'Talleres para Padres | Fundación Cigarra', metaDescription: 'Encuentros mensuales de crianza positiva y comunicación efectiva para padres en Ciudad Bolívar.' },
    },
    {
      name: 'Ropero',
      slug: 'ropero',
      shortDescription:
        'Recepción, clasificación y distribución responsable de prendas de vestir, calzado, muebles y enseres para las familias.',
      icon: 'HiShoppingBag',
      color: '#00BCD4',
      order: 13,
      featured: false,
      seo: { metaTitle: 'Ropero | Fundación Cigarra', metaDescription: 'Distribución responsable de ropa, calzado y enseres para familias en Ciudad Bolívar, Bogotá.' },
    },
  ];

  // English translations keyed by slug (only localized fields)
  const programsEN: Record<string, { slug: string; name: string; shortDescription: string; seo: { metaTitle: string; metaDescription: string } }> = {
    'primera-infancia': {
      slug: 'primera-infancia',
      name: 'Early Childhood',
      shortDescription: 'We transform the first five years of life into a solid foundation for the future through early stimulation, art, and play.',
      seo: { metaTitle: 'Early Childhood | Fundación Cigarra', metaDescription: 'Early stimulation, art, and play for children ages 1 to 5. Cognitive, emotional, and motor development in Ciudad Bolívar.' },
    },
    'refuerzo-escolar': {
      slug: 'refuerzo-escolar',
      name: 'Academic Tutoring',
      shortDescription: 'After-school sessions with academic support, robotics, dance, music, arts, English, sports, and entrepreneurship.',
      seo: { metaTitle: 'Academic Tutoring | Fundación Cigarra', metaDescription: 'After-school sessions with academic support, robotics, arts, sports, and more for children ages 5 to 17 in Ciudad Bolívar.' },
    },
    'danza': {
      slug: 'danza',
      name: 'Dance',
      shortDescription: 'Coordination, rhythm, and emotional expression fusing the richness of folklore with the freedom of contemporary dance.',
      seo: { metaTitle: 'Dance Program | Fundación Cigarra', metaDescription: 'Folk and contemporary dance for children ages 1 to 17. Expression, rhythm, and culture in Ciudad Bolívar.' },
    },
    'ingles': {
      slug: 'ingles',
      name: 'English',
      shortDescription: 'We transform language learning into a tool without borders through dynamic and participatory methodologies.',
      seo: { metaTitle: 'English Program | Fundación Cigarra', metaDescription: 'English for children ages 1 to 17 with dynamic and participatory methodologies in Ciudad Bolívar.' },
    },
    'musica': {
      slug: 'musica',
      name: 'Music',
      shortDescription: 'Since 2015, comprehensive music training with string, wind, and percussion instruments. Home of our 60-member Youth Symphony Orchestra.',
      seo: { metaTitle: 'Music Program | Fundación Cigarra', metaDescription: 'Comprehensive music education and 60-member Youth Symphony Orchestra in Ciudad Bolívar.' },
    },
    'artes': {
      slug: 'artes',
      name: 'Arts',
      shortDescription: 'Comprehensive training in visual arts, drawing, and painting that enhances creativity, expression, and aesthetic sensitivity.',
      seo: { metaTitle: 'Arts Program | Fundación Cigarra', metaDescription: 'Comprehensive visual arts, drawing, and painting training for children ages 1 to 17 in Ciudad Bolívar.' },
    },
    'escuela-de-artes': {
      slug: 'escuela-de-artes',
      name: 'School of Arts',
      shortDescription: 'A space open to the entire community to explore visual arts, drawing, painting, and music on Saturdays.',
      seo: { metaTitle: 'School of Arts | Fundación Cigarra', metaDescription: 'Multidisciplinary artistic training on Saturdays for the whole community in Ciudad Bolívar.' },
    },
    'tecnologia': {
      slug: 'tecnologia',
      name: 'Technology',
      shortDescription: 'We bridge the digital divide with training in computer tools, safe browsing, and introduction to programming.',
      seo: { metaTitle: 'Technology & IT | Fundación Cigarra', metaDescription: 'Comprehensive digital training for children ages 1 to 17: office tools, safe browsing, and programming in Ciudad Bolívar.' },
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
      shortDescription: 'Comprehensive psychosocial support for children, youth, and families, strengthening emotional well-being and resilience.',
      seo: { metaTitle: 'Psychology | Fundación Cigarra', metaDescription: 'Comprehensive psychosocial support for children, youth, and families in Ciudad Bolívar, Bogotá.' },
    },
    'grupo-mayores': {
      slug: 'grupo-mayores',
      name: 'Senior Citizens',
      shortDescription: 'A welcoming gathering space with recreational, cultural, and wellness activities for senior citizens.',
      seo: { metaTitle: 'Senior Citizens | Fundación Cigarra', metaDescription: 'Recreational, cultural, and wellness activities for senior citizens on Tuesdays in Ciudad Bolívar.' },
    },
    'talleres-para-padres': {
      slug: 'talleres-para-padres',
      name: 'Parent Workshops',
      shortDescription: 'Monthly meetings for parents and caregivers on positive parenting, effective communication, and child development.',
      seo: { metaTitle: 'Parent Workshops | Fundación Cigarra', metaDescription: 'Monthly positive parenting and effective communication meetings for parents in Ciudad Bolívar.' },
    },
    'ropero': {
      slug: 'ropero',
      name: 'Clothing Closet',
      shortDescription: 'Responsible collection, sorting, and distribution of clothing, footwear, furniture, and household items for families.',
      seo: { metaTitle: 'Clothing Closet | Fundación Cigarra', metaDescription: 'Responsible distribution of clothing, footwear, and household items for families in Ciudad Bolívar, Bogotá.' },
    },
  };

  for (let i = 0; i < programs.length; i++) {
    const program = programs[i];
    const doc = await strapi.documents('api::program.program').create({
      data: program as any,
      locale: 'es',
      status: 'published',
    });

    // Upload cover image + gallery
    const cover = await uploadImage(strapi, `https://picsum.photos/seed/prog-${program.slug}/800/600`, `program-${program.slug}.jpg`);
    await linkMedia(strapi, 'api::program.program', doc.documentId, 'coverImage', cover, 'es');

    const galleryFiles = await Promise.all([
      uploadImage(strapi, `https://picsum.photos/seed/prog-${program.slug}-g1/800/600`, `program-${program.slug}-gallery1.jpg`),
      uploadImage(strapi, `https://picsum.photos/seed/prog-${program.slug}-g2/800/600`, `program-${program.slug}-gallery2.jpg`),
      uploadImage(strapi, `https://picsum.photos/seed/prog-${program.slug}-g3/800/600`, `program-${program.slug}-gallery3.jpg`),
    ]);
    await linkMedia(strapi, 'api::program.program', doc.documentId, 'gallery', galleryFiles, 'es');

    const en = programsEN[program.slug];
    if (en) {
      await addEnglishLocale(strapi, 'api::program.program', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${programs.length} programs with images (ES + EN).`);
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
      name: 'Juan David Hernández',
      slug: 'juan-david-hernandez',
      currentRole: 'Ingeniero de Sistemas',
      quote: 'En la Cigarra aprendí que la tecnología puede transformar comunidades. Hoy trabajo para hacer eso realidad.',
      achievement: 'Graduado como Ingeniero de Sistemas con beca completa',
      accentColor: '#4facfe',
      icon: 'HiHeart',
      featured: true,
      seo: { metaTitle: 'Juan David Hernández | Historias de Éxito', metaDescription: 'Juan David Hernández, egresado de la Cigarra, se graduó como Ingeniero de Sistemas con beca completa.' },
    },
    {
      name: 'Andrey Ruíz',
      slug: 'andrey-ruiz',
      currentRole: 'Líder comunitario',
      quote: 'La Fundación Cigarra me enseñó a soñar en grande y a trabajar con disciplina para lograr mis metas.',
      achievement: 'Creó una empresa de servicios tecnológicos que emplea a jóvenes de la comunidad',
      accentColor: '#43e97b',
      icon: 'HiStar',
      featured: true,
      seo: { metaTitle: 'Andrey Ruíz | Historias de Éxito', metaDescription: 'Andrey Ruíz creó una empresa de servicios tecnológicos que emplea a jóvenes de Ciudad Bolívar.' },
    },
    {
      name: 'Yuri Karina Poveda',
      slug: 'yuri-karina-poveda',
      currentRole: 'Educadora',
      quote: 'Cada enseñanza que comparto con mis estudiantes lleva un poco de lo que la Cigarra sembró en mí.',
      achievement: 'Licenciada en Educación y docente en colegio público de Bogotá',
      accentColor: '#fa709a',
      icon: 'HiAcademicCap',
      featured: true,
      seo: { metaTitle: 'Yuri Karina Poveda | Historias de Éxito', metaDescription: 'Yuri Karina Poveda es Licenciada en Educación y docente en colegio público de Bogotá.' },
    },
    {
      name: 'Anyie Tatiana Poveda',
      slug: 'anyie-tatiana-poveda',
      currentRole: 'Profesional en administración',
      quote: 'Con esfuerzo y dedicación todo es posible. La Fundación Cigarra me lo demostró.',
      achievement: 'Profesional en administración y mentora de jóvenes en la comunidad',
      accentColor: '#a18cd1',
      icon: 'HiSparkles',
      featured: false,
      seo: { metaTitle: 'Anyie Tatiana Poveda | Historias de Éxito', metaDescription: 'Anyie Tatiana Poveda es profesional en administración y mentora de jóvenes en Ciudad Bolívar.' },
    },
    {
      name: 'Alisson Damara Zapata Melgar',
      slug: 'alisson-zapata',
      currentRole: 'Estudiante de Licenciatura en Música',
      quote: 'La Fundación Cigarra me dio las bases musicales que hoy me permiten estudiar lo que amo en la universidad.',
      achievement: 'Admitida en la Universidad Pedagógica Nacional en el programa de Licenciatura en Música',
      accentColor: '#f9a825',
      icon: 'HiStar',
      featured: true,
      seo: { metaTitle: 'Alisson Zapata | Historias de Éxito', metaDescription: 'Alisson Zapata, egresada de la Fundación Cigarra, hoy estudia Licenciatura en Música en la Universidad Pedagógica.' },
    },
    {
      name: 'Edwin Santiago Chavez Romero',
      slug: 'edwin-chavez',
      currentRole: 'Músico profesional',
      quote: 'La Cigarra me enseñó que la música es un lenguaje universal que abre puertas y transforma corazones.',
      achievement: 'Becado en el Conservatorio de Música de Bogotá',
      accentColor: '#26c6da',
      icon: 'HiAcademicCap',
      featured: false,
      seo: { metaTitle: 'Edwin Chavez | Historias de Éxito', metaDescription: 'Edwin Santiago Chavez Romero, egresado del programa de música de la Fundación Cigarra.' },
    },
    {
      name: 'Yorlandis Paredes Garcia',
      slug: 'yorlandis-paredes',
      currentRole: 'Artista y gestora cultural',
      quote: 'Gracias a la Cigarra descubrí mi voz y mi arte. Ahora trabajo para que otros niños también la descubran.',
      achievement: 'Gestora cultural reconocida en Ciudad Bolívar',
      accentColor: '#ef5350',
      icon: 'HiHeart',
      featured: false,
      seo: { metaTitle: 'Yorlandis Paredes | Historias de Éxito', metaDescription: 'Yorlandis Paredes Garcia, egresada y gestora cultural en Ciudad Bolívar.' },
    },
    {
      name: 'Jose David Paredes Garcia',
      slug: 'jose-david-paredes',
      currentRole: 'Estudiante de Ingeniería',
      quote: 'En la Cigarra aprendí que con disciplina y amor todo es posible. Ese es el legado que llevo conmigo.',
      achievement: 'Primer miembro de su familia en acceder a la educación universitaria',
      accentColor: '#66bb6a',
      icon: 'HiSparkles',
      featured: false,
      seo: { metaTitle: 'Jose David Paredes | Historias de Éxito', metaDescription: 'Jose David Paredes Garcia, primer universitario de su familia gracias a la Fundación Cigarra.' },
    },
  ];

  // English translations keyed by slug (localized fields + slug for uid)
  const storiesEN: Record<string, { slug: string; currentRole: string; quote: string; achievement: string; seo: { metaTitle: string; metaDescription: string } }> = {
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
    'anyie-tatiana-poveda': {
      slug: 'anyie-tatiana-poveda',
      currentRole: 'Business Administration Professional',
      quote: 'With effort and dedication, everything is possible. Fundación Cigarra proved it to me.',
      achievement: 'Business administration professional and youth mentor in the community',
      seo: { metaTitle: 'Anyie Tatiana Poveda | Success Stories', metaDescription: 'Anyie Tatiana Poveda is a business administration professional and youth mentor in Ciudad Bolívar.' },
    },
    'alisson-zapata': {
      slug: 'alisson-zapata',
      currentRole: 'Music Education Student',
      quote: 'Fundación Cigarra gave me the musical foundations that today allow me to study what I love at university.',
      achievement: 'Admitted to the National Pedagogical University in the Music Education program',
      seo: { metaTitle: 'Alisson Zapata | Success Stories', metaDescription: 'Alisson Zapata, a Fundación Cigarra graduate, now studies Music Education at the National Pedagogical University.' },
    },
    'edwin-chavez': {
      slug: 'edwin-chavez',
      currentRole: 'Professional Musician',
      quote: 'La Cigarra taught me that music is a universal language that opens doors and transforms hearts.',
      achievement: 'Scholarship recipient at the Bogotá Music Conservatory',
      seo: { metaTitle: 'Edwin Chavez | Success Stories', metaDescription: 'Edwin Santiago Chavez Romero, graduate of the Fundación Cigarra music program.' },
    },
    'yorlandis-paredes': {
      slug: 'yorlandis-paredes',
      currentRole: 'Artist and Cultural Manager',
      quote: 'Thanks to La Cigarra I discovered my voice and my art. Now I work so other children can discover theirs.',
      achievement: 'Recognized cultural manager in Ciudad Bolívar',
      seo: { metaTitle: 'Yorlandis Paredes | Success Stories', metaDescription: 'Yorlandis Paredes Garcia, graduate and cultural manager in Ciudad Bolívar.' },
    },
    'jose-david-paredes': {
      slug: 'jose-david-paredes',
      currentRole: 'Engineering Student',
      quote: 'At La Cigarra I learned that with discipline and love anything is possible. That is the legacy I carry with me.',
      achievement: 'First member of his family to access university education',
      seo: { metaTitle: 'Jose David Paredes | Success Stories', metaDescription: 'Jose David Paredes Garcia, the first in his family to attend university, thanks to Fundación Cigarra.' },
    },
  };

  for (const story of stories) {
    const doc = await strapi.documents('api::success-story.success-story').create({
      data: story as any,
      locale: 'es',
      status: 'published',
    });

    // Upload portrait photo
    const photo = await uploadImage(strapi, `https://picsum.photos/seed/story-${story.slug}/400/500`, `story-${story.slug}.jpg`);
    await linkMedia(strapi, 'api::success-story.success-story', doc.documentId, 'photo', photo, 'es');

    const en = storiesEN[story.slug];
    if (en) {
      await addEnglishLocale(strapi, 'api::success-story.success-story', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${stories.length} success stories with photos (ES + EN).`);
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
    const doc = await strapi.documents('api::partner.partner').create({
      data: partner as any,
      status: 'published',
    });

    // Upload partner logo
    const slug = partner.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const logo = await uploadImage(strapi, `https://picsum.photos/seed/partner-${slug}/300/200`, `partner-${slug}.jpg`);
    await linkMedia(strapi, 'api::partner.partner', doc.documentId, 'logo', logo);
  }

  strapi.log.info(`Seeded ${partners.length} partners with logos.`);
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

  const FRONTEND_URL = 'https://frontend-three-chi-15.vercel.app';

  const articles = [
    {
      title: 'Bingo Virtual Marzo 2026 — ¡Un éxito gracias a su apoyo!',
      slug: 'bingo-virtual-marzo-2026',
      excerpt: '¡Gracias a todos los que participaron! El Bingo Virtual ya se realizó y fue un éxito gracias a su apoyo. Los fondos recaudados van directamente a nuestros programas para los niños de Ciudad Bolívar.',
      content: '¡El Bingo Virtual Marzo 2026 ya se llevó a cabo y fue un éxito rotundo gracias a la generosidad de todos ustedes!\n\nAgradecemos profundamente a cada persona que participó, compró cartones y difundió el evento. Su apoyo hace posible que sigamos transformando vidas en Ciudad Bolívar.\n\nToda la recaudación obtenida irá directamente a nuestros programas de educación, arte y cultura para los niños y jóvenes de nuestra comunidad.\n\nEste tipo de eventos nos recuerda la fuerza que tiene nuestra comunidad cuando se une por una causa. ¡Nos vemos en el próximo evento!\n\nSi quieres seguir apoyando nuestra labor, puedes hacer una donación en cualquier momento desde nuestra página de donaciones o contactarnos a través de nuestras redes sociales.',
      publishDate: '2026-03-15',
      author: 'Fundación Cigarra',
      tags: ['eventos', 'bingo', 'recaudación'],
      featured: false,
      seo: { metaTitle: 'Bingo Virtual Marzo 2026 | Fundación Cigarra', metaDescription: 'El Bingo Virtual de marzo 2026 fue un éxito. Los fondos recaudados van a los programas de la Fundación Cigarra.' },
      imageUrl: `${FRONTEND_URL}/images/bingo-marzo-2026.webp`,
    },
    {
      title: 'Celebramos 24 años transformando vidas en Ciudad Bolívar',
      slug: 'celebramos-22-anos',
      excerpt: 'Nuestra fundación cumple más de dos décadas de labor ininterrumpida con los niños y jóvenes de la localidad, brindando esperanza y oportunidades a cientos de familias.',
      content: 'Este año marca un hito especial para nuestra fundación: 24 años de labor ininterrumpida al servicio de los niños y jóvenes de Ciudad Bolívar en Bogotá.\n\nDesde nuestros humildes comienzos en 2002, hemos crecido hasta ayudar a más de 1.877 niños y jóvenes a través de 13 programas de educación, arte y cultura, generando más de 100 empleos y beneficiando a más de 1.800 familias.\n\nNuestro compromiso sigue siendo el mismo: brindar oportunidades de desarrollo integral a quienes más lo necesitan, creando un espacio seguro donde los sueños de nuestros niños puedan florecer.\n\nAgradecemos a todos nuestros donantes, voluntarios y aliados que hacen posible esta labor. Juntos, seguiremos transformando vidas.',
      publishDate: '2024-06-15',
      author: 'Fundación Cigarra',
      tags: ['aniversario', 'impacto', 'comunidad'],
      featured: true,
      seo: { metaTitle: '24 Años Transformando Vidas | Fundación Cigarra', metaDescription: 'La Fundación Cigarra celebra 24 años de labor ininterrumpida al servicio de los niños de Ciudad Bolívar.' },
      imageUrl: `${FRONTEND_URL}/images/news/celebramos-22-anos.webp`,
    },
    {
      title: 'Nuevos talleres de música abiertos para la comunidad',
      slug: 'nuevos-talleres-musica',
      excerpt: 'Ampliamos nuestra oferta de programas musicales con nuevos instrumentos y profesores calificados.',
      content: 'Nos complace anunciar la apertura de nuevos talleres de música para nuestra comunidad.\n\nGracias al apoyo de nuestros donantes, hemos adquirido nuevos instrumentos musicales y contamos con profesores calificados para ofrecer formación en guitarra, flauta, percusión y canto.\n\nLos talleres están abiertos para niños y jóvenes entre 6 y 17 años y se realizan de lunes a viernes en horario de la tarde.\n\nLa música es una herramienta poderosa para el desarrollo integral de los niños. Les enseña disciplina, trabajo en equipo y les abre puertas a nuevas oportunidades.',
      publishDate: '2024-05-20',
      author: 'Fundación Cigarra',
      tags: ['música', 'talleres', 'comunidad'],
      featured: false,
      seo: { metaTitle: 'Talleres de Música | Fundación Cigarra', metaDescription: 'Nuevos talleres de música para niños y jóvenes de Ciudad Bolívar. Guitarra, flauta, percusión y canto.' },
      imageUrl: `${FRONTEND_URL}/images/news/talleres-musica.webp`,
    },
    {
      title: 'Alianza con Microsoft para formación en tecnología',
      slug: 'alianza-microsoft',
      excerpt: 'Nuestros jóvenes acceden a programas de formación tecnológica gracias a esta alianza.',
      content: 'Estamos orgullosos de anunciar nuestra alianza con Microsoft para ofrecer programas de formación en tecnología a nuestros jóvenes beneficiarios.\n\nA través de esta alianza, los participantes tendrán acceso a cursos de programación, diseño digital y herramientas ofimáticas que les permitirán desarrollar habilidades para el siglo XXI.\n\nEsta alianza refuerza nuestro compromiso de brindar oportunidades de formación integral y preparar a nuestros jóvenes para un futuro con mayores oportunidades laborales y profesionales.',
      publishDate: '2024-04-10',
      author: 'Fundación Cigarra',
      tags: ['tecnología', 'alianzas', 'microsoft'],
      featured: false,
      seo: { metaTitle: 'Alianza con Microsoft | Fundación Cigarra', metaDescription: 'Alianza con Microsoft para formación en tecnología, programación y herramientas digitales para jóvenes.' },
      imageUrl: `${FRONTEND_URL}/images/news/alianza-microsoft.webp`,
    },
    {
      title: 'Jornada de recreación y deportes para toda la comunidad',
      slug: 'jornada-recreacion-deportes',
      excerpt: 'Más de 120 niños y jóvenes participaron en nuestra jornada deportiva con actividades al aire libre.',
      content: 'Con gran entusiasmo realizamos una jornada de recreación y deportes que reunió a más de 120 niños y jóvenes de Ciudad Bolívar.\n\nLa jornada incluyó torneos de fútbol, baloncesto, juegos cooperativos y actividades de desarrollo motriz, todo en un ambiente de sana convivencia y diversión.\n\nNuestro programa de Recreación y Deportes busca promover el bienestar físico y emocional de los participantes, fortaleciendo valores como el trabajo en equipo, el respeto y la disciplina deportiva.',
      publishDate: '2024-03-15',
      author: 'Fundación Cigarra',
      tags: ['deportes', 'recreación', 'comunidad'],
      featured: false,
      seo: { metaTitle: 'Jornada Deportiva | Fundación Cigarra', metaDescription: 'Más de 120 niños y jóvenes participaron en la jornada de recreación y deportes de la Fundación Cigarra.' },
      imageUrl: `${FRONTEND_URL}/images/programs/recreacion-y-deportes.webp`,
    },
    {
      title: 'Festival de Arte y Cultura Cigarra 2024',
      slug: 'festival-arte-cultura',
      excerpt: 'Nuestro festival anual reunió a más de 300 personas de la comunidad.',
      content: 'El Festival de Arte y Cultura Cigarra 2024 fue un éxito rotundo, reuniendo a más de 300 personas de la comunidad en una jornada llena de arte, música, danza y cultura.\n\nLos niños y jóvenes de todos nuestros programas presentaron sus trabajos artísticos, interpretaciones musicales, coreografías de danza y obras de teatro que dejaron asombrados a los asistentes.\n\nEl festival también contó con la participación de nuestros aliados y padrinos, quienes pudieron ver de primera mano el impacto de su apoyo en la vida de los beneficiarios.\n\nEste evento anual es una muestra del talento, la dedicación y el espíritu transformador que caracteriza a la Fundación Cigarra.',
      publishDate: '2024-02-20',
      author: 'Fundación Cigarra',
      tags: ['arte', 'cultura', 'festival'],
      featured: false,
      seo: { metaTitle: 'Festival de Arte y Cultura 2024 | Fundación Cigarra', metaDescription: 'El Festival de Arte y Cultura Cigarra 2024 reunió a más de 300 personas en una jornada de arte, música y danza.' },
      imageUrl: `${FRONTEND_URL}/images/news/festival-arte.webp`,
    },
    {
      title: 'Campaña de nutrición: Resultados del primer trimestre',
      slug: 'campana-nutricion',
      excerpt: 'Compartimos los avances de nuestro programa de alimentación nutritiva.',
      content: 'Compartimos con alegría los resultados del primer trimestre de nuestra campaña de nutrición, un programa que busca garantizar una alimentación saludable para los niños y jóvenes que asisten a nuestros programas.\n\nDurante estos tres meses, hemos proporcionado más de 2.000 refrigerios nutritivos y meriendas equilibradas a los participantes de nuestros programas diarios.\n\nGracias al apoyo de donantes y aliados, hemos logrado mejorar los indicadores nutricionales de los beneficiarios, contribuyendo a su bienestar físico y rendimiento académico.\n\nLa buena alimentación es fundamental para que nuestros niños puedan aprender, crear y soñar con un futuro mejor.',
      publishDate: '2024-01-30',
      author: 'Fundación Cigarra',
      tags: ['nutrición', 'salud', 'bienestar'],
      featured: false,
      seo: { metaTitle: 'Campaña de Nutrición | Fundación Cigarra', metaDescription: 'Resultados del primer trimestre de la campaña de nutrición de la Fundación Cigarra para niños de Ciudad Bolívar.' },
      imageUrl: `${FRONTEND_URL}/images/news/campana-nutricion.webp`,
    },
  ];

  const articlesEN: Record<string, { title: string; excerpt: string; content: string; tags: string[]; seo: { metaTitle: string; metaDescription: string } }> = {
    'bingo-virtual-marzo-2026': {
      title: 'Virtual Bingo March 2026 — A Success Thanks to Your Support!',
      excerpt: 'Thank you to everyone who participated! The Virtual Bingo was a success thanks to your support. All funds raised go directly to our programs for children in Ciudad Bolívar.',
      content: 'The March 2026 Virtual Bingo was a resounding success thanks to the generosity of all of you!\n\nWe are deeply grateful to everyone who participated, bought cards, and spread the word about the event. Your support makes it possible for us to keep transforming lives in Ciudad Bolívar.\n\nAll proceeds will go directly to our education, arts, and culture programs for the children and youth of our community.\n\nEvents like this remind us of the strength our community has when it unites for a cause. See you at the next event!\n\nIf you want to continue supporting our work, you can make a donation at any time from our donations page or contact us through our social media.',
      tags: ['events', 'bingo', 'fundraising'],
      seo: { metaTitle: 'Virtual Bingo March 2026 | Fundación Cigarra', metaDescription: 'The March 2026 Virtual Bingo was a success. All funds raised go to Fundación Cigarra programs.' },
    },
    'celebramos-22-anos': {
      title: 'We Celebrate 24 Years Transforming Lives in Ciudad Bolívar',
      excerpt: 'Our foundation completes more than two decades of uninterrupted work with the children and youth of the locality, providing hope and opportunities to hundreds of families.',
      content: 'This year marks a special milestone for our foundation: 24 years of uninterrupted service to the children and youth of Ciudad Bolívar in Bogotá.\n\nFrom our humble beginnings in 2002, we have grown to help more than 1,877 children and young people through 13 programs in education, art, and culture, generating more than 100 jobs and benefiting more than 1,800 families.\n\nOur commitment remains the same: to provide comprehensive development opportunities to those who need it most, creating a safe space where our children\'s dreams can flourish.\n\nWe thank all our donors, volunteers, and allies who make this work possible. Together, we will continue transforming lives.',
      tags: ['anniversary', 'impact', 'community'],
      seo: { metaTitle: '24 Years Transforming Lives | Fundación Cigarra', metaDescription: 'Fundación Cigarra celebrates 24 years of uninterrupted service to the children of Ciudad Bolívar.' },
    },
    'nuevos-talleres-musica': {
      title: 'New Music Workshops Open to the Community',
      excerpt: 'We expand our musical programs with new instruments and qualified teachers.',
      content: 'We are pleased to announce the opening of new music workshops for our community.\n\nThanks to the support of our donors, we have acquired new musical instruments and have qualified teachers to offer training in guitar, flute, percussion, and singing.\n\nThe workshops are open to children and young people between 6 and 17 years old and take place Monday through Friday in the afternoon.\n\nMusic is a powerful tool for the comprehensive development of children. It teaches discipline, teamwork, and opens doors to new opportunities.',
      tags: ['music', 'workshops', 'community'],
      seo: { metaTitle: 'Music Workshops | Fundación Cigarra', metaDescription: 'New music workshops for children and youth in Ciudad Bolívar. Guitar, flute, percussion, and singing.' },
    },
    'alianza-microsoft': {
      title: 'Partnership with Microsoft for Technology Training',
      excerpt: 'Our youth access technology training programs thanks to this partnership.',
      content: 'We are proud to announce our partnership with Microsoft to offer technology training programs to our young beneficiaries.\n\nThrough this partnership, participants will have access to programming courses, digital design, and office tools that will allow them to develop skills for the 21st century.\n\nThis partnership reinforces our commitment to providing comprehensive training opportunities and preparing our youth for a future with greater employment and professional opportunities.',
      tags: ['technology', 'partnerships', 'microsoft'],
      seo: { metaTitle: 'Partnership with Microsoft | Fundación Cigarra', metaDescription: 'Partnership with Microsoft for technology, programming, and digital tools training for youth.' },
    },
    'jornada-recreacion-deportes': {
      title: 'Recreation and Sports Day for the Whole Community',
      excerpt: 'More than 120 children and youth participated in our sports day with outdoor activities.',
      content: 'With great enthusiasm, we held a recreation and sports day that brought together more than 120 children and young people from Ciudad Bolívar.\n\nThe day included soccer and basketball tournaments, cooperative games, and motor development activities, all in an atmosphere of healthy coexistence and fun.\n\nOur Recreation and Sports program seeks to promote the physical and emotional well-being of participants, strengthening values such as teamwork, respect, and sports discipline.',
      tags: ['sports', 'recreation', 'community'],
      seo: { metaTitle: 'Sports Day | Fundación Cigarra', metaDescription: 'More than 120 children and youth participated in the Fundación Cigarra recreation and sports day.' },
    },
    'festival-arte-cultura': {
      title: 'Cigarra Arts and Culture Festival 2024',
      excerpt: 'Our annual festival brought together more than 300 people from the community.',
      content: 'The 2024 Cigarra Arts and Culture Festival was a resounding success, bringing together more than 300 people from the community for a day full of art, music, dance, and culture.\n\nChildren and youth from all our programs presented their artistic works, musical performances, dance choreographies, and theatrical plays that amazed the attendees.\n\nThe festival also featured the participation of our allies and sponsors, who were able to see firsthand the impact of their support on the lives of beneficiaries.\n\nThis annual event is a showcase of the talent, dedication, and transformative spirit that characterizes Fundación Cigarra.',
      tags: ['arts', 'culture', 'festival'],
      seo: { metaTitle: 'Arts and Culture Festival 2024 | Fundación Cigarra', metaDescription: 'The 2024 Cigarra Arts and Culture Festival brought together 300 people in a day of art, music, and dance.' },
    },
    'campana-nutricion': {
      title: 'Nutrition Campaign: First Quarter Results',
      excerpt: 'We share the progress of our nutritious food program.',
      content: 'We joyfully share the results of the first quarter of our nutrition campaign, a program that seeks to ensure healthy eating for the children and youth who attend our programs.\n\nDuring these three months, we have provided more than 2,000 nutritious snacks and balanced refreshments to participants in our daily programs.\n\nThanks to the support of donors and allies, we have managed to improve the nutritional indicators of beneficiaries, contributing to their physical well-being and academic performance.\n\nGood nutrition is essential for our children to be able to learn, create, and dream of a better future.',
      tags: ['nutrition', 'health', 'well-being'],
      seo: { metaTitle: 'Nutrition Campaign | Fundación Cigarra', metaDescription: 'First quarter results of the Fundación Cigarra nutrition campaign for children in Ciudad Bolívar.' },
    },
  };

  for (const article of articles) {
    const { imageUrl, ...articleData } = article;
    const doc = await strapi.documents('api::article.article').create({
      data: articleData as any,
      locale: 'es',
      status: 'published',
    });

    const cover = await uploadImage(strapi, imageUrl, `article-${article.slug}.webp`);
    await linkMedia(strapi, 'api::article.article', doc.documentId, 'coverImage', cover, 'es');

    const en = articlesEN[article.slug];
    if (en) {
      await addEnglishLocale(strapi, 'api::article.article', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${articles.length} articles with images (ES + EN).`);
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
    // Dirección y Administración
    { name: 'Carolyn Acosta', role: 'Fundadora y Directora', bio: 'Visionaria y líder de la Fundación Cigarra desde sus inicios en 2002. Su dedicación y amor por los niños de Ciudad Bolívar ha transformado la vida de miles de familias a través de la educación, el arte y la cultura.', department: 'direction', order: 1 },
    { name: 'Esperanza Duque Castro', role: 'Administradora', bio: null, department: 'direction', order: 2 },
    { name: 'Karol Vanessa Gonzalez Rocha', role: 'Auxiliar Administrativa', bio: null, department: 'direction', order: 3 },
    { name: 'Cristina Rocio Parra Lamprea', role: 'Trabajadora Social', bio: null, department: 'direction', order: 4 },
    { name: 'Rubiela Pinzon', role: 'Contadora', bio: null, department: 'direction', order: 5 },
    { name: 'Zulma Rodriguez', role: 'Revisora Fiscal', bio: null, department: 'direction', order: 6 },
    { name: 'Erika Tatiana Santamaria Hernandez', role: 'Asistente de Informacion', bio: null, department: 'direction', order: 7 },
    { name: 'Maritzabel Escobar Meneses', role: 'Nutricionista', bio: null, department: 'direction', order: 8 },
    // Equipo Docente
    { name: 'Yeimi Rocio Forero Medina', role: 'Coordinadora Pedagogica', bio: null, department: 'education', order: 9 },
    { name: 'Elvin Yezid Barbos Silva', role: 'Docente de Musica', bio: null, department: 'education', order: 10 },
    { name: 'Sandra Lenith Beltran Suarez', role: 'Docente', bio: null, department: 'education', order: 11 },
    { name: 'Andrea Liliana Capera Prada', role: 'Docente', bio: null, department: 'education', order: 12 },
    { name: 'Ruth Correa Millan', role: 'Docente', bio: null, department: 'education', order: 13 },
    { name: 'Luz Dary Corredor Lemus', role: 'Docente', bio: null, department: 'education', order: 14 },
    { name: 'Paola Andrea Delgadillo Lucas', role: 'Docente', bio: null, department: 'education', order: 15 },
    { name: 'Durbys Yineth Parra Castaneda', role: 'Docente', bio: null, department: 'education', order: 16 },
    { name: 'Yeimy Lucrecia Quiroga Quitian', role: 'Docente', bio: null, department: 'education', order: 17 },
    { name: 'Andres Fernando Quitian Ovalle', role: 'Docente', bio: null, department: 'education', order: 18 },
    { name: 'Yuri Consuelo Salinas Hernandez', role: 'Docente', bio: null, department: 'education', order: 19 },
    { name: 'Jonnatan Villegas Huertas', role: 'Docente', bio: null, department: 'education', order: 20 },
    { name: 'Venjy Alejandra Castillo Gavilan', role: 'Docente', bio: null, department: 'education', order: 21 },
    // Servicios Generales
    { name: 'Maritza Fuquen Ramirez', role: 'Servicios Generales', bio: null, department: 'general_services', order: 22 },
    { name: 'John Fredy Perez Pineda', role: 'Servicios Generales', bio: null, department: 'general_services', order: 23 },
    { name: 'Yulieth Rojas Salinas', role: 'Economa', bio: null, department: 'general_services', order: 24 },
    // Mantenimiento
    { name: 'Fanny Marin Luz', role: 'Almacenista', bio: null, department: 'maintenance', order: 25 },
    { name: 'Orlando Callejas Valencia', role: 'Mantenimiento', bio: null, department: 'maintenance', order: 26 },
  ];

  // English translations keyed by name (localized: role, bio)
  const membersEN: Record<string, { role: string; bio?: string }> = {
    'Carolyn Acosta': { role: 'Founder and Director', bio: 'Visionary leader of Fundación Cigarra since its founding in 2002. Her dedication and love for the children of Ciudad Bolívar has transformed thousands of families through education, art, and culture.' },
    'Esperanza Duque Castro': { role: 'Administrator' },
    'Karol Vanessa Gonzalez Rocha': { role: 'Administrative Assistant' },
    'Cristina Rocio Parra Lamprea': { role: 'Social Worker' },
    'Rubiela Pinzon': { role: 'Accountant' },
    'Zulma Rodriguez': { role: 'Fiscal Auditor' },
    'Erika Tatiana Santamaria Hernandez': { role: 'Information Assistant' },
    'Maritzabel Escobar Meneses': { role: 'Nutritionist' },
    'Yeimi Rocio Forero Medina': { role: 'Pedagogical Coordinator' },
    'Elvin Yezid Barbos Silva': { role: 'Music Teacher' },
    'Sandra Lenith Beltran Suarez': { role: 'Teacher' },
    'Andrea Liliana Capera Prada': { role: 'Teacher' },
    'Ruth Correa Millan': { role: 'Teacher' },
    'Luz Dary Corredor Lemus': { role: 'Teacher' },
    'Paola Andrea Delgadillo Lucas': { role: 'Teacher' },
    'Durbys Yineth Parra Castaneda': { role: 'Teacher' },
    'Yeimy Lucrecia Quiroga Quitian': { role: 'Teacher' },
    'Andres Fernando Quitian Ovalle': { role: 'Teacher' },
    'Yuri Consuelo Salinas Hernandez': { role: 'Teacher' },
    'Jonnatan Villegas Huertas': { role: 'Teacher' },
    'Venjy Alejandra Castillo Gavilan': { role: 'Teacher' },
    'Maritza Fuquen Ramirez': { role: 'General Services' },
    'John Fredy Perez Pineda': { role: 'General Services' },
    'Yulieth Rojas Salinas': { role: 'Stewardess' },
    'Fanny Marin Luz': { role: 'Warehouse Manager' },
    'Orlando Callejas Valencia': { role: 'Maintenance' },
  };

  for (const member of members) {
    const doc = await strapi.documents('api::team-member.team-member').create({
      data: member as any,
      locale: 'es',
      status: 'published',
    });

    // Upload portrait photo
    const slug = member.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const photo = await uploadImage(strapi, `https://picsum.photos/seed/team-${slug}/400/400`, `team-${slug}.jpg`);
    await linkMedia(strapi, 'api::team-member.team-member', doc.documentId, 'photo', photo, 'es');

    const en = membersEN[member.name];
    if (en) {
      await addEnglishLocale(strapi, 'api::team-member.team-member', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${members.length} team members with photos (ES + EN).`);
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

  // Upload hero slider images (real photos from cigarra.org)
  const sliderUrls = [
    { url: 'https://cigarra.org/wp-content/uploads/2025/02/Nutricion_2.jpg', name: 'hero-fundacion-ninos.jpg' },
    { url: 'https://cigarra.org/wp-content/uploads/2025/11/2.-Presentacion-en-Quiba_1-1024x683.jpg', name: 'hero-presentacion-quiba.jpg' },
    { url: 'https://cigarra.org/wp-content/uploads/2025/04/Sinfonica1-1024x768.jpg', name: 'hero-sinfonica.jpg' },
    { url: 'https://cigarra.org/wp-content/uploads/2025/02/Nutricion_3.jpg', name: 'hero-nutricion.jpg' },
  ];
  const sliderFiles = [];
  for (const img of sliderUrls) {
    const file = await uploadImage(strapi, img.url, img.name);
    if (file) sliderFiles.push(file);
  }
  await linkMedia(strapi, 'api::hero.hero', doc.documentId, 'backgroundImage', sliderFiles, 'es');

  await addEnglishLocale(strapi, 'api::hero.hero', doc.documentId, {
    title: 'Fundación Cigarra',
    subtitle: 'We transform lives through art, education, and love in Ciudad Bolívar, Bogotá.',
    tagline: 'Sowing hope since 2002',
  });

  strapi.log.info('Seeded hero section with background image (ES + EN).');
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

  // Upload background image (wide banner)
  const bg = await uploadImage(strapi, 'https://picsum.photos/seed/impact-stats/1920/800', 'impact-background.jpg');
  await linkMedia(strapi, 'api::impact-statistic.impact-statistic', doc.documentId, 'backgroundImage', bg, 'es');

  await addEnglishLocale(strapi, 'api::impact-statistic.impact-statistic', doc.documentId, {
    sectionTitle: 'Our Impact',
    stats: [
      { label: 'Children helped', value: 1877, suffix: '+', icon: 'HiUserGroup', order: 1 },
      { label: 'Years of service', value: 23, suffix: '', icon: 'HiCalendar', order: 2 },
      { label: 'Jobs created', value: 100, suffix: '+', icon: 'HiBookOpen', order: 3 },
      { label: 'Families benefited', value: 190, suffix: '+', icon: 'HiHome', order: 4 },
    ],
  });

  strapi.log.info('Seeded impact statistics with background image (ES + EN).');
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

  // Upload site logo
  const logo = await uploadImage(strapi, 'https://picsum.photos/seed/cigarra-logo/400/400', 'site-logo.jpg');
  await linkMedia(strapi, 'api::global-setting.global-setting', doc.documentId, 'logo', logo);

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

  // Upload gallery images for about page
  const galleryFiles = await Promise.all([
    uploadImage(strapi, 'https://picsum.photos/seed/about-gallery-1/800/600', 'about-gallery-1.jpg'),
    uploadImage(strapi, 'https://picsum.photos/seed/about-gallery-2/800/600', 'about-gallery-2.jpg'),
    uploadImage(strapi, 'https://picsum.photos/seed/about-gallery-3/800/600', 'about-gallery-3.jpg'),
    uploadImage(strapi, 'https://picsum.photos/seed/about-gallery-4/800/600', 'about-gallery-4.jpg'),
    uploadImage(strapi, 'https://picsum.photos/seed/about-gallery-5/800/600', 'about-gallery-5.jpg'),
  ]);
  await linkMedia(strapi, 'api::about-page.about-page', doc.documentId, 'gallery', galleryFiles, 'es');

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

  strapi.log.info('Seeded about page with gallery and 16 timeline entries (ES + EN).');
}

// ---------------------------------------------------------------------------
// Videos
// ---------------------------------------------------------------------------
async function seedVideos(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::video.video').findMany();
  if (existing.length > 0) {
    strapi.log.info('Videos already seeded, skipping.');
    return;
  }

  const videos = [
    { youtubeId: 'zv2LXjPTUxg', title: 'Bingo Solidario 2026', description: 'Únete a nuestro Bingo virtual el próximo 14 de marzo.', category: 'event', featured: true, order: 1 },
    { youtubeId: 'RE70AtGQ6x4', title: 'Emprendimientos Cigarra 2025', description: 'Nuestros emprendimientos Cigarra.', category: 'program', featured: true, order: 2 },
    { youtubeId: 'b01VrjBE8aA', title: 'Filarmónica Cigarra — Cierre de Temporada New Philharmonia', description: 'El 24 de agosto, 10 jóvenes músicos de la Fundación Cigarra participaron en el concierto de cierre de temporada de la New Philharmonia Orchestra, dirigida por Ricardo Jaramillo y nuestro docente Yezid Barbosa.', category: 'program', featured: true, order: 3 },
    { youtubeId: 'pm8dm3cF5nA', title: 'Concierto Solidario SGS 2025', description: null, category: 'event', featured: false, order: 4 },
    { youtubeId: 'DhJeNisgezA', title: 'Bingo Bazar y Presentaciones Infantiles', description: '¡Gran Evento de Bingo Bazar y Presentaciones Infantiles! ¡No te pierdas nuestro emocionante stream que combina el divertido juego de bingo con el talento de nuestros pequeños artistas!', category: 'event', featured: false, order: 5 },
    { youtubeId: 'ie-Z3ibcJwo', title: 'Bingo Bazar — En Vivo', description: '¡No te pierdas el Bingo Bazar de la Fundación Cigarra! Este domingo 15 de septiembre, te invitamos a un evento lleno de diversión y solidaridad.', category: 'event', featured: false, order: 6 },
    { youtubeId: 'l7RHznZnktg', title: 'Mes del Niño y Deporte', description: 'Capturamos algunos de los momentos más especiales de nuestro reciente cierre del Mes del Deporte y del Niño.', category: 'event', featured: false, order: 7 },
    { youtubeId: 'srNTa6XSn8k', title: 'Fútbol en Casa', description: 'En abril, combinamos la alegría del deporte y el Día del Niño en una sola celebración: nuestro primer torneo de fútbol.', category: 'program', featured: false, order: 8 },
    { youtubeId: '-7dX7oBPyGk', title: 'Concierto Solidario 2023', description: null, category: 'event', featured: false, order: 9 },
    { youtubeId: 'BHyuFTQzdTY', title: 'Serenata de Amor', description: '¡Explora con nosotros una jornada única en Cigarra! En este video especial, llevamos serenatas llenas de amor y gratitud a los comerciantes.', category: 'program', featured: false, order: 10 },
    { youtubeId: 'qvVL6m1AOds', title: 'Himno Fundación Cigarra', description: null, category: 'highlight', featured: false, order: 11 },
    { youtubeId: 'b9oUKjnNvZE', title: 'Detrás del Telón — Concierto Solidario SGS 2022', description: 'Presentamos un vistazo exclusivo de cómo nuestros talentosos niños se prepararon para el Concierto Solidario 2022.', category: 'story', featured: false, order: 12 },
    { youtubeId: '0JbzvLdrxns', title: 'Debut Orquesta Sinfónica La Cigarra — Concierto Solidario SGS', description: 'El esperado Concierto Solidario SGS 2023 trae el debut de la Orquesta Sinfónica La Cigarra, un sueño hecho realidad desde 2015.', category: 'event', featured: false, order: 13 },
    { youtubeId: '8X7KFvEsPNA', title: 'Carolina Gaitán — Pepa Madrigal visita a los niños de Cigarra', description: 'Este año nuestros niñas y niños recibieron una sorpresa ENCANTADORA. Carolina Gaitán (Pepa Madrigal en "Encanto") les envió un saludo de navidad.', category: 'highlight', featured: false, order: 14 },
  ];

  const videosEN: Record<string, { title: string; description?: string }> = {
    'zv2LXjPTUxg': { title: 'Solidarity Bingo 2026', description: 'Join our virtual Bingo on March 14th.' },
    'RE70AtGQ6x4': { title: 'Cigarra Entrepreneurship 2025', description: 'Our Cigarra entrepreneurship projects.' },
    'b01VrjBE8aA': { title: 'Cigarra Philharmonic — New Philharmonia Season Closing', description: 'On August 24, 10 young musicians from the Cigarra Foundation performed at the New Philharmonia Orchestra season closing concert, directed by Ricardo Jaramillo and our teacher Yezid Barbosa.' },
    'pm8dm3cF5nA': { title: 'SGS Solidarity Concert 2025' },
    'DhJeNisgezA': { title: 'Bingo Bazaar and Children\'s Performances', description: 'Great Bingo Bazaar and Children\'s Performances Event! Don\'t miss our exciting stream combining bingo with the talent of our young artists!' },
    'ie-Z3ibcJwo': { title: 'Bingo Bazaar — Live', description: 'Don\'t miss the Cigarra Foundation Bingo Bazaar! This Sunday, September 15, join us for an event full of fun and solidarity.' },
    'l7RHznZnktg': { title: "Children's Month & Sports", description: "We captured some of the most special moments from our recent Sports and Children's Month closing." },
    'srNTa6XSn8k': { title: 'Football at Home', description: "In April, we combined the joy of sport and Children's Day in one celebration: our first football tournament." },
    '-7dX7oBPyGk': { title: 'Solidarity Concert 2023' },
    'BHyuFTQzdTY': { title: 'Serenade of Love', description: 'Explore a unique day at Cigarra with us! In this special video, we bring serenades full of love and gratitude to local merchants.' },
    'qvVL6m1AOds': { title: 'Cigarra Foundation Anthem' },
    'b9oUKjnNvZE': { title: 'Behind the Curtain — SGS Solidarity Concert 2022', description: 'An exclusive look at how our talented children prepared for the 2022 Solidarity Concert.' },
    '0JbzvLdrxns': { title: 'La Cigarra Symphony Orchestra Debut — SGS Solidarity Concert', description: 'The long-awaited SGS 2023 Solidarity Concert brings the debut of the La Cigarra Symphony Orchestra — a dream realized since 2015.' },
    '8X7KFvEsPNA': { title: 'Carolina Gaitán — Pepa Madrigal visits Cigarra Foundation children', description: 'This year our children received an ENCHANTING surprise. Carolina Gaitán (Pepa Madrigal in "Encanto") sent them a Christmas greeting.' },
  };

  for (const video of videos) {
    const doc = await strapi.documents('api::video.video').create({
      data: video as any,
      locale: 'es',
      status: 'published',
    });

    const en = videosEN[video.youtubeId];
    if (en) {
      await addEnglishLocale(strapi, 'api::video.video', doc.documentId, en);
    }
  }

  strapi.log.info(`Seeded ${videos.length} videos (ES + EN).`);
}
