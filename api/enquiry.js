// Vercel serverless function: forwards a website enquiry to the team's inbox via Web3Forms
// (free, delivers to the Gmail address registered with the access key; no domain needed).
// Required env var (Vercel project settings): WEB3FORMS_ACCESS_KEY.

// Best-effort per-instance rate limit: 5 enquiries per 10 minutes per IP.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < 600000)) hits.delete(k);
  return recent.length > 5;
}

const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) return res.status(503).json({ ok: false, error: 'not_configured' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ ok: false, error: 'rate_limited' });

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (b.company || b.contact_ref) return res.status(200).json({ ok: true }); // honeypot: pretend success to bots

  const d = {
    name: clean(b.name, 120), email: clean(b.email, 200), phone: clean(b.phone, 40),
    workspace: clean(b.workspace, 80), team: clean(b.teamSize, 40), message: String(b.message ?? '').trim().slice(0, 1500),
    page: clean(b.page, 300), gclid: clean(b.gclid, 200),
    utm: Object.fromEntries(Object.entries(b.utm || {}).slice(0, 10).map(([k, v]) => [clean(k, 40), clean(v, 200)])),
  };
  const digits = d.phone.replace(/\D/g, '');
  if (d.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) || digits.length < 10 || digits.length > 15 || !d.workspace || !d.team) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }

  const fields = {
    Phone: d.phone, Workspace: d.workspace, 'Team size': d.team, Page: d.page || '—', gclid: d.gclid || '—', ...d.utm,
  };

  try {
    const r = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key, subject: `Website enquiry: ${d.workspace} (${d.name})`, from_name: 'Urban Premium Coworks website',
        name: d.name, email: d.email, message: d.message || 'I would like to know more about your workspaces.', ...fields,
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.success === false) return res.status(502).json({ ok: false, error: 'send_failed' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
