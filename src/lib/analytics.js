// Google Ads "Contact" conversion. The gtag base snippet lives in index.html.
const CONTACT_CONVERSION = 'AW-18528203345/ewElCPH66acdENHk94JF';

export function trackContactConversion() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: CONTACT_CONVERSION });
}
