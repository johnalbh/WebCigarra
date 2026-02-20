/**
 * Type declarations for the ePayco Checkout SDK (checkout.js).
 * The script injects `window.ePayco` globally.
 * @see https://docs.epayco.com/docs/checkout-implementacion
 */

interface EpaycoOpenParams {
  // Required purchase parameters
  name: string;
  description: string;
  invoice: string;
  currency: string;
  amount: string;
  tax_base: string;
  tax: string;
  tax_ico?: string;
  country: string;
  lang: string;
  /** "false" = OnPage modal, "true" = Standard redirect */
  external: string;

  // Callback URLs
  response: string;
  confirmation: string;
  method_confirmation?: string;

  // Customer billing (optional, pre-fills the form)
  name_billing?: string;
  last_name_billing?: string;
  address_billing?: string;
  type_doc_billing?: string;
  mobilephone_billing?: string;
  number_doc_billing?: string;
  email_billing?: string;
  city_billing?: string;

  // Extra tracking fields
  extra1?: string;
  extra2?: string;
  extra3?: string;
}

interface EpaycoCheckoutHandler {
  open(data: EpaycoOpenParams): void;
  onCloseModal?: () => void;
}

interface EpaycoCheckout {
  configure(config: { key: string; test: boolean }): EpaycoCheckoutHandler;
}

interface Window {
  ePayco?: {
    checkout: EpaycoCheckout;
  };
}
