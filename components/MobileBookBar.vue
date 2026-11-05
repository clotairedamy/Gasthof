<template>
  <div class="book-bar on-dark">
    <a :href="site.phoneHref" class="book-bar__btn">Anrufen</a>
    <a :href="site.emailHref" class="book-bar__btn book-bar__btn--primary">Anfrage senden</a>
  </div>
</template>

<script setup lang="ts">
import { site } from '~/content/site'
</script>

<style scoped>
.book-bar {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--ink);
  border-top: 1px solid var(--border-on-dark);
  padding-bottom: env(safe-area-inset-bottom);
}

.book-bar__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.5rem;
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-on-dark);
}

.book-bar__btn:hover {
  color: var(--gold);
}

.book-bar__btn--primary {
  background: var(--accent);
}

.book-bar__btn--primary:hover {
  color: var(--text-on-dark);
  background: var(--accent-hover);
}

.book-bar :focus-visible {
  outline-offset: -4px;
}

@media (min-width: 640px) {
  .book-bar {
    display: none;
  }
}
</style>
