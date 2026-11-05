<template>
  <NuxtLayout>
    <div class="error">
      <div class="container error__inner">
        <p class="kicker">{{ t.error.code }} {{ error?.statusCode || 500 }}</p>
        <h1 class="error__title">{{ t.error.title }}</h1>
        <p class="error__text">{{ t.error.text }}</p>
        <NuxtLinkLocale to="/" class="btn btn--primary">{{ t.error.home }}</NuxtLinkLocale>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
defineProps<{ error?: { statusCode?: number; message?: string } }>()

const t = useMessages()

// No photo behind the header here, so keep it solid while this page shows.
const headerSolid = useState('header-solid', () => false)
headerSolid.value = true
onBeforeUnmount(() => {
  headerSolid.value = false
})

useSeoMeta({
  title: () => t.value.error.seoTitle,
  description: () => t.value.error.seoDescription,
})

useHead({
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<style scoped>
.error {
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding-block: calc(var(--header-h) + var(--space-16)) var(--space-24);
}

.error__inner {
  text-align: center;
  max-width: 40rem;
}

.error__title {
  font-size: var(--text-4xl);
  font-weight: 300;
}

.error__text {
  color: var(--text-muted);
  margin-bottom: var(--space-8);
}
</style>
