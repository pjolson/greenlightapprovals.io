# Greenlight Approvals Website

Static Astro + React landing page for Greenlight Approvals.
Now prepared for Netlify deploys (public + private docs), while still compatible with GitHub Pages.

## Quick Start
```bash
npm install
npm run dev
```

## Deploy

GitHub Pages is handled by `.github/workflows/deploy.yml`.

1. In GitHub → **Settings → Pages**, set *Build & deployment* → *Source* to **GitHub Actions**.
2. Push to `main`. The workflow installs deps, runs `npm run build`, and publishes `dist/` to Pages.
3. For a custom domain, add `public/CNAME` with your domain (already set to `www.greenlightapprovals.io`). GitHub will alias the site to that domain and the Astro config will automatically use `/` as the base path.
4. (Optional) Override `ASTRO_SITE` or `ASTRO_BASE` via repo variables if you need a different canonical URL or base path.

To test the production build locally:

```bash
npm run build && npm run preview
```

## Docs structure (public + private)

- Content collections live in `src/content/docs/public` and `src/content/docs/private`.
- Public docs routes: `/docs` (index) and `/docs/[slug]`.
- Private docs routes: `/client/docs` (index) and `/client/docs/[slug]`.
- Frontmatter fields: `title`, `description`, `section`, `order`.
- Styling/layout: `src/layouts/DocsLayout.astro` with supporting styles in `src/styles/global.css`.
- The docs layout auto-builds an “On this page” table of contents from `h2`/`h3` headings in each doc.
  - TOC links now respect existing heading IDs (from markdown) or generate stable IDs, with smooth scrolling and hash updates.
- Private docs folder conventions (by topic):
  - `implementation/` (install, post-install, settings, upgrades, uninstall, license matrix)
  - `admin-config/`, `end-user/`, `architecture/`, `troubleshooting/`, `compliance/`, `api-integration/`, `partners/`, `internal/`

Add a new doc by creating a Markdown file in the appropriate folder with frontmatter. The slug comes from the filename.

## Netlify deployment

- `netlify.toml` is configured with `npm run build` and publishes `dist/`.
- The `/client/*` routes send `X-Robots-Tag: noindex, nofollow` to keep private docs out of search.
- Protect `/client/*` via Netlify password protection or Netlify Identity (enable in the Netlify UI). Do not commit secrets to the repo.
- Optional: point a subdomain (e.g., `clients.greenlightapprovals.io`) at the Netlify site for private docs, and keep the main domain for public if desired.

### HubSpot form embed

Set the following environment variables (locally via `.env`, on GitHub via `Pages → Build → Environment variables`) to render the HubSpot form on the contact section automatically:

```
PUBLIC_HUBSPOT_PORTAL_ID=<your portal id>
PUBLIC_HUBSPOT_FORM_ID=<your form id>
```

Without those values the site will render a placeholder that reminds you to configure them.
