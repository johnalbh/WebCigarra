'use client';

import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useTranslations } from 'next-intl';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

interface PayPalButtonWrapperProps {
  amount: number;
  donorData: {
    firstName: string;
    lastName: string;
    email: string;
    campaignId?: number;
  };
  onApprove: (data: {
    orderID: string;
    referenceCode: string;
    amount: number;
    donorName: string;
  }) => void;
  onError: (error: string) => void;
  onCancel: () => void;
  disabled?: boolean;
}

function PayPalButtonsInner({
  amount,
  donorData,
  onApprove,
  onError,
  onCancel,
  disabled,
}: PayPalButtonWrapperProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const t = useTranslations('donationCheckout');

  const createOrder = async (): Promise<string> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

    const res = await fetch(`${apiUrl}/api/donations/one-time`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: donorData.firstName.trim(),
        lastName: donorData.lastName.trim(),
        email: donorData.email.trim(),
        amount,
        currency: 'USD',
        gateway: 'PayPal',
        country: 'US',
        campaignId: donorData.campaignId || undefined,
      }),
    });

    const data = await res.json();

    if (!data.success || !data.payPalOrderId) {
      throw new Error(data.errorMessage || 'Failed to create PayPal order');
    }

    return data.payPalOrderId;
  };

  const handleApprove = async (data: { orderID: string }) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      const res = await fetch(`${apiUrl}/api/donations/paypal/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.orderID }),
      });

      const captureData = await res.json();

      if (!captureData.success) {
        onError(captureData.errorMessage || 'Payment capture failed');
        return;
      }

      onApprove({
        orderID: data.orderID,
        referenceCode: captureData.referenceCode,
        amount: captureData.amount,
        donorName: captureData.donorName,
      });
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Payment capture failed');
    }
  };

  return (
    <div className="w-full">
      {isPending && (
        <div className="flex items-center justify-center py-6">
          <svg className="h-6 w-6 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="ml-2 text-sm text-gray-400">{t('processing')}</span>
        </div>
      )}
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'donate',
          height: 50,
        }}
        disabled={disabled}
        createOrder={createOrder}
        onApprove={handleApprove}
        onCancel={() => onCancel()}
        onError={(err) => onError(String(err))}
      />
    </div>
  );
}

export default function PayPalButtonWrapper(props: PayPalButtonWrapperProps) {
  if (!PAYPAL_CLIENT_ID) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center text-sm text-yellow-700">
        PayPal is not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID.
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <PayPalButtonsInner {...props} />
    </PayPalScriptProvider>
  );
}
