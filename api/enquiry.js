// Vercel serverless function: emails a website enquiry to the team via Resend.
// Required env vars (Vercel project settings): RESEND_API_KEY, ENQUIRY_FROM (a sender on a
// domain verified in Resend, e.g. "Urban Premium Coworks <enquiries@yourdomain>").
// Optional: ENQUIRY_TO (defaults to urbanpremiumcoworks@gmail.com).

const TO = process.env.ENQUIRY_TO || 'urbanpremiumcoworks@gmail.com';

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
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  if (!key || !from) return res.status(503).json({ ok: false, error: 'not_configured' });

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

  const rows = [
    ['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Workspace', d.workspace], ['Team size', d.team],
    ['Message', d.message || '—'], ['Page', d.page || '—'], ['gclid', d.gclid || '—'],
    ...Object.entries(d.utm).map(([k, v]) => [k, v]),
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [TO], reply_to: d.email, subject: `Website enquiry: ${d.workspace} (${d.name})`, text, html }),
    });
    if (!r.ok) return res.status(502).json({ ok: false, error: 'send_failed' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
