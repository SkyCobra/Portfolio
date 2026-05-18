#!/usr/bin/env node
// Fetch the cover image of each game listed in src/data/portfolio.ts
// and save to public/games/<id>.<ext>.
//
// Reads the .ts file as text and extracts each { id, itch } pair via regex.
// Falls back to the next game if a fetch fails. Existing files are skipped
// unless --force is passed.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_FILE = join(ROOT, 'src', 'data', 'portfolio.ts');
const OUT_DIR = join(ROOT, 'public', 'games');
const MANIFEST_FILE = join(ROOT, 'src', 'data', 'thumb-manifest.json');

const force = process.argv.includes('--force');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

function extractEntries(src) {
  // Match game entries: { id: 'foo', title: '...', itch: 'https://itch.io/...' }
  // The presence of `title:` between `id:` and `itch:` rules out the ACCENTS table.
  const re = /\{\s*id:\s*'([^']+)'\s*,\s*title:[\s\S]*?itch:\s*'(https?:\/\/[^']+itch\.io[^']*)'/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    out.push({ id: m[1], itch: m[2] });
  }
  return out;
}

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function fetchCoverUrl(itchUrl) {
  const res = await fetch(itchUrl, {
    headers: {
      'User-Agent': UA,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${itchUrl}`);
  const html = await res.text();
  // Itch.io exposes the cover image via OpenGraph meta:
  //   <meta property="og:image" content="https://img.itch.zone/..." />
  let m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (m) return m[1];
  // Fallback: <img class="cover_image" src="...">
  m = html.match(/<img[^>]+class=["'][^"']*game_cover_image[^"']*["'][^>]+src=["']([^"']+)["']/i);
  if (m) return m[1];
  return null;
}

function extOf(url) {
  const noQuery = url.split('?')[0];
  const m = noQuery.match(/\.(png|jpe?g|gif|webp)$/i);
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'png';
}

async function fetchImage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} on image ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const src = await readFile(DATA_FILE, 'utf8');
  const entries = extractEntries(src);
  if (entries.length === 0) {
    console.error('No game entries found in', DATA_FILE);
    process.exit(1);
  }
  console.log(`Found ${entries.length} games. Output dir: ${OUT_DIR}`);

  let ok = 0, skip = 0, fail = 0;
  const manifest = {};
  const exts = ['png', 'jpg', 'webp', 'gif'];

  for (const { id, itch } of entries) {
    try {
      let existingExt = null;
      for (const e of exts) {
        if (await fileExists(join(OUT_DIR, `${id}.${e}`))) { existingExt = e; break; }
      }
      if (existingExt && !force) {
        manifest[id] = existingExt;
        console.log(`  - ${id}: already present (.${existingExt}), skipping`);
        skip++;
        continue;
      }
      const coverUrl = await fetchCoverUrl(itch);
      if (!coverUrl) {
        console.warn(`  ! ${id}: no cover URL found at ${itch}`);
        fail++;
        continue;
      }
      const buf = await fetchImage(coverUrl);
      const ext = extOf(coverUrl);
      const out = join(OUT_DIR, `${id}.${ext}`);
      await writeFile(out, buf);
      manifest[id] = ext;
      console.log(`  + ${id}: ${coverUrl} → ${id}.${ext} (${(buf.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (err) {
      console.error(`  ! ${id}: ${err.message}`);
      fail++;
    }
  }

  await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`\nManifest written: ${MANIFEST_FILE}`);
  console.log(`Done. ${ok} downloaded, ${skip} skipped, ${fail} failed.`);
  if (fail > 0) process.exit(2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
