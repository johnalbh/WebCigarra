'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
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
} from 'react-icons/hi';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';

const smoothEase = [0.22, 1, 0.36, 1] as const;
const springEase = [0.34, 1.56, 0.64, 1] as const;

const donationTiers = [
  {
    name: 'Amigo',
    amountCOP: 50000,
    amountUSD: 12,
    impact: 'Materiales escolares para 1 nino por un mes',
    highlighted: false,
    icon: HiHeart,
    gradient: 'from-primary-400 to-primary-600',
    glowColor: 'shadow-primary-500/20',
  },
  {
    name: 'Protector',
    amountCOP: 100000,
    amountUSD: 25,
    impact: 'Alimentacion nutritiva para 1 nino por un mes',
    highlighted: true,
    icon: HiShieldCheck,
    gradient: 'from-accent-400 to-accent-600',
    glowColor: 'shadow-accent-500/30',
  },
  {
    name: 'Padrino',
    amountCOP: 200000,
    amountUSD: 50,
    impact: 'Programa completo para 1 nino: alimentacion + educacion',
    highlighted: false,
    icon: HiStar,
    gradient: 'from-primary-500 to-primary-700',
    glowColor: 'shadow-primary-600/20',
  },
  {
    name: 'Benefactor',
    amountCOP: 500000,
    amountUSD: 125,
    impact: 'Sostenimiento mensual de un programa completo',
    highlighted: false,
    icon: HiGlobeAlt,
    gradient: 'from-primary-600 to-primary-900',
    glowColor: 'shadow-primary-700/20',
  },
];

