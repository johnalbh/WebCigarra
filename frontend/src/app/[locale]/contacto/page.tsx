'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import HeroWaves from '@/components/shared/HeroWaves';

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const res = await fetch(`${strapiUrl}/api/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData }),
      });

      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const inputClasses =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 focus:outline-none hover:border-gray-300';

  const contactInfo = [
    {
      icon: HiLocationMarker,
      labelKey: 'address' as const,
      content: (
        <>
          {t('addressLine1')}
          <br />
          {t('addressLine2')}
          <br />
          {t('addressLine3')}
        </>
      ),
      href: undefined as string | undefined,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      icon: HiPhone,
      labelKey: 'phone' as const,
      content: '+57 321 246 5421',
      href: 'tel:+573212465421',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: HiMail,
      labelKey: 'email' as const,
      content: 'info@cigarra.org',
      href: 'mailto:info@cigarra.org',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
    },
    {
      icon: HiClock,
      labelKey: 'hours' as const,
      content: (
        <>
          {t('hoursWeekday')}
          <br />
          {t('hoursSaturday')}
        </>
      ),
      href: undefined as string | undefined,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
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
              {t('heroTagline')}
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
                src="/images/engagement/recreacion.webp"
                alt="Comunidad Fundacion Cigarra"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* ===== LEFT: Contact Info ===== */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <div className="space-y-5">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <ScrollReveal mode="scroll" scaleFrom={0.95} key={item.labelKey} delay={index * 0.1}>
                        <div className="rounded-xl border border-gray-100 bg-white p-5 transition-colors duration-300 hover:border-gray-200">
                          <div className="flex items-start gap-4">
                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bgColor}`}
                            >
                              <Icon className={`h-6 w-6 ${item.color}`} />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-heading text-sm font-semibold text-gray-900 mb-1">
                                {t(item.labelKey)}
                              </h3>
                              {item.href ? (
                                <a
                                  href={item.href}
                                  className="text-sm text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                                >
                                  {item.content}
                                </a>
                              ) : (
                                <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}

                  {/* WhatsApp CTA */}
                  <ScrollReveal mode="scroll" scaleFrom={0.95} delay={0.5}>
                    <a
                      href="https://wa.me/573212465421"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl bg-green-500 p-5 transition-colors duration-300 hover:bg-green-600"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 border border-white/30">
                        <FaWhatsapp className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-lg">{t('whatsapp')}</p>
                        <p className="text-sm text-green-100">+57 321 246 5421</p>
                      </div>

                      {/* Arrow */}
                      <div className="ml-auto">
                        <svg
                          className="h-6 w-6 text-white/70 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  </ScrollReveal>

                  {/* Google Maps */}
                  <ScrollReveal mode="scroll" scaleFrom={0.95} delay={0.6}>
                    <div className="overflow-hidden rounded-lg border border-gray-100">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0!2d-74.15!3d4.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzQnMTIuMCJOIDc0wrAwOScwMC4wIlc!5e0!3m2!1ses!2sco!4v1"
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Fundacion Cigarra location"
                        className="grayscale transition-[filter] duration-500 hover:grayscale-0"
                      />
                    </div>
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            </div>

            {/* ===== RIGHT: Contact Form ===== */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                {/* Form card */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                  {/* Simple top accent */}
                  <div className="h-1 w-full bg-primary-500" />

                  <form onSubmit={handleSubmit} className="p-8 md:p-10">
                    <div className="mb-8">
                      <h3 className="font-heading text-2xl font-bold text-gray-900">
                        {t('formTitle')}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {t('formSubtitle')}
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="group">
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-primary-600"
                        >
                          {t('name')} *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('namePlaceholder')}
                          className={inputClasses}
                        />
                      </div>
                      <div className="group">
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-primary-600"
                        >
                          {t('email')} *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t('emailPlaceholder')}
                          className={inputClasses}
                        />
                      </div>
                      <div className="group">
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-primary-600"
                        >
                          {t('phone')}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t('phonePlaceholder')}
                          className={inputClasses}
                        />
                      </div>
                      <div className="group">
                        <label
                          htmlFor="subject"
                          className="mb-2 block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-primary-600"
                        >
                          {t('subject')} *
                        </label>
                        <input
                          id="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder={t('subjectPlaceholder')}
                          className={inputClasses}
                        />
                      </div>
                      <div className="group md:col-span-2">
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-primary-600"
                        >
                          {t('message')} *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t('messagePlaceholder')}
                          className={`${inputClasses} resize-none`}
                        />
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={formState === 'sending'}
                        className="w-full rounded-full bg-primary-500 py-4 font-heading font-semibold text-white transition-colors duration-300 hover:bg-primary-600 disabled:opacity-70 disabled:cursor-not-allowed md:w-auto md:px-12"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {formState === 'sending' ? (
                            <>
                              {/* Spinning loader */}
                              <svg
                                className="h-5 w-5 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                              {t('sending')}
                            </>
                          ) : (
                            <>
                              <HiMail className="h-5 w-5" />
                              {t('send')}
                            </>
                          )}
                        </span>
                      </button>
                    </div>

                    {/* Status messages */}
                    <AnimatePresence mode="wait">
                      {formState === 'success' && (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: smoothEase }}
                          className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                            <HiCheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-green-800">{t('successTitle')}</p>
                            <p className="text-sm text-green-600">{t('success')}</p>
                          </div>
                        </motion.div>
                      )}
                      {formState === 'error' && (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: smoothEase }}
                          className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                            <HiXCircle className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-red-800">{t('errorTitle')}</p>
                            <p className="text-sm text-red-600">{t('error')}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
