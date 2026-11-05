// Content regressions. Run with `pnpm test` (Node 24 strips the types from
// the imported .ts modules).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { gallery } from '../content/gallery.ts'
import { rooms } from '../content/rooms.ts'
import { highlights } from '../content/restaurant.ts'

// gallery-1…6.jpg are template stock textures (feathers, marble, sand dunes)
// copied over by the crawler. They are not the property and must never be
// presented as "Alpenlandschaft" or "Blick in die Berge".
const STOCK = /\/images\/gallery-\d+\.jpg$/

// rooms-hero.jpg is a family photo, not a room.
const FAMILY_PHOTO = '/images/rooms-hero.jpg'

test('gallery shows only photos of the house', () => {
  const stock = gallery.filter((img) => STOCK.test(img.src)).map((img) => img.src)
  assert.deepEqual(stock, [])
})

test('the family photo is not used as a room or page hero', () => {
  assert.notEqual(rooms.find((r) => r.slug === 'zimmer-1')?.images.at(-1), FAMILY_PHOTO)
  for (const page of ['pages/zimmer/index.vue', 'pages/kontakt.vue']) {
    const src = readFileSync(new URL(`../${page}`, import.meta.url), 'utf8')
    assert.ok(!src.includes(FAMILY_PHOTO), `${page} still uses ${FAMILY_PHOTO}`)
  }
})

test('no page presents a stock texture as a photo', () => {
  // pages/index.vue uses gallery-3.jpg only as a decorative background (alt="").
  for (const page of ['pages/galerie.vue', 'pages/kontakt.vue', 'pages/restaurant.vue', 'pages/ueber-uns.vue', 'pages/zimmer/index.vue']) {
    const src = readFileSync(new URL(`../${page}`, import.meta.url), 'utf8')
    assert.ok(!/\/images\/gallery-\d+\.jpg/.test(src), `${page} uses a stock texture`)
  }
})

test('no room is illustrated with stock textures or the family photo', () => {
  for (const room of rooms) {
    const wrong = room.images.filter((src) => STOCK.test(src) || src === FAMILY_PHOTO)
    assert.deepEqual(wrong, [], room.slug)
  }
})

test('apartment names are grammatical German (neuter: -es)', () => {
  const names = rooms.map((r) => r.name)
  assert.ok(!names.includes('Kleine Apartment'), 'Kleines Apartment')
  assert.ok(!names.includes('Große Apartment'), 'Großes Apartment')
})

test('every room has a unique slug', () => {
  assert.equal(new Set(rooms.map((r) => r.slug)).size, rooms.length)
})

test('highlights each carry an image and a target', () => {
  for (const h of highlights) {
    assert.ok(h.image.startsWith('/images/'), h.title)
    assert.ok(h.to.startsWith('/'), h.title)
  }
})
