import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { SITE, SPACE_ALIASES, SPACE_OPTIONS, TEAM_SIZES } from '../data/site.js';
import { ease } from '../lib/motion.jsx';

// Integration point: set VITE_FORM_ENDPOINT to any service that accepts a JSON POST
// (e.g. Formspree). Without it the form validates and hands the enquiry to the visitor's
// email app instead of pretending it was sent. See README.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export function resolveSpace(value) {
  if (!value) return '';
  const id = SPACE_ALIASES[value] ?? value;
  return SPACE_OPTIONS.some((o) => o.id === id) ? id : '';
}

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  const digits = v.phone.replace(/\D/g, '');
  if (!/^[+\d][\d\s()-]*$/.test(v.phone.trim()) || digits.length < 10 || digits.length > 15) e.phone = 'Please enter a valid phone number, including area or country code.';
  if (!v.space) e.space = 'Please choose a workspace type.';
  if (!v.team) e.team = 'Please choose your team size.';
  if (v.message.length > 1500) e.message = 'Please keep your message under 1,500 characters.';
  return e;
}

function composeEmail(v) {
  const label = SPACE_OPTIONS.find((o) => o.id === v.space)?.label ?? v.space;
  const body = [
    'Hello Urban Premium Coworks,', '',
    v.message.trim() || 'I would like to know more about your workspaces.', '',
    `Workspace: ${label}`, `Team size: ${v.team}`, `Name: ${v.name.trim()}`, `Phone: ${v.phone.trim()}`, `Email: ${v.email.trim()}`,
  ].join('\n');
  return `mailto:${SITE.email}?subject=${encodeURIComponent(`Workspace enquiry: ${label}`)}&body=${encodeURIComponent(body)}`;
}

function Field({ id, label, error, children, hint }) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

export default function EnquiryForm({ initialSpace = '', initialMessage = '' }) {
  const space = resolveSpace(initialSpace);
  const [v, setV] = useState({
    name: '', email: '', phone: '',
    space,
    team: SPACE_OPTIONS.find((o) => o.id === space)?.team ?? '',
    message: initialMessage,
    company: '', // honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | handoff
  const formRef = useRef(null);

  const set = (k) => (e) => {
    const value = e.target.value;
    setV((p) => {
      const next = { ...p, [k]: value };
      if (k === 'space' && !p.team) next.team = SPACE_OPTIONS.find((o) => o.id === value)?.team ?? '';
      return next;
    });
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    if (v.company) return; // bots only
    const errs = validate(v);
    setErrors(errs);
    const firstKey = Object.keys(errs)[0];
    if (firstKey) {
      formRef.current?.querySelector(`[name="${firstKey}"]`)?.focus();
      return;
    }
    if (!ENDPOINT) {
      setStatus('handoff');
      return;
    }
    setStatus('sending');
    try {
      const label = SPACE_OPTIONS.find((o) => o.id === v.space)?.label ?? v.space;
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: v.name.trim(), email: v.email.trim(), phone: v.phone.trim(), workspace: label, teamSize: v.team, message: v.message.trim() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const aria = (k, hint) => ({ 'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `${k}-error` : hint ? `${k}-hint` : undefined });

  if (status === 'sent') {
    return (
      <div className="form-state form-state--ok" role="status">
        <h3>Thank you, {v.name.trim().split(' ')[0]}.</h3>
        <p>Your enquiry has been sent. The Urban Premium Coworks team will get back to you at {v.email.trim()}.</p>
      </div>
    );
  }
  if (status === 'handoff') {
    return (
      <div className="form-state" role="status">
        <h3>One last step to send your enquiry</h3>
        <p>Your details are ready but have not been sent yet. Open your email app to send them to our team, or call us directly.</p>
        <div className="form-state__actions">
          <a className="btn btn--primary" href={composeEmail(v)}><span>Send by email</span></a>
          <a className="btn btn--outline" href={SITE.phoneHref}><span>Call {SITE.phoneDisplay}</span></a>
        </div>
        <button type="button" className="text-btn" onClick={() => setStatus('idle')}>← Edit my details</button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-label="Workspace enquiry">
      <div className="form__row">
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" value={v.name} onChange={set('name')} {...aria('name')} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" value={v.email} onChange={set('email')} {...aria('email')} />
        </Field>
      </div>
      <div className="form__row">
        <Field id="phone" label="Phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={v.phone} onChange={set('phone')} {...aria('phone')} />
        </Field>
        <Field id="team" label="Team size" error={errors.team}>
          <select id="team" name="team" value={v.team} onChange={set('team')} {...aria('team')}>
            <option value="" disabled>Select team size</option>
            {TEAM_SIZES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <Field id="space" label="Workspace type" error={errors.space}>
        <select id="space" name="space" value={v.space} onChange={set('space')} {...aria('space')}>
          <option value="" disabled>Select a workspace</option>
          {SPACE_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
      </Field>
      <Field id="message" label="Message (optional)" error={errors.message}>
        <textarea id="message" name="message" rows="5" value={v.message} onChange={set('message')} {...aria('message')} />
      </Field>
      <div className="form__trap" aria-hidden="true">
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" value={v.company} onChange={set('company')} /></label>
      </div>
      <AnimatePresence>
        {status === 'error' && (
          <m.p className="form__alert" role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
            We couldn’t send your enquiry just now. Please try again, or reach us at <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> or <a href={SITE.emailHref}>{SITE.email}</a>.
          </m.p>
        )}
      </AnimatePresence>
      <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</span>
      </button>
    </form>
  );
}
