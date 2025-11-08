import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import fs from 'node:fs';
import path from 'node:path';

const repository = process.env.GITHUB_REPOSITORY ?? '';
const [owner, repo] = repository.split('/');
const isUserOrOrgSite = owner && repo ? repo.toLowerCase() === `${owner.toLowerCase()}.github.io` : false;
const inferredBase = repo && !isUserOrOrgSite ? `/${repo}` : '/';

const cnamePath = path.resolve(process.cwd(), 'public', 'CNAME');
const hasCname = fs.existsSync(cnamePath);
const cnameDomain = hasCname ? fs.readFileSync(cnamePath, 'utf-8').trim() : undefined;

const base = process.env.ASTRO_BASE ?? (cnameDomain ? '/' : process.env.GITHUB_ACTIONS ? inferredBase : '/');
const fallbackSite = process.env.ASTRO_SITE ?? (cnameDomain ? `https://${cnameDomain}` : 'http://localhost:4321');
const inferredSite = owner ? `https://${owner}.github.io${base === '/' ? '' : base}` : fallbackSite;
const site = process.env.ASTRO_SITE ?? (cnameDomain ? `https://${cnameDomain}` : process.env.GITHUB_ACTIONS ? inferredSite : fallbackSite);

export default defineConfig({
  site,
  base,
  integrations: [react()],
  output: 'static',
});
