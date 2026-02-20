'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  HiHeart,
  HiArrowRight,
  HiArrowLeft,
  HiShieldCheck,
  HiCheckCircle,
} from 'react-icons/hi2';
import { useEpayco } from '@/hooks/useEpayco';
import { EASE_APPLE, DURATION_REVEAL, STAGGER } from '@/lib/animation-config';

const PRESET_AMOUNTS = [30000, 50000, 100000, 200000, 500000];
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
  compact?: boolean;
}

function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DonationCheckout({
  campaignId,
  preselectedAmount,
  compact = false,
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

      openCheckout(result.smartCheckout);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorCreating'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: { x: 30, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -30, opacity: 0 },
  };

  return (
    <div
      id="donar"
      className={`mx-auto w-full ${compact ? 'max-w-lg' : 'max-w-2xl'} rounded-2xl bg-white p-6 shadow-xl sm:p-8`}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
          <HiShieldCheck className="h-4 w-4" />
          {t('securePayment')}
        </div>
        <h3 className="text-2xl font-bold text-neutral-900">{t('title')}</h3>

        {/* Step indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  s === step
                    ? 'bg-primary-500 text-white'
                    : s < step
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                {s < step ? <HiCheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 w-8 rounded-full transition-colors ${
                    s < step ? 'bg-primary-300' : 'bg-neutral-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {/* STEP 1: Amount Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE_APPLE }}
          >
            <p className="mb-4 text-center text-sm text-neutral-600">
              {t('selectAmount')}
            </p>

            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PRESET_AMOUNTS.map((amount, i) => (
                <motion.button
                  key={amount}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * STAGGER.fast, ease: EASE_APPLE }}
                  onClick={() => handleAmountSelect(amount)}
                  className={`rounded-xl border-2 px-4 py-3 text-center font-semibold transition-all ${
                    selectedAmount === amount && !isCustom
                      ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                      : 'border-neutral-200 text-neutral-700 hover:border-primary-200 hover:bg-primary-50/50'
                  }`}
                >
                  {formatCOP(amount)}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: PRESET_AMOUNTS.length * STAGGER.fast,
                  ease: EASE_APPLE,
                }}
                onClick={handleCustomToggle}
                className={`rounded-xl border-2 px-4 py-3 text-center font-semibold transition-all ${
                  isCustom
                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                    : 'border-neutral-200 text-neutral-700 hover:border-primary-200 hover:bg-primary-50/50'
                }`}
              >
                {t('customAmount')}
              </motion.button>
            </div>

            <AnimatePresence>
              {isCustom && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <label className="mb-1 block text-sm text-neutral-600">
                    {t('enterAmount')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                      $
                    </span>
                    <input
                      type="number"
                      min={MIN_AMOUNT}
                      max={MAX_AMOUNT}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="50000"
                      className="w-full rounded-xl border-2 border-neutral-200 py-3 pl-8 pr-16 text-lg font-semibold text-neutral-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
                      COP
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    {t('minAmount')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleNextStep}
              disabled={currentAmount < MIN_AMOUNT}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentAmount > 0
                ? `${t('confirmDonation')} ${formatCOP(currentAmount)}`
                : t('selectAmount')}
              <HiArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        {/* STEP 2: Donor Information */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE_APPLE }}
          >
            <p className="mb-4 text-center text-sm text-neutral-600">
              {t('yourInfo')}
            </p>

            <div className="space-y-3">
              {/* ID Type + Number */}
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={donor.identificationType}
                  onChange={(e) =>
                    handleDonorChange('identificationType', e.target.value)
                  }
                  className="rounded-xl border-2 border-neutral-200 px-3 py-3 text-sm text-neutral-700 outline-none transition-colors focus:border-primary-500"
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
                  className="col-span-2 rounded-xl border-2 border-neutral-200 px-4 py-3 text-neutral-900 outline-none transition-colors focus:border-primary-500"
                />
              </div>

              {/* Names */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={donor.firstName}
                  onChange={(e) => handleDonorChange('firstName', e.target.value)}
                  placeholder={t('firstName')}
                  className="rounded-xl border-2 border-neutral-200 px-4 py-3 text-neutral-900 outline-none transition-colors focus:border-primary-500"
                />
                <input
                  type="text"
                  value={donor.lastName}
                  onChange={(e) => handleDonorChange('lastName', e.target.value)}
                  placeholder={t('lastName')}
                  className="rounded-xl border-2 border-neutral-200 px-4 py-3 text-neutral-900 outline-none transition-colors focus:border-primary-500"
                />
              </div>

              {/* Email */}
              <input
                type="email"
                value={donor.email}
                onChange={(e) => handleDonorChange('email', e.target.value)}
                placeholder={t('email')}
                className="w-full rounded-xl border-2 border-neutral-200 px-4 py-3 text-neutral-900 outline-none transition-colors focus:border-primary-500"
              />

              {/* Phone + City (optional) */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  value={donor.phoneNumber}
                  onChange={(e) =>
                    handleDonorChange('phoneNumber', e.target.value)
                  }
                  placeholder={t('phone')}
                  className="rounded-xl border-2 border-neutral-200 px-4 py-3 text-neutral-900 outline-none transition-colors focus:border-primary-500"
                />
                <input
                  type="text"
                  value={donor.city}
                  onChange={(e) => handleDonorChange('city', e.target.value)}
                  placeholder={t('city')}
                  className="rounded-xl border-2 border-neutral-200 px-4 py-3 text-neutral-900 outline-none transition-colors focus:border-primary-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 rounded-full border-2 border-neutral-200 px-5 py-3 font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                <HiArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextStep}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
              >
                {t('confirmDonation')}
                <HiArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Confirm and Pay */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE_APPLE }}
          >
            {/* Summary */}
            <div className="mb-6 rounded-xl bg-primary-50 p-5">
              <div className="mb-3 text-center">
                <p className="text-sm text-primary-600">{t('confirmDonation')}</p>
                <p className="text-3xl font-bold text-primary-800">
                  {formatCOP(currentAmount)}
                </p>
              </div>
              <div className="space-y-1 text-sm text-primary-700">
                <div className="flex justify-between">
                  <span>{t('firstName')}:</span>
                  <span className="font-medium">
                    {donor.firstName} {donor.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('email')}:</span>
                  <span className="font-medium">{donor.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('identificationNumber')}:</span>
                  <span className="font-medium">
                    {donor.identificationType} {donor.identificationNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 rounded-full border-2 border-neutral-200 px-5 py-3 font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                <HiArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isLoaded}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-accent-400 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
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
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-neutral-500">
              <HiShieldCheck className="mr-1 inline h-3 w-3" />
              {t('securePayment')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
