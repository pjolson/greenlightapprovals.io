import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const repository = process.env.GITHUB_REPOSITORY ?? '';
const [owner, repo] = repository.split('/');
const isUserOrOrgSite = owner && repo ? repo.toLowerCase() === `${owner.toLowerCase()}.github.io` : false;
const inferredBase = repo && !isUserOrOrgSite ? `/${repo}` : '/';
const base = process.env.ASTRO_BASE ?? (process.env.GITHUB_ACTIONS ? inferredBase : '/');
const fallbackSite = process.env.ASTRO_SITE ?? 'http://localhost:4321';
const inferredSite = owner ? `https://${owner}.github.io${base === '/' ? '' : base}` : fallbackSite;
const site = process.env.ASTRO_SITE ?? (process.env.GITHUB_ACTIONS ? inferredSite : fallbackSite);

export default defineConfig({
  site,
  base,
  integrations: [react()],
  output: 'static',
});
