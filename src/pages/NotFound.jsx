import Seo from '../components/Seo.jsx';
import Button from '../components/Button.jsx';
import { NOT_FOUND } from '../lib/seo.js';

export default function NotFound() {
  return (
    <>
      <Seo title={NOT_FOUND.title} description={NOT_FOUND.description} path="/404" noindex />
      <section className="contact-hero">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1 className="h-display">We can’t find that page.</h1>
          <p className="lede">It may have moved. Head back home or explore our workspaces.</p>
          <div className="hero__actions hero__actions--dark">
            <Button to="/">Back to home</Button>
            <Button to="/workspaces" variant="outline">Explore Workspaces</Button>
          </div>
        </div>
      </section>
    </>
  );
}
