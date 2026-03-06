'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { HiCalculator, HiShieldCheck } from 'react-icons/hi';

const US_CORPORATE_TAX_RATE = 0.21;
const US_DEDUCTION_LIMIT = 0.10;
const CO_TAX_DISCOUNT_RATE = 0.25;

const SLIDER_STEPS_USD = [1000, 2500, 5000, 10000, 25000, 50000, 75000, 100000];
const SLIDER_STEPS_COP = [1000000, 5000000, 10000000, 25000000, 50000000, 100000000, 200000000, 500000000];

function formatCOP(value: number): string {
  return '$' + value.toLocaleString('es-CO');
}

function formatUSD(value: number): string {
  return '$' + value.toLocaleString('en-US');
}

function parseCurrencyInput(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

function findClosestSliderIndex(value: number, steps: number[]): number {
  let closest = 0;
  let minDiff = Math.abs(value - steps[0]);
  for (let i = 1; i < steps.length; i++) {
    const diff = Math.abs(value - steps[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closest = i;
    }
  }
  return closest;
}

interface TaxDeductionCalculatorProps {
  variant?: 'full' | 'compact';
}

export default function TaxDeductionCalculator({ variant = 'full' }: TaxDeductionCalculatorProps) {
  const t = useTranslations('corporate.taxCalc');
  const locale = useLocale();
  const isUS = locale === 'en';

  const steps = isUS ? SLIDER_STEPS_USD : SLIDER_STEPS_COP;
  const defaultIndex = 3;
  const fmt = isUS ? formatUSD : formatCOP;

  const [sliderIndex, setSliderIndex] = useState(defaultIndex);
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [taxableIncome, setTaxableIncome] = useState(isUS ? 500000 : 0);

  const donation = isCustom ? parseCurrencyInput(customValue) : steps[sliderIndex];

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderIndex(parseInt(e.target.value));
    setIsCustom(false);
    setCustomValue('');
  }, []);

  const handleCustomInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setCustomValue(raw);
    setIsCustom(true);
    const numVal = parseInt(raw, 10) || 0;
    setSliderIndex(findClosestSliderIndex(numVal, steps));
  }, [steps]);

  // US calculations
  const usDeductionLimit = taxableIncome * US_DEDUCTION_LIMIT;
  const usDeductibleAmount = Math.min(donation, usDeductionLimit);
  const usExceeds = donation > usDeductionLimit && taxableIncome > 0;
  const usTaxSavings = usDeductibleAmount * US_CORPORATE_TAX_RATE;
  const usRealCost = donation - usTaxSavings;

  // Colombia calculations
  const coTaxDiscount = donation * CO_TAX_DISCOUNT_RATE;
  const coRealCost = donation - coTaxDiscount;

  const taxSavings = isUS ? usTaxSavings : coTaxDiscount;
  const realCost = isUS ? usRealCost : coRealCost;
  const savingsPercent = donation > 0
    ? (isUS ? Math.round((usTaxSavings / donation) * 100) : 25)
    : 0;

  const isCompact = variant === 'compact';

  return (
    <div id="calculadora" className={`rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden ${isCompact ? '' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
            <HiCalculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-white">
              {t('title')} <span className="text-accent-300">{t('heading')}</span>
            </h3>
            {!isCompact && (
              <p className="mt-0.5 text-xs text-primary-200">{t('description')}</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6">
        {/* Donation input: slider + custom */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">{t('donationAmount')}</label>

          {/* Custom value input */}
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={isCustom ? (customValue ? parseInt(customValue).toLocaleString(isUS ? 'en-US' : 'es-CO') : '') : donation.toLocaleString(isUS ? 'en-US' : 'es-CO')}
              onChange={handleCustomInput}
              onFocus={() => {
                if (!isCustom) {
                  setCustomValue(donation.toString());
                  setIsCustom(true);
                }
              }}
              placeholder={isUS ? 'e.g. 10,000' : 'ej. 25.000.000'}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-7 pr-16 text-lg font-heading font-bold text-primary-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
              {isUS ? 'USD' : 'COP'}
            </span>
          </div>

          {/* Slider for quick selection */}
          <input
            type="range"
            min={0}
            max={steps.length - 1}
            value={sliderIndex}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-primary-600"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-400">{fmt(steps[0])}</span>
            <span className="text-[10px] text-gray-400">{fmt(steps[steps.length - 1])}</span>
          </div>
        </div>

        {/* Taxable income slider (US only) */}
        {isUS && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">{t('taxableIncome')}</label>
              <span className="font-heading text-sm font-bold text-gray-600">
                {formatUSD(taxableIncome)}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={50000}
              value={taxableIncome}
              onChange={(e) => setTaxableIncome(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-primary-600"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-400">$50,000</span>
              <span className="text-[10px] text-gray-400">$5,000,000</span>
            </div>
          </div>
        )}

        {/* Live results */}
        {donation > 0 && (
          <motion.div
            key={`${donation}-${taxableIncome}`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-5 rounded-xl bg-gradient-to-br from-green-50 to-primary-50 border border-green-100 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <HiShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-sm font-bold text-gray-800">{t('results')}</span>
            </div>

            {/* Big savings number */}
            <div className="text-center py-2">
              <p className="text-xs text-gray-500 mb-1">{t('taxSavings')}</p>
              <motion.p
                key={taxSavings}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="font-heading text-3xl font-bold text-green-600"
              >
                {fmt(Math.round(taxSavings))}
              </motion.p>
              <p className="text-xs text-green-600 font-medium mt-1">
                {savingsPercent}% {isUS ? 'savings' : 'descuento'}
              </p>
            </div>

            {/* Details */}
            <div className="mt-3 space-y-2 text-sm">
              {isUS && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('deductibleAmount')}</span>
                  <span className="font-medium text-gray-800">{formatUSD(usDeductibleAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">{t('taxRate')}</span>
                <span className="font-medium text-gray-800">{isUS ? '21%' : '25%'}</span>
              </div>
              <div className="h-px bg-green-200" />
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">{t('realCost')}</span>
                <span className="font-bold text-gray-900">{fmt(Math.round(realCost))}</span>
              </div>
            </div>

            {/* Limit warning (US) */}
            {isUS && usExceeds && (
              <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-2.5">
                <p className="text-xs text-amber-800">
                  {t('limitWarning')
                    .replace('{limit}', formatUSD(usDeductionLimit))
                    .replace('{excess}', formatUSD(donation - usDeductionLimit))}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Legal note */}
        <p className="mt-3 text-[11px] text-gray-400 leading-relaxed">
          {t('limitNote')}
        </p>
        <p className="mt-1 text-[11px] text-gray-400 italic">{t('disclaimer')}</p>
      </div>
    </div>
  );
}
