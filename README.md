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
