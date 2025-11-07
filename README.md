# Greenlight Approvals Website

Static Astro + React landing page for Greenlight Approvals.
Ships with a GitHub Pages workflow for zero-config deploys from `main`.

## Quick Start
```bash
npm install
npm run dev
```

## Deploy

GitHub Pages is handled by `.github/workflows/deploy.yml`.

1. In GitHub → **Settings → Pages**, set *Build & deployment* → *Source* to **GitHub Actions**.
2. Push to `main`. The workflow installs deps, runs `npm run build`, and publishes `dist/` to Pages.
3. (Optional) For a custom domain or preview URL set the `ASTRO_SITE` repository variable/secret to the canonical URL. Set `ASTRO_BASE` only if you need a non-standard base path.

To test the production build locally:

```bash
npm run build && npm run preview
```

### HubSpot form embed

Set the following environment variables (locally via `.env`, on GitHub via `Pages → Build → Environment variables`) to render the HubSpot form on the contact section automatically:

```
PUBLIC_HUBSPOT_PORTAL_ID=<your portal id>
PUBLIC_HUBSPOT_FORM_ID=<your form id>
```

Without those values the site will render a placeholder that reminds you to configure them.
