<template>
  <div class="layout">
    <a href="#main" class="skip-link">Zum Inhalt springen</a>
    <IntroCurtain />
    <SiteHeader />
    <main id="main" class="site-main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
    <MobileBookBar />
    <CursorFollower />
    <div id="route-announcer" class="sr-only" aria-live="polite"></div>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'de' },
})
</script>
