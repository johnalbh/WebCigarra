'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

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

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center bg-gradient-to-br from-primary-800 to-primary-900 pt-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-8">
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
            className="mt-4 max-w-2xl text-lg text-primary-200"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                      <HiLocationMarker className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-gray-900">{t('address')}</h3>
                      <p className="text-sm text-gray-600">
                        Cra 18M #75-25 Sur<br />
                        Ciudad Bolívar, Bogotá D.C.<br />
                        Colombia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                      <HiPhone className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-gray-900">Teléfono</h3>
                      <a href="tel:+573212465421" className="text-sm text-primary-600 hover:underline">
                        +57 321 246 5421
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                      <HiMail className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-gray-900">Email</h3>
                      <a href="mailto:info@cigarra.org" className="text-sm text-primary-600 hover:underline">
                        info@cigarra.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100">
                      <HiClock className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-gray-900">{t('hours')}</h3>
                      <p className="text-sm text-gray-600">
                        Lunes a Viernes: 8:00 AM - 5:00 PM<br />
                        Sábados: 8:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/573212465421"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-green-50 p-4 transition-colors hover:bg-green-100"
                  >
                    <FaWhatsapp className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">{t('whatsapp')}</p>
                      <p className="text-xs text-green-600">+57 321 246 5421</p>
                    </div>
                  </a>

                  {/* Google Maps */}
                  <div className="overflow-hidden rounded-xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0!2d-74.15!3d4.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzQnMTIuMCJOIDc0wrAwOScwMC4wIlc!5e0!3m2!1ses!2sco!4v1"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Fundación Cigarra location"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <form onSubmit={handleSubmit} className="rounded-2xl bg-gray-50 p-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                        {t('name')} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        {t('email')} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                        {t('phone')}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                        {t('subject')} *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                        {t('message')} *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={formState === 'sending'}
                      className="w-full rounded-full bg-primary-600 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60 md:w-auto md:px-8"
                    >
                      {formState === 'sending' ? t('sending') : t('send')}
                    </button>
                  </div>

                  {formState === 'success' && (
                    <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                      {t('success')}
                    </p>
                  )}
                  {formState === 'error' && (
                    <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                      {t('error')}
                    </p>
                  )}
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
