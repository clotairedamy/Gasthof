<template>
  <section class="marquee on-dark" :aria-label="t.ui.marqueeLabel">
    <div class="marquee__track" :class="{ 'marquee__track--paused': paused }">
      <!-- Four copies so the -50% loop never shows a gap on wide screens. -->
      <ul v-for="copy in 4" :key="copy" class="marquee__list" :aria-hidden="copy > 1 ? 'true' : undefined">
        <li v-for="item in items" :key="item" class="marquee__item">
          <BrandMark class="marquee__mark" />
          {{ item }}
        </li>
      </ul>
    </div>
    <button
      type="button"
      class="marquee__pause"
      :aria-pressed="paused"
      @click="paused = !paused"
    >
      <span class="sr-only">{{ t.ui.pauseMarquee }}</span>
      <svg v-if="!paused" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 5l12 7-12 7z" /></svg>
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{ items: string[] }>()

// WCAG 2.2.2: anything that moves for more than five seconds can be paused.
const paused = ref(false)
const t = useMessages()
</script>

<style scoped>
.marquee {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--ink);
  color: var(--text-on-dark);
  overflow: hidden;
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 48s linear infinite;
}

.marquee:hover .marquee__track,
.marquee__track--paused {
  animation-play-state: paused;
}

.marquee__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.marquee__item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-8);
  white-space: nowrap;
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.marquee__mark {
  width: 1.5rem;
  color: var(--gold);
}

.marquee__pause {
  position: absolute;
  right: var(--space-3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--ink);
  border: 1px solid var(--border-on-dark);
  color: var(--text-on-dark);
  cursor: pointer;
}

.marquee__pause svg {
  width: 0.9rem;
  height: 0.9rem;
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

/* Reduced motion: a static, wrapping row; the duplicate copies are dropped. */
@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    animation: none;
  }

  .marquee__list[aria-hidden='true'],
  .marquee__pause {
    display: none;
  }

  .marquee__list {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
