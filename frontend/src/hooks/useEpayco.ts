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

interface EpaycoHandler {
  open(data: Record<string, unknown>): void;
}

declare global {
  interface Window {
    ePayco?: {
      checkout: {
        configure(config: { key: string; test: boolean }): EpaycoHandler;
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

  const openCheckout = useCallback((data: SmartCheckoutData) => {
    if (!window.ePayco) {
      console.error('ePayco not loaded yet');
      return;
    }

    const handler = window.ePayco.checkout.configure({
      key: data.publicKey,
      test: data.test,
    });

    handler.open({
      name: data.name,
      description: data.description,
      invoice: data.invoice,
      currency: data.currency.toLowerCase(),
      amount: data.amount,
      tax_base: data.taxBase,
      tax: data.tax,
      tax_ico: '0',
      country: data.country.toLowerCase(),
      lang: data.lang,
      external: 'false',
      response: data.responseUrl,
      confirmation: data.confirmationUrl,
      method: 'POST',
      name_billing: data.customerName,
      last_name_billing: data.customerLastName,
      email_billing: data.customerEmail,
      mobilephone_billing: data.customerPhone,
      type_doc_billing: data.customerDocType,
      number_doc_billing: data.customerDocNumber,
      address_billing: data.customerAddress,
      city_billing: data.customerCity,
      extra1: data.extra1,
      extra2: data.extra2,
      extra3: data.extra3,
    });
  }, []);

  return { openCheckout, isLoaded };
}

export type { SmartCheckoutData };
