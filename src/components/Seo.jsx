import { useEffect } from 'react';
import { OG_IMAGE } from '../lib/seo.js';
import { SITE } from '../data/site.js';

function setMeta(selector, attr, value, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create.tag);
    Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// Keeps the head in sync during client-side navigation. The initial head per route is
// written statically at build time by scripts/prerender.mjs.
export default function Seo({ title, description, path, noindex }) {
  useEffect(() => {
    const url = `${SITE.url}${path === '/' ? '' : path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', description, { tag: 'meta', attrs: { name: 'description' } });
    setMeta('link[rel="canonical"]', 'href', url, { tag: 'link', attrs: { rel: 'canonical' } });
    setMeta('meta[property="og:title"]', 'content', title, { tag: 'meta', attrs: { property: 'og:title' } });
    setMeta('meta[property="og:description"]', 'content', description, { tag: 'meta', attrs: { property: 'og:description' } });
    setMeta('meta[property="og:url"]', 'content', url, { tag: 'meta', attrs: { property: 'og:url' } });
    setMeta('meta[property="og:image"]', 'content', OG_IMAGE, { tag: 'meta', attrs: { property: 'og:image' } });
    setMeta('meta[name="twitter:title"]', 'content', title, { tag: 'meta', attrs: { name: 'twitter:title' } });
    setMeta('meta[name="twitter:description"]', 'content', description, { tag: 'meta', attrs: { name: 'twitter:description' } });
    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setMeta('meta[name="robots"]', 'content', 'noindex', { tag: 'meta', attrs: { name: 'robots' } });
    else if (robots) robots.remove();
  }, [title, description, path, noindex]);
  return null;
}
