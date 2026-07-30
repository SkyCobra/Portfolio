// @ts-check
import { defineConfig } from 'astro/config';

// Two deploy targets, one codebase.
//
//   default        → the real site, served from the apex domain at the root.
//   PREVIEW=1      → internal staging on GitHub Pages, served from a project
//                    sub-path. Only used to look at the design; it is never the
//                    production host (no HTTP headers, so no CSP, and no
//                    COOP/COEP for multithreaded WebGL).
//
// Everything that references an asset must go through `import.meta.env.BASE_URL`
// rather than a leading slash, or it breaks under the sub-path.
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  site: preview ? 'https://skycobra.github.io' : 'https://skycobra-studio.com',
  base: preview ? '/Portfolio/' : '/',
  trailingSlash: 'ignore',

  // The dev toolbar only ever exists in `astro dev` — it is never emitted into
  // the production build. Disabled here purely so it stays out of the way while
  // judging the design.
  devToolbar: {
    enabled: false,
  },

  build: {
    assets: 'assets',
  },
});
