'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { HiHeart, HiX } from 'react-icons/hi';

const DONATION_LINK_COP = 'https://www.donaronline.org/fundacion-cigarra/dona-ahora';
const DONATION_LINK_USD = 'https://www.donaronline.org/fundacion-cigarra/donate-now';

export default function DonationFloatingCTA() {
  const t = useTranslations('donation');
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            <div className="relative">
              <div className="flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-white">
                <HiHeart className="h-5 w-5" />
                <span className="font-semibold text-sm">Dona ahora</span>
                <button
                  onClick={handleDismiss}
                  className="ml-1 rounded-full p-0.5 hover:bg-accent-600"
                  aria-label="Cerrar"
                >
                  <HiX className="h-3.5 w-3.5" />
                </button>
              </div>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 bottom-full mb-2 flex flex-col gap-2 rounded-xl border border-gray-100 bg-white p-3"
                  >
                    <a
                      href={DONATION_LINK_COP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-600"
                    >
                      {t('donateCOP')}
                    </a>
                    <a
                      href={DONATION_LINK_USD}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap rounded-lg bg-accent-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-accent-600"
                    >
                      {t('donateUSD')}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile: Bottom bar */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed right-0 bottom-0 left-0 z-40 md:hidden"
          >
            <div className="flex items-center gap-2 bg-primary-500 px-4 py-3">
              <HiHeart className="h-5 w-5 flex-shrink-0 text-white" />
              <div className="flex flex-1 gap-2">
                <a
                  href={DONATION_LINK_COP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-white/20 py-2 text-center text-xs font-semibold text-white"
                >
                  COP
                </a>
                <a
                  href={DONATION_LINK_USD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-white py-2 text-center text-xs font-semibold text-primary-600"
                >
                  USD
                </a>
              </div>
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
