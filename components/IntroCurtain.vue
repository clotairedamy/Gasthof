<template>
  <div v-if="firstLoad" class="curtain" aria-hidden="true">
    <div class="curtain__inner">
      <svg class="curtain__mark" viewBox="0 0 48 28" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round">
        <path pathLength="1" d="M1 27 L15 9 L22 17 L30 4 L47 27" />
        <path pathLength="1" d="M26 10.5 L30 4 L34 10.5" />
        <path pathLength="1" d="M1 27 H47" />
      </svg>
      <p class="curtain__name">Gasthof Barlida</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure CSS: it lifts on its own, with or without JavaScript, and is never
// shown again once the visitor navigates.
const firstLoad = useState('first-load', () => true)
</script>

<style scoped>
.curtain {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  background: var(--ink);
  color: var(--gold);
  pointer-events: none;
  animation: curtain-lift 0.8s var(--ease-expo) 0.75s forwards;
}

.curtain__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  animation: curtain-content 0.6s var(--ease) 0.7s forwards;
}

.curtain__mark {
  width: 5rem;
}

.curtain__mark path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: curtain-draw 0.8s var(--ease-out) forwards;
}

.curtain__mark path:nth-child(2) { animation-delay: 0.15s; }
.curtain__mark path:nth-child(3) { animation-delay: 0.05s; }

.curtain__name {
  margin: 0;
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: 0.08em;
  color: var(--text-on-dark);
  animation: curtain-name 0.7s var(--ease-out) 0.1s both;
}

@keyframes curtain-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes curtain-name {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

@keyframes curtain-content {
  to {
    opacity: 0;
    transform: translateY(-24px);
  }
}

@keyframes curtain-lift {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 100% 0);
    visibility: hidden;
  }
}

@media (prefers-reduced-motion: reduce) {
  .curtain {
    display: none;
  }
}
</style>
