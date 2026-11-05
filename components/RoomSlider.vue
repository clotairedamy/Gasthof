<template>
  <section class="slider" :aria-labelledby="headingId">
    <div class="container slider__head">
      <div>
        <p v-reveal class="kicker">{{ kicker }}</p>
        <h2 :id="headingId" v-split class="slider__title">{{ title }}</h2>
      </div>
      <div class="slider__controls">
        <NuxtLink v-if="moreTo" :to="moreTo" class="link-line">{{ moreLabel }}</NuxtLink>
        <div class="slider__arrows">
          <button type="button" class="slider__arrow" :disabled="atStart" @click="step(-1)">
            <span class="sr-only">Vorheriges Zimmer</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 12H4m0 0l6-6m-6 6l6 6" /></svg>
          </button>
          <button type="button" class="slider__arrow" :disabled="atEnd" @click="step(1)">
            <span class="sr-only">Nächstes Zimmer</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 12h16m0 0l-6-6m6 6l-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>

    <ul ref="track" class="slider__track" @scroll.passive="update">
      <li v-for="(room, i) in rooms" :key="room.slug" class="slider__slide">
        <RoomCard :room="room" :index="i" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Room } from '~/content/rooms'

defineProps<{
  rooms: Room[]
  kicker: string
  title: string
  moreTo?: string
  moreLabel?: string
}>()

const headingId = useId()
const track = ref<HTMLUListElement>()
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft < 8
  atEnd.value = el.scrollLeft + el.clientWidth > el.scrollWidth - 8
}

function step(direction: 1 | -1) {
  const el = track.value
  const slide = el?.querySelector<HTMLElement>('.slider__slide')
  if (!el || !slide) return
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  el.scrollBy({ left: direction * (slide.offsetWidth + gap), behavior: 'smooth' })
}

onMounted(update)
</script>

<style scoped>
.slider__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

.slider__title {
  font-size: clamp(2.25rem, 4.5vw, 3.75rem);
  font-weight: 300;
  max-width: 18ch;
  margin: 0;
}

.slider__controls {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.slider__arrows {
  display: flex;
  gap: var(--space-2);
}

.slider__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text);
  cursor: pointer;
  transition: background-color var(--dur-base) var(--ease), color var(--dur-base) var(--ease),
    border-color var(--dur-base) var(--ease);
}

.slider__arrow:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-text);
}

.slider__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.slider__arrow svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* The track starts on the container edge and bleeds off the right side. */
.slider__track {
  --inset: max(clamp(var(--space-6), 4vw, var(--space-12)), (100vw - var(--container)) / 2 + clamp(var(--space-6), 4vw, var(--space-12)));
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(78vw, 24rem);
  column-gap: clamp(var(--space-4), 2.5vw, var(--space-8));
  list-style: none;
  margin: 0;
  padding: 0 var(--inset) var(--space-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--inset);
  scrollbar-width: none;
}

.slider__track::-webkit-scrollbar {
  display: none;
}

.slider__slide {
  scroll-snap-align: start;
}
</style>
