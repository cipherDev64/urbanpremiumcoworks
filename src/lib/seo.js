// Shared by the client (document head updates) and scripts/prerender.mjs (static head per route).
import { SITE, WORKSPACES } from '../data/site.js';

export const OG_IMAGE = `${SITE.url}/og-image.jpg`;

export const ROUTES = {
  '/': {
    title: 'Urban Premium Coworks | Premium Coworking Space in Bengaluru',
    description: 'Curated coworking in Bengaluru for individuals and teams who value design, community and focus. Open desks, dedicated desks, private cabins and meeting suites, with monthly flexibility.',
    preload: 'DSC03410',
  },
  '/workspaces': {
    title: 'Workspaces | Open Desks, Dedicated Desks, Private Cabins | Urban Premium Coworks',
    description: 'Explore Open Desks, Dedicated Desks, Private Cabins (Duo Cabin, Startup Studio, Growth Pod, Enterprise Hub) and Urban Premium Boards meeting suites in Bengaluru.',
    preload: 'DSC03406',
  },
  '/contact': {
    title: 'Contact & Book a Tour | Urban Premium Coworks, Bengaluru',
    description: 'Book a tour or enquire about a workspace at Urban Premium Coworks. Call +91 98866 62272, email urbanpremiumcoworks@gmail.com or visit us in Bengaluru 560079.',
  },
};
for (const w of WORKSPACES) {
  ROUTES[`/workspaces/${w.slug}`] = {
    title: `${w.name} in Bengaluru | Urban Premium Coworks`,
    description: w.seoDescription,
    preload: w.hero,
  };
}

export const NOT_FOUND = {
  title: 'Page not found | Urban Premium Coworks',
  description: 'The page you are looking for could not be found.',
};

export const THANK_YOU = {
  title: 'Thank you | Urban Premium Coworks',
  description: 'Your enquiry has been sent to Urban Premium Coworks.',
};

export function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    url: SITE.url,
    image: OG_IMAGE,
    description: ROUTES['/'].description,
    email: SITE.email,
    telephone: '+919886622272',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.directionsHref,
  };
}
