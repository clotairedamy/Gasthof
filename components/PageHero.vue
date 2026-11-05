<template>
  <section class="page-hero on-dark" aria-label="Kopfbereich">
    <img class="page-hero__bg" :src="asset(image)" alt="" width="1600" height="1067" fetchpriority="high" :style="{ objectPosition: position }" />
    <div class="page-hero__scrim" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p v-if="kicker" class="page-hero__kicker">{{ kicker }}</p>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="lead" class="page-hero__lead">{{ lead }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    kicker?: string
    lead?: string
    image: string
    position?: string
  }>(),
  { position: 'center' },
)
</script>

<style scoped>
.page-hero {
  position: relative;
  min-height: clamp(30rem, 78svh, 48rem);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-dark);
  overflow: hidden;
  text-align: center;
}

.page-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: hero-settle 2.4s var(--ease-out) both;
}

.page-hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(var(--scrim) / 0.45) 0%, rgb(var(--scrim) / 0.3) 50%, rgb(var(--scrim) / 0.6) 100%);
}

.page-hero__content {
  position: relative;
  z-index: 1;
  padding-block: calc(var(--header-h) + var(--space-8)) var(--space-16);
  max-width: 54rem;
  animation: hero-rise 1.4s var(--ease-out) 0.2s both;
}

.page-hero__kicker {
  display: inline-flex;
  align-items: center;
  gap: var(--space-4);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  margin: 0 0 var(--space-6);
}

.page-hero__kicker::before,
.page-hero__kicker::after {
  content: '';
  width: 2.5rem;
  height: 1px;
  background: currentColor;
}

.page-hero__title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 300;
  color: var(--text-on-dark);
  margin: 0 0 var(--space-6);
}

.page-hero__lead {
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-style: italic;
  font-weight: 300;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 40rem;
}

@keyframes hero-settle {
  from {
    transform: scale(1.08);
  }
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}
</style>
