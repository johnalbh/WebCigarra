'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import HeroWaves from '@/components/shared/HeroWaves';
import {
  HiHeart,
  HiAcademicCap,
  HiCheckCircle,
  HiArrowRight,
  HiUserGroup,
  HiLightBulb,
  HiShieldCheck,
  HiClipboardCheck,
  HiPhone,
  HiStar,
} from 'react-icons/hi';
import { FaWhatsapp, FaPaintBrush, FaRunning, FaBriefcase } from 'react-icons/fa';

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ── Why volunteer benefits ── */
const benefits = [
  {
    icon: HiHeart,
    title: 'Impacto real en la comunidad',
    description:
      'Trabajas directamente con los ninos y familias de Ciudad Bolivar, transformando vidas de forma tangible y duradera.',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100 text-green-600',
  },
  {
    icon: HiLightBulb,
    title: 'Desarrollo de habilidades',
    description:
      'Fortalece tus competencias de liderazgo, comunicacion y trabajo en equipo mientras compartes tu conocimiento.',
    color: 'bg-primary-50 border-primary-200',
    iconBg: 'bg-primary-100 text-primary-600',
  },
  {
    icon: HiUserGroup,
    title: 'Red de personas comprometidas',
    description:
      'Conecta con una comunidad de voluntarios y profesionales apasionados por la educacion y el cambio social.',
    color: 'bg-accent-50 border-accent-200',
    iconBg: 'bg-accent-100 text-accent-600',
  },
];

/* ── Volunteer areas ── */
const volunteerAreas = [
  {
    icon: HiAcademicCap,
    title: 'Educacion',
    description:
      'Refuerzo escolar, talleres de lectura, apoyo en tareas y preparacion de examenes. Ayuda a los ninos a alcanzar su maximo potencial academico.',
    activities: ['Refuerzo escolar', 'Talleres de lectura', 'Apoyo en tareas', 'Preparacion de examenes'],
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
    image: '/images/engagement/apoyo-escolar.jpg',
  },
  {
    icon: FaPaintBrush,
    title: 'Arte y Cultura',
    description:
      'Musica, danza, teatro, artes plasticas, fotografia y manualidades. Despierta la creatividad y el talento artistico de los ninos.',
    activities: ['Musica', 'Danza', 'Teatro', 'Artes plasticas', 'Fotografia', 'Manualidades'],
    color: 'border-accent-200 hover:border-accent-400',
    iconBg: 'bg-accent-100 text-accent-600',
    image: '/images/engagement/musica.jpg',
  },
  {
    icon: FaRunning,
    title: 'Deportes y Recreacion',
    description:
      'Actividades deportivas, juegos cooperativos y desarrollo motriz. Promueve la salud fisica y la sana convivencia.',
    activities: ['Actividades deportivas', 'Juegos cooperativos', 'Desarrollo motriz'],
    color: 'border-green-200 hover:border-green-400',
    iconBg: 'bg-green-100 text-green-600',
    image: '/images/engagement/recreacion.jpg',
  },
  {
    icon: FaBriefcase,
    title: 'Gestion y Administracion',
    description:
      'Comunicaciones, diseno, contabilidad, asesoria legal y tecnologia. Apoya desde el back-office para que todo funcione.',
    activities: ['Comunicaciones', 'Diseno', 'Contabilidad', 'Asesoria legal', 'Tecnologia'],
    color: 'border-purple-200 hover:border-purple-400',
    iconBg: 'bg-purple-100 text-purple-600',
    image: null,
  },
];

/* ── Requirements ── */
const requirements = [
  { text: 'Ser mayor de 18 anos', icon: HiShieldCheck },
  { text: 'Disponibilidad minima de 4 horas semanales', icon: HiClipboardCheck },
  { text: 'Pasion por la educacion y el trabajo social', icon: HiHeart },
  { text: 'Certificado de antecedentes (requerido por ley)', icon: HiCheckCircle },
];

