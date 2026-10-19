import { Link } from 'react-router-dom';
import { SITE, WORKSPACES } from '../data/site.js';
import { Wordmark } from './Header.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Wordmark light />
          <p>{SITE.tagline}. Curated coworking for individuals and teams who value design, community and focus.</p>
        </div>
        <nav aria-label="Workspaces">
          <h2 className="footer__h">Workspaces</h2>
          <ul>
            {WORKSPACES.map((w) => (
              <li key={w.slug}><Link to={`/workspaces/${w.slug}`}>{w.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Explore">
          <h2 className="footer__h">Explore</h2>
          <ul>
            <li><Link to="/workspaces">All workspaces</Link></li>
            <li><Link to="/#amenities">Amenities</Link></li>
            <li><Link to="/#gallery">Gallery</Link></li>
            <li><Link to="/#faq">FAQs</Link></li>
            <li><Link to="/contact?intent=tour#enquiry">Book a tour</Link></li>
          </ul>
        </nav>
        <address className="footer__contact">
          <h2 className="footer__h">Visit &amp; contact</h2>
          <p>{SITE.address.lines.map((l) => (<span key={l}>{l}<br /></span>))}</p>
          <p>
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a><br />
            <a href={SITE.emailHref}>{SITE.email}</a>
          </p>
          <a className="footer__directions" href={SITE.directionsHref} target="_blank" rel="noopener noreferrer">Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span> ↗</a>
        </address>
      </div>
      <div className="container footer__legal">
        <p>© {new Date().getFullYear()} Urban Premium Coworks. All rights reserved.</p>
      </div>
    </footer>
  );
}
