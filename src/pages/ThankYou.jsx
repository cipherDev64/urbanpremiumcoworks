import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Button from '../components/Button.jsx';
import { THANK_YOU } from '../lib/seo.js';
import { trackContactConversion } from '../lib/analytics.js';

// Conversion page for the Google Ads "Contact" action: reached after a successful enquiry.
export default function ThankYou() {
  // Only a form submission passes an enquiryId; direct visits and refreshes never count.
  const id = useLocation().state?.enquiryId;
  useEffect(() => { trackContactConversion(id); }, [id]);
  return (
    <>
      <Seo title={THANK_YOU.title} description={THANK_YOU.description} path="/thank-you" noindex />
      <section className="contact-hero">
        <div className="container">
          <p className="eyebrow">Enquiry sent</p>
          <h1 className="h-display">Thank you.</h1>
          <p className="lede">Your enquiry has been sent. The Urban Premium Coworks team will get back to you shortly.</p>
          <div className="hero__actions hero__actions--dark">
            <Button to="/">Back to home</Button>
            <Button to="/workspaces" variant="outline">Explore Workspaces</Button>
          </div>
        </div>
      </section>
    </>
  );
}