/* ── Volunteer testimonials ── */
const testimonials = [
  {
    name: 'Andrea Morales',
    role: 'Voluntaria de Refuerzo Escolar',
    quote:
      'Ser voluntaria en la Fundacion Cigarra ha sido la experiencia mas enriquecedora de mi vida. Ver como los ninos avanzan academicamente y ganan confianza en si mismos no tiene precio.',
    years: '3 anos como voluntaria',
  },
  {
    name: 'Carlos Gutierrez',
    role: 'Voluntario de Musica',
    quote:
      'Comparto mi amor por la musica con los ninos de Ciudad Bolivar cada sabado. La alegria en sus rostros cuando logran tocar una cancion completa es la mejor recompensa que puedo recibir.',
    years: '2 anos como voluntario',
  },
  {
    name: 'Laura Jimenez',
    role: 'Voluntaria de Comunicaciones',
    quote:
      'Desde el area de comunicaciones ayudo a que mas personas conozcan la labor de la fundacion. Cada historia que contamos inspira a alguien nuevo a unirse a esta causa.',
    years: '1 ano como voluntaria',
  },
];

/* ── Application steps ── */
const applicationSteps = [
  {
    step: 1,
    title: 'Contactanos',
    description:
      'Escribenos por WhatsApp o correo electronico para contarnos tu interes y disponibilidad. Te responderemos en menos de 24 horas.',
    icon: HiPhone,
  },
  {
    step: 2,
    title: 'Entrevista',
    description:
      'Agendamos una breve entrevista para conocerte mejor, entender tus motivaciones y asignarte el area mas adecuada.',
    icon: HiUserGroup,
  },
  {
    step: 3,
    title: 'Induccion y arranque',
    description:
      'Participas en una jornada de induccion donde conoceras la fundacion, los programas y los ninos. Luego, a trabajar!',
    icon: HiStar,
  },
];

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function VoluntariadoPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        {/* Green accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-green-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 text-center lg:px-8 lg:py-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-green-400"
          >
            Fundacion Cigarra
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Se{' '}
            <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              Voluntario
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200/80"
          >
            Comparte tu tiempo y talento con los ninos de Ciudad Bolivar. Tu presencia puede cambiar la vida de un nino para siempre.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/573212465421"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 font-heading text-lg font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:bg-green-400 hover:shadow-green-500/40"
            >
              <FaWhatsapp className="h-5 w-5" />
              Quiero Ser Voluntario
            </a>
            <a
              href="#como-aplicar"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-heading text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Como Aplicar
              <HiArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { icon: HiUserGroup, label: '+50 voluntarios activos' },
              { icon: HiHeart, label: '+23 anos de experiencia' },
              { icon: HiAcademicCap, label: '14 programas' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-primary-300/70"
              >
                <badge.icon className="h-4 w-4 text-green-400" />
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY VOLUNTEER
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-green-100 px-5 py-2 font-heading text-sm font-semibold text-green-700 mb-4">
                Por que ser voluntario
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                Razones para <span className="text-green-600">unirte</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Ser voluntario no solo transforma la vida de los ninos, sino tambien la tuya.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`group flex h-full flex-col items-center rounded-2xl border p-8 text-center transition-all duration-300 hover:shadow-lg ${benefit.color}`}
                  >
                    <div
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${benefit.iconBg}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="flex-1 leading-relaxed text-gray-600">
                      {benefit.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. VOLUNTEER AREAS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                Areas de Voluntariado
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                Encuentra tu <span className="text-primary-600">lugar</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Tenemos espacio para todo tipo de talentos. Elige el area que mas te apasione.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {volunteerAreas.map((area, index) => {
              const Icon = area.icon;
              const isReversed = index % 2 !== 0;

              return (
                <ScrollReveal key={area.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300 hover:shadow-lg ${area.color}`}
                  >
                    <div
                      className={`grid items-center gap-0 ${
                        area.image ? 'md:grid-cols-2' : 'md:grid-cols-1'
                      } ${isReversed && area.image ? 'md:[direction:rtl]' : ''}`}
                    >
                      {/* Image */}
                      {area.image && (
                        <div className="relative h-64 md:h-full md:min-h-[320px]">
                          <Image
                            src={area.image}
                            alt={area.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                        </div>
                      )}

                      {/* Content */}
                      <div className={`p-8 md:p-10 ${isReversed && area.image ? 'md:[direction:ltr]' : ''}`}>
                        <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${area.iconBg}`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="mb-3 font-heading text-2xl font-bold text-gray-900">
                          {area.title}
                        </h3>
                        <p className="mb-5 leading-relaxed text-gray-600">
                          {area.description}
                        </p>

                        {/* Activity tags */}
                        <div className="flex flex-wrap gap-2">
                          {area.activities.map((activity) => (
                            <span
                              key={activity}
                              className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. REQUIREMENTS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                Requisitos
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Que necesitas para <span className="text-primary-600">ser voluntario</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                Solo necesitas ganas de ayudar y cumplir estos requisitos basicos.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                {requirements.map((req) => {
                  const Icon = req.icon;
                  return (
                    <div
                      key={req.text}
                      className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 transition-colors duration-300 hover:bg-primary-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="pt-2 font-medium text-gray-700">{req.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-5">
                <p className="text-sm leading-relaxed text-green-800">
                  <strong>Nota:</strong> El certificado de antecedentes penales es un requisito legal obligatorio para trabajar con menores de edad en Colombia. La fundacion te guiara en el proceso de obtencion si es necesario.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. VOLUNTEER TESTIMONIALS
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-accent-100 px-5 py-2 font-heading text-sm font-semibold text-accent-700 mb-4">
                Testimonios
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                Ellos ya son <span className="text-green-600">voluntarios</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Conoce las experiencias de quienes ya comparten su tiempo y talento con nosotros.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: smoothEase }}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-green-200 hover:shadow-lg"
                >
                  {/* Quote icon */}
                  <div className="mb-5 text-4xl font-serif leading-none text-green-300">
                    &ldquo;
                  </div>

                  {/* Quote text */}
                  <p className="flex-1 leading-relaxed text-gray-600 italic">
                    {testimonial.quote}
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gray-100" />

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <HiUserGroup className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                      <p className="text-xs font-medium text-green-600">{testimonial.years}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. HOW TO APPLY
          ═══════════════════════════════════════════════════════ */}
      <section id="como-aplicar" className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-green-100 px-5 py-2 font-heading text-sm font-semibold text-green-700 mb-4">
                Proceso
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                Como <span className="text-green-600">aplicar</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                En 3 sencillos pasos puedes unirte a nuestro equipo de voluntarios.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="relative grid gap-8 md:grid-cols-3" staggerDelay={0.2}>
            {/* Connecting line (desktop) */}
            <div className="pointer-events-none absolute top-24 left-[16.67%] right-[16.67%] hidden h-0.5 bg-gradient-to-r from-green-200 via-green-300 to-green-200 md:block" />

            {applicationSteps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.step}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Step number circle */}
                    <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/25">
                      <Icon className="h-9 w-9 text-white" />
                      <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-green-600 shadow-md">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. BOTTOM CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-green-600 py-24">
        <HeroWaves />
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <HiHeart className="h-8 w-8 text-white" />
            </div>

            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              Tu tiempo puede cambiar una vida
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Cada hora que compartes con los ninos de Ciudad Bolivar es una semilla de esperanza. Unete a nuestro equipo de voluntarios y se parte del cambio.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/573212465421"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 font-heading font-bold text-green-700 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
              >
                <FaWhatsapp className="h-6 w-6" />
                Escribenos por WhatsApp
              </a>
              <Link
                href={'/contacto' as '/contacto'}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 font-heading font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Ir a Contacto
                <HiArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Phone number */}
            <div className="mt-8 flex items-center justify-center gap-2 text-white/70">
              <HiPhone className="h-4 w-4" />
              <span className="text-sm font-medium">+57 321 246 5421</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
