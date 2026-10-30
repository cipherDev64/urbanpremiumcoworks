import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Img from '../components/Img.jsx';
import Button from '../components/Button.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { ImageFrame, Reveal } from '../lib/motion.jsx';
import { SITE } from '../data/site.js';
import { ROUTES } from '../lib/seo.js';

export default function Contact() {
  const meta = ROUTES['/contact'];
  const [params] = useSearchParams();
  // The page is prerendered without a query string, so only read it after mount to keep
  // the first client render identical to the server HTML (avoids hydration mismatches).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const space = mounted ? params.get('space') ?? '' : '';
  const tour = mounted && params.get('intent') === 'tour';
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/contact" />
      <section className="contact-hero">
        <div className="container">
          <Reveal><p className="eyebrow">Contact</p></Reveal>
          <Reveal delay={0.05}><h1 className="h-display">Let’s start the conversation.</h1></Reveal>
          <Reveal delay={0.1}><p className="lede">Book a private tour or ask about a workspace. Send an enquiry below, or reach the team directly.</p></Reveal>
        </div>
      </section>

      <section className="section contact" aria-label="Enquiry and contact details">
        <div className="container contact__grid">
          <div className="contact__form" id="enquiry">
            <h2 className="h-section h-section--sm">{tour ? 'Book a tour' : 'Send an enquiry'}</h2>
            <EnquiryForm
              key={`${space}-${tour}`}
              initialSpace={space}
              initialMessage={tour ? 'I’d like to book a tour of the workspace.' : ''}
            />
          </div>
          <aside className="contact__side" aria-label="Contact details">
            <Reveal>
              <h2 className="list-h">Call or email</h2>
              <p className="contact__big"><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></p>
              <p className="contact__big contact__big--sm"><a href={SITE.emailHref}>{SITE.email}</a></p>
              <p className="contact__wa"><Button href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" variant="outline" icon={false}>Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span></Button></p>
              <h2 className="list-h">Visit</h2>
              <address>{SITE.address.lines.map((l) => <span key={l}>{l}<br /></span>)}</address>
              <Button href={SITE.directionsHref} target="_blank" rel="noopener noreferrer" variant="outline">Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span></Button>
            </Reveal>
            <div className="contact__map">
              <iframe title="Map showing the Urban Premium Coworks location" src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <ImageFrame className="contact__photo" parallax={4}><Img name="DSC03312" sizes="(min-width: 900px) 30vw, 100vw" pos="40% 50%" /></ImageFrame>
          </aside>
        </div>
      </section>
    </>
  );
}
