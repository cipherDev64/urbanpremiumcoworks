import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import { ease } from '../lib/motion.jsx';
import { SITE } from '../data/site.js';
import Button from './Button.jsx';

const NAV = [
  { to: '/workspaces', label: 'Workspaces' },
  { to: '/#amenities', label: 'Amenities' },
  { to: '/#gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export function Wordmark({ light = false }) {
  return (
    <span className={`wordmark ${light ? 'wordmark--light' : ''}`}>
      <span className="wordmark__main">Urban Premium</span>
      <span className="wordmark__sub">Coworks</span>
    </span>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const overHero = pathname !== '/contact' && (pathname === '/' || pathname.startsWith('/workspaces'));

  // Only flips state when crossing the threshold, so scrolling does not re-render.
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));
  useEffect(() => setScrolled(window.scrollY > 24), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const f = [toggleRef.current, ...panelRef.current.querySelectorAll('a')];
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || !overHero || open;
  return (
    <header className={`header ${solid ? 'header--solid' : 'header--overlay'} ${open ? 'header--open' : ''}`}>
      <div className="container header__bar">
        <Link to="/" className="header__logo" aria-label="Urban Premium Coworks, home">
          <Wordmark light={open || (!solid)} />
        </Link>
        <nav className="header__nav" aria-label="Main">
          {NAV.map((n) =>
            n.to.includes('#') ? (
              <Link key={n.to} to={n.to} className="nav-link">{n.label}</Link>
            ) : (
              <NavLink key={n.to} to={n.to} className="nav-link">{n.label}</NavLink>
            ),
          )}
          <Button to="/contact?intent=tour#enquiry" variant={solid ? 'primary' : 'light'} className="btn--sm" icon={false}>Book a Tour</Button>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`menu-toggle__bars ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={panelRef}
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease }}
          >
            <nav className="mobile-menu__nav" aria-label="Mobile">
              {[{ to: '/', label: 'Home' }, ...NAV].map((n, i) => (
                <m.div key={n.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.12 + i * 0.06, ease }}>
                  <Link to={n.to} className="mobile-menu__link" onClick={() => setOpen(false)}>{n.label}</Link>
                </m.div>
              ))}
            </nav>
            <m.div className="mobile-menu__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.45 }}>
              <Button to="/contact?intent=tour#enquiry" variant="light">Book a Tour</Button>
              <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              <a href={SITE.emailHref}>{SITE.email}</a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
