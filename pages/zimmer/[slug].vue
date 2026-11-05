<template>
  <div v-if="room">
    <PageHero
      :title="room.name"
      :kicker="room.highlight || 'Zimmer'"
      :lead="room.tagline"
      :image="roomCover(room).src"
    />

    <section class="section">
      <div class="container room">
        <div class="room__body">
          <div v-for="(p, i) in room.description" :key="i">
            <p class="room__text" :class="{ 'room__text--lead': i === 0 }">{{ p }}</p>
          </div>

          <h2 class="room__subtitle">Ausstattung</h2>
          <ul class="room__features">
            <li v-for="feature in room.features" :key="feature">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {{ feature }}
            </li>
          </ul>

          <div class="room__cta">
            <a :href="site.phoneHref" class="btn btn--primary">Jetzt anfragen</a>
            <NuxtLink to="/zimmer" class="btn btn--ghost">Alle Zimmer</NuxtLink>
          </div>
        </div>

        <div v-if="room.images.length" class="room__gallery">
          <img
            v-for="(img, i) in room.images"
            :key="i"
            :src="asset(img)"
            :alt="`${room.name} – Bild ${i + 1}`"
            :width="i === 0 ? 800 : 480"
            :height="i === 0 ? 600 : 600"
            :loading="i === 0 ? 'eager' : 'lazy'"
            v-reveal:image="(i % 2) * 120"
          />
        </div>
        <div v-else class="room__pending on-dark">
          <BrandMark class="room__pending-mark" />
          <p class="room__pending-title">Fotos folgen in Kürze</p>
          <p class="room__pending-text">Gerne beschreiben wir Ihnen {{ room.name }} persönlich – rufen Sie uns an.</p>
          <a :href="site.phoneHref" class="btn btn--outline-light">{{ site.phone }}</a>
        </div>
      </div>
    </section>

    <div class="section section--alt">
      <RoomSlider :rooms="otherRooms" kicker="Weitere Unterkünfte" title="Das könnte Ihnen auch gefallen" more-to="/zimmer" more-label="Alle Zimmer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoom, roomCover, rooms } from '~/content/rooms'
import { site } from '~/content/site'

const route = useRoute()
const slug = route.params.slug as string
const room = getRoom(slug)

if (!room) {
  throw createError({ statusCode: 404, statusMessage: 'Zimmer nicht gefunden', fatal: true })
}

const otherRooms = rooms.filter((r) => r.slug !== slug)

const config = useRuntimeConfig()
const base = config.public.siteUrl as string

useSeoMeta({
  title: `${room.name} | Gasthof Barlida`,
  description: room.description[0],
  ogTitle: `${room.name} – Gasthof Barlida`,
  ogDescription: room.tagline,
  ogImage: `${base}${roomCover(room).src}`,
})

useHead({
  link: [{ rel: 'canonical', href: `${base}/zimmer/${room.slug}` }],
})
</script>

<style scoped>
.room {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16);
  align-items: start;
}

.room__text {
  color: var(--text-muted);
}

.room__text--lead {
  font-family: var(--font-serif);
  font-size: clamp(1.35rem, 2vw, 1.65rem);
  line-height: 1.5;
  color: var(--text);
}

.room__subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--bronze);
  margin: var(--space-12) 0 var(--space-4);
}

.room__features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: var(--space-8);
  border-top: 1px solid var(--border-strong);
}

.room__features li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-block: var(--space-3);
  border-bottom: 1px solid var(--border);
  font-size: var(--text-sm);
}

.room__features svg {
  width: 1rem;
  height: 1rem;
  color: var(--accent);
  flex-shrink: 0;
}

.room__cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-12);
}

.room__gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

.room__gallery img {
  width: 100%;
  object-fit: cover;
}

.room__gallery img:first-child {
  aspect-ratio: 4 / 5;
}

.room__gallery img:not(:first-child) {
  aspect-ratio: 3 / 4;
}

.room__pending {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  min-height: 28rem;
  padding: var(--space-12) var(--space-8);
  background: var(--ink);
  color: var(--text-on-dark);
  text-align: center;
}

.room__pending-mark {
  width: 3.5rem;
  color: var(--gold);
}

.room__pending-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: 300;
  font-style: italic;
}

.room__pending-text {
  max-width: 24rem;
  margin: 0 0 var(--space-4);
  color: var(--text-on-dark-muted);
}

@media (min-width: 900px) {
  .room {
    grid-template-columns: 1fr 1.1fr;
    gap: clamp(var(--space-12), 7vw, var(--space-24));
  }

  .room__gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  .room__gallery img:first-child {
    grid-column: span 2;
  }
}
</style>
