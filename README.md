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
There is no backend in this repo, so the form never claims a message was sent unless a real endpoint accepted it.

- **With an endpoint:** set `VITE_FORM_ENDPOINT` (see `.env.example`) to any service that accepts a JSON POST
  (e.g. Formspree `https://formspree.io/f/xxxx`). Payload: `name, email, phone, workspace, teamSize, message`.
  On Vercel add it under Project → Settings → Environment Variables, then redeploy.
- **Without one (default):** the form validates, then shows a "one last step" panel with a prefilled
  `mailto:admin@urbanpremiumcoworks.com` button and a `tel:+919886622272` button.

Deep links preselect the workspace: `/contact?space=<id>` where `<id>` is `open-desk`, `dedicated-desk`, `private-cabin`,
`duo-cabin`, `startup-studio`, `growth-pod`, `enterprise-hub` or `meeting-space` (the original site's `?space=desk` / `?space=office` also work).
`/contact?intent=tour` opens the form as "Book a tour".

## Content notes
Facts come from urbanpremiumcoworks.com. It lists no prices, hours, testimonials or event-space details, so none are shown.
No logo file was supplied; the header uses a typographic wordmark and `public/favicon.svg` is a simple monogram. Swap in the real logo when available.
The canonical domain is assumed to be `https://urbanpremiumcoworks.com` (change `SITE.url` in `src/data/site.js` if different).
