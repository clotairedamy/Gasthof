<template>
  <section class="experience" :aria-labelledby="headingId">
    <div class="container experience__grid">
      <div v-reveal:image class="experience__media" aria-hidden="true">
        <img
          v-for="(item, i) in items"
          :key="item.title"
          :src="asset(item.image)"
          alt=""
          width="800"
          height="1000"
          loading="lazy"
          class="experience__img"
          :class="{ 'is-active': i === active }"
        />
      </div>

      <div class="experience__content">
        <div>
          <p v-reveal class="kicker">{{ kicker }}</p>
          <h2 :id="headingId" v-split class="experience__title">{{ title }}</h2>
        </div>

        <div
          class="experience__tabs"
          role="tablist"
          aria-orientation="vertical"
          :aria-labelledby="headingId"
          @keydown="onKeydown"
        >
          <button
            v-for="(item, i) in items"
            :id="`${uid}-tab-${i}`"
            :key="item.title"
            ref="tabs"
            type="button"
            role="tab"
            class="experience__tab"
            :aria-selected="i === active"
            :aria-controls="`${uid}-panel-${i}`"
            :tabindex="i === active ? 0 : -1"
            @click="active = i"
            @mouseenter="onHover(i)"
          >
            <span class="experience__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="experience__tab-label">{{ item.title }}</span>
          </button>
        </div>

        <div
          v-for="(item, i) in items"
          :id="`${uid}-panel-${i}`"
          :key="item.title"
          role="tabpanel"
          class="experience__panel"
          :aria-labelledby="`${uid}-tab-${i}`"
          :hidden="i !== active"
        >
          <p class="experience__text">{{ item.text }}</p>
          <NuxtLinkLocale v-if="showLinks" :to="item.to" class="link-line">{{ t.ui.learnMore }}<span class="sr-only">: {{ item.title }}</span></NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Highlight } from '~/content/restaurant'

const props = withDefaults(
  defineProps<{
    items: Highlight[]
    kicker: string
    title: string
    /** Off on the page the items link to. */
    showLinks?: boolean
  }>(),
  { showLinks: true },
)

const t = useMessages()
const uid = useId()
const headingId = `${uid}-heading`
const active = ref(0)
const tabs = ref<HTMLButtonElement[]>([])

// Hover previews only for a fine pointer; touch relies on tap.
function onHover(i: number) {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) active.value = i
}

function onKeydown(event: KeyboardEvent) {
  const last = props.items.length - 1
  const keys: Record<string, number> = {
    ArrowDown: active.value === last ? 0 : active.value + 1,
    ArrowRight: active.value === last ? 0 : active.value + 1,
    ArrowUp: active.value === 0 ? last : active.value - 1,
    ArrowLeft: active.value === 0 ? last : active.value - 1,
    Home: 0,
    End: last,
  }
  const next = keys[event.key]
  if (next === undefined) return
  event.preventDefault()
  active.value = next
  tabs.value[next]?.focus()
}
</script>

<style scoped>
.experience__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
}

.experience__media {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--surface-2);
}

.experience__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 0.9s var(--ease), transform 1.6s var(--ease-out);
}

.experience__img.is-active {
  opacity: 1;
  transform: scale(1);
}

.experience__title {
  font-size: clamp(2.25rem, 4.5vw, 3.75rem);
  font-weight: 300;
  margin-bottom: var(--space-12);
}

.experience__tabs {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
  margin-bottom: var(--space-8);
}

.experience__tab {
  display: flex;
  align-items: baseline;
  gap: var(--space-6);
  width: 100%;
  padding: var(--space-5) 0;
  background: none;
  border: 0;
  border-bottom: 1px solid var(--border);
  font: inherit;
  text-align: left;
  color: var(--text-subtle);
  cursor: pointer;
  transition: color var(--dur-base) var(--ease);
}

.experience__tab:hover,
.experience__tab[aria-selected='true'] {
  color: var(--text);
}

.experience__num {
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  color: var(--bronze);
}

.experience__tab-label {
  position: relative;
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 300;
  line-height: 1.1;
  transition: transform var(--dur-slow) var(--ease-out);
}

.experience__tab[aria-selected='true'] .experience__tab-label {
  font-style: italic;
  transform: translateX(var(--space-3));
}

.experience__panel {
  max-width: 34rem;
  animation: panel-in var(--dur-slow) var(--ease-out);
}

.experience__text {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  line-height: 1.5;
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

@media (min-width: 900px) {
  .experience__grid {
    grid-template-columns: 1fr 1fr;
    gap: clamp(var(--space-12), 8vw, var(--space-32));
  }

  .experience__media {
    aspect-ratio: 4 / 5;
  }
}
</style>
