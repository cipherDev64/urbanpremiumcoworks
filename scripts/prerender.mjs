// Static prerender: renders every route to HTML (SSR bundle from `vite build --ssr`),
// injects per-route <head> tags and writes dist/<route>/index.html, 404.html and sitemap.xml.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import manifest from '../src/data/imageManifest.json' with { type: 'json' };
import { NOT_FOUND, OG_IMAGE, ROUTES, jsonLd } from '../src/lib/seo.js';
import { SITE } from '../src/data/site.js';

const DIST = 'dist';
const { render } = await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function head({ title, description, route, preload, noindex }) {
  const url = `${SITE.url}${route === '/' ? '' : route}`;
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : '',
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<link rel="apple-touch-icon" href="/favicon.svg" />`,
  ];
  if (preload && manifest[preload]) {
    const m = manifest[preload];
    const srcset = m.widths.map((w) => `/images/${preload}-${w}.webp ${w}w`).join(', ');
    tags.push(`<link rel="preload" as="image" imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high" />`);
  }
  if (!noindex) tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd())}</script>`);
  return tags.filter(Boolean).join('\n    ');
}

function page(route, meta, renderUrl = route, extra = {}) {
  return template
    .replace('<!--head-tags-->', head({ ...meta, route, ...extra }))
    .replace('<!--app-html-->', render(renderUrl));
}

for (const [route, meta] of Object.entries(ROUTES)) {
  const out = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(route, meta));
}
fs.writeFileSync(path.join(DIST, '404.html'), page('/404', NOT_FOUND, '/page-not-found', { noindex: true }));

const urls = Object.keys(ROUTES).map((r) => `  <url><loc>${SITE.url}${r === '/' ? '' : r}</loc></url>`).join('\n');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.rmSync('.ssr', { recursive: true, force: true });
console.log(`Prerendered ${Object.keys(ROUTES).length} routes + 404 + sitemap`);
