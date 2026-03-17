export interface TrackingConfig {
  facebookPixelId?: string;
  googleAnalyticsId?: string;
  gtmId?: string;
  hotmartPixelId?: string;
}

export type TrackingEvent =
  | 'PageView'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'Lead'
  | 'AddToCart';

export interface TrackingEventData {
  event: TrackingEvent;
  productSlug?: string;
  value?: number;
  currency?: string;
  contentName?: string;
  [key: string]: unknown;
}

/**
 * Fire a tracking event across all configured pixels.
 * This runs client-side only.
 */
export function fireTrackingEvent(data: TrackingEventData): void {
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', data.event, {
      content_name: data.contentName,
      value: data.value,
      currency: data.currency,
    });
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', data.event, {
      event_category: 'conversion',
      event_label: data.productSlug,
      value: data.value,
    });
  }

  // Hotmart Pixel
  if (typeof window !== 'undefined' && (window as any).hotmartPixel) {
    (window as any).hotmartPixel.track(data.event, {
      productSlug: data.productSlug,
    });
  }
}
