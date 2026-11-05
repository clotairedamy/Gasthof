<template>
  <ul class="lang" :aria-label="t.ui.language">
    <li v-for="item in locales" :key="item.code">
      <NuxtLink
        :to="switchLocalePath(item.code)"
        class="lang__link"
        :lang="item.language"
        :hreflang="item.language"
        :aria-current="item.code === locale ? 'true' : undefined"
      >
        <span aria-hidden="true">{{ item.code.toUpperCase() }}</span>
        <span class="sr-only">{{ item.name }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { locales } from '~/content/locales'

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const t = useMessages()
</script>

<style scoped>
.lang {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

.lang__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  min-height: 2.75rem;
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.14em;
  text-decoration: none;
  color: inherit;
  opacity: 0.65;
  transition: opacity var(--dur-base) var(--ease);
}

.lang__link:hover,
.lang__link[aria-current='true'] {
  color: inherit;
  opacity: 1;
}

.lang__link[aria-current='true'] span:first-child {
  border-bottom: 1px solid currentColor;
}
</style>
