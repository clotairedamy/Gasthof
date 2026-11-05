// Server-rendered HTML checks. Needs a running server:
//   BASE_URL=http://localhost:3000 pnpm test
// Skipped when BASE_URL is not set.
import { test } from 'node:test'
import assert from 'node:assert/strict'

const BASE = process.env.BASE_URL
const skip = BASE ? false : 'set BASE_URL to run against a server'

const ROUTES = ['/', '/zimmer', '/zimmer/zimmer-1', '/restaurant', '/ueber-uns', '/galerie', '/kontakt']

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
