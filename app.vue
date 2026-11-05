<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { indexable } = useRuntimeConfig().public
const t = useMessages()

// True until the first client-side navigation; holds hero animations back
// while the intro curtain lifts (see --intro-delay in main.css).
const firstLoad = useState('first-load', () => true)
const router = useRouter()
router.beforeEach((_to, from) => {
  if (from.matched.length) firstLoad.value = false
})

// lang, hreflang alternates and og:locale for the active locale. Pages set
// their own canonical (usePageSeo), so the module's is dropped.
const i18nHead = useLocaleHead()
// Resolved here, not inside the getter below: head getters run after the
// Nuxt context is gone during SSR.
const favicon = asset('/favicon.svg')

useHead({
  titleTemplate: (title?: string) => title || 'Gasthof Barlida – Lainacherwirt',
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs.lang,
    class: computed(() => (firstLoad.value ? 'is-first-load' : '')),
  },
  meta: () => [
    { name: 'description', content: t.value.meta.siteDescription },
    { name: 'robots', content: indexable ? 'index, follow' : 'noindex, nofollow' },
    ...(i18nHead.value.meta ?? []),
  ],
  link: () => [
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
    ...(i18nHead.value.link ?? []).filter((link) => link.rel !== 'canonical'),
  ],
})
</script>
