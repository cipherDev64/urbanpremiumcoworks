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
The form POSTs JSON to `/api/enquiry` ([api/enquiry.js](api/enquiry.js), a Vercel function) which emails the team through Resend.
It shows success, and fires the Google Ads Contact conversion, only after the server returns 2xx. On failure it shows an error with the phone number and a prefilled `mailto:` link.

Set these in Vercel → Project → Settings → Environment Variables, then redeploy:
- `RESEND_API_KEY` — Resend API key.
- `ENQUIRY_FROM` — sender on a domain verified in Resend, e.g. `Urban Premium Coworks <enquiries@yourdomain>`.
- `ENQUIRY_TO` — optional, defaults to `urbanpremiumcoworks@gmail.com`.

Without them the endpoint returns 503 and visitors see the error state; nothing is reported as sent.
To use another service (Formspree, Web3Forms) set `VITE_FORM_ENDPOINT` instead. Payload: `name, email, phone, workspace, teamSize, message, page, gclid, utm`.

Conversion tracking: `/thank-you` fires `AW-18528203345/ewElCPH66acdENHk94JF` once per submission (with a `transaction_id`), only when reached from the form. Phone and email links do not fire it.

Deep links preselect the workspace: `/contact?space=<id>` where `<id>` is `open-desk`, `dedicated-desk`, `private-cabin`,
`duo-cabin`, `startup-studio`, `growth-pod`, `enterprise-hub` or `meeting-space` (the original site's `?space=desk` / `?space=office` also work).
`/contact?intent=tour` opens the form as "Book a tour".

## Content notes
Facts come from urbanpremiumcoworks.com. It lists no prices, hours, testimonials or event-space details, so none are shown.
No logo file was supplied; the header uses a typographic wordmark and `public/favicon.svg` is a simple monogram. Swap in the real logo when available.
The canonical domain is assumed to be `https://urbanpremiumcoworks.com` (change `SITE.url` in `src/data/site.js` if different).
