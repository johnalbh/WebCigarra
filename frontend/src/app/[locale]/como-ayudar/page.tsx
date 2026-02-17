'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import {
  HiHeart,
  HiUserGroup,
  HiHand,
  HiChevronDown,
  HiCurrencyDollar,
  HiStar,
  HiSparkles,
  HiShieldCheck,
  HiGlobeAlt,
  HiAcademicCap,
  HiCheckCircle,
  HiArrowRight,
  HiLightningBolt,
  HiClipboardCheck,
  HiDocumentReport,
} from 'react-icons/hi';
import { FaWhatsapp, FaPaintBrush, FaRunning, FaBriefcase } from 'react-icons/fa';
import HeroWaves from '@/components/shared/HeroWaves';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ── Impact calculator data ── */
const impactOptions = [
  {
    amount: 30000,
    label: '$30.000',
    impact: 'refrigerios nutritivos para 4 ninos durante una semana',
  },
  {
    amount: 50000,
    label: '$50.000',
    impact: 'materiales escolares para 1 nino por 1 mes',
  },
  {
    amount: 100000,
    label: '$100.000',
    impact: 'alimentacion nutritiva para 1 nino por un mes completo',
  },
  {
    amount: 200000,
    label: '$200.000',
    impact: 'programa completo de educacion + alimentacion para 1 nino',
  },
];

/* ── Donation tiers (Plan Padrino real pricing) ── */
const donationTiers = [
  {
    name: 'Plan Mensual',
    amountCOP: 65000,
    period: 'mes',
    impact: 'Apadrina 1 nino con educacion y alimentacion por un mes',
    highlighted: false,
    icon: HiHeart,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
  },
  {
    name: 'Plan Semestral',
    amountCOP: 330000,
    period: 'semestre',
    impact: 'Apadrina 1 nino durante 6 meses continuos',
    highlighted: false,
    icon: HiShieldCheck,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
  },
  {
    name: 'Plan Anual',
    amountCOP: 650000,
    period: 'ano',
    impact: 'Apadrina 1 nino durante todo un ano academico',
    highlighted: true,
    icon: HiStar,
    color: 'border-accent-300 ring-2 ring-accent-200',
    iconBg: 'bg-accent-100 text-accent-600',
  },
  {
    name: 'Plan Dorado',
    amountCOP: 1200000,
    period: 'ano',
    impact: 'Apadrina 2 ninos durante todo un ano academico',
    highlighted: false,
    icon: HiSparkles,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-accent-100 text-accent-600',
  },
  {
    name: 'Plan Platino',
    amountCOP: 1650000,
    period: 'ano',
    impact: 'Apadrina 3 ninos durante todo un ano academico',
    highlighted: false,
    icon: HiGlobeAlt,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
  },
  {
    name: 'Plan Ultra',
    amountCOP: 2100000,
    period: 'ano',
    impact: 'Apadrina 4 ninos durante todo un ano academico',
    highlighted: false,
    icon: HiStar,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
  },
];

/* ── Volunteer areas ── */
const volunteerAreas = [
  {
    icon: HiAcademicCap,
    title: 'Educacion',
    description: 'Refuerzo escolar, talleres de lectura, apoyo en tareas y preparacion de examenes.',
    color: 'bg-primary-50 text-primary-600 border-primary-200',
    iconBg: 'bg-primary-100',
  },
  {
    icon: FaPaintBrush,
    title: 'Arte y Cultura',
    description: 'Musica, danza, teatro, artes plasticas, fotografia y manualidades.',
    color: 'bg-accent-50 text-accent-600 border-accent-200',
    iconBg: 'bg-accent-100',
  },
  {
    icon: FaRunning,
    title: 'Deportes y Recreacion',
    description: 'Actividades deportivas, juegos cooperativos y desarrollo motriz.',
    color: 'bg-green-50 text-green-600 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    icon: FaBriefcase,
    title: 'Gestion y Administracion',
    description: 'Comunicaciones, diseño, contabilidad, asesoria legal y tecnologia.',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    iconBg: 'bg-purple-100',
  },
];

