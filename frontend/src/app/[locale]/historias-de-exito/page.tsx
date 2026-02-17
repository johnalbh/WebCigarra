'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useMemo } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiStar, HiHeart, HiSparkles, HiAcademicCap } from 'react-icons/hi';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';

/* ---------- stories data with real images ---------- */
const stories = [
  {
    name: 'Juan David Hernández',
    role: 'Líder comunitario',
    quote:
      'En la Fundación descubrí que el arte puede cambiar comunidades enteras. Ahora trabajo para que otros jóvenes tengan las mismas oportunidades.',
    achievement: 'Gestor cultural, líder de proyectos sociales',
    image: 'https://cigarra.org/wp-content/uploads/2025/04/JuanDavidHernandez.jpg',
    gradient: 'from-[#4facfe] to-[#00f2fe]',
    accentColor: '#4facfe',
    icon: HiHeart,
  },
  {
    name: 'Andrey Ruiz',
    role: 'Emprendedor social',
    quote:
      'Cada día en la Fundación fue una oportunidad para crecer como persona y como profesional. Los valores que aprendí guían mi emprendimiento.',
    achievement: 'Emprendedor, mentor de jóvenes',
    image: 'https://cigarra.org/wp-content/uploads/2023/09/AndreyRuiz-1024x1024.jpeg',
    gradient: 'from-[#43e97b] to-[#38f9d7]',
    accentColor: '#43e97b',
    icon: HiStar,
  },
  {
    name: 'Yuri Karina Poveda',
    role: 'Educadora',
    quote:
      'La educación que recibí me abrió puertas que nunca imaginé posibles. Hoy regreso a la comunidad como educadora para hacer lo mismo por otros.',
    achievement: 'Licenciada en educación, voluntaria activa',
    image: 'https://cigarra.org/wp-content/uploads/2025/02/YuryKarina.png',
    gradient: 'from-[#fa709a] to-[#fee140]',
    accentColor: '#fa709a',
    icon: HiAcademicCap,
  },
  {
    name: 'Anyie Tatiana',
    role: 'Profesional',
    quote:
      'La Fundación me enseñó que con esfuerzo y dedicación todo es posible. Nunca olvidaré el apoyo y el cariño que recibí.',
    achievement: 'Profesional en administración, mentora',
    image: 'https://cigarra.org/wp-content/uploads/2025/02/Anyie.png',
    gradient: 'from-[#a18cd1] to-[#fbc2eb]',
    accentColor: '#a18cd1',
    icon: HiSparkles,
  },
  {
    name: 'Alison Zapata',
    role: 'Profesional destacada',
    quote:
      'La Fundación Cigarra me dio las herramientas para soñar en grande y trabajar por mis metas. Hoy soy una profesional orgullosa de mis raíces.',
    achievement: 'Graduada universitaria, líder comunitaria',
    image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_1.jpg',
    gradient: 'from-[#667eea] to-[#764ba2]',
    accentColor: '#667eea',
    icon: HiAcademicCap,
  },
  {
    name: 'Leider Quiñones',
    role: 'Músico profesional',
    quote:
      'Gracias a la música aprendí disciplina y encontré mi pasión. Hoy la música es mi vida y mi forma de inspirar a otros jóvenes.',
    achievement: 'Músico profesional, docente de música',
    image: 'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_3.jpg',
    gradient: 'from-[#f093fb] to-[#f5576c]',
    accentColor: '#f093fb',
    icon: HiSparkles,
  },
];

/* ---------- impact gallery images ---------- */
const impactImages = [
  'https://cigarra.org/wp-content/uploads/2022/06/QH_Danza_GL_1.jpg',
  'https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_5.jpg',
  'https://cigarra.org/wp-content/uploads/2022/06/QH_Tecnologia_GL_2.jpg',
  'https://cigarra.org/wp-content/uploads/2025/04/ApoyoEscolar.jpg',
  'https://cigarra.org/wp-content/uploads/2025/04/Recreacion.jpg',
  'https://cigarra.org/wp-content/uploads/2025/04/Musica.jpg',
];

/* ---------- hero particles ---------- */
function HeroParticles({ count = 20 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 14 + Math.random() * 16,
        delay: Math.random() * 5,
        opacity: 0.1 + Math.random() * 0.25,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
            opacity: d.opacity,
          }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -6, 3, 0],
            opacity: [
              d.opacity,
              d.opacity * 1.4,
              d.opacity * 0.5,
              d.opacity * 1.1,
              d.opacity,
            ],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- story card ---------- */
