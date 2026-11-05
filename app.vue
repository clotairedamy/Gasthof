<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { indexable } = useRuntimeConfig().public

// True until the first client-side navigation; holds hero animations back
// while the intro curtain lifts (see --intro-delay in main.css).
const firstLoad = useState('first-load', () => true)
const router = useRouter()
router.beforeEach((_to, from) => {
  if (from.matched.length) firstLoad.value = false
})

useHead({
  titleTemplate: (title?: string) => title || 'Gasthof Barlida – Lainacherwirt',
  htmlAttrs: { class: computed(() => (firstLoad.value ? 'is-first-load' : '')) },
  meta: [{ name: 'robots', content: indexable ? 'index, follow' : 'noindex, nofollow' }],
  link: [{ rel: 'icon', type: 'image/svg+xml', href: asset('/favicon.svg') }],
})
</script>
