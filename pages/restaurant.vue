<template>
  <div>
    <PageHero
      :title="t.restaurant.name"
      :kicker="t.restaurant.kicker"
      :lead="t.restaurant.intro"
      image="/images/restaurant-1.jpg"
    />

    <section class="section" aria-labelledby="restaurant-heading">
      <div class="container restaurant">
        <div class="restaurant__body">
          <p class="kicker">{{ t.restaurant.sectionKicker }}</p>
          <h2 id="restaurant-heading" v-split class="restaurant__title">{{ t.restaurant.titleLead }} <em>{{ t.restaurant.titleAccent }}</em></h2>
          <p v-for="(p, i) in t.restaurant.description" :key="i" class="restaurant__text" :class="{ 'restaurant__text--lead': i === 0 }">{{ p }}</p>
          <p class="restaurant__text">{{ t.restaurant.offSeason }}</p>

          <h3 class="restaurant__subtitle">{{ t.restaurant.hoursTitle }}</h3>
          <dl class="restaurant__hours">
            <div v-for="h in t.restaurant.hours" :key="h.label" class="restaurant__hour">
              <dt>{{ h.label }}</dt>
              <dd>{{ h.value }}</dd>
            </div>
          </dl>

          <div class="restaurant__cta">
            <a :href="site.phoneHref" class="btn btn--primary">{{ t.restaurant.reserve }}</a>
          </div>
        </div>

        <div class="restaurant__images">
          <img v-reveal:image :src="asset('/images/restaurant-5.jpg')" :alt="t.restaurant.interiorAlt" width="1200" height="1600" loading="lazy" />
          <img v-reveal:image.left="300" :src="asset('/images/restaurant-3.jpg')" :alt="t.restaurant.tableAlt" width="1600" height="1200" loading="lazy" />
        </div>
      </div>
    </section>

    <ImageBand
      image="/images/bar-1.jpg"
      :label="t.restaurant.eventsTitle"
      :kicker="t.restaurant.eventsTitle"
      :cta-to="site.phoneHref"
      :cta-label="t.restaurant.eventsCta"
    >
      {{ t.restaurant.eventsQuote }}
    </ImageBand>

    <div class="section">
      <ExperienceTabs :items="highlights" :kicker="t.restaurant.moreKicker" :title="t.home.experienceTitle" :show-links="false" />
    </div>

    <section class="section section--alt" :aria-label="t.restaurant.imagesLabel">
      <div class="container">
        <ul class="restaurant__strip">
          <li v-for="(img, i) in restaurantImages" :key="img">
            <img v-reveal:image="(i % 3) * 100" :src="asset(img)" :alt="`${t.restaurant.imageAlt} ${i + 1}`" width="600" height="600" loading="lazy" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { highlightFacts, restaurantImages } from '~/content/restaurant'
import { site } from '~/content/site'

const t = useMessages()
const highlights = computed(() =>
  highlightFacts.map((fact, i) => ({ ...fact, ...t.value.restaurant.highlights[i]! })),
)

usePageSeo({
  title: t.value.restaurant.seoTitle,
  description: t.value.restaurant.intro,
  image: '/images/restaurant-1.jpg',
})
</script>

<style scoped>
.restaurant {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-16);
  align-items: center;
}

.restaurant__title {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: var(--space-8);
}

.restaurant__title em {
  color: var(--accent);
}

.restaurant__text {
  color: var(--text-muted);
}

.restaurant__text--lead {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  line-height: 1.5;
  color: var(--text);
}

.restaurant__subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--bronze);
  margin: var(--space-12) 0 var(--space-4);
}

.restaurant__hours {
  margin: 0;
  border-top: 1px solid var(--border-strong);
}

.restaurant__hour {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--border);
}

.restaurant__hour dt {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
}

.restaurant__hour dd {
  margin: 0;
  color: var(--text-muted);
}

.restaurant__cta {
  margin-top: var(--space-12);
}

.restaurant__images {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.restaurant__images img {
  width: 100%;
  object-fit: cover;
}

.restaurant__images img:first-child {
  grid-column: 1 / 6;
  grid-row: 1;
  aspect-ratio: 3 / 4;
}

.restaurant__images img:last-child {
  grid-column: 3 / 7;
  grid-row: 1;
  align-self: end;
  aspect-ratio: 4 / 3;
  margin-bottom: calc(-1 * var(--space-12));
  border: var(--space-2) solid var(--canvas);
}

.restaurant__strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  list-style: none;
  margin: 0;
  padding: 0;
}

.restaurant__strip img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

@media (min-width: 720px) {
  .restaurant__strip {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 900px) {
  .restaurant {
    grid-template-columns: 1fr 1fr;
    gap: clamp(var(--space-12), 8vw, var(--space-32));
  }
}
</style>
