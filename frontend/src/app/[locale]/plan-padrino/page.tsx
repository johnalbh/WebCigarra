'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import HeroWaves from '@/components/shared/HeroWaves';
import {
  HiHeart,
  HiUserGroup,
  HiChevronDown,
  HiCurrencyDollar,
  HiStar,
  HiSparkles,
  HiShieldCheck,
  HiGlobeAlt,
  HiAcademicCap,
  HiCheckCircle,
  HiArrowRight,
  HiClipboardCheck,
  HiDocumentReport,
  HiPhotograph,
  HiMail,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { FaChild, FaHandHoldingHeart, FaChartLine } from 'react-icons/fa';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ── Pricing tiers ── */
const pricingTiers = [
  {
    name: 'Plan Mensual',
    price: 65000,
    period: 'mes',
    children: 1,
    highlighted: false,
    icon: HiHeart,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700',
    description: 'Ideal para comenzar tu compromiso con un nino.',
    includes: [
      'Programa educativo completo',
      'Alimentacion nutritiva diaria',
      'Reporte mensual de progreso',
    ],
  },
  {
    name: 'Plan Semestral',
    price: 330000,
    period: 'semestre',
    children: 1,
    highlighted: false,
    icon: HiShieldCheck,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700',
    description: 'Acompanamiento continuo durante 6 meses.',
    includes: [
      'Programa educativo completo',
      'Alimentacion nutritiva diaria',
      'Reportes bimestrales de progreso',
      'Foto actualizada del nino',
    ],
  },
  {
    name: 'Plan Anual',
    price: 650000,
    period: 'ano',
    children: 1,
    highlighted: true,
    icon: HiStar,
    color: 'border-accent-300 ring-2 ring-accent-200 shadow-lg shadow-accent-500/10',
    iconBg: 'bg-accent-100 text-accent-600',
    badgeBg: 'bg-accent-50 text-accent-700',
    description: 'Un ano completo transformando la vida de un nino.',
    includes: [
      'Programa educativo completo',
      'Alimentacion nutritiva diaria',
      'Reportes trimestrales de progreso',
      'Certificado anual de impacto',
      'Carta personalizada del nino',
    ],
  },
  {
    name: 'Plan Dorado',
    price: 1200000,
    period: 'ano',
    children: 2,
    highlighted: false,
    icon: HiSparkles,
    color: 'border-accent-200 hover:border-accent-400',
    iconBg: 'bg-accent-100 text-accent-600',
    badgeBg: 'bg-accent-50 text-accent-700',
    description: 'Duplica tu impacto apadrinando a 2 ninos.',
    includes: [
      'Programa educativo para 2 ninos',
      'Alimentacion nutritiva diaria para 2',
      'Reportes trimestrales de progreso',
      'Certificado anual de impacto',
      'Cartas personalizadas de cada nino',
    ],
  },
  {
    name: 'Plan Platino',
    price: 1650000,
    period: 'ano',
    children: 3,
    highlighted: false,
    icon: HiGlobeAlt,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700',
    description: 'Triple impacto: 3 ninos con futuro asegurado.',
    includes: [
      'Programa educativo para 3 ninos',
      'Alimentacion nutritiva diaria para 3',
      'Reportes trimestrales de progreso',
      'Certificado anual de impacto',
      'Cartas personalizadas de cada nino',
      'Invitacion a evento anual de la fundacion',
    ],
  },
  {
    name: 'Plan Ultra',
    price: 2100000,
    period: 'ano',
    children: 4,
    highlighted: false,
    icon: HiStar,
    color: 'border-primary-200 hover:border-primary-400',
    iconBg: 'bg-primary-100 text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700',
    description: 'Maximo impacto: transforma la vida de 4 ninos.',
    includes: [
      'Programa educativo para 4 ninos',
      'Alimentacion nutritiva diaria para 4',
      'Reportes trimestrales de progreso',
      'Certificado anual de impacto',
      'Cartas personalizadas de cada nino',
      'Invitacion a evento anual de la fundacion',
      'Reconocimiento en nuestras redes sociales',
    ],
  },
];

/* ── How It Works steps ── */
const steps = [
  {
    number: '01',
    title: 'Elige tu plan',
    description: 'Selecciona el plan de apadrinamiento que mejor se adapte a tus posibilidades.',
    icon: HiClipboardCheck,
    color: 'from-primary-500 to-primary-700',
  },
  {
    number: '02',
    title: 'Conoce a tu apadrinado',
    description: 'Te presentamos al nino o nina que acompanaras en su proceso educativo.',
    icon: FaChild,
    color: 'from-accent-500 to-accent-700',
  },
  {
    number: '03',
    title: 'Sigue su progreso',
    description: 'Recibe reportes personalizados con el avance academico y desarrollo de tu apadrinado.',
    icon: FaChartLine,
    color: 'from-primary-400 to-primary-600',
  },
];

/* ── What's Included items ── */
const includedItems = [
  {
    icon: HiAcademicCap,
    title: 'Programa educativo',
    description: 'Refuerzo escolar, talleres y apoyo pedagogico integral para su formacion academica.',
    color: 'bg-primary-50 text-primary-600',
    iconBg: 'bg-primary-100',
  },
  {
    icon: HiHeart,
    title: 'Alimentacion nutritiva diaria',
    description: 'Comida balanceada y nutritiva cada dia por $7.045 COP, garantizando su bienestar.',
    color: 'bg-rose-50 text-rose-600',
    iconBg: 'bg-rose-100',
  },
  {
    icon: HiDocumentReport,
    title: 'Reportes personalizados de progreso',
    description: 'Informes detallados sobre el avance academico y desarrollo integral del nino.',
    color: 'bg-accent-50 text-accent-600',
    iconBg: 'bg-accent-100',
  },
  {
    icon: HiCheckCircle,
    title: 'Certificado anual de impacto',
    description: 'Documento oficial que certifica tu aporte y el impacto generado en la vida del nino.',
    color: 'bg-green-50 text-green-600',
    iconBg: 'bg-green-100',
  },
  {
    icon: HiPhotograph,
    title: 'Fotos y actualizaciones',
    description: 'Imagenes y noticias del dia a dia de tu apadrinado en la fundacion.',
    color: 'bg-purple-50 text-purple-600',
    iconBg: 'bg-purple-100',
  },
  {
    icon: HiMail,
    title: 'Carta personalizada del nino',
    description: 'Una carta escrita por tu apadrinado donde comparte sus suenos y agradecimiento.',
    color: 'bg-sky-50 text-sky-600',
    iconBg: 'bg-sky-100',
  },
];

/* ── FAQ data ── */
const faqs = [
  {
    question: 'Mi donacion al Plan Padrino es deducible de impuestos?',
    answer:
      'Si. La Fundacion Cigarra es una entidad sin animo de lucro registrada con NIT 830.114.318-9. Todas las donaciones son deducibles de impuestos de acuerdo con la normativa tributaria colombiana vigente. Emitimos el certificado correspondiente para tu declaracion de renta.',
  },
  {
    question: 'Puedo cancelar o cambiar mi plan en cualquier momento?',
    answer:
      'Si, puedes cancelar o cambiar tu plan en cualquier momento. Solo contactanos por correo electronico o WhatsApp y procesaremos el cambio. Si cancelas, el nino continuara siendo atendido por la fundacion con otros recursos disponibles.',
  },
  {
    question: 'Que sucede si el nino que apadrino se gradua o deja la fundacion?',
    answer:
      'Si tu apadrinado se gradua o deja la fundacion, te notificamos y te asignamos un nuevo nino para que puedas continuar con tu apadrinamiento. Tambien puedes elegir redirigir tu aporte a otro programa de la fundacion.',
  },
  {
    question: 'Como puedo pagar?',
    answer:
      'Puedes pagar a traves de nuestra plataforma segura DonarOnline, que acepta tarjetas de credito, debito y transferencias bancarias. Tambien ofrecemos la opcion de donacion en dolares americanos para padrinos internacionales.',
  },
  {
    question: 'Puedo conocer personalmente al nino que apadrino?',
    answer:
      'Si, organizamos eventos anuales donde los padrinos pueden visitar la fundacion y conocer a sus apadrinados. Tambien puedes coordinar una visita en dias habiles contactandonos previamente.',
  },
  {
    question: 'Que porcentaje de mi donacion llega directamente al nino?',
    answer:
      'El 100% de tu donacion se destina directamente a los programas de la fundacion. Los gastos administrativos son cubiertos por alianzas corporativas. Publicamos informes anuales de gestion financiera para total transparencia.',
  },
];

/* ── Trust badges ── */
const trustBadges = [
  { icon: HiShieldCheck, label: 'NIT 830.114.318-9' },
  { icon: HiDocumentReport, label: 'Deducible de impuestos' },
  { icon: HiCheckCircle, label: 'Transparencia total' },
];

/* ── FAQ Accordion Item ── */
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
              <HiQuestionMarkCircle className="h-5 w-5" />
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
export default function PlanPadrinoPage() {
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
            Fundacion Cigarra &mdash; Ciudad Bolivar, Bogota
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Plan{' '}
            <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
              Padrino
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200/80"
          >
            Apadrina a un nino en Ciudad Bolivar y transforma su vida con educacion,
            alimentacion y amor. Tu compromiso les da la oportunidad de sonar en grande.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#planes"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 font-heading text-lg font-semibold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400 hover:shadow-accent-500/40"
            >
              <HiHeart className="h-5 w-5" />
              Ver Planes
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-heading text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <HiQuestionMarkCircle className="h-5 w-5" />
              Como Funciona
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
          2. HOW IT WORKS
          ═══════════════════════════════════════════════════════ */}
      <section id="como-funciona" className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                Paso a Paso
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                Como funciona el{' '}
                <span className="text-primary-600">Plan Padrino</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                En tres simples pasos puedes cambiar la vida de un nino para siempre.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                    className="group relative flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Step number */}
                    <div className="absolute -top-4 right-6">
                      <span className="font-accent text-6xl font-bold text-primary-100 transition-colors duration-300 group-hover:text-primary-200">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-md`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">{step.description}</p>

                    {/* Connector arrow (hidden on last) */}
                    {index < steps.length - 1 && (
                      <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                        <HiArrowRight className="h-8 w-8 text-primary-200" />
                      </div>
                    )}
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. PRICING CARDS
          ═══════════════════════════════════════════════════════ */}
      <section id="planes" className="relative section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-accent-100 px-5 py-2 font-heading text-sm font-semibold text-accent-700 mb-4">
                Planes de Apadrinamiento
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                Elige tu nivel de{' '}
                <span className="text-primary-600">compromiso</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Cada plan incluye educacion, alimentacion y seguimiento personalizado.
                Elige el que mejor se adapte a ti.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {pricingTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <StaggerItem key={tier.name}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300 ${tier.color}`}
                  >
                    {/* Popular badge */}
                    {tier.highlighted && (
                      <div className="absolute top-0 right-0 z-10 rounded-bl-xl bg-accent-500 px-4 py-1.5">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                          <HiStar className="h-3.5 w-3.5" />
                          Mas Popular
                        </span>
                      </div>
                    )}

                    {/* Card header */}
                    <div className={`p-6 pb-4 ${tier.highlighted ? 'bg-accent-50/50' : ''}`}>
                      {/* Icon + name */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tier.iconBg}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-gray-900">
                            {tier.name}
                          </h3>
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${tier.highlighted ? 'text-accent-600' : 'text-primary-500'}`}>
                            <FaChild className="h-3 w-3" />
                            {tier.children} {tier.children === 1 ? 'nino' : 'ninos'}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <div className="flex items-baseline gap-1">
                          <span className={`font-heading text-3xl font-bold ${tier.highlighted ? 'text-accent-700' : 'text-gray-900'}`}>
                            ${tier.price.toLocaleString('es-CO')}
                          </span>
                          <span className="text-sm font-medium text-gray-400">
                            COP/{tier.period}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed">{tier.description}</p>
                    </div>

                    {/* Divider */}
                    <div className="mx-6 border-t border-gray-100" />

                    {/* Includes list */}
                    <div className="flex-1 p-6 pt-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Incluye
                      </p>
                      <ul className="space-y-2.5">
                        {tier.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <HiCheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${tier.highlighted ? 'text-accent-500' : 'text-primary-500'}`} />
                            <span className="text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="p-6 pt-0">
                      <a
                        href={DONATION_LINK_COP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-heading font-semibold text-white transition-all duration-300 ${
                          tier.highlighted
                            ? 'bg-accent-500 hover:bg-accent-400 shadow-md shadow-accent-500/20'
                            : 'bg-primary-500 hover:bg-primary-400'
                        }`}
                      >
                        <FaHandHoldingHeart className="h-4 w-4" />
                        Apadrinar Ahora
                      </a>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* USD link */}
          <ScrollReveal>
            <div className="mt-12 text-center">
              <a
                href={DONATION_LINK_USD}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-primary-200 bg-white px-10 py-4 font-heading text-lg font-semibold text-primary-700 transition-colors duration-300 hover:border-primary-400 hover:bg-primary-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 transition-colors group-hover:bg-primary-200">
                  <HiCurrencyDollar className="h-6 w-6 text-primary-600" />
                </div>
                Donar en USD (dolares)
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. WHAT'S INCLUDED
          ═══════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                Beneficios del Plan
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                Que incluye tu{' '}
                <span className="text-primary-600">apadrinamiento</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Cada apadrinamiento cubre las necesidades integrales del nino,
                asegurando su desarrollo educativo y bienestar.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            {includedItems.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`group flex h-full flex-col rounded-xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-md ${item.color}`}
                  >
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${item.iconBg}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. TESTIMONIAL / IMPACT
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-900 section-padding">
        <HeroWaves />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Quote */}
            <ScrollReveal direction="left">
              <div>
                <span className="inline-block rounded-full bg-white/10 px-5 py-2 font-heading text-sm font-semibold text-accent-400 mb-6">
                  Testimonios
                </span>

                {/* Quote */}
                <div className="relative">
                  <span className="font-accent text-8xl leading-none text-accent-500/20 absolute -top-6 -left-4">
                    &ldquo;
                  </span>
                  <blockquote className="relative z-10 pl-6">
                    <p className="font-accent text-2xl leading-relaxed text-white/90 italic md:text-3xl">
                      Gracias al Plan Padrino, mi hijo ahora suena con ser ingeniero.
                      La fundacion le dio las herramientas y el amor que necesitaba
                      para creer en si mismo.
                    </p>
                    <footer className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/20">
                        <HiUserGroup className="h-6 w-6 text-accent-400" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-white">
                          Maria Fernanda
                        </p>
                        <p className="text-sm text-primary-300/70">
                          Madre de beneficiario, Ciudad Bolivar
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Impact Stats */}
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/20">
                    <FaChild className="h-7 w-7 text-accent-400" />
                  </div>
                  <p className="font-heading text-4xl font-bold text-white md:text-5xl">1,877+</p>
                  <p className="mt-2 text-sm font-medium text-primary-300">ninos ayudados</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/20">
                    <HiSparkles className="h-7 w-7 text-primary-300" />
                  </div>
                  <p className="font-heading text-4xl font-bold text-white md:text-5xl">23</p>
                  <p className="mt-2 text-sm font-medium text-primary-300">anos de trayectoria</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                    <HiAcademicCap className="h-7 w-7 text-green-400" />
                  </div>
                  <p className="font-heading text-4xl font-bold text-white md:text-5xl">14</p>
                  <p className="mt-2 text-sm font-medium text-primary-300">programas activos</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/20">
                    <HiHeart className="h-7 w-7 text-rose-400" />
                  </div>
                  <p className="font-heading text-4xl font-bold text-white md:text-5xl">$7.045</p>
                  <p className="mt-2 text-sm font-medium text-primary-300">COP/dia por nino</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. FAQ SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-primary-100 px-5 py-2 font-heading text-sm font-semibold text-primary-700 mb-4">
                Preguntas Frecuentes
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                Resolvemos tus{' '}
                <span className="text-primary-600">dudas</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-gray-500">
                Todo lo que necesitas saber sobre el Plan Padrino antes de dar el paso.
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
          7. BOTTOM CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 py-24">
        <HeroWaves />
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <FaHandHoldingHeart className="h-8 w-8 text-white" />
            </div>

            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              Cambia una vida hoy
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Un nino en Ciudad Bolivar esta esperando por ti. Con tu apadrinamiento,
              le das acceso a educacion, alimentacion y la oportunidad de un futuro mejor.
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
                Apadrinar en COP
              </a>
              <a
                href={DONATION_LINK_USD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 font-heading font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                <HiCurrencyDollar className="h-5 w-5" />
                Donar en USD
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
