# Design notes

Landmarks for picking the project back up after a break. What is written here is
what **cannot be guessed from reading the code**: the reasons, the measured
values, and the traps already paid for.

---

## 1. Architecture

One single site on `skycobra-studio.com`, not two. The freelance presentation and
the portfolio share the same root — splitting them would have cut SEO in half and
doubled maintenance.

```
/                    freelance landing          (sober)
/projets             quest board                (fully themed)
/a-propos            background, approach
/en/…                complete English mirror
```

Astro, strict TypeScript, plain CSS. `base: '/'` — the domain serves from the
root, there is no sub-path any more.

**French route names are deliberate.** `a-propos.astro` and `projets/` are the
French locale URLs; the English mirror already uses `about.astro` and
`projects/`. They are content, not identifiers — renaming them would break the
bilingual routing and French SEO.

**Hosting: undecided.** GitHub Pages was dropped (no HTTP headers, therefore no
CSP, no branch previews, no COOP/COEP for multithreaded WebGL). The repository
stays on GitHub. `public/.htaccess`, `holding.html` and `maintenance.html` target
Apache hosting such as OVH.

**Games stay on itch.io.** A WebGL build weighs 15–60 MB; hosting fifteen would
saturate any static plan, and we would throw away the view counts and jam pages,
which are real social proof.

---

## 2. The theme system

The lantern flips `data-theme` on `<html>`. **No component may hard-code a
colour** — it would stay frozen in one theme. Everything goes through the tokens
in `src/styles/global.css`.

An inline script in `<head>` applies the theme **before first paint**, otherwise
night would show for a fraction of a second before day settles in. It reads
`localStorage`, falls back to `prefers-color-scheme`, and silently keeps night if
`localStorage` is unavailable.

### Tokens worth knowing

| Token | Role |
|---|---|
| `--scrim` | Veil between artwork and content — **measured, not chosen** |
| `--text-halo-strong` / `--text-halo-soft` | Lifting text. Black shadow at night, **light halo** by day |
| `--accent-on-bg` | Accent sitting on the artwork. Cream at night, deep gold by day |
| `--nav-scrim` | Veil under the nav, **day only** |
| `--plaque-*` | The board plaque, fully themed |
| `--flame-on` | `1` lit, `0` unlit. Drives flame, inner glow, bloom and halo |

---

## 3. Measured values

No scrim opacity was picked by eye. All come from a contrast computation on the
real image, at the worst spot of the area concerned.

| Area | Night | Day |
|---|---|---|
| Wall (content) | no scrim — 7.8:1 | cream 15 % — 4.8:1 |
| Beam (navigation) | no scrim — 11.9:1 | **dark 62→40 %** — 8.7:1 |
| `.stone-panel` | 8.4:1 heading / 7.1:1 body | 12:1 / 7.4:1 |
| Plaque | 15:1 heading | 7.6:1 heading |

### The navigation case

This is the least obvious trap. The nav is **not** on the wall, it is on the
**beam**. By day that beam is a **mid tone** (luminance 0.232):

- light text on it → 2.1:1
- dark text on it → 2.3:1

**No text colour can work.** The background has to change. Hence `--nav-scrim`,
active in day only, and the decision to keep nav text **light in both themes** —
the beam is wood, dark by nature.

---

## 4. The artwork

Two images, `public/bg-night.webp` and `public/bg-day.webp`, carried by a
**viewport-fixed** `body::before` — not by `background-attachment: fixed`, which
iOS Safari handles badly. Useful consequence: the raster area stays screen-sized,
and the render no longer depends on page height.

> **The original trap.** The old background was a stack of 40 CSS gradients whose
> knots were positioned in **percentages**. The same wall therefore rendered
> differently on every page: on `/projets` (1738 px) a knot declared at 82 % fell
> at y=1425, on `/a-propos` (772 px) at y=633. A viewport-fixed image removes the
> problem by construction.

### Night is DERIVED from day

