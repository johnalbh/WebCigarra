// Google Analytics 4 event helpers
// Usage: import { trackDonation, trackEvent } from '@/lib/analytics';

type GtagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: string | number | undefined;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

/** Track a generic event */
export function trackEvent({ action, category, label, value, ...rest }: GtagEvent) {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
}

/** Track donation completed */
export function trackDonation(amount: number, currency: 'USD' | 'COP', gateway: string) {
  gtag('event', 'purchase', {
    transaction_id: `DON-${Date.now()}`,
    value: amount,
    currency,
    items: [
      {
        item_name: 'Donation',
        item_category: 'One-time Donation',
        price: amount,
        quantity: 1,
      },
    ],
  });

  // Also fire a custom donation event for easier filtering
  gtag('event', 'donation_complete', {
    event_category: 'Donations',
    event_label: gateway,
    value: amount,
    currency,
    gateway,
  });
}

/** Track donation checkout step */
export function trackDonationStep(step: number, amount?: number) {
  gtag('event', 'checkout_progress', {
    event_category: 'Donations',
    event_label: `Step ${step}`,
    value: amount,
    checkout_step: step,
  });
}

/** Track sponsorship plan click */
export function trackSponsorshipClick(planName: string, amount: number, currency: 'USD' | 'COP') {
  gtag('event', 'begin_checkout', {
    event_category: 'Sponsorship',
    event_label: planName,
    value: amount,
    currency,
  });
}

/** Track CTA button click */
export function trackCTAClick(ctaName: string, location: string) {
  gtag('event', 'cta_click', {
    event_category: 'Engagement',
    event_label: ctaName,
    cta_location: location,
  });
}
