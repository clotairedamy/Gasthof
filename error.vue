<template>
  <div class="error">
    <div class="container error__inner">
      <p class="kicker">Fehler {{ error?.statusCode || 500 }}</p>
      <h1 class="error__title">Diese Seite wurde nicht gefunden</h1>
      <p class="error__text">Die gesuchte Seite existiert leider nicht (mehr).</p>
      <NuxtLink to="/" class="btn btn--primary">Zur Startseite</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error?: { statusCode?: number; message?: string } }>()

useSeoMeta({
  title: 'Seite nicht gefunden',
  description: 'Die gesuchte Seite wurde nicht gefunden.',
})

useHead({
  meta: [{ name: 'robots', content: 'noindex' }],
})

void props
</script>

<style scoped>
.error {
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding-block: var(--space-24);
}

.error__inner {
  text-align: center;
  max-width: 40rem;
}

.error__title {
  font-size: var(--text-4xl);
}

.error__text {
  color: var(--text-muted);
  margin-bottom: var(--space-8);
}
</style>
