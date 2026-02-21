'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { HiHeart, HiX } from 'react-icons/hi';
import { EASE_APPLE } from '@/lib/animation-config';
import DonationCheckout from '@/components/sections/DonationCheckout';

export default function DonationFloatingCTA() {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('donation-cta-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem('donation-cta-dismissed', 'true');
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (dismissed) return null;

  return (
    <>
      {/* ── Floating Button ── */}
      <AnimatePresence>
        {visible && !isOpen && (
          <>
            {/* Desktop: Floating pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed right-6 bottom-24 z-40 hidden md:block"
            >
              <div className="relative flex items-center gap-2">
                <button
                  onClick={handleOpen}
                  className="flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-white shadow-lg transition-colors hover:bg-accent-400"
                >
                  <HiHeart className="h-5 w-5" />
                  <span className="text-sm font-semibold">{tNav('donate')}</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="rounded-full bg-neutral-800/60 p-1.5 text-white/80 hover:bg-neutral-800 hover:text-white"
                  aria-label={tCommon('close')}
                >
                  <HiX className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Mobile: Bottom bar */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed right-0 bottom-0 left-0 z-40 md:hidden"
            >
              <div className="flex items-center gap-3 bg-primary-500 px-4 py-3">
                <HiHeart className="h-5 w-5 flex-shrink-0 text-white" />
                <button
                  onClick={handleOpen}
                  className="flex-1 rounded-full bg-white py-2 text-center text-sm font-semibold text-primary-600"
                >
                  {tNav('donate')}
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-1 text-white/80 hover:text-white"
                  aria-label="Cerrar"
                >
                  <HiX className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Donation Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_APPLE }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Desktop: Centered modal */}
            <div className="hidden h-full items-center justify-center p-6 md:flex">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: EASE_APPLE }}
                className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              >
                {/* Modal header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600">
                      <HiHeart className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      Haz tu donacion
                    </h3>
                  </div>
                  <button
                    onClick={handleClose}
                    className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Cerrar"
                  >
                    <HiX className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal body */}
                <div className="max-h-[calc(90vh-64px)] overflow-y-auto p-6">
                  <DonationCheckout variant="modal" onClose={handleClose} />
                </div>
              </motion.div>
            </div>

            {/* Mobile: Bottom sheet */}
            <div className="flex h-full items-end md:hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.4, ease: EASE_APPLE }}
                className="relative max-h-[92vh] w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl"
              >
                {/* Drag handle + header */}
                <div className="sticky top-0 z-10 bg-white">
                  <div className="flex justify-center pb-1 pt-3">
                    <div className="h-1 w-10 rounded-full bg-gray-200" />
                  </div>
                  <div className="flex items-center justify-between px-5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600">
                        <HiHeart className="h-3.5 w-3.5 text-white" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-gray-900">
                        Haz tu donacion
                      </h3>
                    </div>
                    <button
                      onClick={handleClose}
                      className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      aria-label="Cerrar"
                    >
                      <HiX className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="h-px bg-gray-100" />
                </div>

                {/* Modal body */}
                <div className="overflow-y-auto p-5 pb-8" style={{ maxHeight: 'calc(92vh - 80px)' }}>
                  <DonationCheckout variant="modal" onClose={handleClose} />
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
