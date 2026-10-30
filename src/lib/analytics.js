// Google Ads "Contact" conversion. The gtag base snippet lives in index.html.
const CONTACT_CONVERSION = 'AW-18528203345/ewElCPH66acdENHk94JF';

// Fires once per successful enquiry. `id` is the submission id (also sent as transaction_id
// so Google dedupes); the sessionStorage flag stops a refresh of /thank-you re-counting it.
export function trackContactConversion(id) {
  if (typeof window === 'undefined' || !id) return;
  try {
    if (sessionStorage.getItem('upc_conv') === id) return;
    sessionStorage.setItem('upc_conv', id);
  } catch { /* storage blocked: still fire once for this page load */ }
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: CONTACT_CONVERSION, transaction_id: id });
}

// Landing attributes worth attaching to a lead: gclid and UTM params.
export function attribution() {
  const p = new URLSearchParams(window.location.search);
  const utm = {};
  for (const [k, val] of p) if (k.startsWith('utm_')) utm[k] = val;
  let gclid = p.get('gclid') || '';
  try {
    if (gclid) sessionStorage.setItem('upc_gclid', gclid); else gclid = sessionStorage.getItem('upc_gclid') || '';
    if (Object.keys(utm).length) sessionStorage.setItem('upc_utm', JSON.stringify(utm));
    else Object.assign(utm, JSON.parse(sessionStorage.getItem('upc_utm') || '{}'));
  } catch { /* ignore */ }
  return { gclid, utm };
}