const waysToHelp = [
  {
    titleKey: 'sponsorTitle' as const,
    descKey: 'sponsorDescription' as const,
    image: 'https://cigarra.org/wp-content/uploads/2025/04/ApoyoEscolar.jpg',
    icon: HiUserGroup,
    gradient: 'from-primary-600/90 to-primary-900/80',
  },
  {
    titleKey: 'volunteerTitle' as const,
    descKey: 'volunteerDescription' as const,
    image: 'https://cigarra.org/wp-content/uploads/2025/04/Recreacion.jpg',
    icon: HiHand,
    gradient: 'from-accent-600/90 to-accent-900/80',
  },
  {
    titleKey: 'nutritionTitle' as const,
    descKey: 'nutritionCost' as const,
    image: 'https://cigarra.org/wp-content/uploads/2025/02/Nutricion_2.jpg',
    icon: HiHeart,
    gradient: 'from-green-600/90 to-green-900/80',
    extra: '$7.045 COP',
  },
];

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

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.05}>
      <div
        className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-300 ${
          open
            ? 'border-primary-200 bg-gradient-to-r from-primary-50/80 to-accent-50/40 shadow-lg shadow-primary-100/50'
            : 'border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200'
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
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30'
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

export default function HowToHelpPage() {
  const t = useTranslations('donation');
  const tFaq = useTranslations('faq');

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-primary-950">
        {/* Subtle accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-28 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-36">
          {/* Text side */}
          <div>
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
              className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-primary-200/80"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: smoothEase }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#donation-tiers"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 font-heading font-semibold text-white shadow-lg shadow-accent-500/25 transition-all duration-300 hover:bg-accent-400 hover:-translate-y-0.5"
              >
                <HiHeart className="h-5 w-5 transition-transform group-hover:scale-110" />
                {t('donateCOP')}
              </a>
              <a
                href={DONATION_LINK_USD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 font-heading font-semibold text-white transition-all duration-300 hover:bg-white/5 hover:border-white/30"
              >
                <HiCurrencyDollar className="h-5 w-5" />
                {t('donateUSD')}
              </a>
            </motion.div>
          </div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://cigarra.org/wp-content/uploads/2025/04/Musica.jpg"
                alt="Children receiving help"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== DONATION TIERS SECTION ===== */}
      <section id="donation-tiers" className="relative section-padding overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-50 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent-50 blur-3xl opacity-40" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
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

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.12}>
            {donationTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <StaggerItem key={tier.name}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-500 ${
                      tier.highlighted
                        ? 'shadow-2xl shadow-accent-500/25 ring-2 ring-accent-400'
                        : 'bg-white shadow-lg shadow-gray-200/60 hover:shadow-xl hover:shadow-primary-200/40'
                    }`}
                  >
                    {/* Most popular badge */}
                    {tier.highlighted && (
                      <div className="absolute -top-0 left-0 right-0 z-20">
                        <div className="mx-auto w-fit rounded-b-xl bg-accent-500 px-6 py-1.5 shadow-lg shadow-accent-500/30">
                          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                            <HiStar className="h-3.5 w-3.5" />
                            Mas Popular
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Gradient header with icon */}
                    <div
                      className={`relative flex flex-col items-center px-6 pt-10 pb-6 bg-gradient-to-br ${tier.gradient}`}
                    >
                      {/* Decorative circles */}
                      <div className="absolute top-2 right-2 h-20 w-20 rounded-full bg-white/10" />
                      <div className="absolute bottom-0 left-4 h-12 w-12 rounded-full bg-white/5" />

                      <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-white">{tier.name}</h3>
                    </div>

                    {/* Card body */}
                    <div className={`flex flex-1 flex-col px-6 py-6 ${tier.highlighted ? 'bg-white' : 'bg-white'}`}>
                      <div className="mb-1 text-center">
                        <span className="text-3xl font-bold text-gray-900">
                          ${tier.amountCOP.toLocaleString('es-CO')}
                        </span>
                        <span className="text-sm font-medium text-gray-400"> COP/{t('monthly')}</span>
                      </div>
                      <p className="mb-4 text-center text-sm text-gray-400">
                        ~${tier.amountUSD} USD/{t('monthly')}
                      </p>

                      <div className="mb-6 flex-1 rounded-xl bg-gray-50 p-4">
                        <p className="text-center text-sm leading-relaxed text-gray-600">
                          <span className="font-semibold text-primary-700">{t('impact')}:</span>{' '}
                          {tier.impact}
                        </p>
                      </div>

                      <a
                        href={DONATION_LINK_COP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block rounded-2xl py-3.5 text-center font-heading font-semibold transition-all duration-300 ${
                          tier.highlighted
                            ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:from-accent-400 hover:to-accent-500'
                            : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:from-primary-400 hover:to-primary-500'
                        }`}
                      >
                        {t('donateCOP')}
                      </a>
                    </div>

                    {/* Hover glow effect */}
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                        tier.highlighted ? 'shadow-[inset_0_0_40px_rgba(245,158,11,0.1)]' : 'shadow-[inset_0_0_40px_rgba(22,123,174,0.08)]'
                      }`}
                    />
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* USD Donation button */}
          <ScrollReveal>
            <div className="mt-12 text-center">
              <motion.a
                href={DONATION_LINK_USD}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 rounded-2xl border-2 border-primary-200 bg-white px-10 py-4 font-heading text-lg font-semibold text-primary-700 shadow-md transition-all duration-300 hover:border-primary-400 hover:bg-primary-50 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 transition-colors group-hover:bg-primary-200">
                  <HiCurrencyDollar className="h-6 w-6 text-primary-600" />
                </div>
                {t('donateUSD')}
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== WAYS TO HELP SECTION ===== */}
      <section className="relative section-padding bg-gray-950 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="absolute top-1/4 left-0 h-72 w-72 rounded-full bg-primary-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-accent-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                Otras formas de <span className="text-gradient">ayudar</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
                Mas alla de las donaciones, hay muchas formas de ser parte del cambio.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {waysToHelp.map((item, i) => (
              <ScrollReveal key={item.titleKey} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="group relative h-[420px] overflow-hidden rounded-3xl"
                >
                  {/* Background image */}
                  <Image
                    src={item.image}
                    alt={item.titleKey}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-2 font-heading text-2xl font-bold text-white">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/90">
                      {t(item.descKey)}
                    </p>
                    {item.extra && (
                      <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30 px-4 py-2">
                        <span className="text-sm font-bold text-green-300">
                          {item.extra} / comida
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover border glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/0 transition-all duration-500 group-hover:border-white/20" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="relative section-padding overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-[10%] h-64 w-64 rounded-full bg-primary-50 blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-[10%] h-64 w-64 rounded-full bg-accent-50 blur-3xl opacity-50" />

        <div className="relative mx-auto max-w-3xl px-4 lg:px-8">
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

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-8 py-16 text-center shadow-2xl md:px-16 md:py-20">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-accent-400/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-primary-400/20 blur-3xl" />
              <div className="absolute top-10 right-10 h-24 w-24 rounded-full bg-white/5 animate-float" />
              <div className="absolute bottom-10 left-10 h-16 w-16 rounded-full bg-white/5 animate-float" style={{ animationDelay: '2s' }} />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: springEase }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <HiHeart className="h-10 w-10 text-accent-400 animate-pulse-soft" />
                </motion.div>

                <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
                  Tu generosidad cambia vidas
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-200">
                  Cada aporte, sin importar el monto, es un paso hacia un futuro mejor para nuestros ninos.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={DONATION_LINK_COP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-10 py-4 font-heading font-bold text-white shadow-xl shadow-accent-500/30 transition-all duration-300 hover:bg-accent-400 hover:shadow-2xl hover:shadow-accent-500/40 hover:-translate-y-0.5"
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
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
