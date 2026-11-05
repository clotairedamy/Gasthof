// Server-rendered HTML checks. Needs a running server:
//   BASE_URL=http://localhost:3000 pnpm test
// Skipped when BASE_URL is not set.
import { test } from 'node:test'
import assert from 'node:assert/strict'

const BASE = process.env.BASE_URL
const skip = BASE ? false : 'set BASE_URL to run against a server'

const PAGES = ['/', '/zimmer', '/zimmer/zimmer-1', '/restaurant', '/ueber-uns', '/galerie', '/kontakt']
const LOCALES = { de: 'de-AT', en: 'en', it: 'it', nl: 'nl', ro: 'ro' }
const prefix = (code) => (code === 'de' ? '' : `/${code}`)
// Every page in every language; German lives at the root.
const ROUTES = Object.keys(LOCALES).flatMap((code) => PAGES.map((page) => `${prefix(code)}${page}`.replace(/(.)\/$/, '$1')))

async function html(path) {
  const res = await fetch(`${BASE}${path}`)
  assert.equal(res.status, 200, `${path} → ${res.status}`)
  return res.text()
}

const count = (src, re) => (src.match(re) ?? []).length

test('every page ships one h1, a title, a description and a canonical in the server HTML', { skip }, async () => {
  for (const path of ROUTES) {
    const src = await html(path)
    assert.equal(count(src, /<h1[\s>]/g), 1, `${path}: h1 count`)
    assert.match(src, /<title>[^<]+<\/title>/, `${path}: title`)
    assert.match(src, /<meta name="description" content="[^"]+"/, `${path}: description`)
    assert.match(src, /<link rel="canonical" href="https:\/\/[^"]+"/, `${path}: canonical`)
    assert.match(src, /<meta property="og:image" content="https:\/\/[^"]+"/, `${path}: og:image`)
  }
})

test('every page is noindex until NUXT_PUBLIC_INDEXABLE=true', { skip }, async () => {
  for (const path of ROUTES) {
    const src = await html(path)
    assert.match(src, /<meta name="robots" content="noindex, nofollow"/, path)
    assert.doesNotMatch(src, /<meta name="robots" content="index/, path)
  }
})

test('each language sets html lang, links every alternate and canonicalises to itself', { skip }, async () => {
  for (const [code, language] of Object.entries(LOCALES)) {
    const path = `${prefix(code)}/zimmer`
    const src = await html(path)
    assert.match(src, new RegExp(`<html[^>]* lang="${language}"`), `${path}: lang`)
    const canonical = src.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? ''
    assert.ok(canonical.startsWith('https://') && canonical.endsWith(path), `${path}: canonical ${canonical}`)
    // Alternates must point at the same site as the canonical, path for path.
    const site = canonical.slice(0, canonical.length - path.length)
    for (const [alt, altLanguage] of Object.entries(LOCALES)) {
      const href = src.match(new RegExp(`<link[^>]*href="([^"]+)"[^>]*hreflang="${altLanguage}"`))?.[1]
      assert.equal(href, `${site}${prefix(alt)}/zimmer`, `${path}: hreflang ${altLanguage}`)
    }
    assert.equal(count(src, /class="lang__link/g) >= 5, true, `${path}: language switcher`)
  }
})

test('translated pages are actually translated', { skip }, async () => {
  // Descriptions, not titles: "Contact" is correct in English, Dutch and Romanian.
  const descriptions = new Set()
  for (const code of Object.keys(LOCALES)) {
    descriptions.add((await html(`${prefix(code)}/kontakt`)).match(/<meta name="description" content="([^"]+)"/)[1])
  }
  assert.equal(descriptions.size, 5, [...descriptions].join(' | '))
})

test('the menu toggle is a button wired to the dialog it opens', { skip }, async () => {
  const src = await html('/')
  assert.match(src, /<button[^>]*class="header__toggle"[^>]*aria-expanded="false"[^>]*aria-controls="site-menu"/)
})

test('marquee duplicates are hidden from assistive tech and it can be paused', { skip }, async () => {
  const src = await html('/')
  assert.equal(count(src, /<ul class="marquee__list"(?! aria-hidden)/g), 1, 'exactly one readable copy')
  assert.equal(count(src, /<ul class="marquee__list" aria-hidden="true"/g), 3)
  assert.match(src, /<button[^>]*class="marquee__pause"[^>]*aria-pressed="false"/)
})

test('restaurant/bar/terrace switcher renders as tabs with one visible panel', { skip }, async () => {
  const src = await html('/')
  assert.equal(count(src, /role="tablist"/g), 1)
  assert.equal(count(src, /role="tab"/g), 3)
  assert.equal(count(src, /aria-selected="true"/g), 1)
  assert.equal(count(src, /role="tabpanel"[^>]*hidden/g), 2)
})

test('home page structured data is a Hotel', { skip }, async () => {
  const src = await html('/')
  const json = src.match(/<script type="application\/ld\+json"[^>]*>([^<]+)<\/script>/)?.[1]
  assert.ok(json, 'JSON-LD present')
  assert.equal(JSON.parse(json)['@type'], 'Hotel')
})

test('unknown routes return 404', { skip }, async () => {
  const res = await fetch(`${BASE}/gibt-es-nicht`)
  assert.equal(res.status, 404)
})
