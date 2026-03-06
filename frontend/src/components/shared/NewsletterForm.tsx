'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HiMail, HiCheck, HiExclamation } from 'react-icons/hi';
import { motion, AnimatePresence } from 'motion/react';

type Status = 'idle' | 'loading' | 'success' | 'already' | 'error';

export default function NewsletterForm() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = (await res.json()) as { success?: boolean; alreadySubscribed?: boolean };

      if (data.success) {
        setStatus(data.alreadySubscribed ? 'already' : 'success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const isFinished = status === 'success' || status === 'already';

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary-400">
        {t('newsletterTitle')}
      </h3>
      <p className="mb-4 text-sm text-primary-300/70">
        {t('newsletterDescription')}
      </p>

      <AnimatePresence mode="wait">
        {isFinished ? (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-full bg-green-500/15 border border-green-400/30 px-5 py-3"
          >
            <HiCheck className="h-5 w-5 text-green-400 shrink-0" />
            <span className="text-sm font-medium text-green-300">
              {t(status === 'already' ? 'newsletterAlready' : 'newsletterSuccess')}
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handleSubmit}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder={t('newsletterPlaceholder')}
                className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-primary-400/60 outline-none transition-all duration-300 focus:border-accent-400/50 focus:bg-white/8 focus:ring-1 focus:ring-accent-400/30"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="shrink-0 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? t('newsletterSending') : t('newsletterButton')}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
        >
          <HiExclamation className="h-3.5 w-3.5 shrink-0" />
          {t('newsletterError')}
        </motion.div>
      )}

      <p className="mt-3 text-xs text-primary-400/50">
        {t('newsletterPrivacy')}
      </p>
    </div>
  );
}
