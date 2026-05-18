# CLAUDE.md - Greenlight Approvals

## Project
Marketing site for Greenlight Approvals — a NetSuite-native approval workflow product (SuiteScript + SuiteQL). Built with Astro 4, deployed on Netlify. Domain: greenlightapprovals.io

## Commands
- `npm run dev` — start dev server (port 4173)
- `npm run build` — production build to dist/
- `npm run dev:fresh` — clear caches and restart dev
- `npm run ports:free` — kill stale dev/preview ports

## Key files
- `src/pages/index.astro` — main landing page (all sections in one file)
- `src/pages/demo.astro` — stripped-down ad landing page (noindex)
- `src/pages/resources/index.astro` — blog listing
- `src/pages/resources/[slug].astro` — blog post template
- `src/content/blog/*.md` — 11 blog posts (Astro content collection)
- `src/styles/global.css` — all shared styles (~1070 lines)
- `src/content/config.ts` — content collection schemas
- `astro.config.mjs` — site config, sitemap, React integration

## Architecture
- Static output, no SSR
- No layout components — nav/footer/head duplicated across pages (tech debt)
- React/framer-motion/lucide-react in package.json but unused (tech debt)
- HubSpot form: portal 147146964, EU region, lazy-loaded via IntersectionObserver
- Meeting scheduler: HubSpot meetings-eu1 link (Patrick Olson)
- Analytics: Google (G-GXNCVNF4MR), Ahrefs, Leadsy

## Conventions
- All CTAs link to HubSpot meeting scheduler as primary action, form as fallback
- Blog post CTAs are tailored per topic, styled as green callout box (hr + p selector)
- External links in blog posts open in new tab
- Trailing slashes enforced (astro.config.mjs)
- /demo/ page is noindex — only for paid ad traffic

## Business context
- Pre-revenue, demoing to NetSuite implementation partners
- Osar Iyamu (OdeCloud) is best lead for first testimonial
- Google Ads paused — needs conversion tracking + exact match keywords before restart
- SEO via blog content is primary growth channel (especially competitor comparison posts)
- Pricing removed from site but still valid: Core $499/mo, Professional $1,199/mo, Enterprise custom
