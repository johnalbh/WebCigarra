'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { HiX, HiExternalLink, HiArrowRight, HiCalendar, HiSparkles } from 'react-icons/hi';
import { EASE_APPLE, EASE_SMOOTH } from '@/lib/animation-config';

interface AnnouncementData {
  title: string;
  description?: string;
  image: { url: string; alternativeText?: string; width?: number; height?: number };
  linkUrl?: string;
  linkText?: string;
  slug?: string;
  date?: string;
}

export default function AnnouncementPopup({ data }: { data: AnnouncementData }) {
  const t = useTranslations('common');
  const tNews = useTranslations('news');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // Initialize as dismissed if the event has already passed
  const [permanentlyDismissed, setPermanentlyDismissed] = useState(
    data.slug === 'bingo-virtual-marzo-2026'
  );
  const closedForThisVisitRef = useRef(false);

  // Check localStorage on mount
  useEffect(() => {
    const dismissedKey = `announcement-hidden-${data.title}`;
    if (localStorage.getItem(dismissedKey)) {
      setPermanentlyDismissed(true);
    }
  }, [data.title]);

  // Show popup each time the user arrives at home ('/')
  useEffect(() => {
    if (permanentlyDismissed) return;

    if (pathname === '/') {
      closedForThisVisitRef.current = false;
      const timer = setTimeout(() => {
        if (!closedForThisVisitRef.current) setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
    // Navigated away from home — reset so it shows again next time
    setIsOpen(false);
  }, [pathname, permanentlyDismissed]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    closedForThisVisitRef.current = true;
  }, []);

  const handleDontShowAgain = useCallback(() => {
    setIsOpen(false);
    setPermanentlyDismissed(true);
    const dismissedKey = `announcement-hidden-${data.title}`;
    localStorage.setItem(dismissedKey, 'true');
  }, [data.title]);

  if (permanentlyDismissed) return null;

  const rawUrl = data.image.url;
  const imageUrl = rawUrl.startsWith('http') || rawUrl.startsWith('/')
    ? rawUrl
    : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${rawUrl}`;

  const ctaLabel = data.linkText || t('learnMore');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_APPLE }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* ── Desktop modal ── */}
          <div className="hidden h-full items-center justify-center p-6 md:flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH }}
              className="relative flex w-full max-w-md flex-col overflow-hidden rounded-3xl bg-gray-900 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
              style={{ maxHeight: '92vh' }}
            >
              {/* Close button — always on top */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={handleClose}
                className="absolute top-3 right-3 z-20 rounded-full bg-black/40 p-2 text-white/80 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                aria-label={t('close')}
              >
                <HiX className="h-5 w-5" />
              </motion.button>

              {/* Event badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, ease: EASE_SMOOTH }}
                className="absolute top-3 left-3 z-20"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  <HiSparkles className="h-3.5 w-3.5" />
                  Evento especial
                </span>
              </motion.div>

              {/* Image — clean, no text overlay */}
              <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: '9 / 14' }}>
                <Image
                  src={imageUrl}
                  alt={data.image.alternativeText || data.title}
                  fill
                  sizes="(min-width: 768px) 448px, 100vw"
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle bottom fade into the content area */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>

              {/* Content — solid background, separate from image */}
              <div className="relative shrink-0 px-6 pt-3 pb-5">
                {/* Date */}
                {data.date && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="mb-2"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
                      <HiCalendar className="h-3.5 w-3.5 text-accent-400" />
                      {new Date(data.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </motion.div>
                )}

                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, ease: EASE_SMOOTH }}
                  className="font-heading text-xl font-bold leading-tight text-white"
                >
                  {data.title}
                </motion.h3>

                {data.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, ease: EASE_SMOOTH }}
                    className="mt-1.5 text-sm leading-relaxed text-gray-400"
                  >
                    {data.description}
                  </motion.p>
                )}

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, ease: EASE_SMOOTH }}
                  className="mt-4 flex items-center gap-3"
                >
                  {data.slug ? (
                    <Link
                      href={`/noticias/${data.slug}`}
                      onClick={handleClose}
                      className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/35"
                    >
                      {ctaLabel}
                      <HiArrowRight className="h-4 w-4" />
                    </Link>
                  ) : data.linkUrl ? (
                    <a
                      href={data.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/35"
                    >
                      {ctaLabel}
                      <HiExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                  <button
                    onClick={handleClose}
                    className="rounded-full px-5 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {t('close')}
                  </button>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={handleDontShowAgain}
                  className="mt-3 text-xs text-gray-600 underline decoration-gray-700 underline-offset-2 transition-colors hover:text-gray-400"
                >
                  {t('dontShowAgain')}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* ── Mobile: Bottom sheet ── */}
          <div className="flex h-full items-end md:hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH }}
              className="relative flex max-h-[95vh] w-full flex-col overflow-hidden rounded-t-3xl bg-gray-900 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
            >
              {/* Drag handle + top controls */}
              <div className="absolute inset-x-0 top-0 z-20">
                <div className="flex justify-center pt-3 pb-1">
                  <div className="h-1 w-10 rounded-full bg-white/30" />
                </div>
                <div className="flex items-center justify-between px-4 pb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    <HiSparkles className="h-3 w-3" />
                    {tNews('specialEvent')}
                  </span>
                  <button
                    onClick={handleClose}
                    className="rounded-full bg-black/40 p-2 text-white/80 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                    aria-label={t('close')}
                  >
                    <HiX className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Image — scrollable, no text on it */}
              <div className="overflow-y-auto">
                <div className="relative w-full" style={{ aspectRatio: '9 / 14' }}>
                  <Image
                    src={imageUrl}
                    alt={data.image.alternativeText || data.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>

                {/* Content below image */}
                <div className="px-5 pt-2 pb-8">
                  {data.date && (
                    <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
                      <HiCalendar className="h-3.5 w-3.5 text-accent-400" />
                      {new Date(data.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  )}

                  <h3 className="font-heading text-xl font-bold leading-tight text-white">
                    {data.title}
                  </h3>

                  {data.description && (
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                      {data.description}
                    </p>
                  )}

                  <div className="mt-4 flex flex-col gap-2.5">
                    {data.slug ? (
                      <Link
                        href={`/noticias/${data.slug}`}
                        onClick={handleClose}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
                      >
                        {ctaLabel}
                        <HiArrowRight className="h-4 w-4" />
                      </Link>
                    ) : data.linkUrl ? (
                      <a
                        href={data.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
                      >
                        {ctaLabel}
                        <HiExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                    <button
                      onClick={handleClose}
                      className="rounded-full px-6 py-3 text-sm font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {t('close')}
                    </button>
                  </div>

                  <button
                    onClick={handleDontShowAgain}
                    className="mt-3 w-full text-center text-xs text-gray-600 underline decoration-gray-700 underline-offset-2 transition-colors hover:text-gray-400"
                  >
                    {t('dontShowAgain')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
