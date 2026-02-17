'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const smoothEase = [0.22, 1, 0.36, 1] as const;

const contactInfo = [
  {
    icon: HiLocationMarker,
    labelKey: 'address',
    content: (
      <>
        Cra 18M #75-25 Sur
        <br />
        Ciudad Bolivar, Bogota D.C.
        <br />
        Colombia
      </>
    ),
    href: undefined as string | undefined,
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  {
    icon: HiPhone,
    labelKey: 'phone' as const,
    label: 'Telefono',
    content: '+57 321 246 5421',
    href: 'tel:+573212465421',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    icon: HiMail,
    labelKey: 'email' as const,
    label: 'Email',
    content: 'info@cigarra.org',
    href: 'mailto:info@cigarra.org',
    color: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-600',
  },
  {
    icon: HiClock,
    labelKey: 'hours',
    content: (
      <>
        Lunes a Viernes: 8:00 AM - 5:00 PM
        <br />
        Sabados: 8:00 AM - 12:00 PM
      </>
    ),
    href: undefined as string | undefined,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
];

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
              Estamos para ti
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
                src="https://cigarra.org/wp-content/uploads/2025/04/Recreacion.jpg"
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
      <section className="relative section-padding overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-[5%] h-96 w-96 rounded-full bg-primary-50 blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-[5%] h-80 w-80 rounded-full bg-accent-50 blur-3xl opacity-40" />

        {/* Dot pattern decoration */}
        <div className="absolute top-20 right-20 opacity-[0.04]">
          <div className="grid grid-cols-8 gap-4">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-primary-900" />
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* ===== LEFT: Contact Info ===== */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <div className="space-y-5">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <ScrollReveal key={item.labelKey} delay={index * 0.1}>
                        <div className="glass group rounded-2xl border border-white bg-white/80 p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-100/50 hover:-translate-y-0.5">
                          <div className="flex items-start gap-4">
                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md transition-transform duration-300 group-hover:scale-110`}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-heading text-sm font-semibold text-gray-900 mb-1">
                                {item.label || t(item.labelKey)}
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
                  <ScrollReveal delay={0.5}>
                    <motion.a
                      href="https://wa.me/573212465421"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-green-600 p-5 shadow-lg shadow-green-500/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-green-500/30"
                    >
                      {/* Animated pulse ring */}
                      <div className="absolute inset-0 rounded-2xl animate-pulse-soft opacity-20 bg-white" />

                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                        <FaWhatsapp className="h-7 w-7 text-white" />
                      </div>
                      <div className="relative">
                        <p className="font-heading font-bold text-white text-lg">{t('whatsapp')}</p>
                        <p className="text-sm text-green-100">+57 321 246 5421</p>
                      </div>

                      {/* Arrow */}
                      <div className="relative ml-auto">
                        <svg
                          className="h-6 w-6 text-white/70 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.a>
                  </ScrollReveal>

                  {/* Google Maps */}
                  <ScrollReveal delay={0.6}>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50">
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
                <div className="relative">
                  {/* Decorative floating blobs behind form */}
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary-100/60 blur-3xl animate-float" />
                  <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-100/50 blur-3xl animate-float" style={{ animationDelay: '4s' }} />

                  {/* Form card */}
                  <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
                    {/* Gradient top border */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500 animate-gradient" style={{ backgroundSize: '200% auto' }} />

                    <form onSubmit={handleSubmit} className="p-8 md:p-10">
                      <div className="mb-8">
                        <h3 className="font-heading text-2xl font-bold text-gray-900">
                          Envianos un mensaje
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          Completa el formulario y te responderemos lo mas pronto posible.
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
                            placeholder="Tu nombre completo"
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
                            placeholder="tu@email.com"
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
                            placeholder="+57 300 000 0000"
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
                            placeholder="Asunto de tu mensaje"
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
                            placeholder="Escribe tu mensaje aqui..."
                            className={`${inputClasses} resize-none`}
                          />
                        </div>
                      </div>

                      {/* Submit button */}
                      <div className="mt-8">
                        <motion.button
                          type="submit"
                          disabled={formState === 'sending'}
                          whileHover={{ scale: formState === 'sending' ? 1 : 1.02 }}
                          whileTap={{ scale: formState === 'sending' ? 1 : 0.98 }}
                          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 py-4 font-heading font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed md:w-auto md:px-12"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
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
                                <HiMail className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                                {t('send')}
                              </>
                            )}
                          </span>

                          {/* Hover shimmer */}
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </motion.button>
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
                            className="mt-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                              <HiCheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-green-800">Mensaje enviado</p>
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
                            className="mt-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                              <HiXCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-red-800">Error</p>
                              <p className="text-sm text-red-600">{t('error')}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
