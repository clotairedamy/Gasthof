<template>
  <div>
    <PageHero
      title="Unsere Zimmer"
      kicker="Übernachten"
      lead="Vom gemütlichen Doppelzimmer bis zum großzügigen Apartment – sechs Unterkünfte für einen erholsamen Aufenthalt in den Bergen."
      image="/images/zimmer-1-1.jpg"
      position="center 65%"
    />

    <section class="section">
      <div class="container">
        <div class="rooms-grid">
          <RoomCard v-for="(room, i) in rooms" :key="room.slug" :room="room" :index="i" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { rooms } from '~/content/rooms'

const config = useRuntimeConfig()
const base = config.public.siteUrl as string

useSeoMeta({
  title: 'Zimmer & Suiten | Gasthof Barlida',
  description:
    'Sechs gemütliche Zimmer, Suiten und Apartments im Gasthof Barlida – Doppelzimmer mit Balkon, Familiensuiten und Apartments mit Gemeinschaftsküche.',
  ogTitle: 'Zimmer & Suiten – Gasthof Barlida',
  ogImage: `${base}/images/zimmer-1-1.jpg`,
})

useHead({
  link: [{ rel: 'canonical', href: `${base}/zimmer` }],
})
</script>

<style scoped>
.rooms-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16) clamp(var(--space-6), 3vw, var(--space-12));
}

@media (min-width: 720px) {
  .rooms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1080px) {
  .rooms-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
