'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';

export interface CookiePreferences {
  necessary: boolean;
  performance: boolean;
  targeting: boolean;
  functionality: boolean;
}

const COOKIE_CONSENT_KEY = 'cigarra_cookie_consent';
const COOKIE_PREFS_KEY = 'cigarra_cookie_prefs';

const defaultPrefs: CookiePreferences = {
  necessary: true,
  performance: false,
  targeting: false,
  functionality: false,
};

/** Read stored preferences (null = no choice yet) */
export function getStoredConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_PREFS_KEY);
    return raw ? (JSON.parse(raw) as CookiePreferences) : null;
  } catch {
    return null;
  }
}

/** Reopen the cookie banner (called from footer link) */
export function reopenCookieBanner() {
  window.dispatchEvent(new CustomEvent('cookie-banner-reopen'));
}

/** Dispatch event so other scripts (GA, etc.) can react */
function dispatchConsentUpdate(prefs: CookiePreferences) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('cookie-consent-update', { detail: prefs }),
    );
  }
}

const categories = ['necessary', 'performance', 'targeting', 'functionality'] as const;

export default function CookieConsent() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(defaultPrefs);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      const savedPrefs = getStoredConsent();
      if (savedPrefs) dispatchConsentUpdate(savedPrefs);
    }
  }, []);

  // Listen for reopen requests (from footer link)
  useEffect(() => {
    const handler = () => {
      const savedPrefs = getStoredConsent();
      if (savedPrefs) setPrefs(savedPrefs);
      setVisible(true);
    };
    window.addEventListener('cookie-banner-reopen', handler);
    return () => window.removeEventListener('cookie-banner-reopen', handler);
  }, []);

  const saveAndClose = useCallback(
    (finalPrefs: CookiePreferences) => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
      localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(finalPrefs));
      dispatchConsentUpdate(finalPrefs);
      setVisible(false);
    },
    [],
  );

  const acceptAll = () => {
    const all: CookiePreferences = {
      necessary: true,
      performance: true,
      targeting: true,
      functionality: true,
    };
    setPrefs(all);
    saveAndClose(all);
  };

  const declineAll = () => {
    saveAndClose(defaultPrefs);
  };

  const saveSelection = () => {
    saveAndClose({ ...prefs, necessary: true });
  };

  const togglePref = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900">
                    {t('title')}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {t('description')}{' '}
                    <Link href="/politica-de-cookies" className="font-medium text-primary-600 underline hover:text-primary-500">
                      {t('cookiePolicyLink')}
                    </Link>
                    {' · '}
                    <Link href="/privacidad" className="font-medium text-primary-600 underline hover:text-primary-500">
                      {t('privacyPolicyLink')}
                    </Link>
                  </p>
                </div>
              </div>

              {/* Category toggles (expanded) */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                      {categories.map((cat) => (
                        <div
                          key={cat}
                          className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3"
                        >
                          <div className="flex-1 mr-4">
                            <p className="font-heading text-sm font-bold text-gray-900">
                              {t(`categories.${cat}.title`)}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {t(`categories.${cat}.description`)}
                            </p>
                          </div>
                          {cat === 'necessary' ? (
                            <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              {t('alwaysOn')}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => togglePref(cat)}
                              className={`relative shrink-0 h-6 w-11 rounded-full transition-colors duration-200 ${
                                prefs[cat] ? 'bg-primary-600' : 'bg-gray-300'
                              }`}
                              aria-label={`Toggle ${cat}`}
                            >
                              <span
                                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                  prefs[cat] ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 px-6 py-4">
              <button
                onClick={acceptAll}
                className="rounded-full bg-primary-600 px-6 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-primary-500"
              >
                {t('acceptAll')}
              </button>
              <button
                onClick={declineAll}
                className="rounded-full border border-gray-300 bg-white px-6 py-2.5 font-heading text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
              >
                {t('declineAll')}
              </button>
              {showDetails && (
                <button
                  onClick={saveSelection}
                  className="rounded-full border border-primary-300 bg-primary-50 px-6 py-2.5 font-heading text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
                >
                  {t('savePreferences')}
                </button>
              )}
              <button
                onClick={() => setShowDetails((prev) => !prev)}
                className="ml-auto flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t(showDetails ? 'hideDetails' : 'showDetails')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
