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
    const fbPayload: Record<string, any> = {};
    if (data.contentName) fbPayload.content_name = data.contentName;
    if (data.value !== undefined) fbPayload.value = data.value;
    if (data.currency) fbPayload.currency = data.currency;

    if (Object.keys(fbPayload).length > 0) {
      (window as any).fbq('track', data.event, fbPayload);
    } else {
      (window as any).fbq('track', data.event);
    }
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gaPayload: Record<string, any> = {
      event_category: 'conversion',
    };
    if (data.productSlug) gaPayload.event_label = data.productSlug;
    if (data.value !== undefined) gaPayload.value = data.value;
    if (data.currency) gaPayload.currency = data.currency;

    (window as any).gtag('event', data.event, gaPayload);
  }

  // Hotmart Pixel
  if (typeof window !== 'undefined' && (window as any).hotmartPixel) {
    (window as any).hotmartPixel.track(data.event, {
      productSlug: data.productSlug,
    });
  }
}
