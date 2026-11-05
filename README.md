# Gasthof Barlida — Website

A content-driven, single-page marketing website for the **Gasthof Barlida
(Lainacherwirt)** guesthouse in Lainach, Austria — built with Nuxt 3 and
modeled on the structure of a luxury hotel site (hero → intro → rooms →
highlights → story → gallery → contact).

The content is sourced from the live site at `cocohouses.com`, crawled with the
companion `cocohouses-crawler` (sibling directory).

## Stack

- **Nuxt 3.21** (Vue 3, Nitro, Vite) — SSR
- **TypeScript** (`<script setup lang="ts">`)
- **Plain CSS with design tokens** (`assets/css/tokens.css`) — no UI framework
- Content lives as typed data modules in `content/` (no CMS)

## Run

```bash
pnpm install
pnpm run dev        # http://localhost:3000
pnpm run build      # production build → .output/
pnpm run generate   # static build → .output/public
pnpm run preview    # serve the production build
pnpm run typecheck  # vue-tsc type check
pnpm test           # content tests; add BASE_URL=… to also check server HTML
```

`pnpm-lock.yaml` is the lockfile of record (pnpm 11). `package-lock.json` is
stale and not used by CI.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds a static site on every push to `main`
and publishes it to <https://clotairedamy.github.io/Gasthof/>. One-time setup:
**Settings → Pages → Source: GitHub Actions**.

Build-time switches (environment variables):

| Variable | Pages value | At launch |
| --- | --- | --- |
| `NUXT_APP_BASE_URL` | `/Gasthof/` | remove (root domain) |
| `NUXT_PUBLIC_SITE_URL` | `https://clotairedamy.github.io/Gasthof` | real domain |
| `NUXT_PUBLIC_I18N_BASE_URL` | `https://clotairedamy.github.io` (origin only) | real domain |
| `NUXT_PUBLIC_INDEXABLE` | `false` → every page `noindex, nofollow` | `true` |

Images in `public/` must go through `asset('/images/…')` so they pick up the
base URL; route links via `NuxtLink` do this on their own.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, intro, rooms, highlights, story, gallery, contact CTA |
| `/zimmer` | Rooms index |
| `/zimmer/[slug]` | 6 room detail pages (zimmer-1, zimmer-2, suite-3, suite-4, kleine-apartment, grosse-apartment) |
| `/restaurant` | Restaurant, bar, terrace + hours + events |
| `/ueber-uns` | About / family story |
| `/galerie` | Photo gallery |
| `/kontakt` | Contact + directions |

## Content → crawl mapping

- `content/site.ts` — name, contact, nav, trust badges (from home page)
- `content/rooms.ts` — the 6 rooms (from `s-projects-basic*` pages)
- `content/restaurant.ts` — restaurant/bar/terrace (from `services-1`, `team-4*`)
- `content/about.ts` — family story (from `about-3`)
- `content/gallery.ts` — gallery images

Images were copied from the crawler output and optimised (max 1920px, JPEG q82)
by `scripts/prepare-images.py` into `public/images/`.

## Notes / TODOs before launch

- **The site is `noindex` until launch.** Set `NUXT_PUBLIC_INDEXABLE=true`
  and `NUXT_PUBLIC_SITE_URL` to the real domain on the production build, then
  regenerate `public/sitemap.xml` (it still lists the placeholder
  `https://www.gasthofbarlida.at`) and reference it from `robots.txt`.
- Suite 4 has no photos of its own: its images are the family photo
  (`rooms-hero.jpg`) and two stock textures. `gallery-1…6.jpg` are template
  stock textures, not the house — keep them out of `content/gallery.ts`.
- Five languages: German at `/` (default), English `/en/`, Italian `/it/`,
  Dutch `/nl/`, Romanian `/ro/`. Copy for all of them lives in
  `content/locales/<code>.ts`; `de.ts` is the master and the others are typed
  against it, so a missing string fails the typecheck and `pnpm test`.
  Wording that existed on cocohouses.com starts from its official translations;
  new copy was translated for this site and should get a native read-through.
- Online booking is not wired up; the "Buchen" CTA links to the phone number.
- Fonts load from Google Fonts (Cormorant Garamond + Jost).
