'use client';

import { useCallback } from 'react';

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

/**
 * Creates an ePayco checkout session and redirects to the payment page.
 *
 * Why not use checkout.js handler.open()?
 * The SDK has an internal bug where V2's handler.open() corrupts field
 * validation ("epaycoCurrency isEnum" error). Instead, we call the same
 * session-creation API the SDK uses internally, then redirect to the
 * checkout page — simple, reliable, no SDK version conflicts.
 */
export function useEpayco() {
  const openCheckout = useCallback(async (data: SmartCheckoutData) => {
    // Build the epayco-prefixed payload (same format the SDK sends internally)
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

    // Create session via ePayco API (same endpoint the SDK calls internally)
    const token = crypto.randomUUID();
    const res = await fetch(
      `https://secure.epayco.co/create/transaction/${data.publicKey}/${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `fname=${encodeURIComponent(JSON.stringify(payload))}`,
      }
    );

    const result = await res.json();
    if (!result.success || !result.data?.id_session) {
      throw new Error(result.message || 'Error al crear sesion de pago');
    }

    // Redirect to ePayco checkout page
    window.location.href = `https://checkout.epayco.co/payment/methods?transaction=${result.data.id_session}`;
  }, []);

  // isLoaded is always true — we don't depend on checkout.js script
  return { openCheckout, isLoaded: true };
}

export type { SmartCheckoutData };
