'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { Turnstile } from '@marsidev/react-turnstile';
import HeroWaves from '@/components/shared/HeroWaves';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

const smoothEase = [0.22, 1, 0.36, 1] as const;

const inputClasses =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none hover:border-gray-300';

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

  // Anti-spam
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const formLoadTime = useRef(0);
  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _hp: honeypot,
          _ts: formLoadTime.current,
          _turnstile: turnstileToken,
        }),
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
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-primary-900">
        <HeroWaves />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-28 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-36">
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
      <section className="section-padding bg-gray-50/60">
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
                        <div className="group rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
                          <div className="flex items-start gap-4">
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bgColor} transition-transform duration-300 group-hover:scale-110`}
                            >
                              <Icon className={`h-5 w-5 ${item.color}`} />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-[13px] font-semibold text-gray-900 mb-0.5">
                                {t(item.labelKey)}
                              </h3>
                              {item.href ? (
                                <a
                                  href={item.href}
                                  className="text-sm text-gray-500 transition-colors hover:text-primary-600"
                                >
                                  {item.content}
                                </a>
                              ) : (
                                <p className="text-sm text-gray-500 leading-relaxed">{item.content}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}

                  {/* WhatsApp */}
                  <ScrollReveal mode="scroll" scaleFrom={0.95} delay={0.5}>
                    <a
                      href="https://wa.me/573212465421"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl bg-green-500 p-5 transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/20"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                        <FaWhatsapp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{t('whatsapp')}</p>
                        <p className="text-sm text-green-100">+57 321 246 5421</p>
                      </div>
                      <svg
                        className="ml-auto h-5 w-5 text-white/60 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </ScrollReveal>

                  {/* Map */}
                  <ScrollReveal mode="scroll" scaleFrom={0.95} delay={0.6}>
                    <div className="overflow-hidden rounded-2xl shadow-sm">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0!2d-74.15!3d4.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzQnMTIuMCJOIDc0wrAwOScwMC4wIlc!5e0!3m2!1ses!2sco!4v1"
                        width="100%"
                        height="200"
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

            {/* ===== RIGHT: Contact Form or Success ===== */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: smoothEase }}
                      className="rounded-3xl bg-white shadow-xl shadow-gray-200/60"
                    >
                      <div className="flex flex-col items-center px-8 py-16 text-center md:px-16 md:py-20">
                        {/* Animated check */}
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                          <HiCheckCircle className="h-10 w-10 text-green-500" />
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                          {t('successTitle')}
                        </h3>

                        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-500">
                          {t('successMessage')}
                        </p>

                        {/* Divider */}
                        <div className="my-8 h-px w-full max-w-xs bg-gray-100" />

                        {/* Contact info */}
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                          {t('successAlternative')}
                        </p>

                        <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row">
                          <a
                            href="tel:+573212465421"
                            className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-primary-300 hover:text-primary-600"
                          >
                            <HiPhone className="h-4 w-4" />
                            +57 321 246 5421
                          </a>
                          <a
                            href="https://wa.me/573212465421"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-600"
                          >
                            <FaWhatsapp className="h-4 w-4" />
                            WhatsApp
                          </a>
                        </div>

                        <p className="mt-5 text-xs text-gray-300">
                          {t('successHours')}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form-card"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-3xl bg-white shadow-xl shadow-gray-200/60"
                    >
                      <form onSubmit={handleSubmit} className="px-8 py-10 md:px-12 md:py-12">
                        {/* Header */}
                        <div className="mb-10">
                          <h3 className="font-heading text-[28px] font-bold tracking-tight text-gray-900">
                            {t('formTitle')}
                          </h3>
                          <p className="mt-2 text-[15px] text-gray-400 leading-relaxed">
                            {t('formSubtitle')}
                          </p>
                        </div>

                        {/* Row 1: Name + Email */}
                        <div className="grid gap-5 md:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                              {t('name')} <span className="text-red-400">*</span>
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
                          <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                              {t('email')} <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <HiMail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                              <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={t('emailPlaceholder')}
                                className={`${inputClasses} pl-10`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Phone + Subject */}
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                          <div>
                            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                              {t('phone')}
                            </label>
                            <div className="relative">
                              <HiPhone className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                              <input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder={t('phonePlaceholder')}
                                className={`${inputClasses} pl-10`}
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-700">
                              {t('subject')} <span className="text-red-400">*</span>
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
                        </div>

                        {/* Row 3: Message */}
                        <div className="mt-5">
                          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
                            {t('message')} <span className="text-red-400">*</span>
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

                        {/* Honeypot */}
                        <div className="absolute -left-[9999px]" aria-hidden="true">
                          <label htmlFor="website">Website</label>
                          <input
                            type="text"
                            id="website"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                          />
                        </div>

                        {/* Turnstile CAPTCHA */}
                        <div className="mt-6">
                          <Turnstile
                            siteKey={TURNSTILE_SITE_KEY}
                            onSuccess={setTurnstileToken}
                            options={{ theme: 'light', size: 'normal' }}
                          />
                        </div>

                        {/* Submit */}
                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <button
                            type="submit"
                            disabled={formState === 'sending'}
                            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary-600 px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-primary-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
                          >
                            {formState === 'sending' ? (
                              <>
                                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                {t('sending')}
                              </>
                            ) : (
                              <>
                                {t('send')}
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </>
                            )}
                          </button>
                          <p className="text-xs text-gray-300">
                            {t('requiredFields')}
                          </p>
                        </div>

                        {/* Error */}
                        <AnimatePresence mode="wait">
                          {formState === 'error' && (
                            <motion.div
                              key="error"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.35, ease: smoothEase }}
                              className="mt-8 flex items-start gap-4 rounded-xl bg-red-50 p-5"
                            >
                              <HiXCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-500" />
                              <div>
                                <p className="font-semibold text-red-800">{t('errorTitle')}</p>
                                <p className="mt-1 text-sm text-red-600 leading-relaxed">{t('error')}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
