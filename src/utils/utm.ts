export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const UTM_KEYS: (keyof UtmParams)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

const STORAGE_KEY = 'hotmart_utm_params';

/**
 * Capture UTM parameters from the current URL and persist them in sessionStorage.
 * Call this on page load.
 */
export function captureUtmParams(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utms: UtmParams = {};
  let hasUtm = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utms[key] = value;
      hasUtm = true;
    }
  }

  if (hasUtm) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
  }
}

/**
 * Retrieve stored UTM parameters.
 */
export function getUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