/* ── FAQ data ── */
const faqs = [
  {
    question: 'Como puedo donar?',
    answer:
      'Puedes donar en linea a traves de nuestra plataforma segura DonarOnline, en pesos colombianos o dolares americanos. Tambien aceptamos transferencias bancarias directas.',
  },
  {
    question: 'Mi donacion es deducible de impuestos?',
    answer:
      'Si, la Fundacion Cigarra es una entidad sin animo de lucro registrada con NIT 830.114.318-9. Las donaciones son deducibles de impuestos segun la normativa colombiana vigente.',
  },
  {
    question: 'Como se que mi donacion se usa correctamente?',
    answer:
      'Publicamos informes anuales de gestion y financieros. Los padrinos reciben reportes periodicos del progreso de su apadrinado. Estamos comprometidos con la transparencia total.',
  },
  {
    question: 'Puedo ser voluntario?',
    answer:
      'Si, buscamos voluntarios en areas de educacion, arte, deportes, tecnologia y gestion administrativa. Contactanos por WhatsApp o correo electronico para conocer las oportunidades disponibles.',
  },
  {
    question: 'Que es el Plan Padrino?',
    answer:
      'El Plan Padrino te permite apadrinar a un nino especifico, cubrir sus necesidades educativas y de alimentacion, y seguir su progreso durante todo el ano academico con reportes personalizados.',
  },
];

/* ── Trust badges ── */
const trustBadges = [
  { icon: HiShieldCheck, label: '100% seguro' },
  { icon: HiDocumentReport, label: 'Deducible de impuestos' },
  { icon: HiCheckCircle, label: 'Transparencia total' },
];

/* ── Plan Padrino includes ── */
const planPadrinoIncludes = [
  { icon: HiAcademicCap, text: 'Programa educativo mensual completo' },
  { icon: HiHeart, text: 'Alimentacion nutritiva diaria ($7.045 COP/dia)' },
  { icon: HiDocumentReport, text: 'Reportes personalizados de progreso' },
  { icon: HiClipboardCheck, text: 'Certificado anual de impacto' },
];

