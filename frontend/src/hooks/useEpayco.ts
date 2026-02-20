'use client';

import { useState, useEffect, useCallback } from 'react';

const CHECKOUT_V2_SCRIPT = 'https://checkout.epayco.co/checkout-v2.js';

/**
 * Data returned by the backend after creating a donation.
 * The backend handles session creation via Apify, so the frontend
 * only needs the sessionId to open the checkout.
 */
export interface CheckoutSession {
  sessionId: string;
  test: boolean;
}

/**
 * ePayco Smart Checkout V2 hook.
 *
 * The backend creates the session via Apify API and returns a sessionId.
 * This hook loads checkout-v2.js and opens the checkout modal with that sessionId.
 *
 * @see https://docs.epayco.com/docs/checkout-implementacion
 */
export function useEpayco() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Load checkout-v2.js dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.ePayco) {
      setIsLoaded(true);
      return;
    }

    const existing = document.querySelector(`script[src="${CHECKOUT_V2_SCRIPT}"]`);
    if (existing) {
      if (window.ePayco) {
        setIsLoaded(true);
      } else {
        existing.addEventListener('load', () => setIsLoaded(true));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = CHECKOUT_V2_SCRIPT;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.error('[useEpayco] checkout-v2.js failed to load');
      setIsLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  const openCheckout = useCallback(
    (session: CheckoutSession) => {
      if (!window.ePayco) {
        throw new Error('ePayco SDK not loaded');
      }

      const checkout = window.ePayco.checkout.configure({
        sessionId: session.sessionId,
        type: 'onpage',
        test: session.test,
      });

      checkout.onCreated(() => {
        console.log('[ePayco] Checkout created');
      });

      checkout.onErrors((errors) => {
        console.error('[ePayco] Checkout error:', errors);
      });

      checkout.onClosed(() => {
        console.log('[ePayco] Checkout closed');
      });

      checkout.open();
    },
    []
  );

  return { openCheckout, isLoaded };
}
