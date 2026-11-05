<template>
  <NuxtLink :to="`/zimmer/${room.slug}`" class="room-card" data-cursor="Entdecken">
    <div v-reveal:image class="room-card__media">
      <img
        :src="asset(cover.src)"
        :alt="cover.alt"
        width="600"
        height="800"
        loading="lazy"
      />
      <span v-if="room.highlight" class="room-card__badge">{{ room.highlight }}</span>
    </div>
    <div class="room-card__body">
      <p v-if="index !== undefined" class="room-card__num" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</p>
      <h3 class="room-card__name">{{ room.name }}</h3>
      <p class="room-card__tagline">{{ room.tagline }}</p>
      <span class="room-card__more">Entdecken</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { roomCover, type Room } from '~/content/rooms'

const props = defineProps<{ room: Room; index?: number }>()
const cover = computed(() => roomCover(props.room))
</script>

<style scoped>
.room-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: var(--text);
}

.room-card:hover {
  color: var(--text);
}

.room-card__media {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--surface-2);
}

.room-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.4s var(--ease-out);
}

.room-card:hover .room-card__media img {
  transform: scale(1.06);
}

.room-card__badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  background: var(--canvas);
  color: var(--text);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: var(--space-2) var(--space-3);
}

.room-card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: var(--space-6);
}

.room-card__num {
  margin: 0 0 var(--space-2);
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  color: var(--bronze);
}

.room-card__name {
  font-size: var(--text-2xl);
  margin: 0 0 var(--space-2);
}

.room-card__tagline {
  margin: 0 0 var(--space-4);
  color: var(--text-muted);
}

.room-card__more {
  position: relative;
  align-self: flex-start;
  margin-top: auto;
  padding-block: var(--space-1);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
}

.room-card__more::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0.4);
  transform-origin: left;
  transition: transform var(--dur-slow) var(--ease-out);
}

.room-card:hover .room-card__more::after {
  transform: scaleX(1);
}
</style>
