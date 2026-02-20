'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  HiHeart,
  HiArrowRight,
  HiArrowLeft,
  HiShieldCheck,
} from 'react-icons/hi2';
import { useEpayco } from '@/hooks/useEpayco';
import { EASE_APPLE, STAGGER } from '@/lib/animation-config';

const PRESET_AMOUNTS = [
  { value: 30000, impactKey: 'impact30000' },
  { value: 50000, impactKey: 'impact50000' },
  { value: 100000, impactKey: 'impact100000' },
  { value: 200000, impactKey: 'impact200000' },
  { value: 500000, impactKey: 'impact500000' },
];
const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 50000000;

const ID_TYPES = [
  { value: 'CC', label: 'Cedula de Ciudadania' },
  { value: 'CE', label: 'Cedula de Extranjeria' },
  { value: 'NIT', label: 'NIT' },
  { value: 'PASSPORT', label: 'Pasaporte' },
];

interface DonorFormData {
  identificationType: string;
  identificationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
}

interface DonationCheckoutProps {
  campaignId?: number;
  preselectedAmount?: number;
}

function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCompact(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${Math.round(amount / 1000)}K`;
  return `$${amount}`;
}

export default function DonationCheckout({
  campaignId,
  preselectedAmount,
}: DonationCheckoutProps) {
  const t = useTranslations('donationCheckout');
  const { openCheckout, isLoaded } = useEpayco();

  const [step, setStep] = useState(preselectedAmount ? 2 : 1);
  const [selectedAmount, setSelectedAmount] = useState<number>(preselectedAmount || 0);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [donor, setDonor] = useState<DonorFormData>({
    identificationType: 'CC',
    identificationNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    country: 'Colombia',
  });

  const currentAmount = isCustom ? parseInt(customAmount) || 0 : selectedAmount;

  const currentImpact = isCustom
    ? t('impactCustom')
    : PRESET_AMOUNTS.find((p) => p.value === selectedAmount)
      ? t(PRESET_AMOUNTS.find((p) => p.value === selectedAmount)!.impactKey)
      : t('impactCustom');

  const handleAmountSelect = useCallback((amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setError('');
  }, []);

  const handleCustomToggle = useCallback(() => {
    setIsCustom(true);
    setSelectedAmount(0);
    setError('');
  }, []);

  const handleDonorChange = useCallback(
    (field: keyof DonorFormData, value: string) => {
      setDonor((prev) => ({ ...prev, [field]: value }));
      setError('');
    },
    []
  );

  const validateStep1 = (): boolean => {
    if (currentAmount < MIN_AMOUNT) {
      setError(t('minAmount'));
      return false;
    }
    if (currentAmount > MAX_AMOUNT) {
      setError(`Monto maximo: ${formatCOP(MAX_AMOUNT)}`);
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!donor.identificationNumber.trim()) {
      setError(t('identificationNumber') + ' es requerido');
      return false;
    }
    if (!donor.firstName.trim()) {
      setError(t('firstName') + ' es requerido');
      return false;
    }
    if (!donor.lastName.trim()) {
      setError(t('lastName') + ' es requerido');
      return false;
    }
    if (!donor.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email)) {
      setError(t('email') + ' no es valido');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      const res = await fetch(`${apiUrl}/api/donations/one-time`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: donor.firstName.trim(),
          lastName: donor.lastName.trim(),
          email: donor.email.trim(),
          phoneNumber: donor.phoneNumber.trim() || undefined,
          identificationType: donor.identificationType,
          identificationNumber: donor.identificationNumber.trim(),
          country: donor.country.trim() || undefined,
          city: donor.city.trim() || undefined,
          amount: currentAmount,
          campaignId: campaignId || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errorMessage || 'Error al crear donacion');
      }

      const result = await res.json();

      if (!result.success || !result.smartCheckout) {
        throw new Error(result.errorMessage || 'Error al crear donacion');
      }

      await openCheckout(result.smartCheckout);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorCreating'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
  };

  const direction = 1;

  return (
    <div id="donar" className="mx-auto w-full max-w-xl">
      {/* ── Header ── */}
      <div className="mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_APPLE }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg shadow-accent-500/25"
        >
          <HiHeart className="h-7 w-7 text-white" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_APPLE }}
          className="font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_APPLE }}
          className="mx-auto mt-3 max-w-md text-base leading-relaxed text-gray-500"
        >
          {t('subtitle')}
        </motion.p>
      </div>

      {/* ── Step Progress ── */}
      <div className="mb-8 flex items-center justify-center gap-1">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-1">
            <motion.div
              animate={{
                width: s === step ? 32 : 8,
                backgroundColor: s <= step ? 'var(--color-accent-500)' : '#e5e7eb',
              }}
              transition={{ duration: 0.4, ease: EASE_APPLE }}
              className="h-2 rounded-full"
            />
          </div>
        ))}
      </div>

      {/* ── Card Container ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE_APPLE }}
        className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/60 ring-1 ring-gray-100"
      >
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-red-100 bg-red-50 px-6 py-3 text-center text-sm font-medium text-red-600"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait" custom={direction}>
            {/* ═══ STEP 1: Amount Selection ═══ */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: EASE_APPLE }}
              >
                <p className="mb-5 text-center text-sm font-medium uppercase tracking-widest text-gray-400">
                  {t('selectAmount')}
                </p>

                {/* Amount grid */}
                <div className="grid grid-cols-3 gap-3">
                  {PRESET_AMOUNTS.map((preset, i) => (
                    <motion.button
                      key={preset.value}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * STAGGER.fast, ease: EASE_APPLE }}
                      onClick={() => handleAmountSelect(preset.value)}
                      className={`group relative rounded-2xl border-2 px-3 py-4 text-center transition-all duration-300 ${
                        selectedAmount === preset.value && !isCustom
                          ? 'border-accent-500 bg-accent-50 shadow-sm shadow-accent-500/10'
                          : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span
                        className={`block font-heading text-lg font-bold transition-colors ${
                          selectedAmount === preset.value && !isCustom
                            ? 'text-accent-600'
                            : 'text-gray-800'
                        }`}
                      >
                        {formatCompact(preset.value)}
                      </span>
                      <span className="mt-0.5 block text-[11px] font-medium text-gray-400">
                        COP
                      </span>
                    </motion.button>
                  ))}

                  {/* Custom amount button */}
                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: PRESET_AMOUNTS.length * STAGGER.fast,
                      ease: EASE_APPLE,
                    }}
                    onClick={handleCustomToggle}
                    className={`rounded-2xl border-2 border-dashed px-3 py-4 text-center transition-all duration-300 ${
                      isCustom
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        isCustom ? 'text-accent-600' : 'text-gray-500'
                      }`}
                    >
                      {t('customAmount')}
                    </span>
                  </motion.button>
                </div>

                {/* Custom amount input */}
                <AnimatePresence>
                  {isCustom && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EASE_APPLE }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-heading text-lg font-bold text-gray-300">
                            $
                          </span>
                          <input
                            type="number"
                            min={MIN_AMOUNT}
                            max={MAX_AMOUNT}
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="50.000"
                            className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50/50 py-4 pl-10 pr-16 font-heading text-xl font-bold text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-300">
                            COP
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Impact preview */}
                <AnimatePresence mode="wait">
                  {currentAmount >= MIN_AMOUNT && (
                    <motion.div
                      key={currentAmount}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE_APPLE }}
                      className="mt-5 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 p-4 text-center"
                    >
                      <p className="text-sm leading-relaxed text-primary-700">
                        <span className="font-semibold">{formatCOP(currentAmount)}</span>
                        {' = '}
                        {currentImpact}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Continue button */}
                <motion.button
                  onClick={handleNextStep}
                  disabled={currentAmount < MIN_AMOUNT}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-6 py-4 font-heading text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {currentAmount >= MIN_AMOUNT
                    ? `${t('confirmDonation')} ${formatCOP(currentAmount)}`
                    : t('selectAmount')}
                  <HiArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}

            {/* ═══ STEP 2: Donor Information ═══ */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: EASE_APPLE }}
              >
                {/* Selected amount chip */}
                <div className="mb-6 flex items-center justify-center">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-2 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-100"
                  >
                    {formatCOP(currentAmount)}
                    <span className="text-accent-400">|</span>
                    <span className="text-xs font-medium text-accent-500">
                      {t('editAmount')}
                    </span>
                  </button>
                </div>

                <p className="mb-5 text-center text-sm font-medium uppercase tracking-widest text-gray-400">
                  {t('yourInfo')}
                </p>

                <div className="space-y-3">
                  {/* ID Type + Number */}
                  <div className="grid grid-cols-[120px_1fr] gap-3">
                    <select
                      value={donor.identificationType}
                      onChange={(e) =>
                        handleDonorChange('identificationType', e.target.value)
                      }
                      className="rounded-xl border-2 border-gray-100 bg-gray-50/50 px-3 py-3.5 text-sm font-medium text-gray-700 outline-none transition-all focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                    >
                      {ID_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.value}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={donor.identificationNumber}
                      onChange={(e) =>
                        handleDonorChange('identificationNumber', e.target.value)
                      }
                      placeholder={t('identificationNumber')}
                      className="rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3.5 text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                    />
                  </div>

                  {/* Names */}
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={donor.firstName}
                      onChange={(e) => handleDonorChange('firstName', e.target.value)}
                      placeholder={t('firstName')}
                      className="rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3.5 text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                    />
                    <input
                      type="text"
                      value={donor.lastName}
                      onChange={(e) => handleDonorChange('lastName', e.target.value)}
                      placeholder={t('lastName')}
                      className="rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3.5 text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                    />
                  </div>

                  {/* Email */}
                  <input
                    type="email"
                    value={donor.email}
                    onChange={(e) => handleDonorChange('email', e.target.value)}
                    placeholder={t('email')}
                    className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3.5 text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                  />

                  {/* Phone + City */}
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      value={donor.phoneNumber}
                      onChange={(e) =>
                        handleDonorChange('phoneNumber', e.target.value)
                      }
                      placeholder={t('phone')}
                      className="rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3.5 text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                    />
                    <input
                      type="text"
                      value={donor.city}
                      onChange={(e) => handleDonorChange('city', e.target.value)}
                      placeholder={t('city')}
                      className="rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3.5 text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <motion.button
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center rounded-xl border-2 border-gray-100 px-4 py-3.5 text-gray-400 transition-colors hover:border-gray-200 hover:text-gray-600"
                  >
                    <HiArrowLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    onClick={handleNextStep}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-900 px-6 py-4 font-heading text-base font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    {t('confirmDonation')}
                    <HiArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ═══ STEP 3: Confirm and Pay ═══ */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: EASE_APPLE }}
              >
                <p className="mb-5 text-center text-sm font-medium uppercase tracking-widest text-gray-400">
                  {t('reviewTitle')}
                </p>

                {/* Summary card */}
                <div className="rounded-2xl bg-gray-50 p-6">
                  {/* Amount */}
                  <div className="mb-5 text-center">
                    <p className="font-heading text-4xl font-bold tracking-tight text-gray-900">
                      {formatCOP(currentAmount)}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">{currentImpact}</p>
                  </div>

                  {/* Divider */}
                  <div className="mb-4 h-px bg-gray-200" />

                  {/* Donor details */}
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('firstName')}</span>
                      <span className="font-medium text-gray-700">
                        {donor.firstName} {donor.lastName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('email')}</span>
                      <span className="font-medium text-gray-700">{donor.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{t('identificationNumber')}</span>
                      <span className="font-medium text-gray-700">
                        {donor.identificationType} {donor.identificationNumber}
                      </span>
                    </div>
                  </div>

                  {/* Edit link */}
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-medium text-accent-600 hover:text-accent-700"
                    >
                      {t('editAmount')}
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-medium text-accent-600 hover:text-accent-700"
                    >
                      {t('editInfo')}
                    </button>
                  </div>
                </div>

                {/* Pay button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isLoaded}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-4 font-heading text-lg font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-accent-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
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
                      {t('processing')}
                    </>
                  ) : (
                    <>
                      <HiHeart className="h-5 w-5" />
                      {t('donateButton', { amount: formatCOP(currentAmount) })}
                    </>
                  )}
                </motion.button>

                {/* Back button */}
                <div className="mt-3 flex justify-center">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-600"
                  >
                    <HiArrowLeft className="h-3.5 w-3.5" />
                    {t('editInfo')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer trust badge ── */}
        <div className="border-t border-gray-50 bg-gray-50/50 px-6 py-3">
          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <HiShieldCheck className="h-3.5 w-3.5" />
            {t('securePayment')}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
