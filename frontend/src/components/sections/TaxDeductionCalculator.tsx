'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { HiCalculator, HiCurrencyDollar, HiShieldCheck, HiArrowRight } from 'react-icons/hi';

const US_CORPORATE_TAX_RATE = 0.21;
const US_DEDUCTION_LIMIT = 0.10;
const CO_TAX_DISCOUNT_RATE = 0.25;

function formatCOP(value: number): string {
  return '$' + value.toLocaleString('es-CO');
}

function formatUSD(value: number): string {
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function parseInput(value: string): number {
  return parseInt(value.replace(/\D/g, '')) || 0;
}

export default function TaxDeductionCalculator() {
  const t = useTranslations('corporateImpact.taxCalc');
  const locale = useLocale();
  const isUS = locale === 'en';

  const [donationInput, setDonationInput] = useState('');
  const [incomeInput, setIncomeInput] = useState('');
  const [showResults, setShowResults] = useState(false);

  const donation = parseInput(donationInput);
  const taxableIncome = parseInput(incomeInput);

  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) { setDonationInput(''); return; }
    setDonationInput(
      isUS
        ? new Intl.NumberFormat('en-US').format(parseInt(raw))
        : new Intl.NumberFormat('es-CO').format(parseInt(raw))
    );
    setShowResults(false);
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) { setIncomeInput(''); return; }
    setIncomeInput(new Intl.NumberFormat('en-US').format(parseInt(raw)));
    setShowResults(false);
  };

  const canCalculate = isUS ? donation > 0 && taxableIncome > 0 : donation > 0;

  const calculate = () => {
    if (!canCalculate) return;
    setShowResults(true);
  };

  // US: deduction limited to 10% of taxable income, tax savings = deductible × 21%
  const usDeductionLimit = taxableIncome * US_DEDUCTION_LIMIT;
  const usDeductibleAmount = Math.min(donation, usDeductionLimit);
  const usExceeds = donation > usDeductionLimit && taxableIncome > 0;
  const usTaxSavings = usDeductibleAmount * US_CORPORATE_TAX_RATE;
  const usRealCost = donation - usTaxSavings;

  // Colombia: 25% tax discount on donation amount
  const coTaxDiscount = donation * CO_TAX_DISCOUNT_RATE;
  const coRealCost = donation - coTaxDiscount;

  const fmt = isUS ? formatUSD : formatCOP;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <HiCalculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">
              {t('title')} <span className="text-accent-300">{t('heading')}</span>
            </h3>
            <p className="mt-0.5 text-sm text-primary-200">{t('description')}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-6 sm:px-8">
        <div className={`grid gap-4 ${isUS ? 'sm:grid-cols-2' : ''}`}>
          {/* Donation amount */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              {t('donationAmount')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={donationInput}
                onChange={handleDonationChange}
                placeholder={isUS ? 'e.g. 10,000' : 'ej. 10.000.000'}
                className="w-full rounded-lg border border-gray-300 py-3 pl-8 pr-4 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Taxable income (US only) */}
          {isUS && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                {t('taxableIncome')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={incomeInput}
                  onChange={handleIncomeChange}
                  placeholder={t('taxableIncomePlaceholder')}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-8 pr-4 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={calculate}
          disabled={!canCalculate}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        >
          <HiCalculator className="h-4 w-4" />
          {t('calculate')}
        </button>

        {/* Results */}
        <AnimatePresence>
          {showResults && donation > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50/50 p-5">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-primary-800">
                  <HiShieldCheck className="h-4 w-4 text-primary-600" />
                  {t('results')}
                </h4>

                <div className="space-y-3">
                  {isUS ? (
                    <>
                      {/* US Results */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t('donationAmount').replace(' (USD)', '')}</span>
                        <span className="font-semibold text-gray-900">{formatUSD(donation)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t('deductibleAmount')}</span>
                        <span className="font-semibold text-gray-900">{formatUSD(usDeductibleAmount)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t('taxRate')}</span>
                        <span className="font-semibold text-gray-900">21%</span>
                      </div>
                      <div className="h-px bg-primary-200" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-green-700">{t('taxSavings')}</span>
                        <span className="font-heading text-xl font-bold text-green-600">{formatUSD(usTaxSavings)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t('realCost')}</span>
                        <span className="font-semibold text-gray-900">{formatUSD(usRealCost)}</span>
                      </div>

                      {usExceeds && (
                        <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
                          <p className="text-xs text-amber-800">
                            {t('limitWarning')
                              .replace('{limit}', formatUSD(usDeductionLimit))
                              .replace('{excess}', formatUSD(donation - usDeductionLimit))}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Colombia Results */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t('donationAmount').replace(' (COP)', '')}</span>
                        <span className="font-semibold text-gray-900">{formatCOP(donation)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t('taxRate')}</span>
                        <span className="font-semibold text-gray-900">25%</span>
                      </div>
                      <div className="h-px bg-primary-200" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-green-700">{t('deductibleAmount')}</span>
                        <span className="font-heading text-xl font-bold text-green-600">{formatCOP(coTaxDiscount)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t('realCost')}</span>
                        <span className="font-semibold text-gray-900">{formatCOP(coRealCost)}</span>
                      </div>
                    </>
                  )}
                </div>

                <p className="mt-4 text-xs text-gray-500">{t('limitNote')}</p>
              </div>

              <p className="mt-3 text-center text-xs text-gray-400">{t('disclaimer')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
