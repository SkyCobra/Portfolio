// @ts-check
import { defineConfig } from 'astro/config';

// Served from the apex domain, so the site lives at the root — no base path.
// public/CNAME tells GitHub Pages which domain to bind.
export default defineConfig({
  site: 'https://skycobra-studio.com',
  base: '/',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
});
