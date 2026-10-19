import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Seo from '../components/Seo.jsx';
import Img from '../components/Img.jsx';
import Button from '../components/Button.jsx';
import Gallery from '../components/Gallery.jsx';
import Faq from '../components/Faq.jsx';
import { CabinSizes, CtaBand, SectionHead, WorkspaceCard } from '../components/Blocks.jsx';
import { ImageFrame, Lines, Reveal, Stagger, StaggerItem, ease } from '../lib/motion.jsx';
import { AMENITIES, FAQS, GALLERY, SITE, STEPS, WHY, WORKSPACES } from '../data/site.js';
import { ROUTES } from '../lib/seo.js';

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero__media">
        <m.div className="hero__img" style={reduce ? undefined : { y }}>
          <m.div className="hero__zoom" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }}>
            <Img name="DSC03410" eager sizes="100vw" defaultWidth={2000} pos="50% 55%" />
          </m.div>
        </m.div>
        <div className="hero__shade" />
      </div>
      <div className="container hero__content">
        <m.p className="eyebrow eyebrow--light" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
          Coworking · Bengaluru
        </m.p>
        <Lines lines={['A workspace designed', 'for deep work.']} className="hero__title" />
        <m.p id="hero-title" className="hero__lede" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6, ease }}>
          Curated coworking for individuals and teams who value design, community and focus. Scale your space monthly, with no long-term leases.
        </m.p>
        <m.div className="hero__actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75, ease }}>
          <Button to="/workspaces" variant="light">Explore Workspaces</Button>
          <Button to="/contact?intent=tour#enquiry" variant="ghost-light">Book a Tour</Button>
        </m.div>
      </div>
      <m.p className="hero__scroll" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>Scroll</m.p>
    </section>
  );
}

export default function Home() {
  const meta = ROUTES['/'];
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" />
      <Hero />

      <section className="section intro" aria-labelledby="intro-title">
        <div className="container intro__grid">
          <div className="intro__text">
            <Reveal><p className="eyebrow">{SITE.tagline}</p></Reveal>
            <Reveal delay={0.05}>
              <h2 id="intro-title" className="h-section h-section--lg">Privacy without isolation. Community without noise.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede">
                Urban Premium Coworks rejects the utilitarian office. Every detail is curated to foster an atmosphere of silent focus and professional elevation, whether you need a single open desk or a lockable cabin for your whole team.
              </p>
            </Reveal>
            <Stagger as="ul" className="intro__points">
              {['Scale up or down monthly', 'Lockable private cabins for 2–10', 'Fast, secure fiber for every user'].map((p) => (
                <StaggerItem as="li" key={p}>{p}</StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1}><Link className="link-arrow" to="/workspaces">See every workspace</Link></Reveal>
          </div>
          <div className="intro__media">
            <ImageFrame className="intro__frame" parallax={6}>
              <Img name="DSC03344" sizes="(min-width: 900px) 46vw, 100vw" />
            </ImageFrame>
            <Reveal className="intro__inset" delay={0.2} y={40}>
              <ImageFrame parallax={0} reveal={false}>
                <Img name="DSC03316" sizes="(min-width: 900px) 18vw, 40vw" pos="50% 40%" />
              </ImageFrame>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tint" id="workspaces" aria-labelledby="ws-title">
        <div className="container">
          <div className="split-head">
            <SectionHead eyebrow="Workspaces" title={<span id="ws-title">Find the space that fits how you work</span>} />
            <Reveal className="split-head__aside" delay={0.1}>
              <p className="lede">From a single seat in a shared zone to an enclosed cabin for ten, move between spaces as your needs change.</p>
            </Reveal>
          </div>
          <Stagger className="wgrid">
            {WORKSPACES.map((w, i) => <WorkspaceCard key={w.slug} w={w} index={i} />)}
          </Stagger>
          <Stagger className="cabins-wrap">
            <CabinSizes />
          </Stagger>
        </div>
      </section>

      <section className="section amenities" id="amenities" aria-labelledby="am-title">
        <div className="container amenities__grid">
          <div className="amenities__media">
            <ImageFrame parallax={7}>
              <Img name="DSC03379" sizes="(min-width: 900px) 40vw, 100vw" pos="40% 50%" />
            </ImageFrame>
          </div>
          <div>
            <SectionHead eyebrow="Amenities & facilities" title={<span id="am-title">Everything you need to do your best work</span>} />
            <Stagger as="ul" className="amenity-list">
              {AMENITIES.map((a, i) => (
                <StaggerItem as="li" key={a.title}>
                  <span className="amenity-list__n">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3>{a.title}</h3><p>{a.text}</p></div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="why" aria-labelledby="why-title">
        <div className="why__media"><Img name="DSC03395" sizes="100vw" /><div className="why__shade" /></div>
        <div className="container why__inner">
          <SectionHead light eyebrow="Why Urban Premium Coworks" title={<span id="why-title">Flexibility, privacy, productivity, comfort and community</span>} />
          <Stagger className="why__grid">
            {WHY.map((w, i) => (
              <StaggerItem key={w.title} className="why__item">
                <span className="why__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section" id="gallery" aria-labelledby="gal-title">
        <div className="container">
          <SectionHead eyebrow="Workspace gallery" title={<span id="gal-title">A look inside</span>} text="Light, glass and greenery, with room to focus. Select any photo to view it larger." />
          <Gallery items={GALLERY} />
        </div>
      </section>

      <section className="section section--tint" id="how-it-works" aria-labelledby="how-title">
        <div className="container">
          <SectionHead eyebrow="How it works" title={<span id="how-title">From first enquiry to your first day</span>} />
          <Stagger as="ol" className="steps">
            {STEPS.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="step">
                <span className="step__n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="steps__cta"><Button to="/contact?intent=tour#enquiry">Start with a tour</Button></Reveal>
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-title">
        <div className="container faq-wrap">
          <SectionHead eyebrow="FAQs" title={<span id="faq-title">Good questions, straight answers</span>} text="Can’t find what you’re looking for? Call or email and we’ll help." />
          <Reveal><Faq items={FAQS} /></Reveal>
        </div>
      </section>

      <section className="section section--tint" id="visit" aria-labelledby="visit-title">
        <div className="container visit">
          <div className="visit__text">
            <SectionHead eyebrow="Contact & location" title={<span id="visit-title">Visit us in Bengaluru</span>} />
            <Reveal className="visit__details">
              <address>
                {SITE.address.lines.map((l) => <span key={l}>{l}<br /></span>)}
              </address>
              <p>
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a><br />
                <a href={SITE.emailHref}>{SITE.email}</a>
              </p>
              <div className="visit__actions">
                <Button href={SITE.directionsHref} target="_blank" rel="noopener noreferrer">Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span></Button>
                <Button to="/contact#enquiry" variant="outline">Send an enquiry</Button>
              </div>
            </Reveal>
          </div>
          <div className="visit__media">
            <ImageFrame parallax={5}><Img name="DSC03312" sizes="(min-width: 900px) 46vw, 100vw" pos="50% 40%" /></ImageFrame>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
