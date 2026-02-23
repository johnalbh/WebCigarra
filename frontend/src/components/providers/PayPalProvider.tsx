'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import type { ReactNode } from 'react';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

interface PayPalProviderProps {
  children: ReactNode;
}

export default function PayPalProvider({ children }: PayPalProviderProps) {
  if (!PAYPAL_CLIENT_ID) {
    return <>{children}</>;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
