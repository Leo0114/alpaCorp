declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Safe helper to push events to Google Tag Manager (GTM) dataLayer.
 * Safe for SSR/SSG environments (checks `typeof window !== "undefined"`).
 */
export function pushGTMEvent(
  event: string,
  payload: Record<string, unknown> = {}
) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...payload,
    });
  }
}