function StoryCard({
  story,
  index,
}: {
  story: (typeof stories)[number];
  index: number;
}) {
  const t = useTranslations('stories');
  const Icon = story.icon;

  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-gray-100 transition-shadow duration-500 hover:shadow-2xl hover:ring-transparent"
    >
      {/* Gradient header section with real image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={story.image}
          alt={story.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent`}
        />
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        {/* Large decorative quote */}
        <span className="pointer-events-none absolute right-4 top-0 font-accent text-[100px] leading-none text-white/15 select-none">
          &rdquo;
        </span>

        {/* Name overlay on image */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-heading text-lg font-bold text-white drop-shadow-md">
            {story.name}
          </h3>
          <p className="text-sm font-medium text-white/80">
            {story.role}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        {/* Quote */}
        <blockquote className="relative mb-6 flex-1">
          <span className="pointer-events-none absolute -left-1 -top-2 font-accent text-4xl text-gray-200 select-none">
            &ldquo;
          </span>
          <p className="px-3 font-accent text-base italic leading-relaxed text-gray-600">
            {story.quote}
          </p>
          <span className="pointer-events-none absolute -bottom-4 -right-1 font-accent text-4xl text-gray-200 select-none">
            &rdquo;
          </span>
        </blockquote>

        {/* Achievement badge */}
        <div className="mt-auto">
          <div
            className="flex items-start gap-2.5 rounded-xl px-4 py-3 transition-colors duration-300"
            style={{ backgroundColor: `${story.accentColor}10` }}
          >
            <div
              className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${story.accentColor}20` }}
            >
              <Icon
                className="h-3.5 w-3.5"
                style={{ color: story.accentColor }}
              />
            </div>
            <p className="text-left text-sm text-gray-700">
              <span className="font-semibold">{t('achievement')}:</span>{' '}
              {story.achievement}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className={`h-1 w-0 bg-gradient-to-r ${story.gradient} transition-all duration-500 group-hover:w-full`}
      />
    </motion.article>
  );
}

/* ---------- main page component ---------- */
export default function SuccessStoriesPage() {
  const t = useTranslations('stories');
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        className="relative flex min-h-[75vh] items-center justify-center overflow-hidden"
      >
        {/* Parallax background image - real cigarra.org image */}
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <Image
            src="https://cigarra.org/wp-content/uploads/2022/09/QH_Equipo_DEC_1.jpg"
            alt="Equipo Fundación Cigarra"
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover"
          />
        </motion.div>

        {/* Animated gradient overlay */}
        <motion.div className="absolute inset-0" style={{ opacity: overlayOpacity }}>
          <div
            className="absolute inset-0 animate-gradient"
            style={{
              backgroundSize: '200% 200%',
              background:
                'linear-gradient(135deg, rgba(19,45,65,0.92) 0%, rgba(22,123,174,0.78) 30%, rgba(102,126,234,0.50) 60%, rgba(19,45,65,0.88) 100%)',
            }}
          />
        </motion.div>

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-24 -right-24 h-[350px] w-[350px] rounded-full bg-accent-500/10 blur-3xl"
            animate={{
              x: [0, -40, 20, -10, 0],
              y: [0, 30, -20, 10, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-primary-400/10 blur-3xl"
            animate={{
              x: [0, 30, -20, 15, 0],
              y: [0, -25, 40, -15, 0],
              scale: [1, 0.9, 1.1, 0.95, 1],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Particles */}
        <HeroParticles count={25} />

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center lg:px-8"
          style={{ y: heroTextY }}
        >
          <motion.div
            variants={textVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm"
          >
            <HiSparkles className="h-4 w-4 text-accent-400" />
            <span className="text-sm font-medium text-white/90">
              Vidas transformadas por la educación
            </span>
          </motion.div>

          <motion.h1
            variants={textVariants}
            className="mx-auto mb-6 max-w-4xl font-heading text-4xl font-extrabold leading-[1.1] text-white drop-shadow-xl sm:text-5xl md:text-6xl"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-primary-100/90 md:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            variants={textVariants}
            className="mx-auto mt-10 flex items-center justify-center gap-2"
          >
            <span className="h-0.5 w-12 rounded-full bg-accent-400/60" />
            <HiStar className="h-4 w-4 text-accent-400" />
            <span className="h-0.5 w-12 rounded-full bg-accent-400/60" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5"
          >
            <motion.div className="h-2 w-1 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== INTRO STATS BAR ========== */}
      <section className="relative -mt-10 z-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="glass rounded-2xl bg-white/80 px-6 py-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl sm:px-10 sm:py-8">
              <div className="flex items-center justify-around divide-x divide-gray-200 text-center">
                {[
                  { number: '6', label: 'Historias de Éxito', icon: HiStar },
                  { number: '22+', label: 'Años Transformando', icon: HiHeart },
                  { number: '100%', label: 'Vidas Cambiadas', icon: HiSparkles },
                ].map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={stat.label} className="flex-1 px-2 sm:px-4">
                      <div className="mb-1 flex items-center justify-center gap-1.5">
                        <StatIcon className="h-5 w-5 text-accent-500" />
                        <p className="font-heading text-2xl font-extrabold text-gray-900 sm:text-3xl">
                          {stat.number}
                        </p>
                      </div>
                      <p className="text-xs font-medium uppercase tracking-widest text-gray-500 sm:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== IMPACT PHOTO GALLERY (NEW) ========== */}
      <section className="section-padding relative overflow-hidden bg-gray-50">
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold text-accent-700">
                Momentos que inspiran
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                El impacto en <span className="text-gradient">imágenes</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {impactImages.map((img, i) => (
              <ScrollReveal key={img} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
                >
                  <Image
                    src={img}
                    alt={`Impacto Fundación Cigarra ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                      <HiHeart className="h-4 w-4 text-red-500" />
                      <span className="text-xs font-semibold text-gray-800">
                        Tu apoyo hace esto posible
                      </span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STORIES GRID ========== */}
      <section className="section-padding relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-0 h-[500px] w-[500px] rounded-full bg-primary-50 opacity-50 blur-3xl" />
          <div className="absolute right-0 bottom-20 h-[500px] w-[500px] rounded-full bg-accent-50 opacity-40 blur-3xl" />
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #167BAE 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          {/* Section header */}
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Conoce sus historias
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Cada uno de ellos pasó por la Fundación Cigarra y hoy son
                ejemplo de superación, liderazgo y compromiso con su comunidad.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid */}
          <StaggerContainer
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.12}
          >
            {stories.map((story, index) => (
              <StaggerItem key={story.name}>
                <StoryCard story={story} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== EMOTIONAL IMPACT COUNTER (NEW) ========== */}
      <section className="relative overflow-hidden bg-primary-950 py-20">
        <div className="absolute inset-0">
          <Image
            src="https://cigarra.org/wp-content/uploads/2022/06/QH_Musica_GL_4.jpg"
            alt="Niños tocando música"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-primary-950/60 to-primary-950/80" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              >
                <HiHeart className="h-10 w-10 text-red-400" />
              </motion.div>
            </motion.div>

            <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-5xl">
              Cada historia comenzó con{' '}
              <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                alguien como tú
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-200/80">
              Detrás de cada sonrisa, cada logro y cada sueño cumplido hay un
              donante que decidió hacer la diferencia. Hoy puedes ser el inicio
              de la próxima historia de éxito.
            </p>

            <div className="grid grid-cols-3 gap-6 md:gap-12">
              {[
                { value: '1,500+', label: 'Niños beneficiados en 22 años' },
                { value: '$7,045', label: 'COP cuesta una comida nutritiva' },
                { value: '100%', label: 'De tu donación llega a los niños' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <p className="font-heading text-3xl font-extrabold text-accent-400 md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-primary-200/70">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== EMOTIONAL CTA ========== */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://cigarra.org/wp-content/uploads/2022/09/Fundacion_ninos.png"
            alt="Niños de la Fundación Cigarra"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent-600/90 via-accent-500/85 to-amber-500/90" />
        </div>

        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-16 -bottom-16 h-80 w-80 rounded-full bg-white/5 blur-2xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Large decorative quote marks */}
          <span className="absolute top-8 left-8 font-accent text-[200px] leading-none text-white/5 select-none md:left-16 md:text-[300px]">
            &ldquo;
          </span>
          <span className="absolute right-8 bottom-0 font-accent text-[200px] leading-none text-white/5 select-none md:right-16 md:text-[300px]">
            &rdquo;
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center lg:px-8 lg:py-32">
          <ScrollReveal>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2 backdrop-blur-sm">
                <HiHeart className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  Tu ayuda transforma vidas
                </span>
              </div>

              <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-5xl">
                Ayuda a escribir más
                <br />
                <span className="font-accent italic">historias de éxito</span>
              </h2>

              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/90">
                Cada donación abre una puerta, cada acto de generosidad enciende
                un sueño. Hoy puedes ser parte de la historia de un niño que
                mañana transformará su comunidad.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-5">
                <a
                  href={DONATION_LINK_COP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-10 py-4 font-bold text-accent-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Hover shimmer */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent-100/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <HiHeart className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">Dona Ahora</span>
                </a>

                <a
                  href={DONATION_LINK_USD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-10 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/70 hover:bg-white/10 hover:shadow-xl"
                >
                  Donate in USD
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>100% Transparente</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Deducible de impuestos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Donación segura</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
