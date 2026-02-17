'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/shared/StaggerContainer';
import { HiHeart, HiUserGroup, HiHand, HiChevronDown, HiChevronUp, HiCurrencyDollar } from 'react-icons/hi';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';

const donationTiers = [
  { name: 'Amigo', amountCOP: 50000, amountUSD: 12, impact: 'Materiales escolares para 1 niño por un mes', highlighted: false },
  { name: 'Protector', amountCOP: 100000, amountUSD: 25, impact: 'Alimentación nutritiva para 1 niño por un mes', highlighted: true },
  { name: 'Padrino', amountCOP: 200000, amountUSD: 50, impact: 'Programa completo para 1 niño: alimentación + educación', highlighted: false },
  { name: 'Benefactor', amountCOP: 500000, amountUSD: 125, impact: 'Sostenimiento mensual de un programa completo', highlighted: false },
];

const faqs = [
  { question: '¿Cómo puedo donar?', answer: 'Puedes donar en línea a través de nuestra plataforma segura DonarOnline, en pesos colombianos o dólares americanos. También aceptamos transferencias bancarias directas.' },
  { question: '¿Mi donación es deducible de impuestos?', answer: 'Sí, la Fundación Cigarra es una entidad sin ánimo de lucro registrada con NIT 830.114.318-9. Las donaciones son deducibles de impuestos según la normativa colombiana vigente.' },
  { question: '¿Cómo sé que mi donación se usa correctamente?', answer: 'Publicamos informes anuales de gestión y financieros. Los padrinos reciben reportes periódicos del progreso de su apadrinado. Estamos comprometidos con la transparencia total.' },
  { question: '¿Puedo ser voluntario?', answer: 'Sí, buscamos voluntarios en áreas de educación, arte, deportes, tecnología y gestión administrativa. Contáctanos por WhatsApp o correo electrónico para conocer las oportunidades disponibles.' },
  { question: '¿Qué es el Plan Padrino?', answer: 'El Plan Padrino te permite apadrinar a un niño específico, cubrir sus necesidades educativas y de alimentación, y seguir su progreso durante todo el año académico con reportes personalizados.' },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-heading text-lg font-semibold text-gray-900">{question}</span>
        {open ? (
          <HiChevronUp className="h-5 w-5 flex-shrink-0 text-primary-600" />
        ) : (
          <HiChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function HowToHelpPage() {
  const t = useTranslations('donation');
  const tFaq = useTranslations('faq');

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-gradient-to-br from-accent-600 via-accent-500 to-accent-400 pt-20">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white md:text-5xl"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg text-white/90"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {donationTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`relative rounded-2xl p-6 ${
                    tier.highlighted
                      ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20'
                      : 'bg-white shadow-sm border border-gray-100'
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-4 py-1 text-xs font-bold text-white">
                      Popular
                    </span>
                  )}
                  <h3 className={`mb-2 font-heading text-xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  <div className="mb-1">
                    <span className={`text-3xl font-bold ${tier.highlighted ? 'text-white' : 'text-primary-600'}`}>
                      ${tier.amountCOP.toLocaleString('es-CO')}
                    </span>
                    <span className={`text-sm ${tier.highlighted ? 'text-primary-200' : 'text-gray-500'}`}> COP/{t('monthly')}</span>
                  </div>
                  <p className={`mb-1 text-sm ${tier.highlighted ? 'text-primary-200' : 'text-gray-500'}`}>
                    ~${tier.amountUSD} USD/{t('monthly')}
                  </p>
                  <p className={`mt-4 text-sm leading-relaxed ${tier.highlighted ? 'text-primary-100' : 'text-gray-600'}`}>
                    {t('impact')}: {tier.impact}
                  </p>
                  <a
                    href={DONATION_LINK_COP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 block rounded-full py-2.5 text-center text-sm font-semibold transition-colors ${
                      tier.highlighted
                        ? 'bg-white text-primary-600 hover:bg-gray-100'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {t('donateCOP')}
                  </a>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal>
            <div className="mt-8 text-center">
              <a
                href={DONATION_LINK_USD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 px-8 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
              >
                <HiCurrencyDollar className="h-5 w-5" />
                {t('donateUSD')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sponsor & Volunteer */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <ScrollReveal delay={0}>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                  <HiUserGroup className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">{t('sponsorTitle')}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{t('sponsorDescription')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100">
                  <HiHand className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">{t('volunteerTitle')}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{t('volunteerDescription')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <HiHeart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">{t('nutritionTitle')}</h3>
                <p className="text-sm text-gray-600">
                  {t('nutritionCost')}: <span className="font-bold text-green-600">$7.045 COP</span>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              {tFaq('title')}
            </h2>
          </ScrollReveal>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
