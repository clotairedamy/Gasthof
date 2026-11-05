<template>
  <section class="band on-dark" :aria-label="label">
    <img class="band__img" :src="asset(image)" alt="" width="1920" height="1280" loading="lazy" :style="{ objectPosition: position }" />
    <div class="band__scrim" aria-hidden="true"></div>
    <div v-reveal class="container band__content">
      <p v-if="kicker" class="kicker band__kicker">{{ kicker }}</p>
      <p v-split class="band__quote"><slot /></p>
      <NuxtLinkLocale v-if="ctaTo && ctaTo.startsWith('/')" :to="ctaTo" class="btn btn--outline-light">{{ ctaLabel }}</NuxtLinkLocale>
      <a
        v-else-if="ctaTo"
        :href="ctaTo"
        class="btn btn--outline-light"
        :target="ctaTo.startsWith('http') ? '_blank' : undefined"
        :rel="ctaTo.startsWith('http') ? 'noopener' : undefined"
      >{{ ctaLabel }}</a>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    image: string
    label: string
    kicker?: string
    ctaTo?: string
    ctaLabel?: string
    position?: string
  }>(),
  { position: 'center' },
)
</script>

<style scoped>
.band {
  position: relative;
  display: grid;
  place-items: center;
  min-height: clamp(28rem, 85vh, 52rem);
  overflow: hidden;
  color: var(--text-on-dark);
  text-align: center;
}

.band__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.band__scrim {
  position: absolute;
  inset: 0;
  background: rgb(var(--scrim) / 0.45);
}

.band__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60rem;
}

.band__kicker {
  color: var(--text-on-dark);
}

.band__kicker::after {
  content: '';
  width: 2.5rem;
  height: 1px;
  background: currentColor;
}

.band__quote {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4.6vw, 3.75rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.15;
  margin: 0 0 var(--space-8);
  text-wrap: balance;
}

/* Gentle parallax where scroll-driven animations exist. No JS. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .band__img {
      inset: -12% 0;
      height: 124%;
      animation: band-parallax linear both;
      animation-timeline: view();
    }
  }
}

@keyframes band-parallax {
  from {
    transform: translateY(-8%);
  }
  to {
    transform: translateY(8%);
  }
}
</style>
