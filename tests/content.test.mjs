// Content regressions. Run with `pnpm test` (Node 24 strips the types from
// the imported .ts modules).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { gallery } from '../content/gallery.ts'
import { rooms } from '../content/rooms.ts'
import { highlightFacts } from '../content/restaurant.ts'
import { de } from '../content/locales/de.ts'
import { en } from '../content/locales/en.ts'
import { it as itLocale } from '../content/locales/it.ts'
import { nl } from '../content/locales/nl.ts'
import { ro } from '../content/locales/ro.ts'

// Imported one by one: Node cannot resolve index.ts's extensionless imports.
const messages = { de, en, it: itLocale, nl, ro }

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
  const names = Object.values(de.rooms.items).map((r) => r.name)
  assert.ok(!names.includes('Kleine Apartment'), 'Kleines Apartment')
  assert.ok(!names.includes('Große Apartment'), 'Großes Apartment')
})

test('every room has a unique slug and copy in German', () => {
  assert.equal(new Set(rooms.map((r) => r.slug)).size, rooms.length)
  assert.deepEqual(Object.keys(de.rooms.items).sort(), rooms.map((r) => r.slug).sort())
})

test('highlights each carry an image, a target and copy', () => {
  assert.equal(highlightFacts.length, de.restaurant.highlights.length)
  for (const h of highlightFacts) {
    assert.ok(h.image.startsWith('/images/'), h.image)
    assert.ok(h.to.startsWith('/'), h.to)
  }
})

test('every gallery image has a description', () => {
  for (const img of gallery) assert.ok(de.gallery.alts[img.src], img.src)
})

// Walk two values in parallel and report the first structural difference.
function sameShape(a, b, path, problems) {
  if (typeof a !== typeof b) return problems.push(`${path}: ${typeof b} instead of ${typeof a}`)
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return problems.push(`${path}: ${b?.length} items instead of ${a.length}`)
    a.forEach((v, i) => sameShape(v, b[i], `${path}[${i}]`, problems))
  } else if (a && typeof a === 'object') {
    const ka = Object.keys(a).sort()
    const kb = Object.keys(b).sort()
    if (ka.join() !== kb.join()) return problems.push(`${path}: keys differ (${kb.filter((k) => !ka.includes(k)).concat(ka.filter((k) => !kb.includes(k))).join(', ')})`)
    for (const k of ka) sameShape(a[k], b[k], `${path}.${k}`, problems)
  } else if (typeof a === 'string' && (a === '') !== (b === '')) {
    problems.push(`${path}: ${b === '' ? 'empty' : 'should be empty'}`)
  }
}

for (const [code, locale] of Object.entries(messages)) {
  if (code === 'de') continue
  test(`${code} translation matches the German structure and leaves nothing blank`, () => {
    const problems = []
    sameShape(de, locale, code, problems)
    assert.deepEqual(problems, [])
    assert.match(locale.rooms.pendingText('X'), /X/)
  })
}

test('Romanian uses comma-below ș/ț, not cedilla ş/ţ', () => {
  const text = JSON.stringify(messages.ro)
  assert.ok(!/[şţŞŢ]/.test(text))
})
