// @ts-check
import { defineConfig } from 'astro/config';

// Project repo deploy at https://skycobra.github.io/Portfolio/
// If you later rename the repo to skycobra.github.io, set base back to '/'.
export default defineConfig({
  site: 'https://skycobra.github.io',
  base: '/Portfolio/',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
});