Generating both moods separately made them diverge: same seed, but opposite
`style_suffix` values are enough to change the whole denoising trajectory.
Measured by correlating edge maps:

| | Structural match |
|---|---|
| Generated separately | **31.5 %** |
| Night derived from day | **90.3 %** |

Night is therefore produced **by guided editing** from the day image
(`recipes/view_flux2_klein_edit.api.json` in Forge): only the light changes, the
structure is preserved as input.

Trade-off: a night derived from a bright image reads as dusk. Hence the 20 %
black scrim, which pulls it back towards night and lifts contrast.

---

## 5. The lantern

A fixed `<button>` at the top right, below the nav — on a wide screen it falls in
the margin, clear of the 1180 px content column.

- **The body** is a cut-out image (`public/lantern.webp`, 246×420). Its globe is
  **10 % translucent**, which lets the flame through.
- **The flame** is a CSS layer **behind** the body, anchored at the bottom
  (`transform-origin: bottom center`) on the wick measured at **73.1 %** of the
  height. It dances at the tip; its base does not move.
- **The bloom** sits in front of the body, additively blended: an object merely
  placed behind a pane has no reason to make it glow.
- **The chain** is a repeated SVG mask, not an image — its colour comes from a
  token, so it follows the theme.

### Animation durations

**3.4 s** flame, **4.1 s** inner glow, **4.7 s** halo. Deliberately
non-multiples: the cycles never resynchronise, without which the flicker would
read as mechanical. Everything is cut under `prefers-reduced-motion` — the
flicker is an embellishment, never information.

### Gamut

The four light layers have a `display-p3` version under `@supports`, with the
sRGB rules as fallback. True HDR is not reliably usable in CSS; display-p3 is,
and a flame's saturated oranges benefit noticeably.

---

## 6. Asset pipeline

Images come from **Forge** (`D:/Projects/Forge`), profile `skycobra-site`.

| Category | Use |
|---|---|
| `background_scene_anime` | Night artwork |
| `background_scene_anime_day` | Day artwork |
| `object_cutout` | Objects to cut out, flat white background |
| `social_card_anime` | Open Graph banner |

**Cutting out**: Flux produces no alpha channel. The background is recognised by
two simultaneous conditions — very bright **and** very desaturated. The second is
what protects the flame: vivid but distinctly yellow, where a background white is
neutral.

**Prompting lesson**: diffusion models **follow negations badly**. "no wires" was
ignored five times; "a perfectly smooth uninterrupted surface" worked. Describe
what you want, not what you refuse. Expect roughly one clean result in five
seeds, even with an identical prompt.

---

## 7. Traps already hit

**The dev server does not recompile scoped styles.** Editing a component's
`<style>` does not propagate through hot reload in this setup — global tokens do,
component-internal rules do not. Production is always correct. If a change does
not take: restart the server.

**Transitions falsify any synchronous measurement.** Reading a colour right after
changing `data-theme` returns the **starting** value, the 550 ms transition being
under way. Neutralise transitions while measuring.

**The sampling point matters more than the formula.** Three wrong measurements in
a row all came from where they were taken, never from the maths: the content zone
instead of the real zone, a transition in progress, the wall instead of the beam.

**Watch for hallucinated text.** One background generation produced "F.AULIW"
across the middle of the wall. The `no text` in the style suffix is not enough —
it takes the positive assertion: "completely bare and unmarked".

---

## 8. Outstanding

- **Copy** — everything is emptied, with visible `[À RÉDIGER]` / `[TO WRITE]`
  markers. Nothing invented must ship.
- **Email address** — `SITE.email` is a placeholder.
- **The 15 game thumbnails** — Cloudflare blocks every automated access to itch.io
  pages (403 on Node, curl, PowerShell and WebFetch). Untried lead: extraction
  through a real browser.
- **OG banner** — still shows the ruin, an abandoned setting. To be regenerated in
  the guild hall.
- **Project pages** `/projets/[slug]` — dynamic routes and content collections, so
  the case studies can be written in Markdown.
- **Hosting** — to be decided.
