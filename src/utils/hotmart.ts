import { getUtmParams } from './utm';

/**
 * Build a Hotmart affiliate link with UTM parameters appended.
 */
export function buildAffiliateLink(
  baseLink: string,
  pageSlug: string,
  extraParams?: Record<string, string>
): string {
  const url = new URL(baseLink);
  const utms = getUtmParams();

  // Set UTM params from current page visit
  if (utms.utm_source) url.searchParams.set('utm_source', utms.utm_source);
  if (utms.utm_medium) url.searchParams.set('utm_medium', utms.utm_medium);
  if (utms.utm_campaign) url.searchParams.set('utm_campaign', utms.utm_campaign);
  url.searchParams.set('utm_content', pageSlug);

  // Append any extra params
  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}
