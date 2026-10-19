import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Img from '../components/Img.jsx';
import Button from '../components/Button.jsx';
import { CabinSizes, CtaBand, PageHero, SectionHead } from '../components/Blocks.jsx';
import { ImageFrame, Reveal, Stagger } from '../lib/motion.jsx';
import { AMENITIES, WORKSPACES } from '../data/site.js';
import { ROUTES } from '../lib/seo.js';

export default function Workspaces() {
  const meta = ROUTES['/workspaces'];
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/workspaces" />
      <PageHero
        image="DSC03406"
        imagePos="50% 60%"
        kicker="Workspace solutions"
        title={['Space for deep work', 'and meaningful connection.']}
        lede="Open desks, dedicated desks, private cabins and meeting suites. Pick what fits today and change it as you grow."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Workspaces' }]}
      >
        <Button to="/contact?intent=tour#enquiry" variant="light">Book a Tour</Button>
      </PageHero>

      <section className="section" aria-label="Workspace options">
        <div className="container features">
          {WORKSPACES.map((w, i) => (
            <article className={`feature ${i % 2 ? 'feature--flip' : ''}`} key={w.slug} id={w.slug}>
              <div className="feature__media">
                <ImageFrame parallax={6}><Img name={w.image} pos={w.imagePos} sizes="(min-width: 900px) 50vw, 100vw" /></ImageFrame>
              </div>
              <div className="feature__text">
                <Reveal><p className="eyebrow">{String(i + 1).padStart(2, '0')} · {w.kicker}</p></Reveal>
                <Reveal delay={0.05}><h2 className="h-section"><Link to={`/workspaces/${w.slug}`}>{w.name}</Link></h2></Reveal>
                <Reveal delay={0.08}><p className="feature__alias">{w.alias}</p></Reveal>
                <Reveal delay={0.1}><p className="lede">{w.intro}</p></Reveal>
                <Reveal as="ul" className="ticks" delay={0.12}>
                  {w.includes.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
                </Reveal>
                <Reveal delay={0.14} className="feature__actions">
                  <Button to={`/workspaces/${w.slug}`}>View {w.name}</Button>
                  <Link className="link-arrow" to={`/contact?space=${w.spaceId}#enquiry`}>Enquire</Link>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="cab-title">
        <div className="container">
          <SectionHead eyebrow="Team Sanctuaries" title={<span id="cab-title">Private cabins for 2 to 10 members</span>} text="Enclosed, lockable cabins with ergonomic furniture included. Branding options are available." />
          <Stagger><CabinSizes heading={false} /></Stagger>
        </div>
      </section>

      <section className="section" aria-labelledby="inc-title">
        <div className="container">
          <SectionHead eyebrow="Across every workspace" title={<span id="inc-title">What you can expect</span>} />
          <Stagger as="ul" className="mini-grid">
            {AMENITIES.map((a) => (
              <Reveal as="li" key={a.title}><h3>{a.title}</h3><p>{a.text}</p></Reveal>
            ))}
          </Stagger>
        </div>
      </section>
      <CtaBand image="DSC03373" />
    </>
  );
}
