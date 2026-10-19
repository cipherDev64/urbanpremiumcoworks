import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import Img from './Img.jsx';
import { ImageFrame, Lines, Reveal, StaggerItem, m, ease } from '../lib/motion.jsx';
import { CABINS, SITE } from '../data/site.js';

export function PageHero({ image, imagePos, kicker, title, lede, children, crumbs }) {
  return (
    <section className="hero hero--page">
      <div className="hero__media">
        <m.div className="hero__img" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2, ease }}>
          <Img name={image} eager sizes="100vw" pos={imagePos} defaultWidth={2000} />
        </m.div>
        <div className="hero__shade" />
      </div>
      <div className="container hero__content">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}{i < crumbs.length - 1 && <i aria-hidden="true">/</i>}</span>
            ))}
          </nav>
        )}
        <m.p className="eyebrow eyebrow--light" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>{kicker}</m.p>
        <Lines lines={title} className="hero__title hero__title--page" />
        {lede && <m.p className="hero__lede" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease }}>{lede}</m.p>}
        {children && <m.div className="hero__actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}>{children}</m.div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, center, light }) {
  return (
    <Reveal className={`section-head ${center ? 'section-head--center' : ''} ${light ? 'section-head--light' : ''}`}>
      <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{eyebrow}</p>
      <h2 className="h-section">{title}</h2>
      {text && <p className="lede">{text}</p>}
    </Reveal>
  );
}

export function WorkspaceCard({ w, index = 0 }) {
  return (
    <StaggerItem as="article" className="wcard">
      <Link to={`/workspaces/${w.slug}`} className="wcard__media" aria-label={`${w.name}: view details`}>
        <Img name={w.image} pos={w.imagePos} sizes="(min-width: 900px) 46vw, 100vw" />
      </Link>
      <div className="wcard__body">
        <p className="wcard__kicker"><span>{String(index + 1).padStart(2, '0')}</span>{w.kicker}</p>
        <h3 className="wcard__title"><Link to={`/workspaces/${w.slug}`}>{w.name}</Link></h3>
        <p className="wcard__alias">{w.alias}</p>
        <p>{w.summary}</p>
        <div className="wcard__links">
          <Link className="link-arrow" to={`/workspaces/${w.slug}`}>View details</Link>
          <Link className="link-arrow link-arrow--muted" to={`/contact?space=${w.spaceId}#enquiry`}>Enquire</Link>
        </div>
      </div>
    </StaggerItem>
  );
}

export function CabinSizes({ heading = true }) {
  return (
    <div className="cabins">
      {heading && <h3 className="cabins__h">Private cabin sizes</h3>}
      <div className="cabins__grid">
        {CABINS.map((c) => (
          <StaggerItem as="article" className="cabin" key={c.id}>
            <p className="cabin__seats"><span>{c.seats}</span> seats</p>
            <h4>{c.name}</h4>
            <p>{c.text}</p>
            <Link className="link-arrow" to={`/contact?space=${c.id}#enquiry`}>Enquire<span className="sr-only"> about the {c.name}</span></Link>
          </StaggerItem>
        ))}
      </div>
    </div>
  );
}

export function CtaBand({ image = 'DSC03406', title = 'Ready to find your space?', text = 'Connect with our team to book a private tour of our curated workspace solutions.' }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__media">
        <ImageFrame parallax={6} reveal={false}><Img name={image} sizes="100vw" /></ImageFrame>
        <div className="cta__shade" />
      </div>
      <div className="container cta__content">
        <Reveal>
          <h2 id="cta-title" className="h-section h-section--light">{title}</h2>
          <p className="lede lede--light">{text}</p>
          <div className="cta__actions">
            <Button to="/contact?intent=tour#enquiry" variant="light">Book a Tour</Button>
            <Button href={SITE.phoneHref} variant="ghost-light" icon={false}>Call {SITE.phoneDisplay}</Button>
            <Button href={SITE.emailHref} variant="ghost-light" icon={false}>Email us</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
