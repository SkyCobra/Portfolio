# Game thumbnails

This folder holds the cover image for each game listed in `src/data/portfolio.ts`.

## Naming

Each file must be named exactly `<id>.<ext>` where `<id>` matches the `id` field
in `portfolio.ts`. Supported extensions: `png`, `jpg`, `webp`, `gif`.

Example: the game with `id: 'breath'` → `breath.png` (or `.jpg`, etc.).

## How to populate

### Option 1 — automatic (when it works)

```
npm run scrape:thumbs
```

This downloads each game's cover from its itch.io page. Currently fails with
HTTP 403 because Cloudflare blocks automated requests from datacenter / dev
machine IPs. May work from a different network.

### Option 2 — manual (current path)

1. Open each game's itch.io page in your browser (logged in is fine).
2. Right-click the cover image → "Save image as…".
3. Save with the matching id from `src/data/portfolio.ts`, e.g. `breath.png`.
4. Drop the file in this folder.
5. Run `npm run scrape:thumbs` once more — it will skip downloads (files exist)
   and just rebuild `src/data/thumb-manifest.json` so the components pick them up.

Without thumbnails, the cards fall back to a parchment placeholder showing the
game's title. The page is still presentable in this state.

## IDs to collect

See `src/data/portfolio.ts` `GAMES` for the authoritative list. Quick reference:

- dungeon-soul · yogurt-royale · breath · epic-lolineuh
- sea-of-dreams · mystic-foam · back-to-the-stars · smallville · under
- metaarena · out-of-nightmare · brickpong · lostkeyboard · coopmaze · dungeon-master
