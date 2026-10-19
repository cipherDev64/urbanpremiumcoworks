import { Link, Navigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import Img from '../components/Img.jsx';
import Button from '../components/Button.jsx';
import { CabinSizes, CtaBand, PageHero, SectionHead, WorkspaceCard } from '../components/Blocks.jsx';
import { ImageFrame, Reveal, Stagger, StaggerItem } from '../lib/motion.jsx';
import { WORKSPACES } from '../data/site.js';
import { ROUTES } from '../lib/seo.js';

export default function WorkspaceDetail({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const w = WORKSPACES.find((x) => x.slug === slug);
  if (!w) return <Navigate to="/workspaces" replace />;
  const meta = ROUTES[`/workspaces/${w.slug}`];
  const others = WORKSPACES.filter((x) => x.slug !== w.slug);
  const isCabins = w.slug === 'private-cabins';

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={`/workspaces/${w.slug}`} />
      <PageHero
        image={w.hero}
        imagePos="50% 60%"
        kicker={`${w.alias} · ${w.seats}`}
        title={[w.name]}
        lede={w.tagline}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Workspaces', to: '/workspaces' }, { label: w.name }]}
      >
        <Button to={`/contact?space=${w.spaceId}#enquiry`} variant="light">{w.cta}</Button>
        <Button to="/contact?intent=tour#enquiry" variant="ghost-light">Book a Tour</Button>
      </PageHero>

      <section className="section" aria-labelledby="ov-title">
        <div className="container detail">
          <div className="detail__text">
            <Reveal><p className="eyebrow">Overview</p></Reveal>
            <Reveal delay={0.05}><h2 id="ov-title" className="h-section">{w.summary}</h2></Reveal>
            <Reveal delay={0.1}><p className="lede">{w.intro}</p></Reveal>
            <div className="detail__lists">
              <Reveal delay={0.1}>
                <h3 className="list-h">What’s included</h3>
                <ul className="ticks">{w.includes.map((t) => <li key={t}>{t}</li>)}</ul>
              </Reveal>
              <Reveal delay={0.15}>
                <h3 className="list-h">Well suited to</h3>
                <ul className="ticks ticks--plain">{w.suits.map((t) => <li key={t}>{t}</li>)}</ul>
              </Reveal>
            </div>
          </div>
          <div className="detail__media">
            <ImageFrame parallax={6}><Img name={w.image} pos={w.imagePos} sizes="(min-width: 900px) 46vw, 100vw" /></ImageFrame>
          </div>
        </div>
      </section>

      {isCabins && (
        <section className="section section--tint" aria-labelledby="sizes-title">
          <div className="container">
            <SectionHead eyebrow="Cabin sizes" title={<span id="sizes-title">Choose the cabin that fits your team</span>} text="Every cabin is enclosed and lockable, with ergonomic furniture included." />
            <Stagger><CabinSizes heading={false} /></Stagger>
          </div>
        </section>
      )}

      <section className="section" aria-label={`${w.name} photos`}>
        <div className="container">
          <Stagger className="strip">
            {w.gallery.map((g) => (
              <StaggerItem className="strip__item" key={g}>
                <Img name={g} sizes="(min-width: 900px) 25vw, 50vw" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="more-title">
        <div className="container">
          <SectionHead eyebrow="More workspaces" title={<span id="more-title">Explore other ways to work</span>} />
          <Stagger className="wgrid wgrid--three">
            {others.map((o, i) => <WorkspaceCard key={o.slug} w={o} index={WORKSPACES.indexOf(o)} />)}
          </Stagger>
          <Reveal className="steps__cta"><Link className="link-arrow" to="/workspaces">View all workspaces</Link></Reveal>
        </div>
      </section>
      <CtaBand image={w.gallery[0]} title={`Interested in ${w.name}?`} text="Tell us about your team and we’ll help you find the right fit, or book a private tour to see the space." />
    </>
  );
}
