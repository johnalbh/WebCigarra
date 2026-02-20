'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface SmartCheckoutData {
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

type CheckoutMethod = 'sdk' | 'redirect';

const CHECKOUT_SCRIPT_URL = 'https://checkout.epayco.co/checkout.js';
const SESSION_API_URL = 'https://secure.epayco.co/create/transaction';
const CHECKOUT_PAGE_URL = 'https://checkout.epayco.co/payment/methods';

/**
 * ePayco checkout hook with dual strategy:
 * 1. SDK OnPage modal (checkout.js + handler.open) — primary
 * 2. Direct API session + redirect — fallback if SDK fails
 *
 * @see https://docs.epayco.com/docs/checkout-implementacion
 */
export function useEpayco() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [method, setMethod] = useState<CheckoutMethod>('sdk');
  const handlerRef = useRef<EpaycoCheckoutHandler | null>(null);

  // Load checkout.js dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Already loaded (e.g. navigated back to page)
    if (window.ePayco) {
      setIsLoaded(true);
      return;
    }

    // Check if script tag already exists
    const existing = document.querySelector(`script[src="${CHECKOUT_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener('load', () => setIsLoaded(true));
      return;
    }

    const script = document.createElement('script');
    script.src = CHECKOUT_SCRIPT_URL;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.warn('[useEpayco] checkout.js failed to load, using redirect fallback');
      setMethod('redirect');
      setIsLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  const openCheckout = useCallback(
    async (data: SmartCheckoutData) => {
      // ── Strategy A: SDK handler.open() (OnPage modal) ──
      if (method === 'sdk' && window.ePayco) {
        try {
          if (!handlerRef.current) {
            handlerRef.current = window.ePayco.checkout.configure({
              key: data.publicKey,
              test: data.test,
            });
          }

          handlerRef.current.open({
            name: data.name,
            description: data.description,
            invoice: data.invoice,
            currency: data.currency,
            amount: data.amount,
            tax_base: data.taxBase,
            tax: data.tax,
            country: data.country.toUpperCase(),
            lang: data.lang,
            external: 'false',
            response: data.responseUrl,
            confirmation: data.confirmationUrl,
            method_confirmation: data.methodConfirmation,
            name_billing: data.customerName,
            last_name_billing: data.customerLastName,
            address_billing: data.customerAddress,
            type_doc_billing: data.customerDocType,
            mobilephone_billing: data.customerPhone,
            number_doc_billing: data.customerDocNumber,
            email_billing: data.customerEmail,
            city_billing: data.customerCity,
            extra1: data.extra1,
            extra2: data.extra2,
            extra3: data.extra3,
          });

          return; // Modal opened successfully
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn('[useEpayco] handler.open() failed:', msg, '— falling back to redirect');
          setMethod('redirect');
          handlerRef.current = null;
          // Fall through to redirect strategy
        }
      }

      // ── Strategy B: Direct session API + redirect ──
      await openViaRedirect(data);
    },
    [method]
  );

  return { openCheckout, isLoaded, method };
}

/**
 * Fallback: creates an ePayco checkout session via their internal API
 * and redirects the user to the hosted checkout page.
 */
async function openViaRedirect(data: SmartCheckoutData): Promise<void> {
  const payload: Record<string, string> = {
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
    epaycoExternal: 'true',
    epaycoResponse: data.responseUrl,
    epaycoConfirmation: data.confirmationUrl,
    epaycoMethod: data.methodConfirmation || 'POST',
    epaycoConfig: '{}',
  };

  if (data.customerName) payload.epaycoNameBilling = data.customerName;
  if (data.customerLastName) payload.epaycoLastNameBilling = data.customerLastName;
  if (data.customerEmail) payload.epaycoEmailBilling = data.customerEmail;
  if (data.customerPhone) payload.epaycoMobilephoneBilling = data.customerPhone;
  if (data.customerDocType) payload.epaycoTypeDocBilling = data.customerDocType;
  if (data.customerDocNumber) payload.epaycoNumberDocBilling = data.customerDocNumber;
  if (data.customerAddress) payload.epaycoAddressBilling = data.customerAddress;
  if (data.customerCity) payload.epaycoCityBilling = data.customerCity;
  if (data.extra1) payload.epaycoExtra1 = data.extra1;
  if (data.extra2) payload.epaycoExtra2 = data.extra2;
  if (data.extra3) payload.epaycoExtra3 = data.extra3;

  const token = crypto.randomUUID();
  const res = await fetch(`${SESSION_API_URL}/${data.publicKey}/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `fname=${encodeURIComponent(JSON.stringify(payload))}`,
  });

  const result = await res.json();
  if (!result.success || !result.data?.id_session) {
    throw new Error(result.message || 'Error al crear sesion de pago');
  }

  window.location.href = `${CHECKOUT_PAGE_URL}?transaction=${result.data.id_session}`;
}
