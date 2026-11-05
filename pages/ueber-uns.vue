<template>
  <div>
    <PageHero
      :title="t.about.title"
      kicker="Gasthof Barlida"
      :lead="t.about.lead"
      image="/images/about-2.jpg"
      position="center 40%"
    />

    <section class="section" aria-labelledby="family-heading">
      <div class="container about-intro">
        <p v-reveal class="kicker">{{ t.about.familyKicker }}</p>
        <h2 id="family-heading" v-split class="display about-intro__title">
          {{ t.about.familyTitleLead }} <em>{{ t.about.familyTitleAccent }}</em>
        </h2>
        <p v-reveal="100" class="about-intro__lead">{{ t.about.intro }}</p>
      </div>
    </section>

    <section class="vision section--ink on-dark" aria-labelledby="vision-heading">
      <div v-reveal:image.left class="vision__media">
        <img :src="asset('/images/about-1.jpg')" :alt="t.about.familyImageAlt" width="1200" height="1600" loading="lazy" />
      </div>
      <div class="vision__body">
        <div v-reveal class="vision__inner">
          <p class="kicker">{{ t.about.visionKicker }}</p>
          <h2 id="vision-heading" v-split class="vision__title">{{ t.about.visionTitleLead }} <em>{{ t.about.visionTitleAccent }}</em></h2>
          <p class="vision__text">{{ t.about.visionText }}</p>
        </div>
      </div>
    </section>

    <section class="section closing" :aria-label="t.about.closingLabel">
      <div v-reveal class="container closing__inner">
        <BrandMark class="closing__mark" />
        <blockquote class="closing__quote">
          <p><q>{{ t.about.closing }}</q></p>
        </blockquote>
        <div class="closing__actions">
          <NuxtLinkLocale to="/zimmer" class="btn btn--primary">{{ t.about.roomsCta }}</NuxtLinkLocale>
          <NuxtLinkLocale to="/kontakt" class="btn btn--ghost">{{ t.ui.contact }}</NuxtLinkLocale>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const t = useMessages()

usePageSeo({
  title: t.value.about.seoTitle,
  description: t.value.about.intro,
  image: '/images/about-1.jpg',
})
</script>

<style scoped>
.about-intro {
  max-width: 64rem;
}

.about-intro__title {
  max-width: 18ch;
  margin-bottom: var(--space-12);
}

.about-intro__title em {
  color: var(--accent);
}

.about-intro__lead {
  max-width: 44rem;
  margin: 0 0 0 auto;
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  line-height: 1.55;
  color: var(--text-muted);
}

.vision {
  display: grid;
  grid-template-columns: 1fr;
}

.vision__media {
  min-height: 60svh;
}

.vision__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vision__body {
  display: flex;
  align-items: center;
  padding: var(--section-y) clamp(var(--space-6), 6vw, var(--space-24));
}

.vision__inner {
  max-width: 34rem;
}

.vision__title {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 300;
  margin-bottom: var(--space-8);
}

.vision__title em {
  color: var(--gold);
}

.vision__text {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  line-height: 1.55;
  color: var(--text-on-dark-muted);
  margin: 0;
}

.closing__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 56rem;
}

.closing__mark {
  width: 3.5rem;
  color: var(--bronze);
  margin-bottom: var(--space-8);
}

.closing__quote {
  margin: 0 0 var(--space-12);
}

.closing__quote p {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 3.2vw, 2.5rem);
  font-style: italic;
  font-weight: 300;
  line-height: 1.35;
  text-wrap: balance;
}

.closing__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
}

@media (min-width: 900px) {
  .vision {
    grid-template-columns: 1fr 1fr;
    min-height: 90svh;
  }

  .vision__media {
    min-height: 0;
  }
}
</style>
