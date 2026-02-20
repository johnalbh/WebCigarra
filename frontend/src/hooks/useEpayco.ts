'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface SmartCheckoutData {
  publicKey: string;
  name: string;
  description: string;
  invoice: string;
  currency: string;
  amount: string;
  tax: string;
  taxBase: string;
  country: string;
  lang: string;
  test: boolean;
  external: boolean;
  responseUrl: string;
  confirmationUrl: string;
  methodConfirmation: string;
  customerName?: string;
  customerLastName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerDocType?: string;
  customerDocNumber?: string;
  customerAddress?: string;
  customerCity?: string;
  extra1?: string;
  extra2?: string;
  extra3?: string;
}

declare global {
  interface Window {
    ePayco?: {
      checkout: {
        configure(config: Record<string, unknown>): void;
        openNew(): void;
      };
    };
  }
}

export function useEpayco() {
  const [isLoaded, setIsLoaded] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | undefined>(undefined);

  useEffect(() => {
    if (window.ePayco) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.epayco.co/checkout.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.ePayco) setIsLoaded(true);
      });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.async = true;
    script.onload = () => {
      if (window.ePayco) setIsLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load ePayco checkout script');
    };
    document.body.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  const openCheckout = useCallback(async (data: SmartCheckoutData) => {
    if (!window.ePayco) {
      throw new Error('ePayco not loaded yet');
    }

    // Build epayco-prefixed payload (same format the SDK uses internally
    // after its i() mapping function). Bypasses handler.open() which has
    // a bug that corrupts field validation.
    const epaycoData: Record<string, string> = {
      epaycoKey: data.publicKey,
      epaycoTest: String(data.test),
      epaycoName: data.name,
      epaycoDescription: data.description,
      epaycoInvoice: data.invoice,
      epaycoCurrency: data.currency.toUpperCase(),
      epaycoAmount: data.amount,
      epaycoTax: data.tax,
      epaycoTaxBase: data.taxBase,
      epaycoTaxIco: '0',
      epaycoCountry: data.country.toUpperCase(),
      epaycoLang: data.lang,
      epaycoExternal: 'false',
      epaycoResponse: data.responseUrl,
      epaycoConfirmation: data.confirmationUrl,
      epaycoMethod: data.methodConfirmation || 'POST',
      epaycoConfig: '{}',
    };

    if (data.customerName) epaycoData.epaycoNameBilling = data.customerName;
    if (data.customerLastName) epaycoData.epaycoLastNameBilling = data.customerLastName;
    if (data.customerEmail) epaycoData.epaycoEmailBilling = data.customerEmail;
    if (data.customerPhone) epaycoData.epaycoMobilephoneBilling = data.customerPhone;
    if (data.customerDocType) epaycoData.epaycoTypeDocBilling = data.customerDocType;
    if (data.customerDocNumber) epaycoData.epaycoNumberDocBilling = data.customerDocNumber;
    if (data.customerAddress) epaycoData.epaycoAddressBilling = data.customerAddress;
    if (data.customerCity) epaycoData.epaycoCityBilling = data.customerCity;
    if (data.extra1) epaycoData.epaycoExtra1 = data.extra1;
    if (data.extra2) epaycoData.epaycoExtra2 = data.extra2;
    if (data.extra3) epaycoData.epaycoExtra3 = data.extra3;

    // Create session directly via ePayco API (bypassing handler.open() bug)
    const token = crypto.randomUUID();
    const res = await fetch(
      `https://secure.epayco.co/create/transaction/${data.publicKey}/${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `fname=${encodeURIComponent(JSON.stringify(epaycoData))}`,
      }
    );

    const result = await res.json();
    if (!result.success || !result.data?.id_session) {
      throw new Error(result.message || 'Error al crear sesion de pago');
    }

    // Open checkout with pre-created session (skips SDK data processing)
    window.ePayco.checkout.configure({
      sessionId: result.data.id_session,
      external: false,
    });
    window.ePayco.checkout.openNew();
  }, []);

  return { openCheckout, isLoaded };
}

export type { SmartCheckoutData };
