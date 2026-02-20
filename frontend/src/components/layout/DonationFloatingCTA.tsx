'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { HiHeart, HiX } from 'react-icons/hi';
import { Link } from '@/i18n/routing';

export default function DonationFloatingCTA() {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('donation-cta-dismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop: Floating pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-6 bottom-24 z-40 hidden md:block"
          >
            <div className="relative flex items-center gap-2">
              <Link
                href={'/como-ayudar' as '/como-ayudar'}
                className="flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-white shadow-lg transition-colors hover:bg-accent-400"
              >
                <HiHeart className="h-5 w-5" />
                <span className="text-sm font-semibold">{tNav('donate')}</span>
              </Link>
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
              <Link
                href={'/como-ayudar' as '/como-ayudar'}
                className="flex-1 rounded-full bg-white py-2 text-center text-sm font-semibold text-primary-600"
              >
                {tNav('donate')}
              </Link>
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
  );
}