/* ── FAQ Accordion item ── */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.05}>
      <div
        className={`mb-4 overflow-hidden rounded-xl border transition-all duration-300 ${
          open
            ? 'border-primary-200 bg-primary-50/50'
            : 'border-gray-100 bg-white hover:border-gray-200'
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-6 py-5 text-left"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                open
                  ? 'bg-primary-500 text-white'
                  : 'bg-primary-50 text-primary-600'
              }`}
            >
              <HiSparkles className="h-5 w-5" />
            </div>
            <span
              className={`font-heading text-lg font-semibold transition-colors duration-300 ${
                open ? 'text-primary-800' : 'text-gray-900'
              }`}
            >
              {question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: smoothEase }}
          >
            <HiChevronDown
              className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
                open ? 'text-primary-600' : 'text-gray-400'
              }`}
            />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pl-20">
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function HowToHelpPage() {
  const t = useTranslations('donation');
  const tFaq = useTranslations('faq');
  const [selectedAmount, setSelectedAmount] = useState(1); // index into impactOptions
  const [customAmount, setCustomAmount] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const activeImpact = showCustom
    ? `Con $${Number(customAmount || 0).toLocaleString('es-CO')} COP puedes apoyar los programas de la Fundacion Cigarra`
    : `Con ${impactOptions[selectedAmount].label} COP puedes cubrir ${impactOptions[selectedAmount].impact}`;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        {/* Accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 text-center lg:px-8 lg:py-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400"
          >
            Fundacion Cigarra
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Cada Gesto{' '}
            <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
              Cuenta
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200/80"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={DONATION_LINK_COP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 font-heading text-lg font-semibold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400 hover:shadow-accent-500/40"
            >
              <HiHeart className="h-5 w-5" />
              Dona Ahora
            </a>
            <a
              href="#plan-padrino"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-heading text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <HiUserGroup className="h-5 w-5" />
              Apadrina un Nino
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-primary-300/70"
              >
                <badge.icon className="h-4 w-4 text-accent-400" />
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. QUICK IMPACT CALCULATOR
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full bg-accent-100 px-5 py-2 font-heading text-sm font-semibold text-accent-700 mb-4">
                Calculadora de Impacto
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Tu aporte de hoy{' '}
                <span className="text-primary-600">transforma vidas</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-500">
                Selecciona un monto y descubre el impacto real de tu donacion.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
              {/* Amount buttons */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                {impactOptions.map((option, idx) => (
                  <button
                    key={option.amount}
                    onClick={() => {
                      setSelectedAmount(idx);
                      setShowCustom(false);
                    }}
                    className={`rounded-xl border-2 px-4 py-4 font-heading text-lg font-bold transition-all duration-300 ${
                      !showCustom && selectedAmount === idx
                        ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    {option.label}
                    <span className="block text-xs font-medium opacity-60">COP</span>
                  </button>
                ))}
              </div>

              {/* Custom amount toggle */}
              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={() => setShowCustom(!showCustom)}
                  className="text-sm font-medium text-primary-600 underline decoration-primary-300 underline-offset-4 hover:text-primary-700"
                >
                  {showCustom ? 'Elegir monto predefinido' : 'Ingresar otro monto'}
                </button>
              </div>

              {/* Custom amount input */}
              <AnimatePresence>
                {showCustom && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="text-lg font-bold text-gray-400">$</span>
                      <input
                        type="number"
                        placeholder="Ej: 75000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-48 rounded-xl border-2 border-gray-200 px-4 py-3 text-center font-heading text-lg font-bold text-gray-800 placeholder:text-gray-300 focus:border-accent-500 focus:outline-none"
                      />
                      <span className="text-lg font-bold text-gray-400">COP</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Impact display */}
              <motion.div
                key={showCustom ? `custom-${customAmount}` : `preset-${selectedAmount}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: smoothEase }}
                className="mt-8 rounded-xl bg-primary-50 p-6 text-center"
              >
                <HiLightningBolt className="mx-auto mb-2 h-8 w-8 text-accent-500" />
                <p className="text-lg font-medium text-primary-800 leading-relaxed">
                  {activeImpact}
                </p>
              </motion.div>

              {/* Donate button */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <a
                  href={DONATION_LINK_COP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-accent-500 px-10 py-4 font-heading text-lg font-bold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400 hover:shadow-accent-500/40"
                >
                  <HiHeart className="h-5 w-5" />
                  Donar Ahora
                </a>
                <a
                  href={DONATION_LINK_USD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  <HiCurrencyDollar className="h-4 w-4" />
                  Donar en USD (dolares)
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. THREE WAYS TO HELP
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                3 formas de <span className="text-primary-600">cambiar vidas</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Elige la manera que mejor se adapte a ti. Cada gesto cuenta.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {/* ── Card: DONA ── */}
            <ScrollReveal delay={0}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="group relative h-[480px] overflow-hidden rounded-2xl"
              >
                <Image
                  src="/images/engagement/musica.jpg"
                  alt="Ninos en actividades de la fundacion"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-900/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/30 border border-red-400/40">
                    <HiHeart className="h-7 w-7 text-white" />
                  </div>
                  <span className="mb-1 text-xs font-bold uppercase tracking-widest text-red-300">
                    Opcion 1
                  </span>
                  <h3 className="mb-2 font-heading text-3xl font-bold text-white">Dona</h3>
                  <p className="mb-6 text-sm leading-relaxed text-white/90">
                    Tu donacion financia educacion, alimentacion y materiales para ninos en Ciudad Bolivar.
                  </p>
                  <a
                    href={DONATION_LINK_COP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-500 px-6 py-3 font-heading font-semibold text-white transition-all duration-300 hover:bg-accent-400"
                  >
                    Donar Ahora
                    <HiArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* ── Card: APADRINA ── */}
            <ScrollReveal delay={0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="group relative h-[480px] overflow-hidden rounded-2xl"
              >
                <Image
                  src="/images/engagement/apoyo-escolar.jpg"
                  alt="Apoyo escolar en la fundacion"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500/30 border border-primary-400/40">
                    <HiUserGroup className="h-7 w-7 text-white" />
                  </div>
                  <span className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-300">
                    Opcion 2
                  </span>
                  <h3 className="mb-2 font-heading text-3xl font-bold text-white">
                    Apadrina un Nino
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed text-white/90">
                    El Plan Padrino cubre educacion + alimentacion de un nino. Recibes reportes de su progreso.
                  </p>
                  <div className="mb-5 inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-3 py-1.5">
                    <span className="text-sm font-bold text-accent-300">Desde $65.000 COP/mes</span>
                  </div>
                  <Link
                    href={'/plan-padrino' as '/plan-padrino'}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-heading font-semibold text-primary-700 transition-all duration-300 hover:bg-primary-50"
                  >
                    Conocer el Plan Padrino
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* ── Card: VOLUNTARIO ── */}
            <ScrollReveal delay={0.3}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="group relative h-[480px] overflow-hidden rounded-2xl"
              >
                <Image
                  src="/images/engagement/recreacion.jpg"
                  alt="Voluntarios en actividades recreativas"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-500/30 border border-green-400/40">
                    <HiHand className="h-7 w-7 text-white" />
                  </div>
                  <span className="mb-1 text-xs font-bold uppercase tracking-widest text-green-300">
                    Opcion 3
                  </span>
                  <h3 className="mb-2 font-heading text-3xl font-bold text-white">
                    Se Voluntario
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-white/90">
                    Comparte tu tiempo y talento. Buscamos docentes, artistas, mentores y mas.
                  </p>
                  <Link
                    href={'/voluntariado' as '/voluntariado'}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-heading font-semibold text-white transition-all duration-300 hover:bg-green-400"
                  >
                    Quiero Ser Voluntario
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. PLAN PADRINO DETAIL SECTION
          ═══════════════════════════════════════════════════════ */}
      <section
        id="plan-padrino"
        className="relative section-padding overflow-hidden bg-primary-50"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Image */}
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/stories/juan-david.jpg"
                  alt="Nino estudiando en la fundacion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-100">
                      <HiHeart className="h-5 w-5 text-accent-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      <span className="font-bold text-primary-700">+23 anos</span> transformando vidas en Ciudad Bolivar
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Content */}
            <ScrollReveal direction="right">
              <div>
                <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-6">
                  Plan Padrino
                </span>
                <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                  Cambia la vida de un nino{' '}
                  <span className="text-primary-600">para siempre</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Al apadrinar un nino, cubres sus necesidades educativas y alimentarias durante todo el ano. Recibes reportes personalizados de su avance y te conviertes en parte fundamental de su futuro.
                </p>

                {/* What it includes */}
                <div className="mt-8 space-y-4">
                  {planPadrinoIncludes.map((item) => (
                    <div key={item.text} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100">
                        <item.icon className="h-5 w-5 text-primary-600" />
                      </div>
                      <p className="pt-2 text-gray-700 font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-8 rounded-xl border border-accent-200 bg-accent-50 p-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-bold text-accent-700">
                      $65.000
                    </span>
                    <span className="text-lg font-medium text-accent-600">COP/mes</span>
                  </div>
                  <p className="mt-1 text-sm text-accent-600/70">
                    Planes desde mensual hasta anual. Ver todos los planes.
                  </p>
                  <Link
                    href={'/plan-padrino' as '/plan-padrino'}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Ver planes detallados
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* CTA */}
                <a
                  href={DONATION_LINK_COP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-10 py-4 font-heading text-lg font-bold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400 hover:shadow-accent-500/40"
                >
                  <HiHeart className="h-5 w-5" />
                  Apadrina un Nino Hoy
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. DONATION TIERS
          ═══════════════════════════════════════════════════════ */}
      <section id="donation-tiers" className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-accent-100 px-5 py-2 font-heading text-sm font-semibold text-accent-700 mb-4">
                {t('impact')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                Elige tu nivel de <span className="text-primary-600">impacto</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Cada aporte transforma vidas. Elige el plan que mejor se adapte a ti.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="space-y-4 md:space-y-5" staggerDelay={0.1}>
            {donationTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <StaggerItem key={tier.name}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`group relative flex flex-col items-center gap-6 overflow-hidden rounded-xl border-2 bg-white p-6 transition-all duration-300 md:flex-row md:gap-8 md:p-8 ${tier.color}`}
                  >
                    {/* Popular badge */}
                    {tier.highlighted && (
                      <div className="absolute top-0 right-0 rounded-bl-xl bg-accent-500 px-4 py-1.5">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                          <HiStar className="h-3.5 w-3.5" />
                          Mas Popular
                        </span>
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${tier.iconBg}`}>
                      <Icon className="h-8 w-8" />
                    </div>

                    {/* Name & impact */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-heading text-2xl font-bold text-gray-900">
                        {tier.name}
                      </h3>
                      <p className="mt-1 text-gray-500">{tier.impact}</p>
                    </div>

                    {/* Price */}
                    <div className="text-center md:text-right shrink-0">
                      <div className="font-heading text-2xl font-bold text-gray-900">
                        ${tier.amountCOP.toLocaleString('es-CO')}
                        <span className="text-sm font-medium text-gray-400"> COP</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        / {tier.period}
                      </p>
                    </div>

                    {/* Donate button */}
                    <a
                      href={DONATION_LINK_COP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 font-heading font-semibold text-white transition-all duration-300 ${
                        tier.highlighted
                          ? 'bg-accent-500 hover:bg-accent-400 shadow-md shadow-accent-500/20'
                          : 'bg-primary-500 hover:bg-primary-400'
                      }`}
                    >
                      Donar
                      <HiArrowRight className="h-4 w-4" />
                    </a>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* USD link */}
          <ScrollReveal>
            <div className="mt-10 text-center">
              <a
                href={DONATION_LINK_USD}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-primary-200 bg-white px-10 py-4 font-heading text-lg font-semibold text-primary-700 transition-colors duration-300 hover:border-primary-400 hover:bg-primary-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 transition-colors group-hover:bg-primary-200">
                  <HiCurrencyDollar className="h-6 w-6 text-primary-600" />
                </div>
                {t('donateUSD')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. PROGRAMA DE NUTRICION (dark section)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900 section-padding">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-5xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-white/10 px-5 py-2 font-heading text-sm font-semibold text-accent-400 mb-6">
                {t('nutritionTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                Alimentacion que{' '}
                <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                  nutre el futuro
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/20">
                  <HiCurrencyDollar className="h-8 w-8 text-accent-400" />
                </div>
                <p className="font-heading text-5xl font-bold text-white">$7.045</p>
                <p className="mt-2 text-lg font-medium text-primary-300">COP por nino por dia</p>
                <p className="mt-3 text-sm text-primary-400/70">
                  Costo real de una comida nutritiva completa
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <HiHeart className="h-8 w-8 text-green-400" />
                </div>
                <p className="font-heading text-5xl font-bold text-white">2,000+</p>
                <p className="mt-2 text-lg font-medium text-primary-300">refrigerios servidos</p>
                <p className="mt-3 text-sm text-primary-400/70">
                  Este trimestre en nuestras jornadas de nutricion
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="mt-12 text-center">
              <a
                href={DONATION_LINK_COP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-10 py-4 font-heading text-lg font-bold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400"
              >
                <HiHeart className="h-5 w-5" />
                Dona para Nutricion
              </a>
              <p className="mt-4 text-sm text-primary-400/60">
                Con solo $7.045 COP al dia puedes alimentar a un nino
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. VOLUNTARIADO DETAIL SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-green-100 px-5 py-2 font-heading text-sm font-semibold text-green-700 mb-4">
                {t('volunteerTitle')}
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                Comparte tu <span className="text-green-600">talento</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                {t('volunteerDescription')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
            {volunteerAreas.map((area) => {
              const Icon = area.icon;
              return (
                <StaggerItem key={area.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`group flex h-full flex-col items-center rounded-xl border p-8 text-center transition-all duration-300 hover:shadow-md ${area.color}`}
                  >
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${area.iconBg}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-bold text-gray-900">
                      {area.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-gray-600">
                      {area.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* WhatsApp CTA */}
          <ScrollReveal>
            <div className="mt-12 text-center">
              <a
                href="https://wa.me/573212465421"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-green-500 px-10 py-4 font-heading text-lg font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:bg-green-400"
              >
                <FaWhatsapp className="h-6 w-6" />
                Quiero Ser Voluntario
              </a>
              <p className="mt-3 text-sm text-gray-400">
                Escribenos por WhatsApp y te contamos como participar
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. FAQ SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                FAQ
              </span>
              <h2 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                {tFaq('title')}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-gray-500">
                Resolvemos tus dudas para que puedas ayudar con confianza.
              </p>
            </div>
          </ScrollReveal>

          <div>
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. FINAL CTA SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 py-24">
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
              No dejes para manana lo que puedes hacer hoy
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Cada dia sin actuar es un dia menos en la vida de un nino. Tu aporte de hoy construye el futuro de manana.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={DONATION_LINK_COP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-heading font-bold text-accent-700 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
              >
                <HiHeart className="h-5 w-5" />
                {t('donateCOP')}
              </a>
              <a
                href={DONATION_LINK_USD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 font-heading font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                <HiCurrencyDollar className="h-5 w-5" />
                {t('donateUSD')}
              </a>
              <Link
                href={'/contacto' as '/contacto'}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 font-heading font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Contactar
                <HiArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <badge.icon className="h-4 w-4 text-white/90" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
