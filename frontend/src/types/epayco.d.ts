/**
 * Type declarations for ePayco Smart Checkout V2 SDK (checkout-v2.js).
 * The script injects `window.ePayco` globally.
 * @see https://docs.epayco.com/docs/checkout-implementacion
 */

interface EpaycoCheckoutV2 {
  open(): void;
  onCreated(callback: () => void): void;
  onErrors(callback: (errors: unknown) => void): void;
  onClosed(callback: () => void): void;
}

interface EpaycoCheckout {
  configure(config: {
    sessionId: string;
    type: 'onpage' | 'standard';
    test: boolean;
  }): EpaycoCheckoutV2;
}

interface Window {
  ePayco?: {
    checkout: EpaycoCheckout;
  };
}
