# Urban Premium Coworks website

Vite + React + React Router + [Motion](https://motion.dev). Every route is statically prerendered at build time
(real HTML, per-page `<title>`, meta, canonical, Open Graph, JSON-LD) and hydrated on the client. Deploys to Vercel as-is.

## Scripts
| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (client-rendered) |
| `npm run build` | Client build → SSR bundle → prerender all routes, `404.html`, `sitemap.xml` into `dist/` |
| `npm run preview` | Preview `dist/` (note: Vite's preview falls back to the homepage for deep links; Vercel serves the prerendered files) |
| `npm run images` | Regenerate responsive WebP renditions in `public/images/` from `assets/EDITED PHOTOS/` (originals are never modified) |

## Structure
- `src/data/site.js` — **single source of truth** for business details, workspaces, amenities, FAQs, gallery. Edit copy here.
- `src/lib/seo.js` — page titles/descriptions and JSON-LD (shared by the client and the prerender script).
- `src/lib/motion.jsx` — Motion primitives (`Reveal`, `Stagger`, `Lines`, `ImageFrame`). Uses `LazyMotion` and respects `prefers-reduced-motion`.
- `src/pages/` — Home, Workspaces, WorkspaceDetail (Open Desks, Dedicated Desks, Private Cabins, Meeting Rooms), Contact, NotFound.
- `scripts/prerender.mjs` — static HTML generation. `vercel.json` — clean URLs + cache headers.

## Enquiry form
The form posts straight from the browser to [Web3Forms](https://web3forms.com) (free; no domain needed), which emails the inbox the access key is registered to. (Web3Forms blocks server-side calls on the free plan, so there is no API function.)
It shows success, and fires the Google Ads Contact conversion, only after Web3Forms returns success. On failure it shows an error with the phone number, WhatsApp and a prefilled `mailto:` link.

Setup: get a free access key at web3forms.com, set `VITE_WEB3FORMS_ACCESS_KEY` in Vercel → Project → Settings → Environment Variables (Production) and redeploy. The key is public by design; it is baked into the client bundle at build time.
To use another service (Formspree etc.) set `VITE_FORM_ENDPOINT` instead.

Conversion tracking: `/thank-you` fires `AW-18528203345/ewElCPH66acdENHk94JF` once per submission (with a `transaction_id`), only when reached from the form. Phone, WhatsApp and email links do not fire it.

Deep links preselect the workspace: `/contact?space=<id>` where `<id>` is `open-desk`, `dedicated-desk`, `private-cabin`,
`duo-cabin`, `startup-studio`, `growth-pod`, `enterprise-hub` or `meeting-space` (the original site's `?space=desk` / `?space=office` also work).
`/contact?intent=tour` opens the form as "Book a tour".

## Content notes
Facts come from urbanpremiumcoworks.com. It lists no prices, hours, testimonials or event-space details, so none are shown.
No logo file was supplied; the header uses a typographic wordmark and `public/favicon.svg` is a simple monogram. Swap in the real logo when available.
The canonical domain is `https://www.urbanpremiumcoworks.in` (change `SITE.url` in `src/data/site.js` if different).
