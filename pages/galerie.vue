<template>
  <div>
    <PageHero
      :title="t.gallery.title"
      :kicker="t.gallery.kicker"
      :lead="t.gallery.lead"
      image="/images/hero.jpg"
      position="center 70%"
    />

    <section class="section" :aria-label="t.gallery.imagesLabel">
      <div class="container">
        <ul class="gallery">
          <li v-for="(img, i) in gallery" :key="img.src" class="gallery__item">
            <button type="button" class="gallery__btn" :data-cursor="t.ui.cursorEnlarge" @click="openAt(i)">
              <img
                v-reveal:image="(i % 3) * 100"
                :src="asset(img.src)"
                :alt="alt(img.src)"
                :width="img.tall ? 600 : 900"
                :height="img.tall ? 800 : 600"
                loading="lazy"
              />
              <span class="sr-only">{{ t.gallery.enlarge }}</span>
            </button>
          </li>
        </ul>
      </div>
    </section>

    <dialog
      ref="dialogEl"
      class="lightbox on-dark"
      :aria-label="t.gallery.viewer"
      @close="current = -1"
      @click.self="close"
      @keydown.left.prevent="step(-1)"
      @keydown.right.prevent="step(1)"
    >
      <figure v-if="image" class="lightbox__figure">
        <img :src="asset(image.src)" :alt="alt(image.src)" class="lightbox__img" />
        <figcaption class="lightbox__caption">
          <span>{{ alt(image.src) }}</span>
          <span class="lightbox__count">{{ current + 1 }} / {{ gallery.length }}</span>
        </figcaption>
      </figure>
      <button type="button" class="lightbox__btn lightbox__close" @click="close">
        <span class="sr-only">{{ t.ui.close }}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <button type="button" class="lightbox__btn lightbox__prev" @click="step(-1)">
        <span class="sr-only">{{ t.gallery.previous }}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 12H4m0 0l6-6m-6 6l6 6" /></svg>
      </button>
      <button type="button" class="lightbox__btn lightbox__next" @click="step(1)">
        <span class="sr-only">{{ t.gallery.next }}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 12h16m0 0l-6-6m6 6l-6 6" /></svg>
      </button>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { gallery } from '~/content/gallery'

const t = useMessages()
const alt = useGalleryAlt()

// Native <dialog>: showModal() traps focus, Escape closes it, and focus
// returns to the thumbnail that opened it.
const dialogEl = ref<HTMLDialogElement>()
const current = ref(-1)
const image = computed(() => gallery[current.value])

function openAt(i: number) {
  current.value = i
  dialogEl.value?.showModal()
}

function close() {
  dialogEl.value?.close()
}

function step(direction: 1 | -1) {
  current.value = (current.value + direction + gallery.length) % gallery.length
}

usePageSeo({
  title: t.value.gallery.seoTitle,
  description: t.value.gallery.seoDescription,
  image: '/images/hero.jpg',
})
</script>

<style scoped>
.gallery {
  columns: 1;
  column-gap: var(--space-4);
  list-style: none;
  margin: 0;
  padding: 0;
}

.gallery__item {
  margin-bottom: var(--space-4);
  break-inside: avoid;
}

.gallery__btn {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: var(--surface-2);
  overflow: hidden;
  cursor: zoom-in;
}

.gallery__btn img {
  width: 100%;
  transition: transform 1.4s var(--ease-out), opacity var(--dur-slow) var(--ease);
}

.gallery__btn:hover img {
  transform: scale(1.04);
  opacity: 0.92;
}

/* Lightbox */
.lightbox {
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: var(--space-16) var(--space-4);
  border: 0;
  background: var(--ink);
  color: var(--text-on-dark);
}

.lightbox::backdrop {
  background: transparent;
}

.lightbox[open] {
  display: grid;
  place-items: center;
  animation: lightbox-in var(--dur-slow) var(--ease-out);
}

.lightbox__figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  max-width: min(100%, 80rem);
}

.lightbox__img {
  max-width: 100%;
  max-height: calc(100dvh - 10rem);
  object-fit: contain;
}

.lightbox__caption {
  display: flex;
  gap: var(--space-6);
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-style: italic;
}

.lightbox__count {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-style: normal;
  letter-spacing: 0.2em;
  color: var(--gold);
  align-self: center;
}

.lightbox__btn {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  background: transparent;
  border: 1px solid var(--border-on-dark);
  color: var(--text-on-dark);
  cursor: pointer;
  transition: background-color var(--dur-base) var(--ease), color var(--dur-base) var(--ease);
}

.lightbox__btn:hover {
  background: var(--text-on-dark);
  color: var(--ink);
}

.lightbox__btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.lightbox__close {
  top: var(--space-4);
  right: var(--space-4);
}

.lightbox__prev,
.lightbox__next {
  bottom: var(--space-4);
}

.lightbox__prev {
  left: var(--space-4);
}

.lightbox__next {
  right: var(--space-4);
}

@keyframes lightbox-in {
  from {
    opacity: 0;
  }
}

@media (min-width: 640px) {
  .gallery {
    columns: 2;
  }
}

@media (min-width: 900px) {
  .lightbox {
    padding: var(--space-16) var(--space-24);
  }

  .lightbox__prev,
  .lightbox__next {
    top: 50%;
    bottom: auto;
    transform: translateY(-50%);
  }

  .lightbox__prev {
    left: var(--space-6);
  }

  .lightbox__next {
    right: var(--space-6);
  }
}

@media (min-width: 1000px) {
  .gallery {
    columns: 3;
  }
}
</style>
