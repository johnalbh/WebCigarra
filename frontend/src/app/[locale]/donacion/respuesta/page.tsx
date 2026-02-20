'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiExclamationTriangle,
  HiArrowPath,
  HiHome,
} from 'react-icons/hi2';
import { Link } from '@/i18n/routing';
import { EASE_APPLE } from '@/lib/animation-config';

// ── Types ──

interface TransactionStatus {
  status: string;
  amount: number;
  referenceCode: string;
  donorName: string;
  approvedDate: string | null;
  transactionDate: string;
}

// ── Helpers ──

function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function mapEpaycoCode(code: string | number): string {
  const c = String(code);
  if (c === '1') return 'Approved';
  if (c === '2') return 'Rejected';
  if (c === '3') return 'Pending';
  return 'Failed';
}

const EPAYCO_VALIDATION_URL = 'https://secure.epayco.co/validation/v1/reference';

// ── Data fetchers ──

async function fetchFromEpayco(refPayco: string): Promise<TransactionStatus> {
  const res = await fetch(`${EPAYCO_VALIDATION_URL}/${refPayco}`);
  if (!res.ok) throw new Error('ePayco API error');
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'ePayco validation failed');

  const d = json.data;
  return {
    status: mapEpaycoCode(d.x_cod_response),
    amount: parseFloat(d.x_amount) || 0,
    referenceCode: d.x_id_invoice || refPayco,
    donorName: [d.x_customer_name, d.x_customer_lastname].filter(Boolean).join(' '),
    approvedDate: d.x_approval_code ? d.x_transaction_date : null,
    transactionDate: d.x_transaction_date || new Date().toISOString(),
  };
}

async function fetchFromBackend(ref: string): Promise<TransactionStatus> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const res = await fetch(`${apiUrl}/api/donations/${ref}/status`);
  if (!res.ok) throw new Error('Backend API error');
  return res.json();
}

// ── Status UI Config ──

const STATUS_CONFIG = {
  Approved: {
    icon: HiCheckCircle,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    borderColor: 'border-green-200',
  },
  Rejected: {
    icon: HiXCircle,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    borderColor: 'border-red-200',
  },
  Pending: {
    icon: HiClock,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-200',
  },
  PendingCheckout: {
    icon: HiClock,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-200',
  },
  Failed: {
    icon: HiExclamationTriangle,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    borderColor: 'border-red-200',
  },
} as const;

// ── Component ──

export default function DonationResponsePage() {
  const t = useTranslations('donationResponse');
  const searchParams = useSearchParams();
  const [txStatus, setTxStatus] = useState<TransactionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStatus = useCallback(async (refPayco: string, backendRef: string, attempt: number) => {
    const MAX_ATTEMPTS = 5;
    const RETRY_INTERVAL = 3000;

    try {
      // Query both sources in parallel
      const [epaycoResult, backendResult] = await Promise.allSettled([
        fetchFromEpayco(refPayco),
        fetchFromBackend(backendRef),
      ]);

      // Prefer ePayco result (authoritative source)
      let result: TransactionStatus | null = null;

      if (epaycoResult.status === 'fulfilled') {
        result = epaycoResult.value;
      } else if (backendResult.status === 'fulfilled') {
        result = backendResult.value;
      }

      if (!result) {
        throw new Error(
          epaycoResult.status === 'rejected'
            ? (epaycoResult.reason as Error).message
            : 'No se pudo obtener el estado'
        );
      }

      setTxStatus(result);

      // If still pending, retry
      const isPending = result.status === 'PendingCheckout' || result.status === 'Pending';
      if (isPending && attempt < MAX_ATTEMPTS) {
        setTimeout(() => fetchStatus(refPayco, backendRef, attempt + 1), RETRY_INTERVAL);
      } else {
        setLoading(false);
      }
    } catch (err) {
      if (attempt < MAX_ATTEMPTS) {
        setTimeout(() => fetchStatus(refPayco, backendRef, attempt + 1), RETRY_INTERVAL);
      } else {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const refPayco = searchParams.get('ref_payco');
    const backendRef =
      searchParams.get('x_id_invoice') ||
      searchParams.get('ref') ||
      refPayco;

    if (!refPayco && !backendRef) {
      setError('No se encontro referencia de pago');
      setLoading(false);
      return;
    }

    fetchStatus(refPayco || backendRef!, backendRef || refPayco!, 0);
  }, [searchParams, fetchStatus]);

  // ── Render ──

  const statusKey = txStatus?.status as keyof typeof STATUS_CONFIG;
  const config = STATUS_CONFIG[statusKey] || STATUS_CONFIG.Failed;
  const Icon = config.icon;

  const getStatusTranslationKey = (status: string) => {
    switch (status) {
      case 'Approved': return 'approved';
      case 'Rejected': return 'rejected';
      case 'Pending':
      case 'PendingCheckout': return 'pending';
      default: return 'failed';
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_APPLE }}
        className="w-full max-w-md"
      >
        {loading ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
            <p className="text-neutral-600">{t('verifyingPayment')}</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-8 text-center">
            <HiExclamationTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
            <h2 className="mb-2 text-xl font-bold text-neutral-900">
              {t('failed')}
            </h2>
            <p className="mb-6 text-neutral-600">{error}</p>
            <Link
              href={'/como-ayudar' as '/como-ayudar'}
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
            >
              <HiArrowPath className="h-4 w-4" />
              {t('tryAgain')}
            </Link>
          </div>
        ) : txStatus ? (
          <div
            className={`rounded-2xl border-2 ${config.borderColor} ${config.bgColor} p-8 text-center`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Icon className={`mx-auto mb-4 h-20 w-20 ${config.iconColor}`} />
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold text-neutral-900">
              {t(getStatusTranslationKey(txStatus.status))}
            </h2>

            <p className="mb-4 text-neutral-600">
              {t(`${getStatusTranslationKey(txStatus.status)}Message`, {
                amount: formatCOP(txStatus.amount),
              })}
            </p>

            {txStatus.status === 'Approved' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6 text-3xl font-bold text-green-700"
              >
                {formatCOP(txStatus.amount)}
              </motion.div>
            )}

            <div className="mb-6 rounded-lg bg-white/60 p-3 text-sm text-neutral-600">
              <p>
                {t('reference', { ref: txStatus.referenceCode })}
              </p>
              {txStatus.donorName && (
                <p className="mt-1">{txStatus.donorName}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              {(txStatus.status === 'Rejected' || txStatus.status === 'Failed') && (
                <Link
                  href={'/como-ayudar' as '/como-ayudar'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
                >
                  <HiArrowPath className="h-4 w-4" />
                  {t('tryAgain')}
                </Link>
              )}
              <Link
                href={'/'}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neutral-200 px-6 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                <HiHome className="h-4 w-4" />
                {t('backHome')}
              </Link>
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
